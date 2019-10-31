import App from "../lib/App.js";
import Deck from "../lib/Deck.js";
import Player from "../lib/Player.js";

describe("App", () => {
    let app;

    beforeEach(() => {
        app = new App(document);
    });

    it("should initialise app selector",() => {
        expect(app.selector).not.toBeUndefined();
    });

    it("should initialise app template",() => {
        expect(app.template).not.toBeUndefined();
    });

    it("should have empty outcome", () => {
        const element = document.getElementById("outcome");

        expect(element.innerText).toBe("");
    });

    describe("#newGame", () => {

        it("should reset fields (spy)", () => {
            const spy = spyOn(app, "resetFields").and.callThrough();

            app.newGame();

            expect(spy).toHaveBeenCalled();
        });

        it("should initialise player", () => {
            app.newGame();

            expect(app.player).not.toBeUndefined();
        });

        it("should initialise dealer", () => {
            app.newGame();

            expect(app.dealer).not.toBeUndefined();
        });

        it("should initialise deck", () => {
            app.newGame();

            expect(app.deck).not.toBeUndefined();
        });

    });

    describe("#onPlayerClick", () => {

        beforeEach(() => {
            app.deck = new Deck().create().shuffle();
            app.player = new Player("player");
            app.dealer = new Player("dealer");
        });

        it("should reset fields (spy)", () => {
            const spy = spyOn(app, "resetFieldsIfPlayerHasBeenReset");

            app.onPlayerClick();

            expect(spy).toHaveBeenCalled();
        });

        it("should add card to hand (spy)", () => {
            const spy = spyOn(app, "addCardToHand");

            app.onPlayerClick();

            expect(spy).toHaveBeenCalled();
        });

        it("should calculate outcome (spy)", () => {
            const spy = spyOn(app, "calculateOutcome");

            app.onPlayerClick();

            expect(spy).toHaveBeenCalled();
        });

    });

    describe("#onDealerClick", () => {

        beforeEach(() => {
            app.deck = new Deck().create().shuffle();
            app.player = new Player("player");
            app.dealer = new Player("dealer");
        });

        it("should add card to hand (spy)", () => {
            const spy = spyOn(app, "addCardToHand");

            app.onDealerClick();

            expect(spy).toHaveBeenCalled();
        });

        it("should reset fields (spy)", () => {
            const spy = spyOn(app, "resetFieldsIfPlayerHasBeenReset");

            app.onDealerClick();

            expect(spy).toHaveBeenCalled();
        });

        it("should calculate outcome (spy)", () => {
            const spy = spyOn(app, "calculateOutcome");

            app.onDealerClick();

            expect(spy).toHaveBeenCalled();
        });

    });

    describe("#addCardToHand", () => {
        let deck;
        let player;
        let dealer;

        beforeEach(() => {
            deck = new Deck().create().shuffle();
            player = new Player("player");
            dealer = new Player("dealer");
        });

        it("should add cards to players hand", () => {

            app.addCardToHand(deck.getTopCard(), player);
            app.addCardToHand(deck.getTopCard(), player);

            const element = document.getElementById("player").getElementsByClassName("cards")[0];
            expect(element.querySelectorAll(".card").length).toBe(2);
        });

        it("should add cards to dealers hand", () => {

            app.addCardToHand(deck.getTopCard(), dealer);
            app.addCardToHand(deck.getTopCard(), dealer);

            const element = document.getElementById("dealer").getElementsByClassName("cards")[0];
            expect(element.querySelectorAll(".card").length).toBe(2);
        });

        it("should add card to players hand (spy)", () => {
            const spy = spyOn(player, "addToHand").and.callThrough();

            app.addCardToHand(deck.getTopCard(), player);

            expect(spy).toHaveBeenCalled();
        });

        it("should get correct player node id (spy)", () => {
            const spy = spyOn(player, "getId").and.callThrough();

            app.addCardToHand(deck.getTopCard(), player);

            expect(spy).toHaveBeenCalled();
        });

        it("should add card to player node(spy)", () => {
            const spy = spyOn(app, "addCardToNode");

            app.addCardToHand(deck.getTopCard(), player);

            expect(spy).toHaveBeenCalled();
        });

        it("should add score to node (spy)", () => {
            const spy = spyOn(app, "addScoreToNode");

            app.addCardToHand(deck.getTopCard(), player);

            expect(spy).toHaveBeenCalled();
        });

        it("should have correct number of cards in deck after adding to player and dealer", () => {

            app.addCardToHand(deck.getTopCard(), player);
            app.addCardToHand(deck.getTopCard(), player);
            app.addCardToHand(deck.getTopCard(), dealer);
            app.addCardToHand(deck.getTopCard(), dealer);

            expect(deck.cards.length).toBe(48);
        });

        it("should end game if no more cards exist (spy)", () => {
            const spy = spyOn(app, "endGame");
            deck.cards = [];

            app.addCardToHand(deck.getTopCard(), player);

            expect(spy).toHaveBeenCalled();
        });

    });

    describe("#addCardToNode", () => {
        const card = { name: "ace", suit: "clubs", value: 11 };

        it("should create card node (spy)", () => {
            const spy = spyOn(app, "createCardNode").and.callThrough();

            app.addCardToNode("player",card);

            expect(spy).toHaveBeenCalled();
        });

        it("should create card node", () => {

            app.addCardToNode("player",card);

            const element = document.getElementById("player")
                .getElementsByClassName("cards")[0]
                .getElementsByClassName("card")[0];

            expect(element.getAttribute("class")).toContain("card clubs ace");
        });

    });

    describe("#addScoreToNode", () => {

        it("should add score to node", () => {

            app.addScoreToNode("player", 10);

            const element = document.getElementById("player")
                .getElementsByClassName("score")[0];

            expect(element.innerText).toContain("10");
        });

    });

    describe("#createCardNode", () => {
        const card = { name: "ace", suit: "clubs", value: 11 };

        it("should be a div", () => {

            const element = app.createCardNode(card);

            expect(element.tagName).toBe("DIV");
        });

        it("should have correct class assignment", () => {

            const element = app.createCardNode(card);

            expect(element.getAttribute("class")).toContain("card clubs ace");
        });

    });

    describe("#calculateOutcome", () => {
        let player;
        let dealer;

        beforeEach(() => {
            player = new Player("player");
            dealer = new Player("dealer");
        });

        it("should not display outcome if player AND dealer have less than or equal to 17", () => {
            player.hand = [{ name: "ace", suit: "clubs", value: 11 }];
            dealer.hand = [{ name: "ace", suit: "spades", value: 11 }];

            app.calculateOutcome(player, dealer);

            const element = document.getElementById("outcome");

            expect(element.innerText).toBe("");
        });

        it("should not display outcome if player has more than or equal to 17 and less than 21 and dealer has less than 17", () => {
            player.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "six", suit: "clubs", value: 6 }];
            dealer.hand = [{ name: "ace", suit: "spades", value: 11 }];

            app.calculateOutcome(player, dealer);

            const element = document.getElementById("outcome");

            expect(element.innerText).toBe("");
        });

        it("should not display outcome if dealer has more than or equal to 17 and less than 21 and player has less than 17", () => {
            player.hand = [{ name: "ace", suit: "spades", value: 11 }];
            dealer.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "six", suit: "clubs", value: 6 }];

            app.calculateOutcome(player, dealer);

            const element = document.getElementById("outcome");

            expect(element.innerText).toBe("");
        });

        it("should display outcome if player and dealer have more than or equal to 17 and less than or equal to 21", () => {
            player.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "six", suit: "clubs", value: 6 }];
            dealer.hand = [{ name: "ace", suit: "spades", value: 11 }, { name: "seven", suit: "spades", value: 7 }];

            app.calculateOutcome(player, dealer);

            const element = document.getElementById("outcome");

            expect(element.innerText).toContain("Dealer Wins!");
        });

        it("should display outcome if dealer and player get same value which is more than or equal to 17 and less than or equal to 21", () => {
            player.hand = [{ name: "ace", suit: "spades", value: 11 }, { name: "nine", suit: "diamonds", value: 9 }];
            dealer.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "nine", suit: "hearts", value: 9 }];

            app.calculateOutcome(dealer, player); // order is important

            const element = document.getElementById("outcome");

            expect(element.innerText).toContain("No Winners!");
        });

        it("should display outcome if player gets 21", () => {
            player.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "jack", suit: "clubs", value: 10 }];
            dealer.hand = [];

            app.calculateOutcome(player, dealer); // order is important

            const element = document.getElementById("outcome");

            expect(element.innerText).toContain("Player Wins!");
        });

        it("should display outcome if dealer gets 21", () => {
            player.hand = [];
            dealer.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "jack", suit: "clubs", value: 10 }];

            app.calculateOutcome(dealer, player); // order is important

            const element = document.getElementById("outcome");

            expect(element.innerText).toContain("Dealer Wins!");
        });

        it("should display outcome if player gets more than 21", () => {
            player.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "ace", suit: "hearts", value: 11 }];
            dealer.hand = [];

            app.calculateOutcome(player, dealer); // order is important

            const element = document.getElementById("outcome");

            expect(element.innerText).toContain("Player Loses!");
        });

        it("should display outcome if dealer gets more than 21", () => {
            player.hand = [];
            dealer.hand = [{ name: "ace", suit: "clubs", value: 11 }, { name: "ace", suit: "hearts", value: 11 }];

            app.calculateOutcome(dealer, player); // order is important

            const element = document.getElementById("outcome");

            expect(element.innerText).toContain("Dealer Loses!");
        });

    });

    describe("#resetFieldsIfPlayerHasBeenReset", () => {
        let spy;
        let player;
        let dealer;

        beforeEach(() => {
            spy = spyOn(app, "resetFields").and.callThrough();
            player = new Player("player");
            dealer = new Player("dealer");
        });

        it("should reset fields if player and dealer hands are empty (spy)", () => {
            player.hand = [];
            dealer.hand = [];

            app.resetFieldsIfPlayerHasBeenReset(dealer, player);

            expect(spy).toHaveBeenCalled();
        });

        it("should not reset fields if player hand exists (spy)", () => {
            player.hand = [{ name: "ace", suit: "clubs", value: 11 }];
            dealer.hand = [];

            app.resetFieldsIfPlayerHasBeenReset(dealer, player);

            expect(spy).not.toHaveBeenCalled();
        });

        it("should not reset fields if dealer hand exists (spy)", () => {
            player.hand = [];
            dealer.hand = [{ name: "ace", suit: "clubs", value: 11 }];

            app.resetFieldsIfPlayerHasBeenReset(dealer, player);

            expect(spy).not.toHaveBeenCalled();
        });

        it("should not reset fields if dealer and player hands exist (spy)", () => {
            player.hand = [{ name: "ace", suit: "spades", value: 11 }];
            dealer.hand = [{ name: "ace", suit: "clubs", value: 11 }];

            app.resetFieldsIfPlayerHasBeenReset(dealer, player);

            expect(spy).not.toHaveBeenCalled();
        });

    });

    describe("#endGame", () => {

        it("should set outcome", () => {

            app.endGame();

            const element = document.getElementById("outcome");
            expect(element.innerText).toContain("Out of cards!");
        });

        it("should disable player button", () => {

            app.endGame();

            const element = document.getElementById("deal-player");
            expect(element.disabled).toBeTruthy();
        });

        it("should disable dealer button", () => {

            app.endGame();

            const element = document.getElementById("deal-dealer");
            expect(element.disabled).toBeTruthy();
        });

        it("should disable next round button", () => {

            app.endGame();

            const element = document.getElementById("next-round");
            expect(element.disabled).toBeTruthy();
        });

    });

    describe("#resetFields", () => {

        it("should clear card nodes from player node", () => {
            const element = document.getElementById("player").getElementsByClassName("cards")[0];
            const cardNode = document.createElement("div");
            cardNode.setAttribute("class", "card");
            element.append(cardNode);

            expect(element.querySelectorAll(".card").length).toBe(1);

            app.resetFields();

            expect(element.querySelectorAll(".card").length).toBe(0);
        });

        it("should clear score node from player node", () => {
            const element = document.getElementById("player").getElementsByClassName("score")[0];
            element.innerText = "11";

            app.resetFields();

            expect(element.innerText).toBe("?");
        });

        it("should clear outcome node", () => {
            const element = document.getElementById("outcome");
            element.innerText = "test";

            app.resetFields();

            expect(element.innerText).toBe("");
        });

        it("should enable players deal button when disabled", () => {
            const element = document.getElementById("deal-player");
            element.disabled = true;

            app.resetFields();

            expect(element.disabled).toBeFalsy();
        });

        it("should enable dealers deal button when disabled", () => {
            const element = document.getElementById("deal-dealer");
            element.disabled = true;

            app.resetFields();

            expect(element.disabled).toBeFalsy();
        });

    });

});