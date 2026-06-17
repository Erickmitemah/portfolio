(function() {
  const profileImg = document.getElementById('profileImage');

  const uploadInput = document.getElementById('photoUpload');
  const uploadHint = document.getElementById('uploadHint');
  const photoUrlInput = document.getElementById('photoUrlInput');
  const photoUrlButton = document.getElementById('photoUrlButton');
  const clearPhotoButton = document.getElementById('clearPhotoButton');
  let currentObjectUrl = null;

  function saveProfilePhoto(src) {
    if (typeof src === 'string') {
      localStorage.setItem('profilePhoto', src);
    }
  }

  function clearProfilePhoto() {
    localStorage.removeItem('profilePhoto');
    if (profileImg) {
      profileImg.src = 'your-photo.svg';
      profileImg.style.display = 'block';
    }
    if (uploadHint) {
      uploadHint.textContent = '📷 Upload your photo here';
      uploadHint.style.display = 'block';
    }
  }

  function setProfilePhoto(src, persist = true) {
    if (!profileImg) return;
    profileImg.src = src;
    profileImg.style.display = 'block';
    if (uploadHint) uploadHint.style.display = 'none';
    if (persist) saveProfilePhoto(src);
  }

  function loadSavedProfilePhoto() {
    const saved = localStorage.getItem('profilePhoto');
    if (saved && profileImg) {
      profileImg.src = saved;
      profileImg.style.display = 'block';
      if (uploadHint) uploadHint.style.display = 'none';
    }
  }

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

      const reader = new FileReader();
      reader.onload = function(loadEvent) {
        const dataUrl = loadEvent.target.result;
        setProfilePhoto(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  }

  if (photoUrlButton && photoUrlInput) {
    photoUrlButton.addEventListener('click', function() {
      const url = photoUrlInput.value.trim();
      if (!url) {
        return;
      }
      setProfilePhoto(url);
    });
  }

  if (clearPhotoButton) {
    clearPhotoButton.addEventListener('click', function() {
      clearProfilePhoto();
      if (photoUrlInput) photoUrlInput.value = '';
    });
  }

  loadSavedProfilePhoto();

  // Local fallback data (used when the API is unavailable)
  const localProjects = {
    'sports-analytics': {
      title: 'Sports Analytics',
      summary: 'Machine learning models for player performance, match outcome prediction, and tactical insights using real-world datasets.',
      category: 'Data Science · Analytics',
      role: 'Model development, data visualization, performance reporting',
      tech: 'Python · Scikit-learn · Pandas',
      screenshotHtml: `
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="project-screenshot-svg">
          <rect width="800" height="500" rx="40" fill="#081223" />
          <rect x="60" y="80" width="240" height="160" rx="24" fill="#152a4b" stroke="#74d6ff" stroke-width="5" />
          <rect x="340" y="60" width="380" height="110" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" />
          <rect x="340" y="190" width="240" height="160" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" />
          <rect x="340" y="370" width="380" height="80" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" />
          <path d="M100 240 L190 170 L270 210 L360 140 L450 190" fill="none" stroke="#74d6ff" stroke-width="14" stroke-linecap="round"/>
          <circle cx="100" cy="240" r="14" fill="#74d6ff" />
          <circle cx="190" cy="170" r="14" fill="#74d6ff" />
          <circle cx="270" cy="210" r="14" fill="#74d6ff" />
          <circle cx="360" cy="140" r="14" fill="#74d6ff" />
          <circle cx="450" cy="190" r="14" fill="#74d6ff" />
        </svg>
      `,
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
      screenshotHtml: `
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="project-screenshot-svg">
          <rect width="800" height="500" rx="40" fill="#081223" />
          <rect x="80" y="90" width="220" height="120" rx="20" fill="#152a4b" stroke="#74d6ff" stroke-width="5" />
          <rect x="320" y="90" width="220" height="120" rx="20" fill="#152a4b" stroke="#74d6ff" stroke-width="5" />
          <rect x="560" y="90" width="140" height="120" rx="20" fill="#152a4b" stroke="#74d6ff" stroke-width="5" />
          <rect x="160" y="280" width="480" height="160" rx="24" fill="#163450" stroke="#74d6ff" stroke-width="5" />
          <path d="M200 150 C240 80 320 80 360 150" fill="none" stroke="#74d6ff" stroke-width="8"/>
          <path d="M440 150 C480 80 560 80 600 150" fill="none" stroke="#74d6ff" stroke-width="8"/>
          <circle cx="300" cy="130" r="18" fill="#74d6ff" />
          <circle cx="500" cy="130" r="18" fill="#74d6ff" />
          <line x1="240" y1="340" x2="560" y2="340" stroke="#74d6ff" stroke-width="10" stroke-linecap="round" />
          <circle cx="320" cy="340" r="16" fill="#74d6ff" />
          <circle cx="440" cy="340" r="16" fill="#74d6ff" />
          <circle cx="560" cy="340" r="16" fill="#74d6ff" />
        </svg>
      `,
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
      screenshotHtml: `
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="project-screenshot-svg">
          <rect width="800" height="500" rx="40" fill="#081223" />
          <circle cx="220" cy="250" r="90" fill="#163450" stroke="#74d6ff" stroke-width="6" />
          <circle cx="580" cy="180" r="70" fill="#163450" stroke="#74d6ff" stroke-width="6" />
          <circle cx="520" cy="340" r="60" fill="#163450" stroke="#74d6ff" stroke-width="6" />
          <line x1="280" y1="250" x2="520" y2="180" stroke="#74d6ff" stroke-width="10" />
          <line x1="320" y1="300" x2="520" y2="340" stroke="#74d6ff" stroke-width="10" />
          <line x1="520" y1="180" x2="520" y2="280" stroke="#74d6ff" stroke-width="10" />
          <path d="M200 95 C260 40 340 40 400 95" fill="none" stroke="#74d6ff" stroke-width="8"/>
          <path d="M420 95 C480 40 560 40 620 95" fill="none" stroke="#74d6ff" stroke-width="8"/>
        </svg>
      `,
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
      const screenshotElement = document.getElementById('projectScreenshot');
      const screenshotPlaceholder = document.getElementById('screenshotPlaceholder');

      if (!projectData) {
        titleElement.textContent = 'Project not found';
        summaryElement.textContent = 'Please return to the portfolio and choose a valid project to view its details.';
        categoryElement.textContent = '';
        roleElement.textContent = '';
        techElement.textContent = '';
        recordsElement.innerHTML = '<li>Invalid project selection.</li>';
        if (screenshotElement) screenshotElement.style.display = 'none';
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

      if (projectData.screenshotHtml) {
        screenshotElement.innerHTML = projectData.screenshotHtml;
        screenshotElement.style.display = 'block';
        screenshotPlaceholder.style.display = 'none';
      } else {
        screenshotElement.innerHTML = '';
        screenshotElement.style.display = 'none';
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