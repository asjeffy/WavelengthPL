// js/main.js

const App = {
    // Referencje do kontenerów widoków
    views: {
        setup: document.getElementById('setup-view'),
        game: document.getElementById('game-view'),
        // USUNIĘTO: results
    },

    currentView: null,

    init: function () {
        console.log("App initialized.");
        // Renderuj wszystkie widoki (początkowo ukryte)
        setupView.render(this.views.setup);
        gameView.render(this.views.game);

        // Pokaż od razu widok Setup
        this.showView('setup');
    },

    showView: function (viewName) {
        if (!this.views[viewName]) {
            console.error(`View ${viewName} not found.`);
            return;
        }

        // Ukryj wszystkie widoki
        for (let key in this.views) {
            this.views[key].classList.add('hidden');
        }

        // Pokaż wybrany widok
        this.views[viewName].classList.remove('hidden');
        this.currentView = viewName;
        console.log(`Showing view: ${viewName}`);
    },

    // Globalne funkcje do nawigacji
    navigateToSetup: function () { App.showView('setup'); },
    navigateToGame: function () { App.showView('game'); Game.startNewGame(); },

    // Globalna konfiguracja
    gameConfig: {
        players: [
            { id: 1, name: "Nati", avatar: "N", score: 0 },
            { id: 2, name: "Kris", avatar: "K", score: 0 }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});