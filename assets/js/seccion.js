// Seleccionar enlaces del menú y contenedor dinámico
const menuLinks = document.querySelectorAll("nav ul li a"); // Enlaces del menú
const contentArea = document.querySelector(".content"); // Área dinámica para contenido

// Contenidos por sección (pueden expandirse o cambiarse)
const secciones = {
  "Página inicial": `
    <h1 style="color: #FFA500;">Bienvenido a VerteX</h1>
    <p>Este es el inicio de nuestra comunidad. Conectate y explorá.</p>`,
  "Compra VIP": `
    <h1 style="color: #FFF;">Compra VIP</h1>
    <p style="color: #AAA;">Adquirí beneficios exclusivos para mejorar tu experiencia.</p>`,
  "BLOG e ASSETS": `
    <h1 style="color: #FFF;">Blog y Assets</h1>
    <p style="color: #AAA;">Navegá entre recursos y novedades de nuestro proyecto.</p>`,
  "Discadia": `
    <h1 style="color: #FFF;">Unite a Discadia</h1>
    <p style="color: #AAA;">Accedé a nuestra comunidad en Discadia y conectate con otros usuarios.</p>`,
  "Cafecito": `
    <h1 style="color: #FFA500;">Apoyanos con un Cafecito</h1>
    <p>Con tu apoyo, seguimos creciendo. ¡Gracias!</p>`
};

// Añadir eventos a los enlaces del menú
menuLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Evitar recargar la página

    // Identificar la sección seleccionada
    const sectionName = this.textContent.trim();

    // Reemplazar contenido dinámicamente
    if (secciones[sectionName]) {
      contentArea.innerHTML = secciones[sectionName]; // Insertar nuevo contenido
    } else {
      contentArea.innerHTML = "<h1>404 - Sección no encontrada</h1>";
    }

    // Actualizar la clase `active` en los enlaces
    menuLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
  });
});
