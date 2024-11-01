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
        logo.src = './images/vertexblog.png';
    }

    function filterCards() {
        const selectedCategory = categorySelect.value;
        const selectedGame = gameSelect.value;
        let hasVisibleCards = false;

        cards.forEach(card => {
            const categoryMatches = selectedCategory === 'category' || card.dataset.category === selectedCategory;
            const gameMatches = selectedGame === 'game' || card.dataset.game === selectedGame;

            if (categoryMatches && gameMatches) {
                card.style.display = 'block'; // muestra la carta
                hasVisibleCards = true;
            } else {
                card.style.display = 'none'; // la oculta
            }
        });

        // muestra el msj una vez no hay
        if (!hasVisibleCards && selectedGame !== 'game') {
            noAssetsMessage.classList.remove('hidden');
        } else {
            noAssetsMessage.classList.add('hidden');
        }
    }

    categorySelect.addEventListener('change', filterCards);
    gameSelect.addEventListener('change', filterCards);

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            logo.src = './images/vertexblog.png';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            logo.src = './images/vertexblogdark.png';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});