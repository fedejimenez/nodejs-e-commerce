const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");

function backdropClickHandler() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function menuToggleClickHandler() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

backdrop.addEventListener("click", backdropClickHandler);
menuToggle.addEventListener("click", menuToggleClickHandler);

// // LOGIN
// var working = false;
// $(".login").on("submit", function(e) {
//   e.preventDefault();
//   if (working) return;
//   working = true;
//   var $this = $(this),
//     $state = $this.find("button > .state");
//   $this.addClass("loading");
//   $state.html("Authenticating");
//   setTimeout(function() {
//     $this.addClass("ok");
//     $state.html("Welcome back!");
//     setTimeout(function() {
//       $state.html("Log in");
//       $this.removeClass("ok loading");
//       working = false;
//     }, 4000);
//   }, 3000);
// });
