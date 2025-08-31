// Selecciona el contenedor donde se insertará el banner
const container = document.querySelector('.cookie-container');

if (!container) {
  console.warn("No se encontró el contenedor .cookie-container para el banner de cookies.");
} else {

  // HTML del banner
  const bannerHTML = `
    <div id="cookie-banner" class="cookie-banner">
      <p>
        Usamos cookies propias para el correcto funcionamiento de la web.
        <a href="../html/politica-cookies.html" target="_blank">Más información</a>.
      </p>
      <div class="cookie-buttons">
        <button id="accept-cookies">Aceptar</button>
        <button id="reject-cookies">Rechazar</button>
      </div>
    </div>
  `;

  // Insertar banner en el contenedor
  container.innerHTML = bannerHTML;

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  // Revisar si ya hay preferencia guardada
  const choice = localStorage.getItem("cookies-choice");
  if (choice) {
    cookieBanner.style.display = "none";
  }

  // Eventos de botones
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookies-choice", "accepted");
    cookieBanner.style.display = "none";
    console.log("✅ Cookies aceptadas");
  });

  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookies-choice", "rejected");
    cookieBanner.style.display = "none";
    console.log("❌ Cookies rechazadas");
  });
}
