

class Button {
    constructor(x, y, width, height, text, color = 'white', lang = russianNames) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pressed = false;
        this.color = color;
        this.text = text;
        this.appendText = '';
    }

    append(appendText) {
        this.appendText = appendText;
    }
}

class Message {
    static showMessage = true;
    constructor(x, y, text, buttonText) {
        this.x = x;
        this.y = y;
        this.width = 450;
        this.height = 350;
        this.pressed = false;
        this.color = "white";
        this.text = text;
        this.buttonText = buttonText;
        this.button = new Button(x, y + this.height / 3, 200, 80, this.buttonText)
    }
}

class Attractions {
    constructor() {
        this.cards = []
        this.activeCount = 1;
        pushAllAttractionsInArray(this.cards);
        this.cards[TOWNHALL_INDEX].active = true;
    }

}

class Player {
    bot = false;
    money = 3;
    bought = false;
    autoskip = false;
    reroll = false;
    constructor(name, order, bot = false) {
        this.bot = bot;
        this.name = name;
        this.order = order;
        this.deck = new Deck(closedGameDeck, false, true);
        this.attractions = new Attractions();
    }

    checkIfActive(attractionIndex) {
        return this.attractions.cards[attractionIndex].active;
    }

    takeMoney(takenMoney) {
        if (takenMoney > this.money) {
            takenMoney = this.money;
            this.money = 0;
        }
        else {
            this.money -= takenMoney;
        }
        return takenMoney;
    }

    getMoney() {
        return this.money;
    }
    getNumberOfCards() {
        return this.deck.cards.length;
    }

    update() {
        this.deck = new Deck(closedGameDeck, false, true);
        this.attractions = new Attractions();
    }
}

class Deck {
    cards = [];
    constructor(sourceDeck = sourceCardsArray, recepientDeck = false, playerDeck = false) {
        this.isShopDeck = (recepientDeck && !playerDeck);
        if (!recepientDeck) {

            if (!playerDeck) {
                let tempArray = [].concat(sourceDeck);
                shuffle(tempArray);
                while ((tempArray.length > 0)) {
                    this.cards.unshift(tempArray.pop());
                };
            }
            else {

                this.addCard(defaultWheatFieldCard);
                this.addCard(defaultBakeryCard);

            }

        }

        else {

            this.updateShopDeck(sourceDeck);

        }
    };

    countCards(nameAndNotType, searchParameter) {
        let count = 0;
        let maxlen = this.cards.length;
        let found = true;
        while (maxlen > 0 && found) {
            found = false;
            if (nameAndNotType) {
                if (this.searchForCardByName(searchParameter, maxlen) !== -1) {
                    found = true;
                    count ++;
                }
            }
            else {
                if (this.searchForCardBySpecification(searchParameter, maxlen) !== -1) {
                    found = true;
                    count ++;
                }
            }
        }
        return count;
    }

    searchForCardBySpecification(searchType, maxlen, minlen = 0) {
        let n = -1;
        for (let currentItem = minlen; currentItem < maxlen; currentItem++) {
            if (n < 0 && (this.cards[currentItem].specification) === searchType) {
                n = currentItem;
            }

        };
        return n;
    }

    searchForCardByName(searchName, maxlen, minlen = 0) {
        let n = -1;
        for (let currentItem = minlen; currentItem < maxlen; currentItem++) {
            if (n < 0 && (this.cards[currentItem].name) === searchName) {
                n = currentItem;
            }

        };
        return n;
    }

    countNonRepeat() {
        let result = 0;
        for (let currentItem = 0; currentItem < this.cards.length; currentItem++) {
            if (this.searchForCardByName(this.cards[currentItem].name, currentItem) < 0) {
                result++;
            }
        };
        return result;
    }
    /*
    (cardArray) => {
        
    }*/

    sortDeckByDiceValue() {
        let replaced = true
        while (replaced) {
            replaced = false;
            for (let currentCard = 0; currentCard < this.cards.length - 1; currentCard++) {
                if (this.cards[currentCard + 1].dyeValueLast < this.cards[currentCard].dyeValueFirst) {

                    let temp = this.cards[currentCard]; //getNewObject(this.cards[currentCard]);
                    this.cards[currentCard] = this.cards[currentCard + 1];
                    this.cards[currentCard + 1] = temp;
                    replaced = true;
                };
            }
        }
    }

    static getNewObject(oldObject) {
        let newObject = new SourceCard(oldObject.dyeValueFirst, oldObject.dyeValuelast, oldObject.type, oldObject.name, oldObject.image, oldObject.properties)
        return newObject
    }

    sortDeck() {

        for (let currentCard = this.cards.length - 1; currentCard > 0; currentCard--) {
            let maxlen = this.cards.length - 1;
            let firstMet = (this.searchForCardByName(this.cards[currentCard].name, maxlen));
            if (firstMet >= 0) {

                while (firstMet >= 0 && maxlen > 0) {
                    if (this.cards[firstMet].name === this.cards[currentCard].name) {
                        let temp = this.cards[firstMet];
                        this.cards[firstMet] = this.cards[maxlen]
                        this.cards[maxlen] = temp
                    }
                    firstMet = (this.searchForCardByName(this.cards[currentCard].name, maxlen));
                    maxlen--;
                };
            }
        }
    }

    updateShopDeck(sourceDeck) {
        let tempArray = sourceDeck.cards;
        let nonRepeatingCards = this.countNonRepeat();
        let currentCard;
        let firstMet = -1;
        let maxlen = this.cards.length;
        while ((nonRepeatingCards < NECESSARYCARDS) && (tempArray.length > 0)) {
            maxlen = this.cards.length - 1;
            currentCard = tempArray.pop();
            firstMet = (this.searchForCardByName(currentCard.name, maxlen));
            if (firstMet < 0) {
                nonRepeatingCards++;
            }
            this.addCard(currentCard);
        };
    }

    getDeckLength() {
        return this.cards.length;
    }
    getCardByIndex(cardIndex) {
        return this.cards[cardIndex];
    }
    removeCardByIndex(cardIndex) {
        this.cards.splice(cardIndex, 1);
    }
    addCard(card) {
        this.cards.unshift(card);
        this.sortDeck();
        this.sortDeckByDiceValue();
    };



    takeCard(card) {
        takenCard = this.cards.pop(card);
        return takenCard;
    };
}