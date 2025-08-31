const form = document.getElementById('presupuestoForm');
const toast = document.getElementById('toast');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const formData = new FormData(form);

    fetch('./php/procesar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // <-- parsear JSON
    .then(data => {
        showToast(data.message, data.success); // <-- usar message y success del JSON
        if (data.success) form.reset();
    })
    .catch(error => {
        showToast('Error al enviar. Intenta nuevamente.', false);
    });
});

function showToast(message, success = true) {
    toast.innerHTML = message; // <-- usar innerHTML para HTML
    toast.style.backgroundColor = success ? '#fff' : '#c0392b';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 9000);
}
