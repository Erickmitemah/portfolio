(function() {
  const profileImg = document.getElementById('profileImage');

  if (profileImg) {
    profileImg.addEventListener('error', function() {
      profileImg.style.display = 'none';
    });

    profileImg.addEventListener('load', function() {
      profileImg.style.display = 'block';
    });
  }

  console.log('Portfolio ready — Erick Mitemah');
})();