window.onload = function () {
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

    // Update text inside .wrap, do NOT replace .wrap element
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

  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Scroll fade switch
  let hasSwitched = false;
  window.addEventListener("scroll", function () {
    const portfolio = document.getElementById("portfolio");
    const hello = document.getElementById("helloSejal");

    const triggerPoint = window.innerHeight / 3;

    if (!hasSwitched && window.scrollY > triggerPoint) {
      portfolio.classList.remove("visible");
      portfolio.classList.add("hidden");

      hello.classList.remove("hidden");
      hello.classList.add("visible");

      hasSwitched = true;
    }
  });
};
