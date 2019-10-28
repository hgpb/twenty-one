import Deck from "../lib/Deck.js";

describe("Deck", () => {
    let deck;

    beforeEach(() => {
        deck = new Deck();
    });

    it("should initialise cards", () => {
        expect(deck.cards).toEqual([]);
    });

    it("should set suits", () => {
        expect(deck.suits).toEqual(["clubs", "diamonds", "hearts", "spades"]);
    });

    it("should set values", () => {
        expect(deck.values).toEqual([
            { name: "ace", value: 11 },
            { name: "two", value: 2 },
            { name: "three", value: 3 },
            { name: "four", value: 4 },
            { name: "five", value: 5 },
            { name: "six", value: 6 },
            { name: "seven", value: 7 },
            { name: "eight", value: 8 },
            { name: "nine", value: 9 },
            { name: "ten", value: 10 },
            { name: "jack", value: 10 },
            { name: "queen", value: 10 },
            { name: "king", value: 10 }
        ]);
    });

    describe("#create", () => {

        beforeEach(() => {
            deck = new Deck();
        });

        it("should create correct number of cards", () => {
            deck.create();

            expect(deck.cards.length).toEqual(52);
        });

        it("should create correct set of cards", () => {
            deck.create();

            expect(deck.cards[0]).toEqual({name: "ace", value: 11, suit: "clubs"});
            expect(deck.cards[51]).toEqual({name: "king", value: 10, suit: "spades"});
        });
    });

    describe("#shuffle", () => {

        beforeEach(() => {
            deck = new Deck();
            deck.create();
        });

        it("should have correct number of cards after shuffle", () => {
            deck.shuffle();

            expect(deck.cards.length).toEqual(52);
        });

        it("should shuffle deck", () => {
            spyOn(deck, "shuffle").and.callFake(() => deck.cards = [{name: "ace"}]);

            deck.shuffle();

            expect(deck.cards).toEqual([{name: "ace"}]);
        });
    });

});
