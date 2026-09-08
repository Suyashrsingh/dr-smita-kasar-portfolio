const initialProfile = {
  name: "Dr. Smita Lalit Kasar",
  title: "Professor & Head, Department of Computer Science and Engineering",
  shortBio: "Distinguished academician, researcher, and author with over 24+ years of academic, research, and administrative leadership in Computer Science and Engineering, specializing in Applied Artificial Intelligence, Machine Learning, Healthcare Informatics, and Blockchain Systems.",
  fullBio: "Dr. Smita Lalit Kasar is Professor and Head of the Department of Computer Science & Engineering at Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. She holds a Ph.D. in Computer Science & Engineering from Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU) on 'Hybrid Model for the Detection of Heart Disease from Electrocardiogram Signal' under the guidance of Dr. M. S. Joshi. Having completed her MS in Applied Artificial Intelligence from the University of San Diego, USA (2026) and holding an MBA in Business Analytics from D.Y. Patil University (CGPA 8.66), she has published over 42+ peer-reviewed journal, conference, and book chapter publications across Springer, Elsevier, IEEE, Wiley, and Inderscience. She holds a granted Indian Patent for 'Robotic Fish for Underwater Surveillance' (No. 57090) and a registered Software Copyright for Biomedical Waste Management (SW-12097/2019). Honored with the Sir M. Visvesvaraya Outstanding Engineer Award 2023, she serves as Incharge Chairman of the Board of Studies (BoS) in CSE at Dr. BAMU, Life Member of ISTE and CSI, and Fellow of IETE.",
  affiliation: {
    department: "Department of Computer Science & Engineering",
    institution: "Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar",
    university: "Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU)",
    designation: "Professor & Head (Level 14, 7th CPC)"
  },
  contact: {
    email: "smitakasar@gmail.com",
    alternateEmail: "smita.kasar@mit.asia",
    phone: "+91 9923432229",
    landline: "0240 - 2375270",
    office: "HOD Cabin, Dept. of Computer Science & Engineering, Maharashtra Institute of Technology, Beed Bypass Road, Chhatrapati Sambhajinagar - 431010, Maharashtra, India",
    residence: "06, 'Shripad', Silver Oaks Villas, Near Alpine Hospital, Behind Atharva Royal, Beed Bypass Road, Chhatrapati Sambhajinagar - 431010, Maharashtra, India"
  },
  socialLinks: {
    scopus: "https://www.scopus.com/authid/detail.url?authorId=55370475800",
    orcid: "https://orcid.org/0000-0002-6441-9658",
    googleScholar: "https://scholar.google.co.in/citations?user=drsmitakasar",
    researchGate: "https://www.researchgate.net/profile/Smita-Kasar",
    linkedin: "https://www.linkedin.com/in/dr-smita-kasar",
    github: "https://github.com/drsmitakasar"
  },
  stats: {
    experienceYears: 24,
    publicationsCount: 42,
    citationsCount: 410,
    hIndex: 12,
    i10Index: 15,
    patentsCount: 2,
    phdScholarsGuided: 6
  },
  avatarUrl: "/smita-kasar.jpg",
  resumeUrl: "/Dr_Smita_Kasar_Resume.pdf"
};

const initialEducation = [
  {
    "id": "edu-1",
    "degree": "MS in Applied Artificial Intelligence",
    "institution": "University of San Diego, USA (Online Mode)",
    "year": "2026",
    "specialization": "Applied Artificial Intelligence, Machine Learning & Neural Networks",
    "description": "Advanced graduate research in computer vision, deep learning frameworks, generative AI architecture, and reinforcement learning."
  },
  {
    "id": "edu-2",
    "degree": "MBA in Business Analytics",
    "institution": "D.Y. Patil University, Pune (Online Mode)",
    "year": "April 2025",
    "specialization": "Business Analytics & Predictive Modeling (Grade 'A' - CGPA: 8.66)",
    "description": "Graduated with Grade 'A' and CGPA 8.66. Specialized in business intelligence, data strategy, and organizational analytics."
  },
  {
    "id": "edu-3",
    "degree": "Ph.D. in Computer Science & Engineering",
    "institution": "Government Engineering College, Aurangabad (Dr. Babasaheb Ambedkar Marathwada University)",
    "year": "December 2016",
    "specialization": "Medical Signal Processing & Machine Learning (Awarded)",
    "description": "Doctoral research under the guidance of Dr. M. S. Joshi. Thesis Title: 'Hybrid Model for the Detection of Heart Disease from Electrocardiogram Signal'."
  },
  {
    "id": "edu-4",
    "degree": "Master of Engineering (M.E.) in CSE",
    "institution": "Government Engineering College, Aurangabad (Dr. BAMU)",
    "year": "May 2010",
    "specialization": "Computer Science & Engineering (Distinction - 81.25%)",
    "description": "Master's Thesis: 'Optimization of nonlinear programming problems using non-traditional method: Genetic Algorithms'."
  },
  {
    "id": "edu-5",
    "degree": "Bachelor of Engineering (B.E.) in Computer Engineering",
    "institution": "Datta Meghe College of Engineering, Airoli (Mumbai University)",
    "year": "June 2000",
    "specialization": "Computer Engineering (First Class - 63.20%)",
    "description": "Rigorous undergraduate training in core computer engineering, systems programming, and algorithms."
  },
  {
    "id": "edu-6",
    "degree": "Diploma in Computer Technology",
    "institution": "Institute of Technology (MSBTE)",
    "year": "April 1997",
    "specialization": "Computer Technology (Distinction - 73.64%)",
    "description": "Distinction honors in hardware, networking, and systems foundations from MSBTE."
  },
  {
    "id": "edu-7",
    "degree": "Secondary School Certificate (S.S.C.)",
    "institution": "Gurunanak High School, Ulhasnagar, Dist. Thane (Maharashtra State Board)",
    "year": "March 1994",
    "specialization": "General Science & Mathematics (Distinction - 82.28%)",
    "description": "Distinction grade under the Maharashtra State Board."
  }
];

const initialExperience = [
  {
    "id": "exp-1",
    "role": "Professor and Head of Department",
    "institution": "Department of Computer Science & Engineering, Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar",
    "period": "June 2023 - Present (Level 14, 7th CPC)",
    "type": "Academic & Administrative Leadership",
    "description": "Heading the Department of CSE. Leading autonomous curricula development, doctoral research supervision, faculty recruitment, research grants, NBA accreditation compliance, and industry partnerships."
  },
  {
    "id": "exp-2",
    "role": "Associate Professor and Head of Department",
    "institution": "Department of Computer Science & Engineering, G.S. Mandal's MIT, Aurangabad",
    "period": "August 2018 - May 2023",
    "type": "Departmental Administration & Teaching",
    "description": "Led the department through curriculum modernization, research incubation, hackathons, and NBA accreditation attainment."
  },
  {
    "id": "exp-3",
    "role": "Associate Professor",
    "institution": "Department of Computer Science & Engineering, G.S. Mandal's MIT, Aurangabad",
    "period": "November 2017 - August 2018",
    "type": "Teaching & Research",
    "description": "Taught advanced courses in Machine Learning and Data Analytics; supervised postgraduate thesis dissertations."
  },
  {
    "id": "exp-4",
    "role": "Assistant Professor",
    "institution": "MGM's Jawaharlal Nehru Engineering College (JNEC), Aurangabad",
    "period": "February 2002 - November 2017 (15+ Years)",
    "type": "Teaching, Research & Lab Guidance",
    "description": "Taught UG and PG computer engineering courses, established advanced computing labs, coordinated NBA/NAAC dossiers, and published high-impact research."
  },
  {
    "id": "exp-5",
    "role": "Lecturer in Computer Science & IT",
    "institution": "Dept. of CS & IT, Deogiri College, Aurangabad",
    "period": "July 2001 - January 2002",
    "type": "Postgraduate Instruction",
    "description": "Delivered lectures and laboratory sessions for M.Sc. Computer Science and Information Technology students."
  }
];

const initialResearchAreas = [
  {
    id: "res-1",
    title: "Artificial Intelligence & Deep Learning",
    description: "Deep neural networks, backpropagation optimization, graph neural networks, and explainable AI models applied to mental health prognosis, pattern recognition, and predictive analytics.",
    icon: "Brain",
    tags: ["Deep Learning", "Graph Neural Networks", "Explainable AI", "Predictive Analytics"],
    isPublished: true
  },
  {
    id: "res-2",
    title: "Healthcare Informatics & ECG Signal Processing",
    description: "Hybrid machine learning models for early detection of myocardial infarction, Finch hunt optimization modified BiLSTM classifiers for heart disease, and liver disease diagnosis.",
    icon: "Activity",
    tags: ["ECG Signal Processing", "Biomedical AI", "BiLSTM Classifiers", "Clinical Decision Support"],
    isPublished: true
  },
  {
    id: "res-3",
    title: "Blockchain Systems & Decentralized Security",
    description: "SENSIBLE blockchain ecosystem, decentralized storage frameworks for secure medical EHR exchange, privacy preservation models, and smart contract auditing.",
    icon: "ShieldCheck",
    tags: ["SENSIBLE Blockchain", "Decentralized Storage", "EHR Privacy", "Cyber Security"],
    isPublished: true
  },
  {
    id: "res-4",
    title: "Network Function Virtualization & IoT Security",
    description: "Machine learning algorithms for enhancing security architectures in NFV-based IoT networks, intrusion detection systems, and secure communication protocols.",
    icon: "Network",
    tags: ["NFV Security", "IoT Networks", "Intruder Detection", "Cloud Computing"],
    isPublished: true
  },
  {
    id: "res-5",
    title: "Data Analytics, NLP & Optimization",
    description: "Large dataset multi-level association rule mining, aspect-based sentiment analysis with Natural Language Generation (NLG), and genetic algorithm optimization.",
    icon: "Database",
    tags: ["Data Analytics", "Sentiment Analysis (NLG)", "Genetic Algorithms", "Elasticsearch"],
    isPublished: true
  }
];

const initialPublications = [
  {
    "id": "pub-j-1",
    "title": "Predicting and classifying user's behavior for improving student's information literacy using Kernel techniques",
    "authors": "Vaishali Laxmikant Thakare, Smita Kasar",
    "journal": "Journal of Information Systems Engineering and Management\n(Accepted and In Press)",
    "year": 2023,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "2468-4376",
    "impactFactor": "-",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 2468-4376, Impact Factor: -)."
  },
  {
    "id": "pub-j-2",
    "title": "Daivashala Deshmukh, Smita Kasar, Mental Health Prediction in the Era of AI: The Review of Machine Learning Techniques and Ethical Concerns\"",
    "authors": "Daivashala Deshmukh, Smita Kasar, Mental Health Prediction in the Era of AI: The Review of Machine Learning Techniques and Ethical Concerns",
    "journal": "Journal of Psychopathology\n(Accepted and In Press)",
    "year": 2023,
    "type": "Journal",
    "indexing": "SCI",
    "issn": "2284-0249",
    "impactFactor": "0.9",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in SCI (ISSN: 2284-0249, Impact Factor: 0.9)."
  },
  {
    "id": "pub-j-3",
    "title": "Navigating the Complexities of Machine Learning in Mental Health Prognosis: Paradigms and Challenges",
    "authors": "Daivashala Deshmukh, Smita Kasar",
    "journal": "International Journal of Environmental Sciences. \n(Accepted and In Press)",
    "year": 2023,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "2229-7359",
    "impactFactor": "1.71",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 2229-7359, Impact Factor: 1.71)."
  },
  {
    "id": "pub-j-4",
    "title": "A comprehensive survey of the privacy preservation models for secure data sharing in Decentralized Cloud",
    "authors": "Sushama Deshmukh, Smita Kasar",
    "journal": "International Journal of Security and Networks, InderScience. In Press.\n(Acceptance received- June 2025 )",
    "year": 2025,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "1747-8413",
    "impactFactor": "0.7",
    "citations": 2,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 1747-8413, Impact Factor: 0.7)."
  },
  {
    "id": "pub-j-5",
    "title": "A Systematic Review on Machine Learning Techniques for Liver Disease Detection, Biomedical Materials & Devices",
    "authors": "Sandip S. Kankal, Smita Kasar",
    "journal": "Springer, 5 May 2025, https://doi.org/10.1007/s44174-025-00341-1",
    "year": 2025,
    "type": "Journal",
    "indexing": "ESCI",
    "issn": "2731-4812",
    "impactFactor": "4.27",
    "citations": 2,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in ESCI (ISSN: 2731-4812, Impact Factor: 4.27)."
  },
  {
    "id": "pub-j-6",
    "title": "An efficient IoT enabled heart disease prediction model using Finch hunt optimization modified BiLSTM classifier",
    "authors": "Yogesh Suresh Chichani, Smita L. Kasar",
    "journal": "Biomedical Signal Processing and Control, Elsevier, February 2025 https://doi.org/10.1016/j.bspc.2024.107170",
    "year": 2025,
    "type": "Journal",
    "indexing": "SCI",
    "issn": "1746-8108",
    "impactFactor": "4.9",
    "citations": 2,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in SCI (ISSN: 1746-8108, Impact Factor: 4.9)."
  },
  {
    "id": "pub-j-7",
    "title": "Applications of blockchain technology in privacy preserving and data security for real time (data) applications",
    "authors": "Sushama Deshmukh, Smita Kasar",
    "journal": "Journal-Concurrency and Computation Practice and Experience, Wiley, September 2024",
    "year": 2024,
    "type": "Journal",
    "indexing": "SCI",
    "issn": "1532-0634",
    "impactFactor": "1.5",
    "citations": 2,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in SCI (ISSN: 1532-0634, Impact Factor: 1.5)."
  },
  {
    "id": "pub-j-8",
    "title": "Enhancing Security for NFV-Based IOT Networks through Machine Learning: A Comprehensive Review and Analysis",
    "authors": "Sandeep Gite, Smita Kasar",
    "journal": "Educational Administration: Theory and Practice, Vol 30, May 2024",
    "year": 2024,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "2148-2403",
    "impactFactor": "1.02",
    "citations": 2,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 2148-2403, Impact Factor: 1.02)."
  },
  {
    "id": "pub-j-9",
    "title": "Review on Machine Learning Based Hybrid Model for Suicide Attempt Prediction",
    "authors": "Sarika Zile, Smita Kasar, Daivashala Deshmukh",
    "journal": "International Journal of Scientific Research in Engineering and Management (IJSREM)",
    "year": 2023,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "2582-3930",
    "impactFactor": "-",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 2582-3930, Impact Factor: -)."
  },
  {
    "id": "pub-j-10",
    "title": "Utility of the Biomedical Waste (BMW) Mobile App for Auditing BMW Segregation Practices in a Surgical Discipline of a Tertiary Care Hospital",
    "authors": "Kuyare Sunil, Ginodia Saumitra, Warke Himangi, Kasar Smita, Bhosle Vaibhav, Nataraj Gita",
    "journal": "International Journal of Pharmaceutical and Clinical Research 2023; 15(4); 1020-1026",
    "year": 2023,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "0975 1556",
    "impactFactor": "-",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 0975 1556, Impact Factor: -)."
  },
  {
    "id": "pub-j-11",
    "title": "SENSIBLE: SEquestered aNd SynergIstic Blockchain Ecosystem",
    "authors": "Meghana Kshirsagar, Gauri Vaidya, Yao Yao, Smita Kasar, Conor Ryan",
    "journal": "Engineering Reports, Wiley Online Library, Nov 2022,  https://doi.org/10.1002/eng2.12586",
    "year": 2022,
    "type": "Journal",
    "indexing": "SCI",
    "issn": "2577-8196",
    "impactFactor": "2",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in SCI (ISSN: 2577-8196, Impact Factor: 2)."
  },
  {
    "id": "pub-j-12",
    "title": "Twego Trending: Data Analytics Based Search Engine Using Elasticsearch",
    "authors": "Vedant Karmalkar, Kanchan Bhalerao, Gaurav Kaje, Asra Anjum, Smita Kasar",
    "journal": "Turkish Journal of Computer and Mathematics Education, Vol.12 No.1S (2021), pp:246-251",
    "year": 2021,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "1309-4653",
    "impactFactor": "-",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 1309-4653, Impact Factor: -)."
  },
  {
    "id": "pub-j-13",
    "title": "Review on Aspect Based Sentiment Analysis Using Sentence Minimization",
    "authors": "Mayuri Likhar, Smita Kasar",
    "journal": "International Journal of Computer Sciences and Engineering, Volume-5, Issue-10, Page no. 338-341, https://www.ijcseonline.org/full_paper_view.php?paper_id=1525, Oct-2017.",
    "year": 2017,
    "type": "Journal",
    "indexing": "UGC\n No: 5613",
    "issn": "2347-2693",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in UGC\n No: 5613 (ISSN: 2347-2693, Impact Factor: -)."
  },
  {
    "id": "pub-j-14",
    "title": "Multilevel Association Rule Mining for Large Datasets: A Review",
    "authors": "Minal Vanarse, Smita Kasar",
    "journal": "International Journal of Advanced Research in Computer Science, Volume 8, No. 8, September-October 2017, pp:583-586, DOI:http://dx.doi.org/10.26483/ijarcs.v8i8.4793",
    "year": 2017,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "0976-5697",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 0976-5697, Impact Factor: -)."
  },
  {
    "id": "pub-j-15",
    "title": "Improved Model for the detection of Myocardial Infarction from Multilead ECG using QRS Point Score as an Additional Feature",
    "authors": "Smita Kasar, M.S.Joshi",
    "journal": "Journal of Theoretical and Applied Information Technology,  Vol.85. No.2, March 2016, pp 183-191",
    "year": 2016,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "1992-8645",
    "impactFactor": "0.22",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 1992-8645, Impact Factor: 0.22)."
  },
  {
    "id": "pub-j-16",
    "title": "Analysis of Multi-Lead ECG Signals using Decision Tree Algorithms",
    "authors": "Smita Kasar, M.S.Joshi",
    "journal": "International Journal of Computer Applications,   Vol. 134, No 16, January 2016,pp 27-30",
    "year": 2016,
    "type": "Journal",
    "indexing": "SCI",
    "issn": "0975 - 8887",
    "impactFactor": "0.7",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in SCI (ISSN: 0975 - 8887, Impact Factor: 0.7)."
  },
  {
    "id": "pub-j-17",
    "title": "Personalized Recommendation System for Medical Assistance using Hybrid Filtering",
    "authors": "Archana Salunke, Smita Kasar",
    "journal": "International Journal of Computer Applications 128(9):6-10, October 2015.",
    "year": 2015,
    "type": "Journal",
    "indexing": "SCI",
    "issn": "0975 - 8887",
    "impactFactor": "0.7",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in SCI (ISSN: 0975 - 8887, Impact Factor: 0.7)."
  },
  {
    "id": "pub-j-18",
    "title": "Identification of Myocardial Infarction from Multi-lead ECG signal",
    "authors": "Smita Kasar, M.S.Joshi",
    "journal": "International Journal of Engineering Research and Applications ISSN: 2248-9622, Vol. 5, Issue 10, October 2015, pp.28-32",
    "year": 2015,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "2248-9622",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 2248-9622, Impact Factor: -)."
  },
  {
    "id": "pub-j-19",
    "title": "Security Improvisation in Steganography using AES 128/192/256",
    "authors": "Deshmukh Priyanka, Smita Kasar",
    "journal": "International Journal of Engineering Research & Technology , Vol. 3 - Issue 11 (November - 2014)",
    "year": 2014,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "2278-0181",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 2278-0181, Impact Factor: -)."
  },
  {
    "id": "pub-j-20",
    "title": "Performance of digital filters for noise & signal removal from ECG signals in time domain",
    "authors": "Smita Kasar, M.S.Joshi",
    "journal": "International Journal of Innovative Research in Electrical, Electronics, Instrumentation & Control",
    "year": 2014,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "2321-2004",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 2321-2004, Impact Factor: -)."
  },
  {
    "id": "pub-j-21",
    "title": "Levenberg-Marquardt & Conjugate Gradient Neuro-modeling of Simulated Miniature Rectangular Microstrip Antenna",
    "authors": "Abhilasha Mishra, GB Janvale, Smita Kasar, S Verma, A Janardan",
    "journal": "Advanced Computational Techniques in Electromagnetics",
    "year": 2023,
    "type": "Journal",
    "indexing": "Scopus",
    "issn": "2194-0266",
    "impactFactor": "0.8",
    "citations": 5,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Scopus (ISSN: 2194-0266, Impact Factor: 0.8)."
  },
  {
    "id": "pub-j-22",
    "title": "Effect of Normalized Scale on Design of Rectangular Microstrip Antenna by using FFBP",
    "authors": "Abhilasha Mishra, V Bhagile, Smita Kasar, PM Patil",
    "journal": "International Journal of Computer Science and Engineering, Vol. 02, No. 03, 2010, 626-629",
    "year": 2010,
    "type": "Journal",
    "indexing": "UGC\n  No: 63193",
    "issn": "2347-2693",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in UGC\n  No: 63193 (ISSN: 2347-2693, Impact Factor: -)."
  },
  {
    "id": "pub-j-23",
    "title": "Quadratic Programming Problems using Genetic Algorithms",
    "authors": "Smita Kasar, Abbhilasha Mishra, P.S.Revankar,.",
    "journal": "International Journal of Computer Science and Management Systems-Vol. 2 No. 1 (Jan-June 2010), pp 17-20",
    "year": 2010,
    "type": "Journal",
    "indexing": "Refereed",
    "issn": "0975-5349",
    "impactFactor": "-",
    "citations": 10,
    "isPublished": true,
    "abstract": "Peer-reviewed journal publication indexed in Refereed (ISSN: 0975-5349, Impact Factor: -)."
  },
  {
    "id": "pub-bc-1",
    "title": "Significance of Software Engineering Phases in the Development of a Software Application: Case Study",
    "authors": "Sushama Deshmukh, Smita Kasar",
    "journal": "Book Chapter in Designing User Interfaces with a Data Science Approach, IGI Global, pp. 1-22",
    "year": 2022,
    "type": "Book Chapter",
    "indexing": "Scopus / IGI Global",
    "isbn": "9781799891215",
    "doi": "10.4018/978-1-7998-9121-5.ch008",
    "url": "https://www.igi-global.com/chapter/significance-of-software-engineering-phases-in-the-development-of-a-software-application/299749",
    "isPublished": true,
    "citations": 11,
    "abstract": "Peer-reviewed book chapter analyzing agile software engineering lifecycle paradigms applied to medical user interface design."
  },
  {
    "id": "pub-bc-2",
    "title": "Open Challenges in Smart Cities: Privacy and Security",
    "authors": "Smita Kasar, Meghana Kshirsagar",
    "journal": "Book Chapter in Security and Privacy Applications for Smart City Development, Studies in Systems, Decision and Control (SSDC), Springer",
    "year": 2020,
    "type": "Book Chapter",
    "indexing": "Scopus / Springer",
    "isbn": "978-981-15-0077-0",
    "doi": "10.1007/978-981-15-0077-0_2",
    "url": "https://link.springer.com/chapter/10.1007/978-981-15-0077-0_2",
    "isPublished": true,
    "citations": 19,
    "abstract": "Book chapter addressing key cybersecurity vectors, privacy protocols, and decentralized mechanisms for smart city systems."
  },
  {
    "id": "pub-c-1",
    "title": "Hybrid Feature Extraction and Graph Network Based Explainable AI Model For Mental Well- Being Prediction",
    "authors": "Daivashala Rajeshwarrao Deshmukh, Dr. Smita Kasar",
    "journal": "6th IEEE International Conference on Mobile Computing and Sustainable Informatics (ICMCSI 2025), International Association for Science, Engineering, Research and Development (IASERD),  Purbanchal University, Nepal. , January 7-8, 2025",
    "year": 2025,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 6th IEEE International Conference on Mobile Computing and Sustainable Informatics (ICMCSI 2025) (International Association for Science, Engineering, Research and Development (IASERD),  Purbanchal University, Nepal. , January 7-8, 2025)."
  },
  {
    "id": "pub-c-2",
    "title": "Blockchain Approaches for Healthcare: A Review and outlook",
    "authors": "Natasha Shaikh, Smita Kasar",
    "journal": "5th International Conference on Electronics and Sustainable Communication Systems,  ICESC 2024, Hindusthan Institute of Technology, Coimbatore, Tamil Nadu, 7th August 2024",
    "year": 2024,
    "type": "Conference",
    "indexing": "International (Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 5th International Conference on Electronics and Sustainable Communication Systems,  ICESC 2024 (Hindusthan Institute of Technology, Coimbatore, Tamil Nadu, 7th August 2024)."
  },
  {
    "id": "pub-c-3",
    "title": "A concise survey on Diagnosis Method and machine learning techniques for Liver Disease Detection",
    "authors": "Sandip S. Kankal, Smita Kasar",
    "journal": ", International Conference on Advances in Emerging Trends in Computer Applications (ICAETC-2023),, Dept. of computer science and engineering, Babu Banarasi Das Institute of Technology and Management, Lucknow, 21-22 December 2023",
    "year": 2023,
    "type": "Conference",
    "indexing": "International (Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at , International Conference on Advances in Emerging Trends in Computer Applications (ICAETC-2023), (Dept. of computer science and engineering, Babu Banarasi Das Institute of Technology and Management, Lucknow, 21-22 December 2023)."
  },
  {
    "id": "pub-c-4",
    "title": "A Survey on Machine Learning Techniques for Liver Disease Detection",
    "authors": "Sandip S. Kankal, Smita Kasar",
    "journal": "3rd International Conference- \"Intelligent systems, cognitive science and knowledge engineering\" ICKE2023, organized by Maharashtra, 8-9 May 2023., Dept. of computer science & IT, Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",
    "year": 2023,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 3rd International Conference- \"Intelligent systems, cognitive science and knowledge engineering\" ICKE2023, organized by Maharashtra, 8-9 May 2023. (Dept. of computer science & IT, Dr. Babasaheb Ambedkar Marathwada University, Aurangabad,)."
  },
  {
    "id": "pub-c-5",
    "title": "Towards Security Enhancement for NFV based IoT Network using Machine Learning",
    "authors": "Sandeep Gite, Smita Kasar",
    "journal": "2nd International Conference on Emerging Trends in Engineering (ICETE), University College of Engineering, Osmania University, Hyderabad, 28 March 2023",
    "year": 2023,
    "type": "Conference",
    "indexing": "International (Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 2nd International Conference on Emerging Trends in Engineering (ICETE) (University College of Engineering, Osmania University, Hyderabad, 28 March 2023)."
  },
  {
    "id": "pub-c-6",
    "title": "Smita Kasar, Daivashala Deshmukh, A comparative performance analysis of Machine Learning Based Hybrid Model for Suicide Attempt Prediction",
    "authors": "Sarika Zile",
    "journal": "3rd International Conference- \"Intelligent systems, cognitive science and knowledge engineering\" ICKE2023, Maharashtra, 8-9May 2023., Dept. of computer science & IT, Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",
    "year": 2023,
    "type": "Conference",
    "indexing": "International (Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 3rd International Conference- \"Intelligent systems, cognitive science and knowledge engineering\" ICKE2023, Maharashtra, 8-9May 2023. (Dept. of computer science & IT, Dr. Babasaheb Ambedkar Marathwada University, Aurangabad,)."
  },
  {
    "id": "pub-c-7",
    "title": "Analysis of Challenges in Decentralized Storage Framework for Sharing Medical Data",
    "authors": "Sushama Deshmukh, Smita Kasar, Yogesh Chichani",
    "journal": "14th IEEE International Conference on Computing, Communication & Networking Technologies (ICCCNT), IIT - Delhi, Delhi India Scopus Indexed, , July 6th - 8th, 2023, accepted for the publication in IEEE Digital Library Xplore\u00ae.",
    "year": 2023,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 14th IEEE International Conference on Computing, Communication & Networking Technologies (ICCCNT) (IIT - Delhi, Delhi India Scopus Indexed, , July 6th - 8th, 2023, accepted for the publication in IEEE Digital Library Xplore\u00ae.)."
  },
  {
    "id": "pub-c-8",
    "title": "Land Digitization using blockchain: A secure approach",
    "authors": "Mayuresh Khemnar, Ishwar Jaitmal,  Smita Kasar, Atul Mundaware",
    "journal": "International conference VISHWACON 2021 Recent Trends in Engineering and Technology,, VIIT, Pune, 27-28 Nov 2021",
    "year": 2021,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at International conference VISHWACON 2021 Recent Trends in Engineering and Technology, (VIIT, Pune, 27-28 Nov 2021)."
  },
  {
    "id": "pub-c-9",
    "title": "Smart Physical Intruder Detection System for Highly Sensitive Area",
    "authors": "Smita Kasar, Vivek Kshirsagar, Sagar Bokan, Ninad Rathod",
    "journal": "Smartcom 2019, Bangkok, Thailand, 24-25",
    "year": 2019,
    "type": "Conference",
    "indexing": "International (Abroad)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at Smartcom 2019 (Bangkok, Thailand, 24-25)."
  },
  {
    "id": "pub-c-10",
    "title": "Scheduling of Scientific Workflows using Genetic Algorithm in Cloud Computing",
    "authors": "Priyanka Patil, Dipa Dharmadhikari, Smita Kasar",
    "journal": "International Conference on Smart Computer Applications and Innovations (ICSCAI 2018),, 21st - 22nd December, 2018",
    "year": 2018,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at International Conference on Smart Computer Applications and Innovations (ICSCAI 2018), (21st - 22nd December, 2018)."
  },
  {
    "id": "pub-c-11",
    "title": "Mineral Mapping and Lithological Discrimination using Remote Sensing in Indian Region: a Review",
    "authors": "Ranjana Waman Gore, Smita Kasar and Abhilasha Mishra",
    "journal": "IEEE International conference on Innovations in Engineering, Technology and Sciences (ICIETS 2018), NIEIT, Mysore, Sept 20-21, 2018",
    "year": 2018,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at IEEE International conference on Innovations in Engineering, Technology and Sciences (ICIETS 2018) (NIEIT, Mysore, Sept 20-21, 2018)."
  },
  {
    "id": "pub-c-12",
    "title": "Performance Enhancement for Detection of Myocardial Infarction from Multi-Lead ECG",
    "authors": "Smita Kasar, M.S.Joshi, Abhilasha Mishra, SB Mahajan, P Sanjeevikumar",
    "journal": "International Conference on Artificial Intelligence and Evolutionary Computations in Engineering Systems (ICAIECES-2017) conference proceedings in Artificial Intelligence and Evolutionary Computations in Engineering Systems, Springer DOI:10.1007/978-981-10-7868-2_66,, MITS (Madanapalle Institute of Technology and Science),  Madanapalle, Andhra Pradesh",
    "year": 2017,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at International Conference on Artificial Intelligence and Evolutionary Computations in Engineering Systems (ICAIECES-2017) conference proceedings in Artificial Intelligence and Evolutionary Computations in Engineering Systems, Springer DOI:10.1007/978-981-10-7868-2_66, (MITS (Madanapalle Institute of Technology and Science),  Madanapalle, Andhra Pradesh)."
  },
  {
    "id": "pub-c-13",
    "title": "Sentiment Analysis using Sentence Minimization with Natural Language Generation (NLG)",
    "authors": "Mayuri Likhar, Smita Kasar",
    "journal": "IEEE& CSI Sponsored First International Conference on Intelligent Systems and Information Management (ICISIM 2017), Aurangabad, Oct 5-6, 2017 DOI: 10.1109/ICISIM.2017.8122163, https://ieeexplore.ieee.org/document/8122163",
    "year": 2017,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at IEEE& CSI Sponsored First International Conference on Intelligent Systems and Information Management (ICISIM 2017) (Aurangabad, Oct 5-6, 2017 DOI: 10.1109/ICISIM.2017.8122163, https://ieeexplore.ieee.org/document/8122163)."
  },
  {
    "id": "pub-c-14",
    "title": "Comparative Analysis for Mining Multilevel Association Rules in Large Datasets",
    "authors": "Minal Vanarse, Smita Kasar",
    "journal": "Springer &CSI sponsored Second International Conference on Smart Trends for Information Technology and Computer Communications (SMARTCOM 2017),, Pune, August 18-19, 2017",
    "year": 2017,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at Springer &CSI sponsored Second International Conference on Smart Trends for Information Technology and Computer Communications (SMARTCOM 2017), (Pune, August 18-19, 2017)."
  },
  {
    "id": "pub-c-15",
    "title": "ECG Signal Processing: A Survey",
    "authors": "Smita Kasar, M.S.Joshi",
    "journal": "IJCA Proceedings on International Conference in Computational Intelligence (ICCIA 2012),, Sandip Institute of Technology and Research, Nasik, Maharashtra.",
    "year": 2012,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at IJCA Proceedings on International Conference in Computational Intelligence (ICCIA 2012), (Sandip Institute of Technology and Research, Nasik, Maharashtra.)."
  },
  {
    "id": "pub-c-16",
    "title": "Optimization of nonlinear programming problems using non-traditional method: genetic algorithms",
    "authors": "P.S.Revankar, Smita Kasar, Abbhilasha Mishra",
    "journal": "International Conference and Workshop on Emerging Trends in Technology, ICWET'10, Thakur College of Engg., Mumbai ,February 2010  http://dl.acm.org/citation.cfm?id=1742158",
    "year": 2010,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 8,
    "abstract": "Presented at International Conference and Workshop on Emerging Trends in Technology, ICWET'10 (Thakur College of Engg., Mumbai ,February 2010  http://dl.acm.org/citation.cfm?id=1742158)."
  },
  {
    "id": "pub-c-17",
    "title": "Hybrid Feature Extraction and Graph Network Based Explainable AI Model For Mental Well- Being Prediction",
    "authors": "Daivashala Rajeshwarrao Deshmukh, Dr. Smita Kasar",
    "journal": "6th IEEE International Conference on Mobile Computing and Sustainable Informatics (ICMCSI 2025), International Association for Science, Engineering, Research and Development (IASERD),  Purbanchal University, Nepal, January 7-8, 2025",
    "year": 2025,
    "type": "Conference",
    "indexing": "International\n(Within Country)",
    "isPublished": true,
    "citations": 3,
    "abstract": "Presented at 6th IEEE International Conference on Mobile Computing and Sustainable Informatics (ICMCSI 2025) (International Association for Science, Engineering, Research and Development (IASERD),  Purbanchal University, Nepal, January 7-8, 2025)."
  }
];

const initialAwards = [
  {
    "id": "awd-1",
    "title": "Sir M. Visvesvaraya Outstanding Engineer Award 2023",
    "issuer": "The Institution of Engineers (India), Aurangabad Local Centre",
    "year": "2023",
    "category": "National Honor",
    "description": "Conferred on 56th National Engineers Day (15th September 2023) for stellar contributions to Computer Science education, engineering research, and academic leadership.",
    "icon": "Trophy",
    "featured": true
  },
  {
    "id": "awd-2",
    "title": "Smart India Hackathon (SIH) 2023 - 1st Prize Winning Mentor",
    "issuer": "Ministry of Education, AICTE & Govt. of India",
    "year": "2023",
    "category": "National Innovation",
    "description": "Mentored Team \"Divine Devs\" who won the 1st Prize with a cash award of \u20b91,00,000 in the Senior Software Edition grand finale at Meerut (19-20 Dec 2023).",
    "icon": "Trophy",
    "featured": true
  },
  {
    "id": "awd-3",
    "title": "Marie Sk\u0142odowska-Curie COFUND SyMeCo Fellowship Reviewer 2023",
    "issuer": "Lero, The Science Foundation Ireland Research Centre for Software, Ireland",
    "year": "2023",
    "category": "International Academic Honor",
    "description": "Appointed as an international expert reviewer for prestigious postdoctoral fellowship research applications under European Union Horizon COFUND program.",
    "icon": "Trophy",
    "featured": true
  },
  {
    "id": "awd-4",
    "title": "Incharge Chairman & Member, Board of Studies (BoS) CSE",
    "issuer": "Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU)",
    "year": "2023 - Present",
    "category": "University Leadership",
    "description": "Appointed as Incharge Chairman of BoS in Computer Science and Engineering from 6 June 2025 and BoS PG Member since March 2023 to spearhead curriculum modernization.",
    "icon": "Trophy",
    "featured": true
  },
  {
    "id": "awd-5",
    "title": "Program Coordinator - NBA Accreditation Success (3 Academic Years)",
    "issuer": "National Board of Accreditation (NBA), New Delhi",
    "year": "2022 - 2025",
    "category": "Institutional Excellence",
    "description": "Steered the Department of Computer Science & Engineering at MIT to attain 3-year NBA Accreditation for AY 2022-23, 2023-24, and 2024-25.",
    "icon": "Trophy",
    "featured": false
  },
  {
    "id": "awd-6",
    "title": "Global Red Hat Academy Partner Presentation Recognition",
    "issuer": "Red Hat Inc. (North America Instructor Conference)",
    "year": "2020",
    "category": "Global Academic Keynote",
    "description": "Represented MIT Red Hat Academy in global partner presentations, highlighting open-source cloud and Linux education initiatives across India.",
    "icon": "Trophy",
    "featured": false
  },
  {
    "id": "awd-7",
    "title": "ACM-ICPC International Collegiate Programming Contest Coach",
    "issuer": "ACM & IIT Kanpur Regional Contest",
    "year": "2010, 2011, 2013, 2014",
    "category": "Competitive Programming Mentorship",
    "description": "Trained and coached multiple student teams representing the institution at the ACM ICPC Asia-Kanpur Regional Finals at IIT Kanpur.",
    "icon": "Trophy",
    "featured": false
  },
  {
    "id": "awd-8",
    "title": "Regional Technical Coordinator - Virtual Labs IIT Bombay",
    "issuer": "Indian Institute of Technology (IIT) Bombay / MHRD NMEICT",
    "year": "2017 - 2019",
    "category": "National Educational Mission",
    "description": "Led the deployment and faculty training of Virtual Laboratory experiments across engineering colleges in Marathwada region.",
    "icon": "Trophy",
    "featured": false
  }
];

const initialProjects = [
  {
    "id": "proj-1",
    "title": "Diskless Client Using Open-Source Tech for School Education",
    "role": "Principal Investigator (PI)",
    "fundingAgency": "Rajiv Gandhi Science & Technology Commission (RGSTC), Govt. of Maharashtra / Dr. BAMU",
    "amount": "\u20b93,80,000 (3.8 Lakhs)",
    "duration": "Nov 2022 - 2023",
    "status": "Completed",
    "description": "Engineered and deployed a low-cost, high-performance diskless Linux client computing lab for rural school education. Successfully installed at Zilla Parishad (ZP) School, Sudamwadi, Dist. Vaijapur, inaugurated by Dr. Pramod Yeole, Vice Chancellor of Dr. BAMU.",
    "domain": "Applied AI & Open-Source Linux"
  },
  {
    "id": "proj-2",
    "title": "UGC Minor Research Project during XII Plan",
    "role": "Principal Investigator (PI)",
    "fundingAgency": "University Grants Commission (UGC), New Delhi",
    "amount": "\u20b91,50,000 (1.5 Lakhs)",
    "duration": "XII Plan Period",
    "status": "Completed",
    "description": "Principal Investigator for research in intelligent optimization, non-linear programming, and genetic algorithmic modeling.",
    "domain": "Optimization & Genetic Algorithms"
  },
  {
    "id": "proj-3",
    "title": "Biomedical Waste Management Audit Tool Consultancy",
    "role": "Lead Software Architect & Consultant",
    "fundingAgency": "Hospitals across Mumbai & Pune (e.g., KEM Hospital Mumbai)",
    "amount": "\u20b940,000 + Ongoing AMC",
    "duration": "2018 - 2022",
    "status": "Completed",
    "description": "Consultancy project delivering audit software and Hepatitis B vaccination reminder systems for medical institutions including KEM Hospital, Mumbai (Copyright SW-12097/2019).",
    "domain": "Healthcare Informatics"
  },
  {
    "id": "proj-4",
    "title": "Institutional Web Portal for Government Dental College & Hospital",
    "role": "Lead Technical Consultant",
    "fundingAgency": "Government Dental College & Hospital, Chhatrapati Sambhajinagar",
    "amount": "\u20b975,000 Development + \u20b920,000/yr AMC",
    "duration": "2024 - Onwards",
    "status": "Ongoing",
    "description": "Designing, developing, hosting, and maintaining the dynamic institutional hospital portal and academic digital infrastructure.",
    "domain": "Web Architecture & Healthcare Systems"
  },
  {
    "id": "proj-5",
    "title": "Blockchain Research Project at University of Limerick, Ireland",
    "role": "Visiting Research Scholar / Collaborator",
    "fundingAgency": "Lero - The Science Foundation Ireland Research Centre for Software",
    "amount": "International Research Collaboration",
    "duration": "2021 - 2023",
    "status": "Completed",
    "description": "Research collaboration focusing on decentralized enterprise ecosystems, resulting in the SENSIBLE blockchain architecture.",
    "domain": "Blockchain & Cryptography"
  }
];

const initialWorkshops = [
  {
    "id": "ws-org-1",
    "title": "NewGenAI Hackathon in Collaboration with Findability Sciences",
    "role": "Chief Convener & Organizer",
    "type": "Hackathon",
    "date": "20 - 27 July 2024",
    "duration": "1 Week",
    "institution": "Department of CSE, MIT in association with Findability Sciences",
    "description": "Week-long hackathon for engineering students with live industrial problem statements, mentorship, cash prizes, and corporate internship offers."
  },
  {
    "id": "ws-org-2",
    "title": "5-Day STTP on Business Intelligence with Advanced Excel and PowerBI",
    "role": "Program Coordinator",
    "type": "STTP",
    "date": "13 - 17 February 2024",
    "duration": "5 Days",
    "institution": "Dept. of CSE, MIT in association with CloudThat Technologies Pvt. Ltd.",
    "description": "Hands-on training covering DAX queries, PowerBI dashboards, ETL pipelines, and corporate business analytics."
  },
  {
    "id": "ws-org-3",
    "title": "GenAI Hackathon & University of Tokyo International Delegation",
    "role": "Lead Organizer & Coordinator",
    "type": "International Exchange",
    "date": "5 August 2023 & 5 September 2023",
    "duration": "2 Days",
    "institution": "MIT Aurangabad with Findability Sciences & University of Tokyo",
    "description": "Organized students AI hackathon followed by high-level international academic exchange with visiting professors and scholars from the University of Tokyo."
  },
  {
    "id": "ws-org-4",
    "title": "AICTE ATAL Sponsored One-Week FDP on Cyber Security and Cyber Forensics",
    "role": "Chief Coordinator",
    "type": "Faculty Development Program",
    "date": "5 - 9 July 2021",
    "duration": "1 Week",
    "institution": "AICTE Training and Learning (ATAL) Academy & MIT",
    "description": "National-level faculty training program with government cyber crime experts, penetration testing demonstrations, and forensics labs."
  },
  {
    "id": "ws-org-5",
    "title": "STTP on Data Analytics in Collaboration with Deloitte Touche LLP",
    "role": "Organizer & Convener",
    "type": "Industry Workshop",
    "date": "16 - 21 August 2020",
    "duration": "1 Week",
    "institution": "Dept. of CSE, MIT with Deloitte Touche Tohmatsu India LLP",
    "description": "Executive data analytics practical workshop conducted by Deloitte industry leaders on enterprise Big Data engineering."
  },
  {
    "id": "ws-org-6",
    "title": "National Level Project Competition \"TECH-PRO\"",
    "role": "Chief Organizer",
    "type": "National Competition",
    "date": "June 2020",
    "duration": "3 Days",
    "institution": "In association with Institution of Engineers India, Red Hat & Findability Sciences",
    "description": "National engineering project competition receiving 250+ entries across Indian universities during COVID-19 pandemic."
  },
  {
    "id": "ws-org-7",
    "title": "1-Week STTP on Machine Learning and Deep Learning Techniques",
    "role": "Organizing Secretary",
    "type": "STTP",
    "date": "22 - 27 July 2019",
    "duration": "1 Week",
    "institution": "Maharashtra Institute of Technology, Aurangabad",
    "description": "Intensive theory and lab sessions covering CNNs, RNNs, backpropagation optimization, and computer vision."
  },
  {
    "id": "ws-org-8",
    "title": "6-Day STTP on Virtual Lab Development & Certification Program with IIT Bombay",
    "role": "Convener & Regional Coordinator",
    "type": "STTP",
    "date": "6 - 11 February 2019",
    "duration": "6 Days",
    "institution": "In coordination with Indian Institute of Technology (IIT) Bombay",
    "description": "Facilitated development and deployment of interactive virtual simulations for engineering education across Western India."
  },
  {
    "id": "ws-att-1",
    "title": "Empowering Academia: Integrating High-Performance Computing (HPC) in Education & Research",
    "role": "Participant / Faculty Attendee",
    "type": "National Workshop",
    "date": "6 January 2025",
    "duration": "1 Day",
    "institution": "IIIT Nagpur, Walchand College of Engg Sangli & National Supercomputing Mission, Govt of India",
    "description": "Advanced workshop on supercomputing architecture, MPI parallel programming, and GPU-accelerated computing."
  },
  {
    "id": "ws-att-2",
    "title": "3-Day FDP on Universal Human Values (UHV)",
    "role": "Participant / Faculty Attendee",
    "type": "FDP",
    "date": "8 - 10 October 2024",
    "duration": "3 Days",
    "institution": "AICTE NCC-IP",
    "description": "Fostering value-based engineering education and student mentoring."
  },
  {
    "id": "ws-att-3",
    "title": "2-Day National Level Workshop on Quantum Computing",
    "role": "Participant / Faculty Attendee",
    "type": "National Workshop",
    "date": "10 - 11 March 2023",
    "duration": "2 Days",
    "institution": "Dept. of CS & IT, Dr. Babasaheb Ambedkar Marathwada University",
    "description": "Exploration of Qiskit, quantum gates, superposition, and quantum cryptographic algorithms."
  },
  {
    "id": "ws-att-4",
    "title": "NPTEL Online Certification: NBA Accreditation and Teaching-Learning in Engineering (NATE)",
    "role": "Certified Faculty (Top Honors)",
    "type": "NPTEL Certification",
    "date": "Jan - April 2020",
    "duration": "12 Weeks",
    "institution": "NPTEL - IIT Kharagpur / IISc Bangalore",
    "description": "Comprehensive outcome-based education (OBE) course attainment and NBA criteria fulfillment."
  },
  {
    "id": "ws-att-5",
    "title": "Fundamentals of Deep Learning for Multiple Data Types",
    "role": "Certified Practitioner",
    "type": "NVIDIA DLI Certification",
    "date": "December 2018",
    "duration": "Online Intensive",
    "institution": "NVIDIA Deep Learning Institute (DLI)",
    "description": "Hands-on certification in training neural networks on multi-modal datasets using NVIDIA GPUs."
  },
  {
    "id": "ws-att-6",
    "title": "STTP on Remote Sensing and Digital Image Analysis",
    "role": "Certified Trainee",
    "type": "STTP",
    "date": "4 - 14 September 2018",
    "duration": "2 Weeks",
    "institution": "Indian Institute of Remote Sensing (IIRS - ISRO), Dehradun",
    "description": "Satellite imagery analysis, hyperspectral data processing, and geographical information systems (GIS)."
  },
  {
    "id": "ws-att-7",
    "title": "Stanford University Cryptography Certification",
    "role": "Online Learner",
    "type": "Stanford Certification",
    "date": "Nov - Dec 2017",
    "duration": "1 Month",
    "institution": "Stanford Online (Prof. Dan Boneh)",
    "description": "Rigorous mathematical foundations of symmetric/asymmetric cryptography, block ciphers, and zero-knowledge proofs."
  },
  {
    "id": "talk-1",
    "title": "AI: Impact on Manufacturing Industry",
    "role": "Keynote Speaker",
    "type": "Industry Keynote",
    "date": "10 February 2025",
    "duration": "Keynote",
    "institution": "Marathwada Auto Cluster (MAC), Chhatrapati Sambhajinagar",
    "description": "Delivered expert keynote session on artificial intelligence applications and automation paradigms for the manufacturing sector."
  },
  {
    "id": "talk-2",
    "title": "AI Insights: Applications and Benefits for MSMEs",
    "role": "Keynote Speaker",
    "type": "Industry Keynote",
    "date": "1 September 2024",
    "duration": "Keynote",
    "institution": "Laghu Udyog Bharati, Jalna",
    "description": "Keynote address to industrial leaders and entrepreneurs on adopting AI for operational productivity."
  },
  {
    "id": "talk-3",
    "title": "Backpropagation Learning Algorithm & Neural Optimization",
    "role": "Resource Person",
    "type": "Doctoral Coursework",
    "date": "20 April 2024",
    "duration": "Coursework Session",
    "institution": "Dr. Babasaheb Ambedkar Marathwada University",
    "description": "Delivered session as resource person in Online Pre-PhD Coursework on neural network backpropagation and calculus optimizations."
  },
  {
    "id": "talk-4",
    "title": "Computational Tools for Statistics & Research",
    "role": "Resource Person",
    "type": "Faculty Training",
    "date": "2 - 6 January 2024",
    "duration": "1 Week STTP",
    "institution": "Government College of Pharmacy, Chhatrapati Sambhajinagar",
    "description": "Taught computational statistical packages and algorithmic analysis methods for academic researchers."
  },
  {
    "id": "talk-5",
    "title": "Advanced Probability in Data Science & Machine Learning (2 Sessions)",
    "role": "Resource Person",
    "type": "UGC Refresher Course",
    "date": "26 October 2023",
    "duration": "2 Sessions",
    "institution": "UGC-Malaviya Mission Teacher Training Centre, Dr. BAMU",
    "description": "Delivered two specialized sessions to university and college faculty on probabilistic modeling and stochastic processes."
  }
];

const initialGallery = [
  {
    id: "gal-1",
    title: "Sir M. Visvesvaraya Outstanding Engineer Award Felicitation",
    category: "Awards",
    imageUrl: "/gallery-award.jpg",
    description: "Felicitation ceremony by The Institution of Engineers (India), Aurangabad Local Centre on 56th National Engineers Day 2023.",
    featured: true
  },
  {
    id: "gal-2",
    title: "Smart India Hackathon 2023 1st Prize Winner",
    category: "Mentorship",
    imageUrl: "/gallery-sih.jpg",
    description: "Guiding Team Divine Devs to the 1st Prize of Rs. 1,00,000 at the Grand Finale held in Meerut.",
    featured: true
  },
  {
    id: "gal-3",
    title: "Inauguration of Diskless Linux Computing Lab at ZP School",
    category: "Community Outreach",
    imageUrl: "/gallery-lab.jpg",
    description: "RGSTC funded diskless lab inaugurated by Dr. Pramod Yeole, Hon'ble Vice Chancellor of Dr. BAMU at Sudamwadi.",
    featured: true
  },
  {
    id: "gal-4",
    title: "GenAI Hackathon with Findability Sciences & University of Tokyo Delegation",
    category: "International",
    imageUrl: "/gallery-hackathon.jpg",
    description: "International academic interaction between students, MIT faculty, and visiting professors from the University of Tokyo.",
    featured: true
  },
  {
    id: "gal-5",
    title: "AICTE ATAL Faculty Development Program on Cyber Security",
    category: "Workshops",
    imageUrl: "/gallery-fdp.jpg",
    description: "Leading national faculty development on advanced cyber forensics and threat intelligence.",
    featured: false
  }
];

const initialMessages = [];

const initialTests = [
  {
    id: "test-ai-ml-2025",
    title: "Machine Learning & Neural Networks Mid-Term Assessment",
    subject: "Artificial Intelligence & Machine Learning",
    duration: 30,
    totalMarks: 20,
    passingMarks: 12,
    isScheduled: true,
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date(Date.now() + 86400000 * 7).toISOString(),
    targetClass: "BE CSE / Final Year",
    description: "Timed assessment on backpropagation algorithms, decision tree heuristics, bias-variance tradeoff, and neural network optimization.",
    questions: [
      {
        id: "q1",
        question: "In the Backpropagation learning algorithm, how is the weight update computed across layers?",
        options: [
          "Using the gradient of the loss function with respect to weights via the chain rule",
          "By random parameter assignment at each forward iteration",
          "By strictly calculating the inverse matrix of the activation outputs",
          "Using genetic cross-over without partial derivatives"
        ],
        correctAnswer: 0,
        explanation: "Backpropagation applies the calculus chain rule to calculate the partial derivative (gradient) of the error function with respect to each network weight.",
        marks: 5
      },
      {
        id: "q2",
        question: "Which classification metric is most suitable for highly imbalanced healthcare diagnostic datasets?",
        options: [
          "Raw Accuracy",
          "F1-Score and Area Under the ROC Curve (AUC-ROC)",
          "Mean Squared Error (MSE)",
          "R-Squared Metric"
        ],
        correctAnswer: 1,
        explanation: "In medical diagnosis (e.g. ECG myocardial infarction detection), positive cases are rare; hence F1-Score (harmonic mean of precision and recall) and AUC-ROC give reliable evaluations.",
        marks: 5
      },
      {
        id: "q3",
        question: "What is the primary benefit of Finch Hunt Optimization when combined with BiLSTM for cardiac arrhythmia classification?",
        options: [
          "It eliminates the need for any training dataset",
          "It optimizes hyperparameter tuning and feature selection for improved convergence speed",
          "It converts all sequential ECG time series data into static images",
          "It restricts the network to only forward passes without backward recurrence"
        ],
        correctAnswer: 1,
        explanation: "Metaheuristic optimization algorithms like Finch Hunt optimize BiLSTM hyperparameters and weights to escape local minima and boost detection accuracy.",
        marks: 5
      },
      {
        id: "q4",
        question: "In decentralized EHR healthcare data sharing, what role does InterPlanetary File System (IPFS) play alongside Blockchain?",
        options: [
          "IPFS performs encryption key generation exclusively",
          "IPFS provides off-chain distributed storage for high-volume imaging/signals, while Blockchain maintains tamper-evident hashes and access control",
          "IPFS replaces the consensus mechanism in Ethereum",
          "IPFS is used only for text messaging between clinicians"
        ],
        correctAnswer: 1,
        explanation: "Storing large medical scans and ECG files directly on-chain is prohibitively expensive; IPFS stores the encrypted payload off-chain and the cryptographic hash is anchored on the blockchain.",
        marks: 5
      }
    ]
  }
];

const initialArticles = [
  {
    id: "art-1",
    title: "Unit 1: Machine Learning & Backpropagation Gradient Descent Optimization Notes",
    slug: "unit-1-backpropagation-optimization-notes",
    author: "Dr. Smita Lalit Kasar",
    category: "Lecture Notes & Material",
    date: "2025-01-15",
    tags: ["Machine Learning", "Backpropagation", "Gradient Descent", "Neural Networks"],
    content: `COURSE: ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (BE CSE)
INSTRUCTOR: Dr. Smita Lalit Kasar, Professor & Head of Department, CSE

1. MATHEMATICAL FOUNDATION OF BACKPROPAGATION:
Backpropagation operates by evaluating the partial derivatives of the cost function with respect to every weight in a multi-layered perceptron via the chain rule of calculus.

Let the total error E_total = sum( 1/2 * (target_k - output_k)^2 )
For an output neuron k with sigmoid activation:
d(E_total) / d(w_jk) = [ d(E_total)/d(out_k) ] * [ d(out_k)/d(net_k) ] * [ d(net_k)/d(w_jk) ]
where:
* d(E_total)/d(out_k) = -(target_k - out_k)
* d(out_k)/d(net_k) = out_k * (1 - out_k)
* d(net_k)/d(w_jk) = out_j

2. OPTIMIZATION STRATEGIES:
* Stochastic Gradient Descent (SGD) with momentum to escape saddle points
* Adam Optimizer (Adaptive Moment Estimation) maintaining exponential moving averages of gradients
* Learning rate scheduling (decay algorithms) to ensure convex convergence

3. REVIEW QUESTIONS FOR STUDENTS:
1. Derive the backpropagation weight update equation for the hidden layer.
2. Explain the vanishing gradient problem with Sigmoid vs ReLU activation.
3. Compare L1 and L2 regularization effects on model weights.`,
    isPublished: true,
    viewsCount: 620
  },
  {
    id: "art-2",
    title: "Unit 2: Blockchain Architecture, Consensus Algorithms & Healthcare EHR Handouts",
    slug: "unit-2-blockchain-ehr-handouts",
    author: "Dr. Smita Lalit Kasar",
    category: "Lecture Notes & Material",
    date: "2024-11-20",
    tags: ["Blockchain", "Consensus", "Smart Contracts", "EHR Privacy"],
    content: `COURSE: ADVANCED BLOCKCHAIN SYSTEMS & SECURITY
INSTRUCTOR: Dr. Smita Lalit Kasar, Professor & Head, CSE

1. SENSIBLE ARCHITECTURE & DECENTRALIZED DATA STORAGE:
In healthcare informatics, storing massive MRI scans and ECG waveforms directly on-chain creates extreme scalability bottlenecks.

Architecture Blueprint:
* Off-Chain Layer: InterPlanetary File System (IPFS) stores AES-256 encrypted health dossiers.
* On-Chain Layer: Smart contracts on Ethereum/Hyperledger anchor immutable cryptographic hashes (CID) and evaluate access authorization policies.
* Attribute-Based Encryption (ABE): Only clinicians with certified verifiable credentials (e.g., Cardiology Dept, Valid License) can decrypt patient files.

2. CONSENSUS PROTOCOL COMPARISON:
* Proof of Work (PoW): High energy consumption, high Byzantine fault tolerance (50%).
* Proof of Stake (PoS): Energy-efficient validator selection based on economic stake.
* Practical Byzantine Fault Tolerance (PBFT): High throughput, deterministic finality, ideal for consortium permissioned hospital networks.

3. LAB ASSIGNMENT:
Deploy a Solidity smart contract that logs patient consent access requests with events and timestamp verification.`,
    isPublished: true,
    viewsCount: 485
  },
  {
    id: "art-3",
    title: "Unit 3: Biomedical ECG Signal Processing & Wavelet Transform Lab Manual",
    slug: "unit-3-ecg-signal-processing-manual",
    author: "Dr. Smita Lalit Kasar",
    category: "Lecture Notes & Material",
    date: "2024-09-10",
    tags: ["Signal Processing", "ECG Analysis", "Wavelets", "Arrhythmia"],
    content: `COURSE: MEDICAL SIGNAL & IMAGE PROCESSING
INSTRUCTOR: Dr. Smita Lalit Kasar

1. NOISE REMOVAL IN MULTI-LEAD ECG:
Raw electrocardiogram signals are susceptible to power-line interference (50/60 Hz), baseline wander due to patient respiration (0.15 - 0.5 Hz), and electromyographic (EMG) muscle noise.

Filtering Methods:
* Digital Notch Filter at 50 Hz with sharp Q-factor
* Discrete Wavelet Transform (DWT) using Daubechies (db4/db6) wavelets for multi-resolution sub-band decomposition
* Median filtering for baseline wander subtraction without distorting ST-segments

2. QRS COMPLEX DETECTION & FEATURE EXTRACTION:
* Pan-Tompkins Algorithm: Bandpass filtering, derivative filter, squaring function, moving window integration.
* QRS Point Score: Quantitative scoring of pathological Q-waves, R-wave duration, and S-wave amplitude for Myocardial Infarction diagnosis.

3. PYTHON LAB CODE SNIPPET:
Import scipy.signal and perform bandpass filtering on MIT-BIH Arrhythmia database records.`,
    isPublished: true,
    viewsCount: 540
  },
  {
    id: "art-4",
    title: "Department Notice: University Examination Schedule & Project Review Guidelines",
    slug: "notice-university-exam-project-guidelines",
    author: "Dr. Smita Lalit Kasar, HOD CSE",
    category: "Academic Notice",
    date: "2025-02-01",
    tags: ["Exam Schedule", "Capstone Project", "BE CSE", "Deadlines"],
    content: `DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
MAHARASHTRA INSTITUTE OF TECHNOLOGY (MIT)

ATTENTION: ALL BE CSE & TE CSE STUDENTS

1. Capstone Major Project Stage-II interim reviews will be conducted from 15th March 2025 onwards.
2. Every project group must present:
   - Live prototype execution / Code repository on GitHub
   - IEEE formatted research paper draft
   - Plagiarism report (Similarity index must be < 15%)
3. Mid-Term Assessments and Remedial classes schedule has been uploaded to the student portal.

For inquiries, contact the CSE Department Examination Committee.`,
    isPublished: true,
    viewsCount: 710
  }
];

module.exports = {
  initialProfile,
  initialEducation,
  initialExperience,
  initialResearchAreas,
  initialPublications,
  initialAwards,
  initialProjects,
  initialWorkshops,
  initialGallery,
  initialMessages,
  initialTests,
  initialArticles
};

