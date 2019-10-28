export default class Player {

	constructor(name) {
        this.latestCard = {};
        this.cards = [];
        this.name = name;
	}
	
	score = () => {
		return this.cards.reduce((acc,item) => acc + item.value,0);
	}
	
	addToHand = (card) => {
		this.latestCard = card;
		this.cards = this.cards.concat(card);
	}
	
	resetCards = () => {
		this.cards = [];
	}

	getName() {
		return this.name;
	}
}