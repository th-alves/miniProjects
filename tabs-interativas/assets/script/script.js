// Seleção de elementos
const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach((tab) => tab.addEventListener("click", () => tabClicked(tab)));

const tabClicked = (tab) => {
  tabs.forEach((tab) => tab.classList.remove("active"));
  tab.classList.add("active");

  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => content.classList.remove("show"));

  const contentId = tab.getAttribute("content-id");
  const content = document.getElementById(contentId);

  content.classList.add("show");
};

const currentActiveTab = document.querySelector(".tab-btn.active");
tabClicked(currentActiveTab);

// Accordion
const accordions = document
  .querySelectorAll(".accordion")
  .forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const body = accordion.querySelector(".accordion-body");
      body.classList.toggle("active");
    });
  });
