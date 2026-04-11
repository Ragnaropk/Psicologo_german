const certificates = [
  {
    title: "Herramientas para el control de la ansiedad",
    description: "Actualización enfocada en estrategias para comprender y acompañar procesos relacionados con la ansiedad.",
    file: "Constancia-Curso-Virtual-de-Herramientas-para-el-Control-de-la-Ansiedad_Curso-Virtual-de-Herramientas-para-el-Control-de-la-Ansiedad_German-Andrey-Seres-Ibanez.pdf",
    tags: ["ansiedad", "regulación emocional", "psicoeducación"]
  },
  {
    title: "Primeros auxilios psicológicos",
    description: "Formación para brindar contención inicial y acompañamiento psicológico en situaciones críticas.",
    file: "Constancia-Curso-Virtual-de-Primeros-Auxilios-Psicologicos_Curso-Virtual-de-Primeros-Auxilios-Psicologicos_German-Andrey-Seres-Ibanez.pdf",
    tags: ["crisis", "intervención", "contención"]
  },
  {
    title: "Terapia cognitivo conductual",
    description: "Preparación en uno de los enfoques terapéuticos más utilizados en la práctica clínica contemporánea.",
    file: "Constancia-Curso-Virtual-de-Terapia-Cognitivo-Conductual_Curso-Virtual-de-Terapia-Cognitivo-Conductual_German-Andrey-Seres-Ibanez.pdf",
    tags: ["TCC", "terapia", "intervención clínica"]
  },
  {
    title: "Posvención del suicidio",
    description: "Formación orientada al acompañamiento posterior a eventos suicidas y a la atención de personas y comunidades afectadas.",
    file: "Constancia-Curso-Virtual-Posvencion-del-Suicidio_Curso-Virtual-Posvencion-del-Suicidio_German-Andrey-Seres-Ibanez.pdf",
    tags: ["suicidio", "duelo", "acompañamiento"]
  },
  {
    title: "Prevención de autolesiones",
    description: "Actualización centrada en detección, prevención y abordaje inicial de conductas autolesivas.",
    file: "Constancia-Curso-Virtual-Prevencion-de-Autolesiones_Curso-Virtual-Prevencion-de-Autolesiones_German-Andrey-Seres-Ibanez.pdf",
    tags: ["autolesiones", "prevención", "salud mental"]
  },
  {
    title: "Prevención del suicidio",
    description: "Formación enfocada en factores de riesgo, señales de alerta y estrategias de prevención.",
    file: "Constancia-Curso-Virtual-Prevencion-del-Suicidio_Curso-Virtual-Prevencion-del-Suicidio_German-Andrey-Seres-Ibanez.pdf",
    tags: ["suicidio", "prevención", "riesgo"]
  },
  {
    title: "Psicología de las adicciones",
    description: "Curso virtual sobre comprensión psicológica de las adicciones y posibles rutas de intervención.",
    file: "Constancia-Curso-Virtual-Psicologia-de-las-Adicciones_Curso-Virtual-Psicologia-de-las-Adicciones_German-Andrey-Seres-Ibanez.pdf",
    tags: ["adicciones", "consumo", "acompañamiento"]
  },
  {
    title: "Trastornos de la conducta alimentaria",
    description: "Preparación orientada a la comprensión de riesgos, señales y abordajes relacionados con TCA.",
    file: "Constancia-Curso-Virtual-Trastornos-de-la-Conducta-Alimentaria_Curso-Virtual-Trastornos-de-la-Conducta-Alimentaria_German-Andrey-Seres-Ibanez.pdf",
    tags: ["TCA", "conducta alimentaria", "salud mental"]
  },
  {
    title: "Violencia de género: qué es y cómo prevenirla",
    description: "Constancia sobre prevención, comprensión del fenómeno y acompañamiento desde una mirada psicosocial.",
    file: "Constancia-Curso-Virtual-Violencia-de-Genero-Que-Es-y-Como-Prevenirla_Curso-Virtual-Violencia-de-Genero-Que-Es-y-Como-Prevenirla_German-Andrey-Seres-Ibanez.pdf",
    tags: ["violencia de género", "prevención", "psicosocial"]
  },
  {
    title: "Estrategias de autocuidado para profesionales de la salud",
    description: "Formación orientada al cuidado emocional y a la prevención del desgaste en entornos demandantes.",
    file: "Curso-Virtual-Estrategias-de-autocuidado-para-profesionales-de-la-salud-en-entornos-demandantes_Curso-Virtual-Estrategias-de-autocuidado-para-profesionales-de-la-salud-en-entornos-demandantes_German-Andrey-Seres-Ib.pdf",
    tags: ["autocuidado", "profesionales de la salud", "bienestar"]
  }
];

const grid = document.querySelector("#certificate-grid");
const searchInput = document.querySelector("#certificate-search");
const resultsText = document.querySelector("#results-text");
const viewer = document.querySelector("#certificate-viewer");
const viewerTitle = document.querySelector("#viewer-title");
const viewerDescription = document.querySelector("#viewer-description");
const compactViewport = window.matchMedia("(max-width: 980px)");

const defaultViewerState = {
  title: "Selecciona una constancia",
  description:
    "El documento no se carga automáticamente. Así la página se mantiene más fluida y puedes abrir solo la constancia que quieras revisar."
};

let activeFile = "";

function isCompactViewport() {
  return compactViewport.matches;
}

function resetViewer(title = defaultViewerState.title, description = defaultViewerState.description) {
  viewer.removeAttribute("src");
  viewerTitle.textContent = title;
  viewerDescription.textContent = description;
}

function buildCard(certificate) {
  const article = document.createElement("article");
  article.className = "certificate-card";
  article.dataset.file = certificate.file;

  if (certificate.file === activeFile) {
    article.classList.add("is-active");
  }

  article.innerHTML = `
    <div class="certificate-icon" aria-hidden="true">PDF</div>
    <div>
      <h3>${certificate.title}</h3>
      <p>${certificate.description}</p>
    </div>
    <div class="certificate-meta">
      ${certificate.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="certificate-actions">
      <button class="certificate-trigger" type="button">Ver constancia</button>
    </div>
  `;

  article.querySelector(".certificate-trigger").addEventListener("click", () => {
    if (isCompactViewport()) {
      window.open(encodeURI(certificate.file), "_blank", "noopener");
      return;
    }

    showCertificate(certificate);
    document.querySelector(".certificate-viewer")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  return article;
}

function showCertificate(certificate) {
  activeFile = certificate.file;
  viewerTitle.textContent = certificate.title;
  viewerDescription.textContent = certificate.description;

  if (isCompactViewport()) {
    viewer.removeAttribute("src");
  } else {
    viewer.src = `${encodeURI(certificate.file)}#toolbar=0&navpanes=0&scrollbar=0`;
  }

  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.file === certificate.file);
  });
}

function renderCertificates(items) {
  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state">
        No se encontraron constancias con ese criterio. Prueba con otra palabra clave.
      </div>
    `;
    resultsText.textContent = "0 resultados";
    activeFile = "";
    resetViewer(
      "Sin resultados",
      "Prueba con otra palabra clave para volver a ver las constancias disponibles."
    );
    return;
  }

  items.forEach((certificate) => {
    grid.appendChild(buildCard(certificate));
  });

  const activeCertificate = items.find((certificate) => certificate.file === activeFile);

  if (activeCertificate) {
    showCertificate(activeCertificate);
  } else {
    document.querySelectorAll(".certificate-card").forEach((card) => {
      card.classList.remove("is-active");
    });
    resetViewer();
  }

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

compactViewport.addEventListener("change", () => {
  if (!activeFile) {
    resetViewer();
    return;
  }

  const activeCertificate = certificates.find((certificate) => certificate.file === activeFile);

  if (activeCertificate) {
    showCertificate(activeCertificate);
  }
});
