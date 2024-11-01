let currentImageIndex = 0;
const images = [
    "./other/other-img/moh1.jpg",
    "./other/other-img/moh2.jpg",
    "./other/other-img/moh3.jpg",
    "./other/other-img/moh4.jpg",
    "./other/other-img/moh5.jpg",
    "./other/other-img/moh6.jpg",
    "./other/other-img/moh7.jpg"
];

function openModal(imageSrc, index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modal.classList.remove('hidden');
    modal.classList.add('show');
    document.body.classList.add('modal-open'); // Deshabilita el desplazamiento
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    modal.classList.add('hide');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open'); // Habilita el desplazamiento
    }, 300); // Tiempo de duración de la animación
}

function nextImage(event) {
    event.stopPropagation(); // Evita que se cierre el modal
    currentImageIndex = (currentImageIndex + 1) % images.length; // Ciclo a la siguiente