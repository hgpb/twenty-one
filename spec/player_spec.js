import Player from "../lib/Player.js";

describe("Player", () => {

    let player;

    beforeEach(() => {
        player = new Player("test-player");
    });

    it("should initialise name correctly", () => {
        expect(player.getId()).toEqual("test-player");
    });

    it("should initialise hand", () => {
        expect(player.getHand()).toEqual([]);
    });

    describe("#addToHand", () => {

        it("should add card to hand", () => {
            const card = { name: "ace", suit: "spades", value: 11 };

            player.addToHand(card);

            expect(player.hand).toEqual([card]);
        });

        it("should add multiple cards to hand", () => {
            const cards = [
                { name: "ace", suit: "clubs", value: 11 },
                { name: "ace", suit: "diamonds", value: 11 }
            ];

            player.addToHand(cards[0]);
            player.addToHand(cards[1]);

            expect(player.hand).toEqual([cards[0], cards[1]]);
        });

        it("should score hand when card is added", () => {
            const cards = [
                { name: "ace", suit: "clubs", value: 11 },
                { name: "ace", suit: "diamonds", value: 11 }
            ];

            player.addToHand(cards[0]);
            let score = player.addToHand(cards[1]);

            expect(score).toBe(22);
        });

    });

    describe("#scoreHand", () => {

        it("should score hand when no cards have been dealt", () => {
            player.hand = [];

            const score = player.scoreHand();

            expect(score).toEqual(0);
        });

        it("should score hand when single card is dealt", () => {
            player.hand = [{ value: 2 }];

            const score = player.scoreHand();

            expect(score).toEqual(2);
        });

        it("should score hand when multiple cards are dealt", () => {
            player.hand = [{ value: 2 }, { value: 5 }];

            const score = player.scoreHand();

            expect(score).toEqual(7);
        });

    });

    describe("#resetHand", () => {

        it("should reset players hand", () => {
            player.hand = [{ value: 2 }, { value: 5 }];

            player.resetHand();

            expect(player.hand).toEqual([]);
        });

    });

    describe("#getHand", () => {

        it("should get players hand", () => {
            player.hand = [{ value: 2 }, { value: 5 }];

            const hand = player.getHand();

            expect(hand).toEqual([{ value: 2 }, { value: 5 }]);
        });

    });

    describe("#getId", () => {

        it("should get players name", () => {
            player.id = "test";

            const id = player.getId();

            expect(id).toEqual("test");
        });

    });

});