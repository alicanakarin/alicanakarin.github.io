function switchTab(tabName) {
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((button) => button.classList.remove("active"));

  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => content.classList.remove("active"));

  // Tıklanan butonu tabName ile bul
  const clickedButton = document.querySelector(`[onclick*="${tabName}"]`);
  if (clickedButton) {
    clickedButton.classList.add("active");
  }

  document.getElementById(tabName).classList.add("active");
}

// JSON dosyasından projeleri çek ve ekrana yazdır
async function renderProjects() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();

    const container = document.querySelector(".project-container");
    const currentPage = window.location.pathname;

    // Ana sayfadaysa sadece 4 proje göster
    const isHomePage = currentPage.includes("index.html") || currentPage === "/";
    const projectsToShow = isHomePage ? projects.slice(0, 4) : projects;

    projectsToShow.forEach((project) => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <img class="project-image" src="${project.image}" alt="Project ${project.id}" />
        <div class="overlay">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="buttons-container">
          <a href="${project.liveDemo}" class="btn" target="_blank">Live Demo</a>
          <a href="${project.sourceCode}" class="btn" target="_blank">Source Code</a>
          </div>
          <div class="tags-container">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Projeler yüklenemedi:", error);
  }
}

// Sayfa yüklenince çalıştır
document.addEventListener("DOMContentLoaded", renderProjects);

const scrollTopBtn = document.querySelectorAll(".up-button");

// Scroll olunca butonu göster/gizle
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Butona tıklayınca yukarı çık
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
