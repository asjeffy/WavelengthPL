// js/gameLogic.js

const Game = {
    roundCounter: 0,
    currentSpectrum: null,
    currentTargetAngle: 0,
    currentClue: '',
    currentPointerAngle: 90,
    gameState: 'IDLE', // IDLE, PSYCHIC_CLUE, GUESSING, REVEAL, GAME_OVER

    currentPsychicId: null,

    init: function () {
        console.log("Game logic initialized.");
    },

    startNewGame: function () {
        // Resetowanie wyników
        App.gameConfig.players.forEach(p => p.score = 0);
        this.roundCounter = 0;

        // Ustawienie początkowego Psychika (zaczynamy od Krisa, aby pierwsza runda zaczęła się od Nati)
        this.currentPsychicId = App.gameConfig.players[1].id;

        this.gameState = 'PSYCHIC_CLUE';
        console.log("New game started.");
        this.startNewRound();
    },

    startNewRound: function () {
        this.roundCounter++;

        // Zmiana ról w każdej rundzie
        const p1Id = App.gameConfig.players[0].id; // Nati
        const p2Id = App.gameConfig.players[1].id; // Kris

        // Rotacja ról
        if (this.currentPsychicId === p1Id) {
            this.currentPsychicId = p2Id;
        } else {
            this.currentPsychicId = p1Id;
        }

        this.currentSpectrum = getRandomSpectrum();
        this.currentTargetAngle = this.getRandomTargetAngle();
        this.currentClue = 'USTNIE';
        this.gameState = 'PSYCHIC_CLUE';

        Dial.updatePointer(90);

        gameView.updateDisplay();
    },

    submitClue: function (clue) {
        if (this.gameState !== 'PSYCHIC_CLUE') return;
        this.currentClue = clue.trim();

        this.gameState = 'GUESSING';
        gameView.updateDisplay();
    },

    submitGuess: function (pointerAngle) {
        if (this.gameState !== 'GUESSING') return;

        const points = this.calculateScore(this.currentTargetAngle, pointerAngle);

        // Dodawanie punktów do wyniku Psychika
        const psychic = App.gameConfig.players.find(p => p.id === this.currentPsychicId);
        if (psychic) {
            psychic.score += points;
        }

        this.gameState = 'REVEAL';

        gameView.updateRevealDisplay(points); // Pokaż cel, punkty i przycisk "Następna runda"

        console.log(`Guess submitted. Target was ${this.currentTargetAngle}. Scored ${points} points.`);
    },

    // ZMIENIONO: Funkcja kończąca grę na powrót do ekranu startowego
    backToSetup: function () {
        this.gameState = 'IDLE';
        const finalScores = App.gameConfig.players.map(p => `${p.name}: ${p.score}`).join(', ');
        alert(`Powrót do menu. Ostatnie wyniki: ${finalScores}`);
        App.navigateToSetup();
    },

    getRandomTargetAngle: function () {
        return Math.random() * 135 + 22.5;
    },

    calculateScore: function (targetCenterAngle, pointerAngle) {
        const diff = Math.abs(targetCenterAngle - pointerAngle);

        if (diff <= 15) return 4;
        if (diff <= 30) return 3;
        if (diff <= 45) return 2;
        return 0;
    }
};

Game.init();