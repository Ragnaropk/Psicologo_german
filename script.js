const focusAreas = [
  {
    title: "Ansiedad y sobrepensamiento",
    description: "Procesos donde la mente no se detiene y cuesta encontrar calma o dirección."
  },
  {
    title: "Bloqueo emocional",
    description: "Momentos en los que te cuesta sentir, nombrar o expresar lo que ocurre dentro de ti."
  },
  {
    title: "Crisis existenciales",
    description: "Etapas de vacío, falta de sentido o preguntas profundas sobre hacia dónde ir."
  },
  {
    title: "Falta de propósito",
    description: "Cuando la vida parece avanzar por inercia y sientes desconexión con lo que te importa."
  },
  {
    title: "Dificultades para conectar emocionalmente",
    description: "Patrones de distancia, miedo al vínculo o sensación persistente de soledad."
  },
  {
    title: "Miedo al rechazo y problemas de comunicación",
    description: "Relaciones donde cuesta hablar claro, poner límites o mostrarte con autenticidad."
  }
];

const fitPoints = [
  {
    title: "Ansiedad constante",
    description: "Si sientes que tu mente va demasiado rápido y no te deja descansar."
  },
  {
    title: "Decisiones y relaciones que se repiten",
    description: "Si te cuesta decidir o vuelves a entrar en dinámicas que terminan haciéndote daño."
  },
  {
    title: "Vacío o falta de sentido",
    description: "Si algo dentro de ti dice que estás sobreviviendo, pero no viviendo."
  },
  {
    title: "Desconexión emocional",
    description: "Si te cuesta conectar con lo que sientes, con otras personas o contigo mismo."
  },
  {
    title: "Sensación de estar estancado",
    description: "Si sabes que algo tiene que cambiar, pero no logras salir del mismo lugar."
  },
  {
    title: "Necesidad de un proceso honesto",
    description: "Si buscas una terapia cercana, profunda y basada en evidencia, no respuestas prefabricadas."
  }
];

const certificateFiles = [
  {
    title: "Herramientas para el control de la ansiedad",
    file: "Constancia-Curso-Virtual-de-Herramientas-para-el-Control-de-la-Ansiedad_Curso-Virtual-de-Her-page-00001.jpg"
  },
  {
    title: "Primeros auxilios psicológicos",
    file: "Constancia-Curso-Virtual-de-Primeros-Auxilios-Psicologicos_Curso-Virtual-de-Primeros-Auxilio-page-00001.jpg"
  },
  {
    title: "Terapia cognitivo conductual",
    file: "Constancia-Curso-Virtual-de-Terapia-Cognitivo-Conductual_Curso-Virtual-de-Terapia-Cognitivo--page-00001.jpg"
  },
  {
    title: "Posvención del suicidio",
    file: "Constancia-Curso-Virtual-Posvencion-del-Suicidio_Curso-Virtual-Posvencion-del-Suicidio_Germa-page-00001.jpg"
  },
  {
    title: "Prevención de autolesiones",
    file: "Constancia-Curso-Virtual-Prevencion-de-Autolesiones_Curso-Virtual-Prevencion-de-Autolesiones-page-00001.jpg"
  },
  {
    title: "Prevención del suicidio",
    file: "Constancia-Curso-Virtual-Prevencion-del-Suicidio_Curso-Virtual-Prevencion-del-Suicidio_Germa-page-00001.jpg"
  },
  {
    title: "Psicología de las adicciones",
    file: "Constancia-Curso-Virtual-Psicologia-de-las-Adicciones_Curso-Virtual-Psicologia-de-las-Adicci-page-00001.jpg"
  },
  {
    title: "Trastornos de la conducta alimentaria",
    file: "Constancia-Curso-Virtual-Trastornos-de-la-Conducta-Alimentaria_Curso-Virtual-Trastornos-de-l-page-00001.jpg"
  },
  {
    title: "Violencia de género",
    file: "Constancia-Curso-Virtual-Violencia-de-Genero-Que-Es-y-Como-Prevenirla_Curso-Virtual-Violenci-page-00001.jpg"
  },
  {
    title: "Autocuidado para profesionales de la salud",
    file: "CURSO-~1-page-00001.jpg"
  },
  {
    title: "Formación en FAP",
    file: "FAP_SEIG011115H-page-00001.jpg"
  }
];

const certificates = certificateFiles.map((item) => ({
  title: item.title,
  thumb: `Constancias German/thumbs/${item.file}`,
  display: `Constancias German/display/${item.file}`
}));

const focusGrid = document.querySelector("#focus-grid");
const fitGrid = document.querySelector("#fit-grid");
const certificateGallery = document.querySelector("#certificate-gallery");
const imageModal = document.querySelector("#image-modal");
const imageModalImg = document.querySelector("#image-modal-img");
const imageModalCaption = document.querySelector("#image-modal-caption");
const imageModalClose = document.querySelector("#image-modal-close");
const imageModalBackdrop = document.querySelector("#image-modal-backdrop");

function createCard(item, iconText, className) {
  const article = document.createElement("article");
  article.className = className;
  article.innerHTML = `
    <span class="${className === "topic-card" ? "topic-icon" : "fit-icon"}" aria-hidden="true">${iconText}</span>
    <strong>${item.title}</strong>
    <p>${item.description}</p>
  `;
  return article;
}

function openModal(item) {
  if (!imageModal || !imageModalImg || !imageModalCaption) {
    return;
  }

  imageModalImg.src = encodeURI(item.display);
  imageModalImg.alt = item.title;
  imageModalCaption.textContent = item.title;
  imageModal.classList.add("is-open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function createCertificateCard(item) {
  const button = document.createElement("button");
  button.className = "certificate-thumb";
  button.type = "button";
  button.setAttribute("aria-label", `Ver constancia: ${item.title}`);
  button.innerHTML = `
    <div class="certificate-thumb-media">
      <img src="${encodeURI(item.thumb)}" alt="${item.title}" loading="lazy" decoding="async">
    </div>
    <div class="certificate-thumb-copy">
      <strong>${item.title}</strong>
      <span>Toque para ampliar</span>
    </div>
  `;

  button.addEventListener("click", () => openModal(item));

  return button;
}

function renderCards(items, container, iconText, className) {
  if (!container) {
    return;
  }

  items.forEach((item) => {
    container.appendChild(createCard(item, iconText, className));
  });
}

function renderCertificates(items, container) {
  if (!container) {
    return;
  }

  items.forEach((item) => {
    container.appendChild(createCertificateCard(item));
  });
}

function closeModal() {
  if (!imageModal || !imageModalImg || !imageModalCaption) {
    return;
  }

  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImg.removeAttribute("src");
  imageModalImg.alt = "";
  imageModalCaption.textContent = "";
  document.body.style.overflow = "";
}

function setupReveal() {
  const sections = document.querySelectorAll(".reveal");

  if (!sections.length || typeof IntersectionObserver === "undefined") {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

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

renderCards(focusAreas, focusGrid, "ACT", "topic-card");
renderCards(fitPoints, fitGrid, "FAP", "fit-card");
renderCertificates(certificates, certificateGallery);
setupReveal();

if (imageModalClose) {
  imageModalClose.addEventListener("click", closeModal);
}

if (imageModalBackdrop) {
  imageModalBackdrop.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal?.classList.contains("is-open")) {
    closeModal();
  }
});
