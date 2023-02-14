<p align="center">
    <a href="https://github.com/kbiters/blackjack-js">
        <img src="https://imgur.com/rskv9Bk.png" alt="Logo" width="300" height="300">
    </a>
    <br/>
    <p align="center">
        <a href="https://github.com/kbiters/blackjack-js"><strong>« Explore the docs »</strong></a>
        <br/>
        <br/>
        <a href="https://blackjack-kb.netlify.app/">View Demo</a>
        •
        <a href="https://github.com/kbiters/blackjack-js/issues">Report Bug</a>
        •
        <a href="https://github.com/kbiters/blackjack-js/issues">Request Feature</a>
    </p>
</p>

<p align="center">
    <img src="https://img.shields.io/github/contributors/kbiters/blackjack-js?color=dark-green" />
    <img src="https://img.shields.io/github/issues/kbiters/blackjack-js" />
    <img src="https://badges.pufler.dev/visits/kbiters/blackjack-js" />
    <img src="https://badges.pufler.dev/updated/kbiters/blackjack-js" />
    <br/>
    <img src="https://img.shields.io/github/forks/kbiters/blackjack-js?style=social" />
    <img src="https://img.shields.io/github/stars/kbiters/blackjack-js?style=social" />
    <br>
    <br>
    <a href='https://cafecito.app/kbiters' rel='noopener' target='_blank'><img srcset='https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_6.png' alt='Invitame un café en cafecito.app' /></a>
</p>
    
## Table Of Contents

* [How to Play](#how-to-play)
* [Program Layout](#program-layout)
* [Preview](#preview)
* [Built With](#built-with)
* [Run Locally](#run-locally)
* [Contributing](#contributing)
* [Team](#team)

## How to Play

Blackjack is a card game that has a player compete against a dealer. The goal of the game is to try and get 21 to win the bet. 
The player is dealt two cards and the dealer also gives themselves two cards.
Cards from 2-10 have face value while a Jack, Queen, and King are worth 10. 
Aces are worth either 1 or 11, they are worth 1 when a value of 11 would bring the player over 21.
The dealer has one card visible to the player and the other card is not shown. Based off the dealer's card and their own card, the player must make a decision
of either hitting or standing. 
- Hit:  When the player hits, it means that they ask for a card.
- Stand: To stand means that the player is content with their cards/total and want to stay at that total.
The player can hit as many times as they want as long as they don't go above 21.
Once the player is done, the dealer reveals their hand and either hits or stands.
There are different ways for a player to win a round of blackjack:
- The player achieves a blackjack which is the scenario where a player gets an Ace card and one of the following cards with it: 10, Jack, Queen, King.
- The player achieves 21 from hitting and the dealer does not get 21.
- The player stands and gets a higher high hand(score) than the dealer.
- The player stands and the dealer busts(their hand goes over 21).
The player loses if:
- Their hand goes over 21
- The dealer gets a higher hand than them

## Program Layout 

The program asks the user to input a balance to start with as each bet is $100.
Once they input a value, the user will then see the game screen.
There are 3 buttons at the top which are restart, hit, and stand.
Restart is to play again after the round has ended.
The left side of the program has the dealer's round wins and losses and their hand total at the top left.
The right side of the program has the user's balance, wins, losses, and hand total for that round at the top right.
The hands are at the bottom of the screen with the dealer being on the left and the user on the right.

## Preview

![Screen Shot](https://i.imgur.com/hbo9HtU.png)

## Built With

- [JavaScript](https://www.w3schools.com/js/)
- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)

## Run Locally

A step by step of how to run the program locally:

- Clone the repository to your local computer(`git clone "repository link")
- Access the repository folder on your computer
- Open index.html with your preferred browser
- Program will open on your browser locally

## Contributing

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

## Team

[![juampi20](https://avatars.githubusercontent.com/u/57530802?v=4&s=144)](https://github.com/juampi20) | [![gianca1994](https://avatars.githubusercontent.com/u/44784488?v=4&s=144)](https://github.com/gianca1994) | [![bthecs](https://avatars.githubusercontent.com/u/43553508?v=4&s=144)](https://github.com/bthecs)
---|---|---
[juampi20](https://github.com/juampi20) | [gianca1994](https://github.com/gianca1994) | [bthecs](https://github.com/bthecs)
