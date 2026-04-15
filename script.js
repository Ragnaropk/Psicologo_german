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

const focusGrid = document.querySelector("#focus-grid");
const fitGrid = document.querySelector("#fit-grid");

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

function renderCards(items, container, iconText, className) {
  items.forEach((item) => {
    container.appendChild(createCard(item, iconText, className));
  });
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

renderCards(focusAreas, focusGrid, "ACT", "topic-card");
renderCards(fitPoints, fitGrid, "FAP", "fit-card");
setupReveal();
