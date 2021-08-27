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
        let aceCounter = 0;

        this.hand.forEach(card => {
            score += card.v;
            aceCounter = (card.v === ACE_VALUE) ? aceCounter += 1 : aceCounter;

            while (score > MAX_VALUE && aceCounter > 0) {
                score -= 10;
                aceCounter -= 1;
            }
            return score;
        });


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