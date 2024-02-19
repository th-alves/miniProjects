function openMenu() {
  let nav = document.querySelector(".menu");

  document.querySelectorAll(".hide");
  nav.classList.toggle("open").classList.add(".hide");
}

ScrollReveal().reveal("#title", {
  origin: "top",
  duration: 2000,
  distance: "40%",
  reset: true,
});
ScrollReveal().reveal("#egg .cta", {
  origin: "left",
  duration: 4000,
  distance: "20%",
  reset: true,
});
ScrollReveal().reveal("#cup .cta", {
  origin: "right",
  duration: 4000,
  distance: "20%",
  reset: true,
});
ScrollReveal().reveal("#cherry .cta", {
  origin: "bottom",
  duration: 2000,
  distance: "20%",
  reset: true,
});
ScrollReveal().reveal("#orange .cta", {
  origin: "bottom",
  duration: 4000,
  distance: "20%",
  reset: true,
});
ScrollReveal().reveal(".emily", {
  origin: "bottom",
  duration: 4000,
  distance: "20%",
  reset: true,
});
ScrollReveal().reveal(".thomas", {
  origin: "bottom",
  duration: 6000,
  distance: "20%",
  reset: true,
});
ScrollReveal().reveal(".jennie", {
  origin: "bottom",
  duration: 8000,
  distance: "20%",
  reset: true,
});
