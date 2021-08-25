// Settings
const MAX_VALUE = 21;
const SHUFFLE_VALUE = 4;
const STAND_DEALER_VALUE = 16;
const BET_VALUE = 100;
const ACE_VALUE = 11;
let PLAYER_BALANCE = 0;
let HISTORY_PLAYER = {win: 0, lose: 0};
let HISTORY_DEALER = {win: 0, lose: 0};


// Images
const HIDDEN_CARD = `img/hidden-cards/hidden.png`;
const CARD = (card) => { return `img/cards/${card.k}.png`; }
const BLACK_JACK = "<img src='img/blackjack.png' alt='blackjack'>";
const IMG_ELEMENT = 'img';

// TEXTS
const PLAYING = "Playing...";
const PLAYER_WIN = "The PLAYER won this round!";
const DEALER_WIN = "The DEALER won this round!";
const BALANCE_PROMPT = "Enter the balance you wish to bet, consider that each bet will be $100.";
const BALANCE_ALERT = "The balance must be greater than or equal to 100, please re-enter the balance.";

// ELEMENT ID
const RESULT_ID = "result";

const HUD_TEXT = [
    {k: "scorePlayer", v: null},
    {k: "scoreDealer", v: null},
    {k: "winDealer", v: `Win: ${HISTORY_DEALER.win}`},
    {k: "loseDealer", v: `Lose: ${HISTORY_DEALER.lose}`},
    {k: "winPlayer", v: `Win: ${HISTORY_PLAYER.win}`},
    {k: "losePlayer", v: `Lose: ${HISTORY_PLAYER.lose}`},
    {k: "dealerBalance", v: `Balance: 999999 $`},
    {k: "playerBalance", v: `Balance: ${PLAYER_BALANCE} $`},
];

// BUTTONS ELEMENT ID
const STAND_BUTTON = "standButton";
const HIT_BUTTON = "hitButton";
const RESTART_BUTTON = "restartButton";

// BUTTONS TYPES
const CLICK = "click";

const DECK = [
    {k: "c1", v: 11},
    {k: "c2", v: 2},
    {k: "c3", v: 3},
    {k: "c4", v: 4},
    {k: "c5", v: 5},
    {k: "c6", v: 6},
    {k: "c7", v: 7},
    {k: "c8", v: 8},
    {k: "c9", v: 9},
    {k: "c10", v: 10},
    {k: "c11", v: 10},
    {k: "c12", v: 10},
    {k: "c13", v: 10},
    {k: "h1", v: 11},
    {k: "h2", v: 2},
    {k: "h3", v: 3},
    {k: "h4", v: 4},
    {k: "h5", v: 5},
    {k: "h6", v: 6},
    {k: "h7", v: 7},
    {k: "h8", v: 8},
    {k: "h9", v: 9},
    {k: "h10", v: 10},
    {k: "h11", v: 10},
    {k: "h12", v: 10},
    {k: "h13", v: 10},
    {k: "s1", v: 11},
    {k: "s2", v: 2},
    {k: "s3", v: 3},
    {k: "s4", v: 4},
    {k: "s5", v: 5},
    {k: "s6", v: 6},
    {k: "s7", v: 7},
    {k: "s8", v: 8},
    {k: "s9", v: 9},
    {k: "s10", v: 10},
    {k: "s11", v: 10},
    {k: "s12", v: 10},
    {k: "s13", v: 10},
    {k: "d1", v: 11},
    {k: "d2", v: 2},
    {k: "d3", v: 3},
    {k: "d4", v: 4},
    {k: "d5", v: 5},
    {k: "d6", v: 6},
    {k: "d7", v: 7},
    {k: "d8", v: 8},
    {k: "d9", v: 9},
    {k: "d10", v: 10},
    {k: "d11", v: 10},
    {k: "d12", v: 10},
    {k: "d13", v: 10}
];