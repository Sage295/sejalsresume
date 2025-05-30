const header = document.getElementById("header");

if (header) {
  let musicToggled = false;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide or show header
    if (scrollTop === 0) {
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
    } else {
      header.style.transform = "translateY(-100%)";
      header.style.opacity = "0";
    }

    // Toggle mute only once on first scroll
    if (!musicToggled) {
      bgMusic.muted = !bgMusic.muted;

      if (bgMusic.muted) {
        muteIcon.classList.remove('fa-volume-high');
        muteIcon.classList.add('fa-volume-off');
      } else {
        muteIcon.classList.remove('fa-volume-off');
        muteIcon.classList.add('fa-volume-high');
      }

      musicToggled = true; // Prevent repeat toggles
    }
  });
}
