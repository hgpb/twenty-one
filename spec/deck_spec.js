import Deck from "../lib/Deck.js";

describe("Deck", () => {
    let deck;

    beforeEach(() => {
        deck = new Deck();
    });

    it("should initialise cards", () => {
        expect(deck.getCards()).toEqual([]);
    });

    it("should initialise suits", () => {
        expect(deck.suits).toEqual(["clubs", "diamonds", "hearts", "spades"]);
    });

    it("should initialise values", () => {
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

        it("should create correct number of hand", () => {
            deck.create();

            expect(deck.getCards().length).toEqual(52);
        });

        it("should create correct set of hand", () => {
            deck.create();

            expect(deck.getCards()[0]).toEqual({name: "ace", value: 11, suit: "clubs"});
            expect(deck.getCards()[51]).toEqual({name: "king", value: 10, suit: "spades"});
        });
    });

    describe("#shuffle", () => {

        beforeEach(() => {
            deck = new Deck();
            deck.create();
        });

        it("should have correct number of hand after shuffle", () => {
            deck.shuffle();

            expect(deck.getCards().length).toEqual(52);
        });

        it("should shuffle deck", () => {
            spyOn(deck, "shuffle").and.callFake(() => deck.cards = [{name: "ace"}]);

            deck.shuffle();

            expect(deck.getCards()).toEqual([{name: "ace"}]);
        });
    });

});
