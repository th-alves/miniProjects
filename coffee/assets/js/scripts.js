document.getElementById("defaultOpen").click();

function showCoffees(evt, coffeeName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(coffeeName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Sidebar
const right_side = document.querySelector(".right-side");
const menu = document.querySelector(".menu");
const open_menu = document.querySelector("#openMenu");
const close_menu = document.querySelector("#closeMenu");


open_menu.addEventListener("click", () => {
  menu.style.transform = "translate(0)";
  right_side.style.transform = "translate(0)";
});
close_menu.addEventListener("click", () => {
  menu.style.transform = "translate(100%)";
  right_side.style.transform = "translate(100%)";
});
