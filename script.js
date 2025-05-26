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
