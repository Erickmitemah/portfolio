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

const projects = {
  'sports-analytics': {
    title: 'Sports Analytics',
    summary: 'Machine learning models for player performance, match outcome prediction, and tactical insights using real-world datasets.',
    category: 'Data Science · Analytics',
    role: 'Model development, data visualization, performance reporting',
    tech: 'Python · Scikit-learn · Pandas',
    screenshot: 'screenshot-sports-analytics.png',
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
    screenshot: 'screenshot-network-intrusion.png',
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
    screenshot: 'screenshot-ml-research.png',
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
