(function() {
  const profileImg = document.getElementById('profileImage');

  const uploadInput = document.getElementById('photoUpload');
  const uploadHint = document.getElementById('uploadHint');
  let currentObjectUrl = null;

  if (profileImg) {
    profileImg.addEventListener('error', function() {
      profileImg.style.display = 'none';
      if (uploadHint) {
        uploadHint.textContent = '📷 Choose a photo to preview';
        uploadHint.style.display = 'block';
      }
    });

    profileImg.addEventListener('load', function() {
      profileImg.style.display = 'block';
      if (uploadHint) {
        uploadHint.style.display = 'none';
      }
    });
  }

  if (uploadInput && profileImg) {
    uploadInput.addEventListener('change', function(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) {
        return;
      }

      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }

      currentObjectUrl = URL.createObjectURL(file);
      profileImg.src = currentObjectUrl;
      profileImg.style.display = 'block';
    });
  }

  // Local fallback data (used when the API is unavailable)
  const localProjects = {
    'sports-analytics': {
      title: 'Sports Analytics',
      summary: 'Machine learning models for player performance, match outcome prediction, and tactical insights using real-world datasets.',
      category: 'Data Science · Analytics',
      role: 'Model development, data visualization, performance reporting',
      tech: 'Python · Scikit-learn · Pandas',
      screenshot: 'screenshot-sports-analytics.svg',
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
      screenshot: 'screenshot-network-intrusion.svg',
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
      screenshot: 'screenshot-ml-research.svg',
      records: [
        'Prototyped a browser-based image recognition demo.',
        'Documented findings in an interactive research report.',
        'Validated model behavior on safety-critical datasets.'
      ]
    }
  };

  function renderProjectDetail() {
    const projectDetail = document.querySelector('.project-detail');
    if (!projectDetail) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const projectKey = params.get('project');
    // Try fetching project data from the API, fallback to local data if the request fails
    async function loadAndRender() {
      let projectData = null;
      if (projectKey) {
        try {
          const res = await fetch(`/api/projects/${encodeURIComponent(projectKey)}`);
          if (res.ok) {
            projectData = await res.json();
          }
        } catch (err) {
          console.warn('API request failed, using local data', err);
        }
      }

      if (!projectData) {
        projectData = localProjects[projectKey];
      }

      applyProjectData(projectData);
    }

    function applyProjectData(projectData) {

    const titleElement = document.getElementById('projectTitle');
    const summaryElement = document.getElementById('projectSummary');
    const categoryElement = document.getElementById('projectCategory');
    const roleElement = document.getElementById('projectRole');
    const techElement = document.getElementById('projectTech');
    const recordsElement = document.getElementById('projectRecords');
    const screenshotImage = document.getElementById('projectScreenshot');
    const screenshotPlaceholder = document.getElementById('screenshotPlaceholder');

    if (!projectData) {
      titleElement.textContent = 'Project not found';
      summaryElement.textContent = 'Please return to the portfolio and choose a valid project to view its details.';
      categoryElement.textContent = '';
      roleElement.textContent = '';
      techElement.textContent = '';
      recordsElement.innerHTML = '<li>Invalid project selection.</li>';
      screenshotImage.style.display = 'none';
      screenshotPlaceholder.textContent = 'No screenshot available.';
      screenshotPlaceholder.style.display = 'block';
      return;
    }
    titleElement.textContent = projectData.title;
    summaryElement.textContent = projectData.summary;
    categoryElement.textContent = projectData.category;
    roleElement.textContent = projectData.role;
    techElement.textContent = projectData.tech;
    recordsElement.innerHTML = projectData.records.map(item => `<li>${item}</li>`).join('');

    if (projectData.screenshot) {
      screenshotImage.src = projectData.screenshot;
      screenshotImage.alt = `${projectData.title} screenshot`;
      screenshotImage.style.display = 'block';
      screenshotPlaceholder.style.display = 'none';
    } else {
      screenshotImage.style.display = 'none';
      screenshotPlaceholder.style.display = 'block';
    }
  }

    loadAndRender();
  }

  renderProjectDetail();

  // Contact form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const statusEl = document.getElementById('contactStatus');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!message) {
        if (statusEl) statusEl.textContent = 'Please enter a message.';
        return;
      }

      if (statusEl) {
        statusEl.textContent = 'Sending…';
      }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        if (res.ok) {
          if (statusEl) statusEl.textContent = 'Message sent — thanks!';
          contactForm.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          if (statusEl) statusEl.textContent = data.error || 'Failed to send message.';
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = 'Network error — try again later.';
      }
    });
  }

  console.log('Portfolio ready — Erick Mitemah');
})();