
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% es visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const elementos = document.querySelectorAll('.silla, .colchon, .vestidor, .escritorio, .producto, .animar, .animar-lateral, .almohada');

  // Asignar un índice a cada uno para el delay
  elementos.forEach((el, index) => {
    el.style.setProperty('--delay', index);
    el.dataset.index = index;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elementos.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", function() {
  const muebles = document.querySelectorAll('.catalogoMuebles .mueble');

  // Asignar índice a cada mueble para delay progresivo
  muebles.forEach((el, index) => {
    el.style.setProperty('--delay', index);
    el.dataset.index = index;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animación solo una vez
      }
    });
  }, {
    threshold: 0.1
  });

  muebles.forEach(el => observer.observe(el));
});


// backToTop.js
document.addEventListener("DOMContentLoaded", () => {
    const button = document.createElement("button");
    button.innerHTML = '<i class="fa fa-arrow-up"></i>';
    button.id = "backToTopBtn";
    document.body.appendChild(button);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

