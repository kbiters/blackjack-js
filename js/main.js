let cardsSelectedHiddenDealer = document.createElement('IMG');
let cardListHiddenDealer;

let cardsSelectedHiddenDealerNEW = document.createElement('IMG');


// Player Model
class Person {

    // Constructor
    constructor() {
        this._hand = [];
        this._history = [];
        this._hiddenCard = [];
        this._active = true;
    }

    hit(deck) {
        this._hand.push(deck.pop());
    }

    get hand() {
        return this._hand;
    }

    set hand(card) {
        this._hand.push(card);
    }

    get score() {
        let score = 0;
        this.hand.forEach(card => {
            return score += card.v
        });
        return score;
    }


    get history() {
        return this._history;
    }

    set history(value) {
        this._history = value;
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


    initial();

    let restart = document.getElementById("restartButton");
    restart.addEventListener("click", initial);

    let hit = document.getElementById("hitButton");
    hit.addEventListener("click", (() => {
        if (!gameModel.player.active) {
            return
        }

        let gg = gameModel.deck.pop();
        gameModel.player.hand.push(gg);

        let cardsSelectedPlayerNEW = document.createElement('IMG');
        cardsSelectedPlayerNEW.src = `img/cards/${gg.k}.png`;
        cardListPlayer = document.querySelector('.cards-list-player');
        cardListPlayer.appendChild(cardsSelectedPlayerNEW);

        validateLose(gameModel);
        showHandsPlayers();

    }));

    let stand = document.getElementById("standButton");
    stand.addEventListener("click", (() => {
        if (!gameModel.player.active) {
            return
        }
        gameModel.player.active = false;

        gameModel.dealer.hiddenCard.forEach(card => {
            cardsSelectedHiddenDealerNEW.src = `img/cards/${card.k}.png`;
            cardListHiddenDealer = document.querySelector('.cards-list-dealer')
            cardListHiddenDealer.replaceChild(cardsSelectedHiddenDealerNEW, cardsSelectedHiddenDealer)
        });

        let ggg = gameModel.dealer.hiddenCard.pop();
        gameModel.dealer.hand.push(ggg);

        for (let i = 0; i < gameModel.deck.length; i++) {
            if (gameModel.dealer.score < gameModel.player.score) {
                let gggg = gameModel.deck.pop();
                gameModel.dealer.hand.push(gggg);
                let cardsSelectedDealerNEW = document.createElement('IMG');
                cardsSelectedDealerNEW.src = `img/cards/${gggg.k}.png`;
                cardListHiddenDealer = document.querySelector('.cards-list-dealer');
                cardListHiddenDealer.appendChild(cardsSelectedDealerNEW);

            } else {
                break;
            }
        }

        showHandsPlayers();
        validatePersonWin();
    }));

    function validatePersonWin() {
        if (gameModel.dealer.score >= gameModel.player.score && gameModel.dealer.score <= 21) {
            setText("result", "The winner is the DEALER!")
        } else {
            setText("result", "The winner is the PLAYER!")
        }
    }

    function validateLose() {
        if (gameModel.player.score > 21) {
            setText("result", "The winner is the DEALER!");

            gameModel.player.active = false;
            gameModel.dealer.hiddenCard.forEach(card => {
                cardsSelectedHiddenDealerNEW.src = `img/cards/${card.k}.png`;
                cardListHiddenDealer = document.querySelector('.cards-list-dealer')
                cardListHiddenDealer.replaceChild(cardsSelectedHiddenDealerNEW, cardsSelectedHiddenDealer)
            });
        } else {
            setText("result", "Playing...");
        }
    }

    function showHandsPlayers() {
        // console.log(gameModel.player.hand)
        setText("scorePlayer", gameModel.player.score)
        setText("scoreDealer", gameModel.dealer.score)

    }

    function initial() {
        gameModel = new GameModel();
        gameModel.shuffle(4);
        gameModel.dealInitialCards();
        showHandsPlayers();
        setText("result", "Playing...");


        let cardsSelectedDealer = document.createElement('IMG')
        cardsSelectedDealer.src = `img/cards/${gameModel.dealer.hand[0].k}.png`;

        let cardListDealer = document.querySelector('.cards-list-dealer')
        cardListDealer.appendChild(cardsSelectedDealer)

        gameModel.dealer.hiddenCard.forEach(card => {
            cardsSelectedHiddenDealer.src = `img/hidden-cards/hidden.png`;

            cardListHiddenDealer = document.querySelector('.cards-list-dealer')
            cardListHiddenDealer.appendChild(cardsSelectedHiddenDealer)
        });

        gameModel.player.hand.forEach(card => {
            let cardsSelectedPlayer = document.createElement('IMG')
            cardsSelectedPlayer.src = `img/cards/${card.k}.png`;

            let cardListPlayer = document.querySelector('.cards-list-player')
            cardListPlayer.appendChild(cardsSelectedPlayer)
        });


    }
}

function setText(id, text) {
    document.getElementById(id).innerHTML = text;
}


