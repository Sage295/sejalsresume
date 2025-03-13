

function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "block") {
      menu.style.display = "none";
  } else {
      menu.style.display = "block";
  }
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  var menu = document.getElementById("menu");
  var icon = document.querySelector(".menu-icon");

  if (!menu.contains(event.target) && !icon.contains(event.target)) {
      menu.style.display = "none";
  }
});
