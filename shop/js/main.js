document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const gameSelect = document.getElementById('game-select');
    const cards = document.querySelectorAll('.card');
    const noAssetsMessage = document.getElementById('no-assets-message');
    const darkModeToggle = document.getElementById('toggle-dark-mode');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const logo = document.getElementById('logo');

    // Cargar la preferencia del modo oscuro
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        logo.src = '../assets/img/VertexLogoLight.png';
    }

    categorySelect.addEventListener('change', filterCards);
    gameSelect.addEventListener('change', filterCards);

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            logo.src = '../assets/img/VertexLogoLight.png';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            logo.src = '../assets/img/VertexLogoDark.png';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});