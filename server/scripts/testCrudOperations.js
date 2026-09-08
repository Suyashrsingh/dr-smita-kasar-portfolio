require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'smita_kasar_academic_portfolio_jwt_secret_key_2026';
const BASE_URL = 'http://localhost:5000/api';

const token = jwt.sign(
  { id: 'test-admin', email: 'smitakasar@gmail.com', role: 'admin' },
  JWT_SECRET,
  { expiresIn: '1h' }
);

async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`API ${options.method || 'GET'} ${path} failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function runTests() {
  console.log('🧪 Starting Full CRUD / Edit / Save / Delete / Toggle Publish End-to-End Tests...\n');

  try {
    // 1. Publications Test
    console.log('1️⃣ Testing Publications...');
    const pubRes = await api('/publications', {
      method: 'POST',
      body: {
        title: 'Automated Test Publication Title 2026',
        authors: 'Dr. Smita Kasar, Test Author',
        journal: 'IEEE Transactions on Testing',
        year: 2026,
        type: 'Journal',
        abstract: 'Test abstract',
        isPublished: true
      }
    });
    const pubId = pubRes.data._id || pubRes.data.id;
    console.log('  ✅ Created publication with ID:', pubId);

    // Edit / Save
    const pubEdit = await api(`/publications/${pubId}`, {
      method: 'PUT',
      body: { title: 'Updated Test Publication Title 2026' }
    });
    console.log('  ✅ Edited publication title:', pubEdit.data.title);

    // Toggle publish
    const pubToggle = await api(`/publications/${pubId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled publication publish status:', pubToggle.data.isPublished);

    // Delete
    await api(`/publications/${pubId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test publication successfully.');

    // 2. Awards Test
    console.log('\n2️⃣ Testing Awards...');
    const awdRes = await api('/awards', {
      method: 'POST',
      body: {
        title: 'Automated Test Excellence Award',
        issuer: 'Test Academic Society',
        year: '2026',
        description: 'Award description'
      }
    });
    const awdId = awdRes.data._id || awdRes.data.id;
    console.log('  ✅ Created award with ID:', awdId);

    // Edit
    await api(`/awards/${awdId}`, { method: 'PUT', body: { title: 'Updated Excellence Award' } });
    console.log('  ✅ Edited award successfully');

    // Toggle
    const awdToggle = await api(`/awards/${awdId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled award publish status:', awdToggle.data.isPublished);

    // Delete
    await api(`/awards/${awdId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test award successfully.');

    // 3. Projects Test
    console.log('\n3️⃣ Testing Projects...');
    const prjRes = await api('/projects', {
      method: 'POST',
      body: {
        title: 'Automated Test AI Research Project',
        fundingAgency: 'AICTE Test Grant',
        amount: 'Rs. 5,00,000',
        duration: '2 Years'
      }
    });
    const prjId = prjRes.data._id || prjRes.data.id;
    console.log('  ✅ Created project with ID:', prjId);

    // Edit
    await api(`/projects/${prjId}`, { method: 'PUT', body: { title: 'Updated AI Project' } });
    console.log('  ✅ Edited project successfully');

    // Toggle
    const prjToggle = await api(`/projects/${prjId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled project publish status:', prjToggle.data.isPublished);

    // Delete
    await api(`/projects/${prjId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test project successfully.');

    // 4. Workshops Test
    console.log('\n4️⃣ Testing Workshops...');
    const wkpRes = await api('/workshops', {
      method: 'POST',
      body: {
        title: 'Automated Test FDP Workshop on AI',
        date: 'March 2026',
        institution: 'MIT WPU'
      }
    });
    const wkpId = wkpRes.data._id || wkpRes.data.id;
    console.log('  ✅ Created workshop with ID:', wkpId);

    // Edit
    await api(`/workshops/${wkpId}`, { method: 'PUT', body: { title: 'Updated FDP on Generative AI' } });
    console.log('  ✅ Edited workshop successfully');

    // Toggle
    const wkpToggle = await api(`/workshops/${wkpId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled workshop publish status:', wkpToggle.data.isPublished);

    // Delete
    await api(`/workshops/${wkpId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test workshop successfully.');

    // 5. Gallery Test
    console.log('\n5️⃣ Testing Gallery...');
    const galRes = await api('/gallery', {
      method: 'POST',
      body: {
        title: 'Automated Test Conference Photo',
        imageUrl: '/test-image.jpg',
        category: 'Conferences'
      }
    });
    const galId = galRes.data._id || galRes.data.id;
    console.log('  ✅ Created gallery item with ID:', galId);

    // Edit
    await api(`/gallery/${galId}`, { method: 'PUT', body: { title: 'Updated Conference Photo' } });
    console.log('  ✅ Edited gallery item successfully');

    // Toggle
    const galToggle = await api(`/gallery/${galId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled gallery publish status:', galToggle.data.isPublished);

    // Delete
    await api(`/gallery/${galId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test gallery item successfully.');

    // 6. Articles / Notes Test
    console.log('\n6️⃣ Testing E-Content / Notes / Articles...');
    const artRes = await api('/articles', {
      method: 'POST',
      body: {
        title: 'Automated Test Lecture Notes on Deep Learning',
        category: 'Lecture Notes & Material',
        content: 'Detailed syllabus lecture notes content here...'
      }
    });
    const artId = artRes.data._id || artRes.data.id;
    console.log('  ✅ Created article/note with ID:', artId);

    // Edit
    await api(`/articles/${artId}`, { method: 'PUT', body: { title: 'Updated Lecture Notes on Deep Learning Unit 1' } });
    console.log('  ✅ Edited article/note successfully');

    // Toggle
    const artToggle = await api(`/articles/${artId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled article publish status:', artToggle.data.isPublished);

    // Delete
    await api(`/articles/${artId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test article/note successfully.');

    // 7. Online Tests / Quizzes Test
    console.log('\n7️⃣ Testing Online Tests / Quizzes...');
    const testRes = await api('/tests', {
      method: 'POST',
      body: {
        title: 'Automated Test Quiz on Neural Networks',
        subject: 'AI & ML',
        passMarks: 2,
        durationMinutes: 10,
        questions: [
          {
            question: 'What is a neuron in ANN?',
            options: ['Processing unit', 'Storage unit', 'Display unit', 'None'],
            correctAnswer: 0,
            marks: 1
          }
        ]
      }
    });
    const testId = testRes.data._id || testRes.data.id;
    console.log('  ✅ Created test quiz with ID:', testId);

    // Edit
    await api(`/tests/${testId}`, { method: 'PUT', body: { title: 'Updated Neural Networks Assessment' } });
    console.log('  ✅ Edited test quiz successfully');

    // Toggle
    const testToggle = await api(`/tests/${testId}/toggle-publish`, { method: 'PATCH' });
    console.log('  ✅ Toggled test publish status:', testToggle.data.isPublished);

    // Delete
    await api(`/tests/${testId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test quiz successfully.');

    // 8. Contact Messages Test
    console.log('\n8️⃣ Testing Contact Messages...');
    const msgRes = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Student',
        email: 'student@example.com',
        subject: 'PhD Query',
        message: 'Automated test inquiry regarding PhD vacancies.'
      })
    }).then(r => r.json());
    const msgId = msgRes.data._id || msgRes.data.id;
    console.log('  ✅ Created contact message with ID:', msgId);

    // Mark as read
    await api(`/messages/${msgId}/read`, { method: 'PUT', body: { isRead: true } });
    console.log('  ✅ Marked message as read successfully');

    // Delete
    await api(`/messages/${msgId}`, { method: 'DELETE' });
    console.log('  ✅ Deleted test message successfully.');

    console.log('\n🎉 ALL CREATE, EDIT, SAVE, TOGGLE-PUBLISH, AND DELETE OPERATIONS VERIFIED AND WORKING 100% WITH NO ERRORS!');
  } catch (err) {
    console.error('❌ Test failed with error:', err.message);
    process.exit(1);
  }
}

runTests();
