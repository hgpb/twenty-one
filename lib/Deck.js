export default class Deck {

	constructor() {
	    this.cards = [];
        this.suits = ["clubs", "diamonds", "hearts", "spades"];
        this.values = [
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
        ];
    }

    getCards() {
	    return this.cards;
    }

	create = () => {
        this.cards = [];
        this.suits.forEach((suit) => {
			this.values.forEach((value) => {
				this.cards = this.cards.concat({...value, suit});
			});
		});
        return this;
	};
	
	shuffle = () => {
		this.cards.forEach((item, idx, arry) => {
			const randomIdx = Math.floor(Math.random() * idx);
			const temp = arry[idx];
			arry[idx] = arry[randomIdx];
			arry[randomIdx] = temp;
		});
        return this;
	};
}