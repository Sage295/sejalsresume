  window.onload = function () {
    // Typing effect
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.isDeleting = false;
      this.tick();
    };

    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      this.txt = this.isDeleting
        ? fullTxt.substring(0, this.txt.length - 1)
        : fullTxt.substring(0, this.txt.length + 1);

      if (this.el.querySelector('.wrap')) {
        this.el.querySelector('.wrap').textContent = this.txt;
      }

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) delta /= 2;

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };

    // Start typing effect
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }

    document.querySelectorAll(".toggle-button, .toggle-button2").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".project-card-left");
        const details = card.querySelector(".project-details");

        // Toggle visibility only for this card
        details.classList.toggle("hidden");
      });
    });

    // Scroll listener for header
    const header = document.getElementById("header");

    if (header) {
      window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop === 0) {
          header.style.transform = "translateY(0)";
          header.style.opacity = "1";
        } else {
          header.style.transform = "translateY(-100%)";
          header.style.opacity = "0";
        }
      });
    }
  };
//MUSIC!!
document.addEventListener('DOMContentLoaded', function() {
    // Get audio element and mute button
    const bgMusic = document.getElementById('bg-music');
    const muteButton = document.getElementById('mute-button');
    const muteIcon = document.getElementById('mute-icon');
    
    // Initialize audio settings
    bgMusic.volume = 0.5; // Set default volume to 50%
    bgMusic.muted = true; // Start muted by default
    
    // Update icon to reflect initial muted state
    updateMuteIcon();
    
    // Try to play audio (muted) when page loads
    bgMusic.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });
    
    // Mute/unmute toggle functionality
    muteButton.addEventListener('click', function() {
        // Toggle mute state
        bgMusic.muted = !bgMusic.muted;
        
        // Update icon
        updateMuteIcon();
        
        // If unmuting and audio isn't playing, try to play
        if (!bgMusic.muted && bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log("Playback failed:", error);
                // If playback fails, revert to muted state
                bgMusic.muted = true;
                updateMuteIcon();
            });
        }
    });
    
    // Function to update mute icon based on current state
    function updateMuteIcon() {
        if (bgMusic.muted) {
            muteIcon.classList.remove('fa-volume-high');
            muteIcon.classList.add('fa-volume-off');
            muteIcon.style.color = "#9DC08B"; // Your preferred color
        } else {
            muteIcon.classList.remove('fa-volume-off');
            muteIcon.classList.add('fa-volume-high');
            muteIcon.style.color = "#9DC08B"; // Your preferred color
        }
    }
    
    // Error handling
    bgMusic.addEventListener('error', function() {
        console.error("Audio error:", bgMusic.error);
        muteIcon.classList.remove('fa-volume-high', 'fa-volume-off');
        muteIcon.classList.add('fa-triangle-exclamation');
        muteIcon.style.color = "#ff0000"; // Red for error
    });
    
    // Alternative: Start music on first user interaction with page
    document.addEventListener('click', function initMusic() {
        // Only run this once
        document.removeEventListener('click', initMusic);
        
        // If music isn't playing yet, start it (still respecting mute state)
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log("Playback failed:", error);
            });
        }
    }, { once: true });
});
