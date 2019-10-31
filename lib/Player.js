export default class Player {

	constructor(id) {
		if (!id) throw "Player constructor requires node id";
        this.hand = [];
        this.id = id;
        this.name = id[0].toUpperCase().concat(id.slice(1).toLowerCase());
	}
	
	addToHand = (card) => {
		this.hand = this.hand.concat(card);
		return this.scoreHand();
	}

    scoreHand = () => {
        return this.hand.reduce((acc, item) => acc + item.value,0);
    }
	
	resetHand = () => {
		this.hand = [];
	}

    getHand() {
        return this.hand;
    }

	getId() {
		return this.id;
	}

	setName = (name) => {
		this.name = name;
	}

	getName = () => {
		return this.name;
	}
}