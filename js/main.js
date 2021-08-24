let historyPlayer = {win: 0, lose: 0};
let historyDealer = {win: 0, lose: 0};

let hiddenCard;

let playerBalance = 0;
const bet = 100;

// Player Model
class Person {

    // Constructor
    constructor() {
        this._hand = [];
        this._hiddenCard = [];
        this._active = true;
    }

    get hand() {
        return this._hand;
    }

    set hand(card) {
        this._hand.push(card);
    }

    get score() {
        let score = 0;
        let aceCounter = []

        this.hand.forEach(card => {

            score += card.v;
            if (card.v === 11) {
                aceCounter.push(true)
            }

            return score;
        });

        if (score > 21) {
            switch (aceCounter.length) {
                case 1:
                    score -= 10
                    break;
                case 2:
                    score -= 10
                    if (score > 21) {
                        score -= 10;
                    }
                    break;
                case 3:
                    score -= 20
                    if (score > 21) {
                        score -= 10;
                    }
                    break;
                case 4:
                    score -= 30
                    if (score > 21) {
                        score -= 10;
                    }
                    break;
            }
        }
        return score;
    }

    get hiddenCard() {
        return this._hiddenCard;
    }

    set hiddenCard(card) {
        this._hiddenCard.push(card);
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }
}

class GameModel {
    constructor() {
        this.player = new Person();
        this.dealer = new Person();
        this.deck = [
            {k: "c1", v: 11}, {k: "c2", v: 2}, {k: "c3", v: 3}, {k: "c4", v: 4}, {k: "c5", v: 5}, {k: "c6", v: 6},
            {k: "c7", v: 7}, {k: "c8", v: 8}, {k: "c9", v: 9}, {k: "c10", v: 10}, {k: "c11", v: 10}, {
                k: "c12",
                v: 10
            }, {k: "c13", v: 10},
            {k: "h1", v: 11}, {k: "h2", v: 2}, {k: "h3", v: 3}, {k: "h4", v: 4}, {k: "h5", v: 5}, {k: "h6", v: 6},
            {k: "h7", v: 7}, {k: "h8", v: 8}, {k: "h9", v: 9}, {k: "h10", v: 10}, {k: "h11", v: 10}, {
                k: "h12",
                v: 10
            }, {k: "h13", v: 10},
            {k: "s1", v: 11}, {k: "s2", v: 2}, {k: "s3", v: 3}, {k: "s4", v: 4}, {k: "s5", v: 5}, {k: "s6", v: 6},
            {k: "s7", v: 7}, {k: "s8", v: 8}, {k: "s9", v: 9}, {k: "s10", v: 10}, {k: "s11", v: 10}, {
                k: "s12",
                v: 10
            }, {k: "s13", v: 10},
            {k: "d1", v: 11}, {k: "d2", v: 2}, {k: "d3", v: 3}, {k: "d4", v: 4}, {k: "d5", v: 5}, {k: "d6", v: 6},
            {k: "d7", v: 7}, {k: "d8", v: 8}, {k: "d9", v: 9}, {k: "d10", v: 10}, {k: "d11", v: 10}, {
                k: "d12",
                v: 10
            }, {k: "d13", v: 10}
        ];
    }

    shuffle(value) {
        let i;
        for (i = 0; i < value; i++) {
            this.deck.sort(() => Math.random() - 0.5);
        }
    }

    dealInitialCards() {
        for (let i = 0; i < 2; i++) {
            this.player.hand = this.deck.pop();
            if (this.dealer.hand.length === 0) {
                this.dealer.hand = this.deck.pop();
            } else {
                this.dealer.hiddenCard = this.deck.pop();
            }

        }
    }

}


// Game start
function start() {
    let gameModel;

    initial(false);

    // Event RESTART
    let restart = document.getElementById("restartButton");
    restart.addEventListener("click", (() => {
        if (!gameModel.player.active) {
            initial();
        }
    }));

    // Event HIT
    let hit = document.getElementById("hitButton");
    hit.addEventListener("click", (() => {
        if (!gameModel.player.active) {
            return
        }

        let card = gameModel.deck.pop();
        gameModel.player.hand.push(card);

        cardVisualizer(gameModel.player);
        checkResult();
        showScore();

    }));

    // Event STAND
    let stand = document.getElementById("standButton");
    stand.addEventListener("click", (() => {

        if (!gameModel.player.active) {
            return
        }

        gameModel.player.active = false;

        hiddenCard = gameModel.dealer.hiddenCard.pop();
        gameModel.dealer.hand.push(hiddenCard);

        // DEALER PRETEND WIN
        for (let i = 0; i < gameModel.deck.length; i++) {
            if (gameModel.dealer.score <= 16 || gameModel.dealer.score < gameModel.player.score) {
                let card = gameModel.deck.pop()
                gameModel.dealer.hand.push(card);
            } else {
                break;
            }
        }

        cardVisualizer(gameModel.dealer);
        checkResult();
        showScore();

    }));


    function initial(reset = true) {

        gameModel = new GameModel();
        gameModel.shuffle(4);
        gameModel.dealInitialCards();

        if (!reset) {
            do {
                playerBalance = prompt("Enter the balance you wish to bet, consider that each bet will be $100.");
                if (isNaN(Number(playerBalance)) || playerBalance < 100) {
                    playerBalance = 0;
                    alert("The balance must be greater than or equal to 100, please re-enter the balance.");
                }
            } while (playerBalance < 100)
        }

        if (playerBalance >= 100) {
            playerBalance -= bet;
        } else {
            initial(false);
        }

        setText("result", "Playing...");
        cardVisualizer(gameModel.player, false, true);
        cardVisualizer(gameModel.dealer);
        cardVisualizer(gameModel.dealer, true);

        if (gameModel.player.score === 21) {
            checkResult(true);
        }

        showScore();
    }


    function checkResult(blackjack = false) {
        let dealerWin = false;

        if (blackjack) {
            gameModel.player.active = false;
            hiddenCard = gameModel.dealer.hiddenCard.pop()
            gameModel.dealer.hand.push(hiddenCard)
            cardVisualizer(gameModel.dealer)
            historyPlayer.win += 1;
            historyDealer.lose += 1;
            winBet(false, true);
            setText("result", "<img src=\"img/blackjack.png\">");
            showScore()
            return
        }


        // DEALER WIN
        if (gameModel.dealer.score >= gameModel.player.score && gameModel.dealer.score <= 21) {
            dealerWin = true;
        }

        if (gameModel.player.score > 21) {
            dealerWin = true;
            gameModel.player.active = false;
            hiddenCard = gameModel.dealer.hiddenCard.pop();
            gameModel.dealer.hand.push(hiddenCard);
            cardVisualizer(gameModel.dealer);

        }


        // SHOW TEXT
        if (!(gameModel.player.active)) {
            if (dealerWin) {
                setText("result", "The DEALER won this round!")
                historyDealer.win += 1;
                historyPlayer.lose += 1;
                winBet(true, false);
                showScore();
            } else {
                setText("result", "The PLAYER won this round!")
                historyPlayer.win += 1;
                historyDealer.lose += 1;
                winBet(false, false);
                showScore();
            }

        }
    }

    // Render Cards
    function cardVisualizer(entity, hidden = false, reset = false) {

        // Get html div
        let dealerSelector = document.querySelector('.cards-list-dealer');
        let playerSelector = document.querySelector('.cards-list-player');

        // Clear querySelector
        if (reset) {
            dealerSelector.innerHTML = '';
            playerSelector.innerHTML = '';
        }


        // Create image element
        let entityElement = document.createElement('img');
        entityElement.src = `img/hidden-cards/hidden.png`

        // Show Cards for entity
        if (!(hidden)) {

            if (entity === gameModel.player) {
                playerSelector.innerHTML = '';
            }
            if (entity === gameModel.dealer) {
                dealerSelector.innerHTML = '';
            }
            entity.hand.forEach(card => {
                let entityElement = document.createElement('img');
                entityElement.src = `img/cards/${card.k}.png`

                if (entity === gameModel.player) {
                    playerSelector.appendChild(entityElement)
                } else {

                    dealerSelector.appendChild(entityElement)
                }
            });

        } else {
            dealerSelector.appendChild(entityElement)
        }
    }

    // Adding and subtracting balance
    function winBet(dealerWin = false, blackjack = false) {
        if (blackjack) {
            playerBalance += bet * 2.5;
        } else {
            if (!dealerWin) {
                playerBalance += bet * 2;
            }

        }
    }

    function showScore() {
        setText("scorePlayer", gameModel.player.score)
        setText("scoreDealer", gameModel.dealer.score)
        setText("winDealer", `Win: ${historyDealer.win}`);
        setText("loseDealer", `Lose: ${historyDealer.lose}`);
        setText("winPlayer", `Win: ${historyPlayer.win}`);
        setText("losePlayer", `Lose: ${historyPlayer.lose}`);
        setText("dealerBalance", `Balance: 999999 $`);
        setText("playerBalance", `Balance: ${playerBalance} $`);
    }
}

function setText(id, text) {
    document.getElementById(id).innerHTML = text;
}
