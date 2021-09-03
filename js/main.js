let hiddenCard;

class GameModel {
	constructor() {
		this.player = new Person();
		this.dealer = new Person();
	}

	shuffle(value) {
		let i;
		for (i = 0; i < value; i++) {
			DECK.sort(() => Math.random() - 0.5);
		}
	}

	dealInitialCards() {
		for (let i = 0; i < 2; i++) {
			this.player.hand = DECK.pop();
			if (this.dealer.hand.length === 0) {
				this.dealer.hand = DECK.pop();
			} else {
				this.dealer.hiddenCard = DECK.pop();
			}
		}
	}
}

// Game start
function start() {
	let gameModel;

	initial(false);

	// Event RESTART
	let restart = document.getElementById(RESTART_BUTTON);
	restart.addEventListener(CLICK, () => {
		if (!gameModel.player.active) {
			initial();
		}
	});

	// Event HIT
	let hit = document.getElementById(HIT_BUTTON);
	hit.addEventListener(CLICK, () => {
		if (!gameModel.player.active) {
			return;
		}

		let card = DECK.pop();
		gameModel.player.hand.push(card);

		cardVisualizer(gameModel.player);
		checkResult();
		showScore();
	});

	// Event STAND
	let stand = document.getElementById(STAND_BUTTON);
	stand.addEventListener(CLICK, () => {
		if (!gameModel.player.active) {
			return;
		}

		gameModel.player.active = false;

		hiddenCard = gameModel.dealer.hiddenCard.pop();
		gameModel.dealer.hand.push(hiddenCard);

		// DEALER PRETEND WIN
		for (let i = 0; i < DECK.length; i++) {
			if (
				gameModel.dealer.score <= STAND_DEALER_VALUE ||
				gameModel.dealer.score < gameModel.player.score
			) {
				let card = DECK.pop();
				gameModel.dealer.hand.push(card);
			} else {
				break;
			}
		}

		cardVisualizer(gameModel.dealer);
		checkResult();
		showScore();
	});

	function initial(reset = true) {
		gameModel = new GameModel();
		gameModel.shuffle(SHUFFLE_VALUE);
		gameModel.dealInitialCards();

		if (!reset) {
			do {
				PLAYER_BALANCE = prompt(BALANCE_PROMPT);
				if (isNaN(Number(PLAYER_BALANCE)) || PLAYER_BALANCE < BET_VALUE) {
					alert(BALANCE_ALERT);
				}
			} while (PLAYER_BALANCE < BET_VALUE);
		}

		if (PLAYER_BALANCE >= BET_VALUE) {
			PLAYER_BALANCE -= BET_VALUE;
		} else {
			initial(false);
		}

		setText(RESULT_ID, PLAYING);
		cardVisualizer(gameModel.player, false, true);
		cardVisualizer(gameModel.dealer);
		cardVisualizer(gameModel.dealer, true);

		if (gameModel.player.score === MAX_VALUE) {
			checkResult(true);
		}

		showScore();
	}

	function checkResult(blackjack = false) {
		let dealerWin = false;

		if (blackjack) {
			gameModel.player.active = false;
			hiddenCard = gameModel.dealer.hiddenCard.pop();
			gameModel.dealer.hand.push(hiddenCard);
			cardVisualizer(gameModel.dealer);
			winBet(false, true);
			setText(RESULT_ID, BLACK_JACK);
			showScore();
			return;
		}

		// DEALER WIN
		if (
			gameModel.dealer.score >= gameModel.player.score &&
			gameModel.dealer.score <= MAX_VALUE
		) {
			dealerWin = true;
		}

		if (gameModel.player.score > MAX_VALUE) {
			dealerWin = true;
			gameModel.player.active = false;
			hiddenCard = gameModel.dealer.hiddenCard.pop();
			gameModel.dealer.hand.push(hiddenCard);
			cardVisualizer(gameModel.dealer);
		}

		// SHOW TEXT
		if (!gameModel.player.active) {
			if (dealerWin) {
				setText(RESULT_ID, DEALER_WIN);
				winBet(true, false);
				showScore();
			} else {
				setText(RESULT_ID, PLAYER_WIN);
				winBet(false, false);
				showScore();
			}
		}
	}

	// Render Cards
	function cardVisualizer(entity, hidden = false, reset = false) {
		// Get html div
		let dealerSelector = document.querySelector(".cards-list-dealer");
		let playerSelector = document.querySelector(".cards-list-player");

		// Clear querySelector
		if (reset) {
			dealerSelector.innerHTML = "";
			playerSelector.innerHTML = "";
		}

		// Create image element
		let entityElement = document.createElement(IMG_ELEMENT);
		entityElement.src = HIDDEN_CARD;

		// Show Cards for entity
		if (!hidden) {
			if (entity === gameModel.player) {
				playerSelector.innerHTML = "";
			}
			if (entity === gameModel.dealer) {
				dealerSelector.innerHTML = "";
			}
			entity.hand.forEach((card) => {
				let entityElement = document.createElement(IMG_ELEMENT);
				entityElement.src = CARD(card);

				if (entity === gameModel.player) {
					playerSelector.appendChild(entityElement);
				} else {
					dealerSelector.appendChild(entityElement);
				}
			});
		} else {
			dealerSelector.appendChild(entityElement);
		}
	}

	// Adding and subtracting balance
	function winBet(dealerWin = false, blackjack = false) {
		if (blackjack) {
			PLAYER_BALANCE += BET_VALUE * 2.5;
			HISTORY_PLAYER.win += 1;
			HISTORY_DEALER.lose += 1;
		} else {
			if (!dealerWin) {
				HISTORY_PLAYER.win += 1;
				HISTORY_DEALER.lose += 1;
				PLAYER_BALANCE += BET_VALUE * 2;
			} else {
				HISTORY_DEALER.win += 1;
				HISTORY_PLAYER.lose += 1;
			}
		}
	}

	function showScore() {
		setText("scorePlayer", gameModel.player.score);
		setText("scoreDealer", gameModel.dealer.score);
		setText("winDealer", `Win: ${HISTORY_DEALER.win}`);
		setText("loseDealer", `Lose: ${HISTORY_DEALER.lose}`);
		setText("winPlayer", `Win: ${HISTORY_PLAYER.win}`);
		setText("losePlayer", `Lose: ${HISTORY_PLAYER.lose}`);
		setText("dealerBalance", `Balance: 999999 $`);
		setText("playerBalance", `Balance: ${PLAYER_BALANCE} $`);
	}
}

function setText(id, text) {
	document.getElementById(id).innerHTML = text;
}

window.addEventListener("load", start);
