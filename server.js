const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// Serve portfolio.html at root for convenience
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});

const projects = {
  'sports-analytics': {
    title: 'Sports Analytics',
    summary: 'Machine learning models for player performance, match outcome prediction, and tactical insights using real-world datasets.',
    category: 'Data Science · Analytics',
    role: 'Model development, data visualization, performance reporting',
    tech: 'Python · Scikit-learn · Pandas',
    screenshotHtml: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="project-screenshot-svg"><rect width="800" height="500" rx="40" fill="#081223" /><rect x="60" y="80" width="240" height="160" rx="24" fill="#152a4b" stroke="#74d6ff" stroke-width="5" /><rect x="340" y="60" width="380" height="110" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" /><rect x="340" y="190" width="240" height="160" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" /><rect x="340" y="370" width="380" height="80" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" /><path d="M100 240 L190 170 L270 210 L360 140 L450 190" fill="none" stroke="#74d6ff" stroke-width="14" stroke-linecap="round"/><circle cx="100" cy="240" r="14" fill="#74d6ff" /><circle cx="190" cy="170" r="14" fill="#74d6ff" /><circle cx="270" cy="210" r="14" fill="#74d6ff" /><circle cx="360" cy="140" r="14" fill="#74d6ff" /><circle cx="450" cy="190" r="14" fill="#74d6ff" /></svg>`,
    records: [
      'Built a performance dashboard for team scouts and coaches.',
      'Improved prediction accuracy by 18% using feature engineering.',
      'Automated match summary reports for stakeholder review.'
    ]
  },
  'network-intrusion': {
    title: 'Network Intrusion System',
    summary: 'Anomaly detection and intrusion prevention using supervised and unsupervised learning on network traffic data.',
    category: 'Cybersecurity · Threat Detection',
    role: 'Threat modeling, signal processing, model deployment',
    tech: 'Python · TensorFlow · Scikit-learn',
    screenshotHtml: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="project-screenshot-svg"><rect width="800" height="500" rx="40" fill="#081223" /><rect x="80" y="90" width="220" height="120" rx="20" fill="#152a4b" stroke="#74d6ff" stroke-width="5" /><rect x="320" y="90" width="220" height="120" rx="20" fill="#152a4b" stroke="#74d6ff" stroke-width="5" /><rect x="560" y="90" width="140" height="120" rx="20" fill="#152a4b" stroke="#74d6ff" stroke-width="5" /><rect x="160" y="280" width="480" height="160" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" /><path d="M200 150 C240 80 320 80 360 150" fill="none" stroke="#74d6ff" stroke-width="8"/><path d="M440 150 C480 80 560 80 600 150" fill="none" stroke="#74d6ff" stroke-width="8"/><circle cx="300" cy="130" r="18" fill="#74d6ff" /><circle cx="500" cy="130" r="18" fill="#74d6ff" /><line x1="240" y1="340" x2="560" y2="340" stroke="#74d6ff" stroke-width="10" stroke-linecap="round" /><circle cx="320" cy="340" r="16" fill="#74d6ff" /><circle cx="440" cy="340" r="16" fill="#74d6ff" /><circle cx="560" cy="340" r="16" fill="#74d6ff" /></svg>`,
    records: [
      'Detected suspicious traffic patterns with over 92% precision.',
      'Delivered a real-time dashboard for security operations.',
      'Reduced false alarms by refining anomaly scoring logic.'
    ]
  },
  'ml-research': {
    title: 'ML Research',
    summary: 'Exploring deep learning architectures for image recognition and natural language processing in security contexts.',
    category: 'Research · Prototyping',
    role: 'Experiment design, model evaluation, research documentation',
    tech: 'HTML · JavaScript · TensorFlow.js',
    screenshotHtml: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="project-screenshot-svg"><rect width="800" height="500" rx="40" fill="#081223" /><circle cx="220" cy="250" r="90" fill="#163450" stroke="#74d6ff" stroke-width="6" /><circle cx="580" cy="180" r="70" fill="#163450" stroke="#74d6ff" stroke-width="6" /><circle cx="520" cy="340" r="60" fill="#163450" stroke="#74d6ff" stroke-width="6" /><line x1="280" y1="250" x2="520" y2="180" stroke="#74d6ff" stroke-width="10" /><line x1="320" y1="300" x2="520" y2="340" stroke="#74d6ff" stroke-width="10" /><line x1="520" y1="180" x2="520" y2="280" stroke="#74d6ff" stroke-width="10" /><path d="M200 95 C260 40 340 40 400 95" fill="none" stroke="#74d6ff" stroke-width="8"/><path d="M420 95 C480 40 560 40 620 95" fill="none" stroke="#74d6ff" stroke-width="8"/></svg>`,
    records: [
      'Prototyped a browser-based image recognition demo.',
      'Documented findings in an interactive research report.',
      'Validated model behavior on safety-critical datasets.'
    ]
  }
};

app.get('/api/projects', (req, res) => {
  const list = Object.keys(projects).map(key => ({ key, ...projects[key] }));
  res.json(list);
});

app.get('/api/projects/:key', (req, res) => {
  const key = req.params.key;
  const project = projects[key];
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// Simple contact endpoint that appends messages to contacts.json
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const outPath = path.join(__dirname, 'contacts.json');
  let existing = [];
  try {
    if (fs.existsSync(outPath)) {
      existing = JSON.parse(fs.readFileSync(outPath, 'utf8')) || [];
    }
  } catch (err) {
    console.error('Failed reading contacts.json', err);
  }

  existing.push({ name: name || null, email: email || null, message, date: new Date().toISOString() });
  try {
    fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Failed writing contacts.json', err);
    return res.status(500).json({ error: 'Failed to save message' });
  }

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Fallback 404 for unknown routes
app.use((req, res) => {
  res.status(404).send('Not found');
});
