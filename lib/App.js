import Deck from "./Deck.js";
import Player from "./Player.js";

export default class App {
    selector = "my-app";
    template = `
        <button id="new-game"> New Game </button>
        <button id="deal-player"> Deal Player </button>
        <button id="deal-dealer"> Deal Dealer </button>
        <button id="next-round"> Next Round </button>
        <span id="outcome"></span>
    
        <h3>Player</h3>
        <div id="player">
            <div class="cards"></div>
            <div class="equal"> = </div>
            <div class="score"> ? </div>
        </div>
    
        <h3>Dealer</h3>
        <div id="dealer">
            <div class="cards"></div>
            <div class="equal"> = </div>
            <div class="score"> ? </div>
        </div>`;

    constructor(doc) {
        this.doc = doc;
        this.doc.querySelector(this.selector).innerHTML = this.template;
        this.doc.getElementById("new-game").addEventListener("click", this.startGame, false);
        this.doc.getElementById("deal-player").addEventListener("click", this.onPlayerClick, false);
        this.doc.getElementById("deal-dealer").addEventListener("click", this.onDealerClick, false);
        this.doc.getElementById("next-round").addEventListener("click", this.resetFields, false);
    }

    startGame = () => {
        this.resetFields();
        this.deck = new Deck().create().shuffle();
        this.player = new Player("player");
        this.dealer = new Player("dealer");
    }

    onPlayerClick = () => {
        this.resetFieldsIfPlayerHasBeenReset(this.player, this.dealer);
        this.addCardToHand(this.deck.getTopCard(), this.player);
        this.calculateOutcome(this.player, this.dealer);
    }

    onDealerClick = () => {
        this.resetFieldsIfPlayerHasBeenReset(this.dealer, this.player);
        this.addCardToHand(this.deck.getTopCard(), this.dealer);
        this.calculateOutcome(this.dealer, this.player);
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

    addCardToHand = (card, player) => {
        if (card) {
            const score = player.addToHand(card);
            const id = player.getId();
            this.addCardToNode(id,card);
            this.addScoreToNode(id,score);
        } else {
            this.endGame();
        }
    }

    addCardToNode = (id, card) => {
        const node = this.doc.getElementById(id).getElementsByClassName("cards")[0];
        node.append(this.createCardNode(card));
    }

    addScoreToNode = (id, score) => {
        const node = this.doc.getElementById(id).getElementsByClassName("score")[0];
        node.innerText = score;
    }

    createCardNode = (card) => {
        const cardNode = this.doc.createElement("div");
        cardNode.setAttribute("class", `card ${card.suit} ${card.name}`);
        return cardNode;
    }

    calculateOutcome = (player1, player2) => {
        const player1Score = player1.scoreHand();
        const player2Score = player2.scoreHand();
        if (player1Score >= 17) {
            this.doc.getElementById(`deal-${player1.getId()}`).disabled = true;
        }
        if (player1Score === 21) {
            this.doc.getElementById("outcome").innerText = player1.getName().concat(" Wins!");
            this.doc.getElementById(`deal-${player2.getId()}`).disabled = true;
            player1.resetHand();
            player2.resetHand();
            return;
        }
        if (player1Score > 21) {
            this.doc.getElementById("outcome").innerText = player1.getName().concat(" Loses!");
            this.doc.getElementById(`deal-${player2.getId()}`).disabled = true;
            player1.resetHand();
            player2.resetHand();
            return;
        }
        if (player1Score >= 17 && player2Score >= 17) {
            if (player1Score > player2Score) {
                this.doc.getElementById("outcome").innerText = player1.getName().concat(" Wins!");
            } else {
                this.doc.getElementById("outcome").innerText = player2.getName().concat(" Wins!");
            }
            if (player1Score === player2Score) {
                this.doc.getElementById("outcome").innerText = "No Winners!";
            }
            this.doc.getElementById(`deal-${player1.getId()}`).disabled = true;
            this.doc.getElementById(`deal-${player2.getId()}`).disabled = true;
            player1.resetHand();
            player2.resetHand();
        }
    }

    resetFieldsIfPlayerHasBeenReset = (player1, player2) => {
        if (player1.getHand().length === 0 && player2.getHand().length === 0) {
            this.resetFields();
        }
    }

    endGame = () => {
        this.doc.getElementById("outcome").innerText = "Out of cards!";
        this.doc.getElementById("deal-player").disabled = true;
        this.doc.getElementById("deal-dealer").disabled = true;
        this.doc.getElementById("next-round").disabled = true;
    }
};
