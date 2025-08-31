document.addEventListener("DOMContentLoaded", function () {
  // Insertar header
  const headerHTML = `
    <header>
      <div class="cont">
        <div class="cont-logo">
          <img class="logo" src="/imag-optim/logo.webp" alt="Logo">
        </div>
        <div class="boton">
          <a href="/html/presupuesto.html" class="cont-btn"><b>Pedir Presupuesto</b></a>
        </div>
        <div class="menu-toggle" aria-label="Abrir menú">&#9776;</div>
      </div>
    </header>
  `;

  // Insertar menú
  const menuHTML = `
    <nav class="menu-horizontal">
      <ul>
        <li><a href="/index.html">Inicio</a></li>
        <li>
          <a href="#">Muebles</a>
          <ul class="submenu">
            <li><a href="/html/armarios.html">Armarios</a></li>
            <li><a href="/html/salones.html">Salones</a></li>
            <li><a href="#">H. Juveniles</a></li>
            <li><a href="/html/h-matrimonios.html">H. Matrimonios</a></li>
            <li><a href="#">Despachos</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Complementos</a>
          <ul class="submenu">
            <li><a href="/html/vestidor.html">Organizadores</a></li>
            <li><a href="/html/cabezales.html">Cabezales Tapizados</a></li>
            <li><a href="/html/colchones.html">Colchones</a></li>
            <li><a href="/html/almohadas.html">Almohadas</a></li>
            <li><a href="/html/escritorios.html">Patas y herrajes</a></li>
            <li><a href="/html/sillas.html">Sillas</a></li>
          </ul>
        </li>
        <li><a class="red" href="/html/outlet.html">Outlet</a></li>
        <li><a href="/html/nosotros.html">Nosotros</a></li>
      </ul>
    </nav>
  `;

  // Inyectar al inicio del body
  document.body.insertAdjacentHTML("afterbegin", headerHTML + menuHTML);

  // Seleccionar elementos ya creados
  const menu = document.querySelector(".menu-horizontal");
  const toggleBtn = document.querySelector(".menu-toggle");

  // Toggle menú principal
  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // Toggle submenús en móvil
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".menu-horizontal > ul > li > a").forEach(link => {
      const submenu = link.nextElementSibling;
      if (submenu && submenu.classList.contains("submenu")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          submenu.classList.toggle("open");
        });
      }
    });
  }

  // Activar enlace correspondiente
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu-horizontal a").forEach(link => {
    let href = link.getAttribute("href");
    if (href && href.split("/").pop() === currentPage) {
      link.classList.add("active");

      // Si está en submenú → marcar también padre
      const parentLi = link.closest("ul.submenu")?.closest("li");
      if (parentLi) {
        parentLi.querySelector(":scope > a").classList.add("active");
      }
    }
  });
});
