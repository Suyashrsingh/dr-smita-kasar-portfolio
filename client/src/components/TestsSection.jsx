import React, { useState, useEffect, useRef } from 'react';
import { 
  FileCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  X, 
  Play, 
  RotateCcw,
  BookOpen,
  User,
  GraduationCap,
  Hash,
  Mail,
  AlertTriangle,
  Calendar,
  Timer
} from 'lucide-react';
import { testService } from '../services/api';

const TestsSection = ({ tests = [] }) => {
  const [activeTest, setActiveTest] = useState(null); // Test currently selected
  const [quizStep, setQuizStep] = useState('register'); // 'register' | 'testing' | 'result'
  
  // Student registration details
  const [studentInfo, setStudentInfo] = useState({
    studentName: '',
    studentClass: '',
    rollNo: '',
    studentEmail: ''
  });
  
  const [userAnswers, setUserAnswers] = useState({}); // { [qIdx]: selectedOptionIndex }
  const [quizResult, setQuizResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Check schedule status helper
  const getTestScheduleStatus = (test) => {
    if (!test.isScheduled) {
      return { status: 'open', label: 'Practice Mode (Always Available)', color: 'emerald' };
    }
    const now = new Date();
    const start = test.startTime ? new Date(test.startTime) : null;
    const end = test.endTime ? new Date(test.endTime) : null;

    if (start && now < start) {
      return { 
        status: 'upcoming', 
        label: `Scheduled: Starts ${start.toLocaleDateString()} at ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 
        color: 'blue',
        disabled: true
      };
    }
    if (end && now > end) {
      return { 
        status: 'closed', 
        label: 'Quiz Window Closed / Expired', 
        color: 'rose',
        disabled: true
      };
    }
    return { 
      status: 'live', 
      label: '🟢 LIVE NOW - Assessment Window Open', 
      color: 'emerald',
      isLiveNow: true
    };
  };

  const handleOpenTest = (t) => {
    const sched = getTestScheduleStatus(t);
    if (sched.disabled) {
      alert(`This quiz is currently unavailable: ${sched.label}`);
      return;
    }
    setActiveTest(t);
    setQuizStep('register');
    setUserAnswers({});
    setQuizResult(null);
  };

  const handleStartExam = (e) => {
    e.preventDefault();
    if (!studentInfo.studentName || !studentInfo.studentClass || !studentInfo.rollNo) {
      alert('Please fill in your Name, Class/Branch, and Roll Number.');
      return;
    }
    
    // Set timer
    const totalSeconds = (activeTest.durationMinutes || 15) * 60;
    setTimeLeft(totalSeconds);
    setTimeSpent(0);
    setQuizStep('testing');
  };

  // Timer countdown hook
  useEffect(() => {
    if (quizStep === 'testing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [quizStep, timeLeft]);

  const handleSelectOption = (qIdx, optIdx) => {
    if (quizStep !== 'testing') return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleAutoSubmit = () => {
    alert('Time limit reached! Submitting your answers now.');
    handleSubmitQuiz(true);
  };

  const handleSubmitQuiz = async (isAuto = false) => {
    if (!activeTest) return;
    const questionsCount = activeTest.questions?.length || 0;
    const answeredCount = Object.keys(userAnswers).length;
    
    if (!isAuto && answeredCount < questionsCount) {
      if (!window.confirm(`You answered ${answeredCount} of ${questionsCount} questions. Are you ready to submit?`)) {
        return;
      }
    }

    clearInterval(timerRef.current);
    setSubmitting(true);
    try {
      const answersArray = (activeTest.questions || []).map((_, idx) => 
        userAnswers[idx] !== undefined ? userAnswers[idx] : -1
      );
      const testId = activeTest.id || activeTest._id;
      
      const payload = {
        answers: answersArray,
        studentName: studentInfo.studentName,
        studentClass: studentInfo.studentClass,
        rollNo: studentInfo.rollNo,
        studentEmail: studentInfo.studentEmail,
        timeSpentSeconds: timeSpent
      };

      const res = await testService.submit(testId, payload);
      if (res.data.success) {
        setQuizResult(res.data.data);
        setQuizStep('result');
      }
    } catch (err) {
      alert('Error submitting test: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const closeQuizModal = () => {
    clearInterval(timerRef.current);
    setActiveTest(null);
    setUserAnswers({});
    setQuizResult(null);
    setQuizStep('register');
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!tests || tests.length === 0) return null;

  return (
    <section id="tests" className="py-24 relative bg-slate-50/50 dark:bg-navy-950/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-500/10 border border-academic-500/20 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Interactive Self-Assessment & Live Exams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Quizzes & Timed Assessments
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Structured tests curated by Dr. Smita Kasar with student submission tracking, instant scorecards, and scheduling.
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tests.map((test, idx) => {
            const id = test.id || test._id || `test-${idx}`;
            const sched = getTestScheduleStatus(test);

            return (
              <div
                key={id}
                className="mac-card rounded-3xl p-7 relative hover:border-academic-500/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-academic-500/10 text-academic-700 dark:text-academic-300 border border-academic-500/20">
                      {test.subject}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      sched.status === 'live' 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 animate-pulse'
                        : sched.status === 'upcoming'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
                        : sched.status === 'closed'
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                        : 'bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-400'
                    }`}>
                      {sched.label}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                    {test.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {test.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-white/10">
                    <div>
                      <strong>Duration:</strong> {test.durationMinutes} Mins
                    </div>
                    <div>
                      <strong>Questions:</strong> {test.questions?.length || 0} MCQs
                    </div>
                    <div>
                      <strong>Target:</strong> {test.targetClass || test.targetAudience || 'CSE Scholars'}
                    </div>
                    <div>
                      <strong>Passing Marks:</strong> {test.passMarks || 3}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    {test.submissionsCount || 0} submitted
                  </span>

                  <button
                    onClick={() => handleOpenTest(test)}
                    disabled={sched.disabled}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{sched.disabled ? 'Assessment Closed' : 'Start Assessment'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quiz Modal (Register -> Test -> Result) */}
      {activeTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-3xl w-full max-h-[90vh] mac-card rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="mac-traffic-lights">
                  <span className="mac-dot red" onClick={closeQuizModal} />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {activeTest.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {activeTest.subject} • {activeTest.questions?.length || 0} MCQs • Duration: {activeTest.durationMinutes} Mins
                  </p>
                </div>
              </div>

              {quizStep === 'testing' && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-academic-600 text-white font-mono text-xs font-bold animate-pulse">
                  <Timer className="w-4 h-4" />
                  <span>Time Left: {formatTimer(timeLeft)}</span>
                </div>
              )}

              <button
                onClick={closeQuizModal}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              
              {/* STEP 1: STUDENT REGISTRATION FORM */}
              {quizStep === 'register' && (
                <div className="max-w-md mx-auto space-y-5">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-academic-500/10 text-academic-600 flex items-center justify-center mx-auto">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      Enter Student Details to Begin
                    </h4>
                    <p className="text-xs text-slate-500">
                      Your identity and test score will be recorded for departmental evaluation and performance records.
                    </p>
                  </div>

                  <form onSubmit={handleStartExam} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        value={studentInfo.studentName}
                        onChange={(e) => setStudentInfo({ ...studentInfo, studentName: e.target.value })}
                        required
                        placeholder="e.g. Suyash Singh / Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          <span>Class & Branch *</span>
                        </label>
                        <input
                          type="text"
                          value={studentInfo.studentClass}
                          onChange={(e) => setStudentInfo({ ...studentInfo, studentClass: e.target.value })}
                          required
                          placeholder="e.g. BE CSE - Div A"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-slate-400" />
                          <span>Roll No / PRN *</span>
                        </label>
                        <input
                          type="text"
                          value={studentInfo.rollNo}
                          onChange={(e) => setStudentInfo({ ...studentInfo, rollNo: e.target.value })}
                          required
                          placeholder="e.g. MIT22CS084"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>Email Address (Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={studentInfo.studentEmail}
                        onChange={(e) => setStudentInfo({ ...studentInfo, studentEmail: e.target.value })}
                        placeholder="e.g. student@mit.asia"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Once you click "Start Test Now", the timer will begin. Avoid refreshing the browser window.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl mac-btn-primary text-white font-semibold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Test Now ({activeTest.durationMinutes} Mins)</span>
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: ACTIVE QUESTIONS ATTEMPT */}
              {quizStep === 'testing' && (
                <div className="space-y-6">
                  {(activeTest.questions || []).map((q, qIdx) => (
                    <div 
                      key={qIdx}
                      className="p-5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-3"
                    >
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        <span className="text-academic-600 dark:text-academic-400 mr-1.5 font-mono">
                          Q{qIdx + 1}.
                        </span>
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {(q.options || []).map((opt, optIdx) => {
                          const isSelected = userAnswers[qIdx] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(qIdx, optIdx)}
                              className={`w-full text-left p-3 rounded-xl text-xs border transition-all cursor-pointer flex items-center gap-3 ${
                                isSelected
                                  ? 'bg-academic-500/15 border-academic-500 text-academic-700 dark:text-academic-300 font-semibold'
                                  : 'bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                isSelected ? 'border-academic-500 bg-academic-600 text-white' : 'border-current'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 3: RESULTS SCORECARD */}
              {quizStep === 'result' && quizResult && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl border ${
                    quizResult.passed 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                  } space-y-3 text-center`}>
                    <div className="text-2xl font-extrabold font-display">
                      {quizResult.passed ? '🎉 Congratulations! You Passed' : 'Assessment Result: Needs Review'}
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 max-w-md mx-auto text-xs font-mono bg-white/50 dark:bg-black/20 rounded-xl p-2 border border-black/5">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Student</span>
                        <strong className="text-slate-900 dark:text-white truncate block">{studentInfo.studentName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Roll No</span>
                        <strong className="text-slate-900 dark:text-white block">{studentInfo.rollNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Class</span>
                        <strong className="text-slate-900 dark:text-white block">{studentInfo.studentClass}</strong>
                      </div>
                    </div>

                    <p className="text-base font-bold">
                      Your Score: <strong>{quizResult.score}</strong> / {quizResult.totalPossible} ({quizResult.percentage}%)
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Your submission has been securely recorded on Dr. Smita Kasar's department database.
                    </p>
                  </div>

                  {/* Review Questions & Explanations */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Question Explanations & Review:
                    </h4>

                    {(activeTest.questions || []).map((q, qIdx) => {
                      const resultItem = quizResult?.results?.[qIdx];
                      return (
                        <div 
                          key={qIdx}
                          className="p-5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                              Q{qIdx + 1}. {q.question}
                            </h5>
                            {resultItem?.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            )}
                          </div>

                          <div className="text-[11px] space-y-1">
                            <div className="text-slate-600 dark:text-slate-400">
                              <strong>Your Answer:</strong> {q.options[resultItem?.selected] || 'Not Answered'}
                            </div>
                            <div className="text-emerald-700 dark:text-emerald-300 font-semibold">
                              <strong>Correct Answer:</strong> {q.options[resultItem?.correctAnswer]}
                            </div>
                            {resultItem?.explanation && (
                              <div className="p-2.5 rounded-lg bg-black/5 dark:bg-black/20 text-slate-600 dark:text-slate-300 text-[11px] mt-2">
                                <strong>Explanation:</strong> {resultItem.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Actions */}
            {quizStep === 'testing' && (
              <div className="px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Answered {Object.keys(userAnswers).length} of {activeTest.questions?.length || 0}
                </span>

                <button
                  onClick={() => handleSubmitQuiz(false)}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Submitting Answers...' : 'Submit & Finish Test'}
                </button>
              </div>
            )}

            {quizStep === 'result' && (
              <div className="px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex justify-end">
                <button
                  onClick={closeQuizModal}
                  className="px-5 py-2 rounded-xl mac-btn-primary text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Close & Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

export default TestsSection;

