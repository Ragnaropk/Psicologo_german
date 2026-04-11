const certificates = [
  {
    title: "Herramientas para el control de la ansiedad",
    description: "Actualización enfocada en estrategias para comprender y acompañar procesos relacionados con la ansiedad.",
    tags: ["ansiedad", "regulación emocional", "psicoeducación"]
  },
  {
    title: "Primeros auxilios psicológicos",
    description: "Formación para brindar contención inicial y acompañamiento psicológico en situaciones críticas.",
    tags: ["crisis", "intervención", "contención"]
  },
  {
    title: "Terapia cognitivo conductual",
    description: "Preparación en uno de los enfoques terapéuticos más utilizados en la práctica clínica contemporánea.",
    tags: ["TCC", "terapia", "intervención clínica"]
  },
  {
    title: "Posvención del suicidio",
    description: "Formación orientada al acompañamiento posterior a eventos suicidas y a la atención de personas y comunidades afectadas.",
    tags: ["suicidio", "duelo", "acompañamiento"]
  },
  {
    title: "Prevención de autolesiones",
    description: "Actualización centrada en detección, prevención y abordaje inicial de conductas autolesivas.",
    tags: ["autolesiones", "prevención", "salud mental"]
  },
  {
    title: "Prevención del suicidio",
    description: "Formación enfocada en factores de riesgo, señales de alerta y estrategias de prevención.",
    tags: ["suicidio", "prevención", "riesgo"]
  },
  {
    title: "Psicología de las adicciones",
    description: "Curso virtual sobre comprensión psicológica de las adicciones y posibles rutas de intervención.",
    tags: ["adicciones", "consumo", "acompañamiento"]
  },
  {
    title: "Trastornos de la conducta alimentaria",
    description: "Preparación orientada a la comprensión de riesgos, señales y abordajes relacionados con TCA.",
    tags: ["TCA", "conducta alimentaria", "salud mental"]
  },
  {
    title: "Violencia de género: qué es y cómo prevenirla",
    description: "Actualización sobre prevención, comprensión del fenómeno y acompañamiento desde una mirada psicosocial.",
    tags: ["violencia de género", "prevención", "psicosocial"]
  },
  {
    title: "Estrategias de autocuidado para profesionales de la salud",
    description: "Formación orientada al cuidado emocional y a la prevención del desgaste en entornos demandantes.",
    tags: ["autocuidado", "profesionales de la salud", "bienestar"]
  }
];

const grid = document.querySelector("#certificate-grid");
const searchInput = document.querySelector("#certificate-search");
const resultsText = document.querySelector("#results-text");

function buildCard(certificate) {
  const article = document.createElement("article");
  article.className = "certificate-card";

  article.innerHTML = `
    <div class="certificate-icon" aria-hidden="true">EXP</div>
    <div>
      <h3>${certificate.title}</h3>
      <p>${certificate.description}</p>
    </div>
    <div class="certificate-meta">
      ${certificate.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="certificate-actions">
      <span class="certificate-status">Respaldo formativo visible</span>
    </div>
  `;

  return article;
}

function renderCertificates(items) {
  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state">
        No se encontraron áreas con ese criterio. Prueba con otra palabra clave.
      </div>
    `;
    resultsText.textContent = "0 resultados";
    return;
  }

  items.forEach((certificate) => {
    grid.appendChild(buildCard(certificate));
  });

  const label = items.length === 1 ? "resultado" : "resultados";
  resultsText.textContent = `${items.length} ${label}`;
}

function filterCertificates(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    renderCertificates(certificates);
    return;
  }

  const filtered = certificates.filter((certificate) => {
    const haystack = [
      certificate.title,
      certificate.description,
      certificate.tags.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  renderCertificates(filtered);
}

function setupReveal() {
  const sections = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section) => observer.observe(section));
}

renderCertificates(certificates);
setupReveal();

searchInput.addEventListener("input", (event) => {
  filterCertificates(event.target.value);
});
