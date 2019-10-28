import Deck from "./Deck.js";
import Player from "./Player.js";

export default class App {
    
    constructor(doc) {
        this.doc = doc;
        this.doc.getElementById("new-game").addEventListener("click", this.newGame, false);
        this.doc.getElementById("deal-player").addEventListener("click", this.onPlayerClick, false);
        this.doc.getElementById("deal-dealer").addEventListener("click", this.onDealerClick, false);
        this.doc.getElementById("next-round").addEventListener("click", this.resetFields, false);

        this.newGame();
    }

    newGame = () => {
        this.player = new Player("Player");
        this.dealer = new Player("Dealer");
        this.deck = new Deck().create().shuffle();
        this.player.resetCards();
        this.dealer.resetCards();
        this.resetFields();
    }

    addCardToNode = (id,player) => {
        const cardSlot = this.doc.getElementById(id).getElementsByClassName("cards")[0];
        const card = this.doc.createElement("div");
        card.setAttribute("class", `card ${player.latestCard.suit} ${player.latestCard.name}`);
        cardSlot.append(card);
    }

    addScoreToNode = (id,player) => {
        this.doc.getElementById(id).getElementsByClassName("score")[0].innerText = player.score();
    }

    onPlayerClick = () => {
        if (this.outOfCards()) return;
        if (this.hasBeenReset()) this.resetFields();

        this.player.addToHand(this.deck.getCards().shift());
        this.addScoreToNode("player",this.player);
        this.addCardToNode("player",this.player);

        this.calculateOutcome();
    }

    onDealerClick = () => {
        if (this.outOfCards()) return;
        if (this.hasBeenReset()) this.resetFields();

        this.dealer.addToHand(this.deck.getCards().shift());
        this.addScoreToNode("dealer",this.dealer);
        this.addCardToNode("dealer",this.dealer);

        this.calculateOutcome();
    }

    calculateOutcome = () => {
        if (this.player.score() >= 17) {
            this.doc.getElementById("deal-player").disabled = true;
        }
        if (this.player.score() === 21) {
            this.doc.getElementById("outcome").innerText = "Player Wins!";
            this.doc.getElementById("deal-dealer").disabled = true;
            this.player.resetCards();
            this.dealer.resetCards();
            return;
        }
        if (this.player.score() > 21) {
            this.doc.getElementById("outcome").innerText = "Player Loses!";
            this.doc.getElementById("deal-dealer").disabled = true;
            this.player.resetCards();
            this.dealer.resetCards();
            return;
        }
        if (this.dealer.score() >= 17) {
            this.doc.getElementById("deal-dealer").disabled = true;
        }
        if (this.dealer.score() === 21) {
            this.doc.getElementById("outcome").innerText = "Dealer Wins!";
            this.doc.getElementById("deal-player").disabled = true;
            this.player.resetCards();
            this.dealer.resetCards();
            return;
        }
        if (this.dealer.score() > 21) {
            this.doc.getElementById("outcome").innerText = "Dealer Loses!";
            this.doc.getElementById("deal-player").disabled = true;
            this.player.resetCards();
            this.dealer.resetCards();
            return;
        }
        if (this.player.score() >= 17 && this.dealer.score() >= 17) {
            if (this.player.score() > this.dealer.score()) {
                this.doc.getElementById("outcome").innerText = "Player Wins!";
            } else {
                this.doc.getElementById("outcome").innerText = "Dealer Wins!";
            }
            if (this.dealer.score() > this.player.score()) {
                this.doc.getElementById("outcome").innerText = "Dealer Wins!";
            } else {
                this.doc.getElementById("outcome").innerText = "Player Wins!";
            }
            if (this.dealer.score() === this.player.score()) {
                this.doc.getElementById("outcome").innerText = "No Winners!";
            }
            this.doc.getElementById("deal-player").disabled = true;
            this.doc.getElementById("deal-dealer").disabled = true;
            this.player.resetCards();
            this.dealer.resetCards();
            return;
        }
    }

    hasBeenReset = () => {
        if (this.player.cards.length === 0 && this.dealer.cards.length === 0) {
            return true;
        }
        return false;
    }

    outOfCards = () => {
        if (this.deck.getCards().length === 0) {
            this.doc.getElementById("outcome").innerText = "Out of cards!";
            this.doc.getElementById("deal-player").disabled = true;
            this.doc.getElementById("deal-dealer").disabled = true;
            this.doc.getElementById("next-round").disabled = true;
            return true;
        }
        return false;
    }

    resetFields = () => {
        const removeElements = (elms) => elms.forEach(el => el.remove());
        removeElements(this.doc.querySelectorAll(".card"));

        const setInnerText = (elms) => elms.forEach(el => el.innerText = "?");
        setInnerText(this.doc.querySelectorAll(".score"));

        this.doc.getElementById("deal-player").disabled = false;
        this.doc.getElementById("deal-dealer").disabled = false;
        this.doc.getElementById("next-round").disabled = false;
        this.doc.getElementById("outcome").innerText = "";
    }
};