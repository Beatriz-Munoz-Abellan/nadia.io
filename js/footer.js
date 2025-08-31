function renderFooter() {
  return `
    <footer>
      <div class="contactos correo">
        <p><i class="fa fa-envelope" style="color:#fff"></i> info@mueblesamuebla.com</p>
        <p><i class="fa fa-instagram" style="color:#fff"></i> amuebla_rubí</p>
        <p><i class="fa fa-phone" style="color:#fff"></i> 640794128</p>
      </div>
      <div class="avisos">
        <p> &copy; 2025 Amuebla | <a href="../html/aviso-legal.html" target="_blank">Aviso legal</a> | <a href="../html/politica-cookies.html"target="_blank">Política de cookies </a> | <a href="../html/terminos-condiciones.html"target="_blank">Política de privacidad</a></p>
      </div>
    </footer>
  `;
}
document.getElementById('footer-container').innerHTML = renderFooter();
