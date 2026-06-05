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
      }
    });

    profileImg.addEventListener('load', function() {
      profileImg.style.display = 'block';
      if (uploadHint) {
        uploadHint.textContent = '✔️ Photo preview';
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

  console.log('Portfolio ready — Erick Mitemah');
})();