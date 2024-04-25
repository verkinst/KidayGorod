const DYE_VALUE_ONE = 1;
const DYE_VALUE_TWO = 2;
const DYE_VALUE_THREE = 3;
const DYE_VALUE_FOUR = 4;
const DYE_VALUE_FIVE = 5;
const DYE_VALUE_SIX = 6;
const DYE_VALUE_SEVEN = 7;
const DYE_VALUE_EIGHT = 8;
const DYE_VALUE_NINE = 9;
const DYE_VALUE_TEN = 10;
const DYE_VALUE_ELEVEN = 11;
const DYE_VALUE_TWELVE = 12;
const DYE_VALUE_THIRTEEN = 13;
const DYE_VALUE_FOURTEEN = 14;

const TOWNHALL_INDEX = 0;
const RAILWAY_INDEX = 1;
const SHOPPINGMALL_INDEX = 2;
const RADIOTOWER_INDEX = 3;
const HARBOR_INDEX = 4;
const AMUSEMENTPARK_INDEX = 5;
const AIRPORT_INDEX = 6;

const BLUE_TYPE = 0;
const GREEN_TYPE = 1;
const RED_TYPE = 2;
const TYPE_ATTRACTION = 3;

const TYPE_AGRO = 0;
const TYPE_BOAT = 1;
const TYPE_FACTORY = 2;
const TYPE_MYASO = 3;
const TYPE_OFFICE = 4;
const TYPE_RESOURCE = 5;
const TYPE_RESTAURANT = 6;
const TYPE_RETAIL = 7;
const TYPE_VEGETABLE = 8;

const CARD_COLORS = ['blue', 'green', 'red'];

const COUNT_OF_DEFAULT_BUILDINGS = 6;

class Properties {
    constructor() {
        this.propertiesArray = [];
    }

    addProp(name, cost, condition, income = 0, dyeValueFirst = 0, dyeValueLast = 0, type = 0, incomeFunction = false, specification = 0) {
        let item = {
            dyeValueFirst: dyeValueFirst,
            dyeValueLast: dyeValueLast,
            specification: specification,
            type: type,
            name: name,
            properties: {
                cost: cost,
                condition: condition,
                incomeFunction: incomeFunction,
                income: income
            }

        }
        this.propertiesArray.push(item);
    };

    searchForProp(searchName) {
        let n = 0;
        for (let currentItem = 0; currentItem < this.propertiesArray.length; currentItem++) {
            if ((this.propertiesArray[currentItem].name) === searchName) {
                n = currentItem;
            }

        };
        return n;
    }

    getProp(name) {
        return this.propertiesArray[this.searchForProp(name)];
    }
}

class SourceCard {

    constructor(dyeValueFirst, dyeValueLast, type, name, image, properties, specification =0) {
        this.dyeValueFirst = dyeValueFirst;
        this.dyeValueLast = dyeValueLast;
        this.specification = specification;
        this.type = type;
        this.name = name;
        this.image = image;
        this.properties = properties.properties;
        this.sellable = true;
        this.count;
    }
}

class AttractionCard {
    constructor(name, image, effectProperties, active = false) {
        this.name = name;
        this.image = image;
        this.properties = effectProperties.properties;
        this.active = active;
    }
}





function pushSourceArray(name, image, sourceArray) {
    let effectProperties = properties.getProp(name);
    let currentCard = new SourceCard(effectProperties.dyeValueFirst, effectProperties.dyeValueLast, effectProperties.type, name, image, effectProperties, effectProperties.specification);
    sourceArray.push(currentCard);
}

let properties = new Properties();

properties.addProp("townHall", 1, true, 1);
properties.addProp("railway", 4, true, 0);
properties.addProp("shoppingMall", 10, true, 0);
properties.addProp("radioTower", 16, true, 0);
properties.addProp("harbor", 2, true, 0);
properties.addProp("amusementPark", 22, true, 1);
properties.addProp("airport", 30, true, 1);

//default
function returnTrue() {
    return true;
}
function hasLessThanTwoAttr(player) {
    return (player.attractions.activeCount < 2);
}
function hasPort(player) {
    return (player.attractions.cards[HARBOR_INDEX].active);
}
function getDyeValue(player, dye) {
    return (dye)
}
function countSomething(countable, whereCount, name = true) {
    let result = 0;
    if (name) {
        for (index = 0; index < whereCount.deck.cards.length; index++) {
            if (whereCount.deck.cards[index].name === countable) {
                result++;
            }
        }
    }
    else {
        for (index = 0; index < whereCount.deck.cards.length; index++) {
            if (whereCount.deck.cards[index].specification === countable) {
                result++;
            }
        }
    }
    return result;
}
function countFlowerPlants(player, dye) {
    return (countSomething("flowerPlant", player))
}

function countCheeseFactories(player) {
    return (countSomething("livestockFarm", player))
}

function countResourceObjects(player) {
    return (countSomething(TYPE_RESOURCE, player, false))
}

function hasLessThanTwoAttr(player) {
    return (player.attractions.activeCount < 2)
}

function hasMoreThanOneAttr(player) {
    return (player.attractions.activeCount > 1)
}

function hasMoreThanTwoAttr(player) {
    return (player.attractions.activeCount > 2)
}

function countVinegarPlants(player) {
    return (countSomething("vinegarPlant", player))
}

function giveBuilding(player) {

}

function allMoney(player) {
    return (player.getMoney())
}

function countRestaurants(player) {
    return (countSomething(TYPE_RESTAURANT, player, false))
}

function countAgrofields(player) {
    return (countSomething(TYPE_AGRO, player, false))
}



properties.addProp("wheatField", 1, returnTrue, 1, DYE_VALUE_ONE, DYE_VALUE_ONE, BLUE_TYPE, false, TYPE_AGRO);
properties.addProp("bakery", 1, returnTrue, 1, DYE_VALUE_TWO, DYE_VALUE_THREE, GREEN_TYPE, false, TYPE_RETAIL);
properties.addProp("retailShop", 2, returnTrue, 3, DYE_VALUE_FOUR, DYE_VALUE_FOUR, GREEN_TYPE, false, TYPE_RETAIL);
properties.addProp("cafe", 3, returnTrue, 1, DYE_VALUE_FIVE, DYE_VALUE_FIVE, RED_TYPE, false, TYPE_RESTAURANT);
properties.addProp("forest", 3, returnTrue, 2, DYE_VALUE_SIX, DYE_VALUE_SIX, BLUE_TYPE, false, TYPE_RESOURCE);
properties.addProp("mine", 6, returnTrue, 5, DYE_VALUE_NINE, DYE_VALUE_NINE, BLUE_TYPE, false, TYPE_RESOURCE);
properties.addProp("orchard", 3, returnTrue, 3, DYE_VALUE_TEN, DYE_VALUE_TEN, BLUE_TYPE, false, TYPE_AGRO);
properties.addProp("livestockFarm", 1, returnTrue, 1, DYE_VALUE_TWO, DYE_VALUE_TWO, BLUE_TYPE, false, TYPE_MYASO);
properties.addProp("flowerPlant", 2, returnTrue, 1, DYE_VALUE_FOUR, DYE_VALUE_FOUR, BLUE_TYPE, false, TYPE_AGRO);
properties.addProp("vinegarPlant", 3, returnTrue, 3, DYE_VALUE_SEVEN, DYE_VALUE_SEVEN, BLUE_TYPE, false, TYPE_AGRO);
properties.addProp("cornField", 2, hasLessThanTwoAttr, 1, DYE_VALUE_THREE, DYE_VALUE_FOUR, BLUE_TYPE, false, TYPE_AGRO);
properties.addProp("fishermanBoat", 2, hasPort, 3, DYE_VALUE_EIGHT, DYE_VALUE_EIGHT, BLUE_TYPE, false, TYPE_BOAT);
properties.addProp("trauler", 5, hasPort, getDyeValue, DYE_VALUE_TWELVE, DYE_VALUE_FOURTEEN, BLUE_TYPE, true, TYPE_BOAT);
properties.addProp("departmentStore", 0, hasLessThanTwoAttr, 2, DYE_VALUE_TWO, DYE_VALUE_TWO, GREEN_TYPE, false, TYPE_RETAIL);
//properties.addProp("demolishCompany", 1, mustDemolish, 1, DYE_VALUE_FOUR, DYE_VALUE_, BLUE_TYPE, false, TYPE_OFFICE);
//properties.addProp("creditBureau", 0, returnTrue, -1, DYE_VALUE_FIVE, DYE_VALUE_SIX, BLUE_TYPE, false, TYPE_OFFICE);
properties.addProp("flowerShop", 1, returnTrue, countFlowerPlants, DYE_VALUE_SIX, DYE_VALUE_SIX, GREEN_TYPE, true, TYPE_RETAIL);
properties.addProp("creamery", 5, returnTrue, countCheeseFactories, DYE_VALUE_SEVEN, DYE_VALUE_SEVEN, GREEN_TYPE, true, TYPE_FACTORY);
properties.addProp("furnitureFactory", 3, returnTrue, countResourceObjects, DYE_VALUE_EIGHT, DYE_VALUE_EIGHT, GREEN_TYPE, true, TYPE_FACTORY);
properties.addProp("winery", 3, returnTrue, countVinegarPlants, DYE_VALUE_NINE, DYE_VALUE_NINE, GREEN_TYPE, true, TYPE_FACTORY);
properties.addProp("sushiBar", 4, hasPort, 3, DYE_VALUE_ONE, DYE_VALUE_ONE, RED_TYPE, false, TYPE_RESTAURANT);
properties.addProp("restaurant", 3, hasMoreThanOneAttr, 5, DYE_VALUE_FIVE, DYE_VALUE_FIVE, RED_TYPE, false, TYPE_RESTAURANT);
properties.addProp("pizzeria", 1, returnTrue, 1, DYE_VALUE_SEVEN, DYE_VALUE_SEVEN, RED_TYPE, false, TYPE_RESTAURANT);
properties.addProp("burgerShop", 1, returnTrue, 1, DYE_VALUE_EIGHT, DYE_VALUE_EIGHT, RED_TYPE, false, TYPE_RESTAURANT);
properties.addProp("bistro", 3, returnTrue, 2, DYE_VALUE_NINE, DYE_VALUE_TEN, RED_TYPE, false, TYPE_RESTAURANT);
properties.addProp("eliteBar", 4, hasMoreThanTwoAttr, allMoney, DYE_VALUE_TWELVE, DYE_VALUE_FOURTEEN, RED_TYPE, true, TYPE_RESTAURANT);
properties.addProp("transportCompany", 1, returnTrue, giveBuilding, DYE_VALUE_NINE, DYE_VALUE_TEN, BLUE_TYPE, false, TYPE_OFFICE);
properties.addProp("drinkCompany", 5, returnTrue, countRestaurants, DYE_VALUE_ELEVEN, DYE_VALUE_ELEVEN, GREEN_TYPE, true, TYPE_FACTORY);
properties.addProp("vegetableStore", 2, returnTrue, countAgrofields, DYE_VALUE_ELEVEN, DYE_VALUE_TWELVE, GREEN_TYPE, true, TYPE_VEGETABLE);
properties.addProp("productStorage", 2, returnTrue, 2 * countRestaurants, DYE_VALUE_TWELVE, DYE_VALUE_THIRTEEN, GREEN_TYPE, true, TYPE_FACTORY);

let defaultBakeryCard = new SourceCard(DYE_VALUE_TWO, DYE_VALUE_THREE, GREEN_TYPE, "bakery", 0, properties.getProp("bakery"), TYPE_RETAIL);
defaultBakeryCard.sellable = false;
let defaultWheatFieldCard = new SourceCard(DYE_VALUE_ONE, DYE_VALUE_ONE, BLUE_TYPE, "wheatField", 0, properties.getProp("wheatField"), TYPE_AGRO);
defaultWheatFieldCard.sellable = false;

function pushAttractionsArray(array, name, image, effectText, effectProperties) {
    let currentCard = new AttractionCard(name, image, effectText, effectProperties);
    array.push(currentCard);
}

function pushAllAttractionsInArray(array) {
    pushAttractionsArray(array, "townHall", 0/* lang.townHallImage*/, properties.getProp("townHall"));
    pushAttractionsArray(array, "railway", 0/* lang.railwayImage*/, properties.getProp("railway"));
    pushAttractionsArray(array, "shoppingMall", 0/* lang.shoppingMallImage*/, properties.getProp("shoppingMall"));
    pushAttractionsArray(array, "radioTower", 0/* lang.radioTowerImage*/, properties.getProp("radioTower"));
    pushAttractionsArray(array, "harbor", 0/* lang.harborImage*/, properties.getProp("harbor"));
    pushAttractionsArray(array, "amusementPark", 0/* lang.amusementParkImage*/, properties.getProp("amusementPark"));
    pushAttractionsArray(array, "airport", 0/* lang.airportImage*/, properties.getProp("airport"));
}



function initiateShopDeck(players, sourceArray) {
    for (repeatIndex = 0; repeatIndex < COUNT_OF_DEFAULT_BUILDINGS; repeatIndex++) {
        pushSourceArray("bakery", 0, sourceArray);
        pushSourceArray("wheatField", 0, sourceArray);
        pushSourceArray("retailShop", 0, sourceArray);
        pushSourceArray("cafe", 0, sourceArray);
        pushSourceArray("forest", 0, sourceArray);
        pushSourceArray("mine", 0, sourceArray);
        pushSourceArray("orchard", 0, sourceArray);
        pushSourceArray("livestockFarm", 0, sourceArray);
        pushSourceArray("flowerPlant", 0, sourceArray);
        pushSourceArray("vinegarPlant", 0, sourceArray);
        pushSourceArray("cornField", 0, sourceArray);
        pushSourceArray("fishermanBoat", 0, sourceArray);
        pushSourceArray("trauler", 0, sourceArray);
        pushSourceArray("departmentStore", 0, sourceArray);
        //pushSourceArray("demolishCompany", 0, sourceArray);
        //pushSourceArray("creditBureau", 0, sourceArray);
        pushSourceArray("flowerShop", 0, sourceArray);
        pushSourceArray("creamery", 0, sourceArray);
        pushSourceArray("furnitureFactory", 0, sourceArray);
        pushSourceArray("winery", 0, sourceArray);
        pushSourceArray("sushiBar", 0, sourceArray);
        pushSourceArray("restaurant", 0, sourceArray);
        pushSourceArray("pizzeria", 0, sourceArray);
        pushSourceArray("burgerShop", 0, sourceArray);
        pushSourceArray("bistro", 0, sourceArray);
        pushSourceArray("eliteBar", 0, sourceArray);
        //pushSourceArray("transportCompany", 0, sourceArray);
        pushSourceArray("drinkCompany", 0, sourceArray);
        pushSourceArray("vegetableStore", 0, sourceArray);
        pushSourceArray("productStorage", 0, sourceArray);
    }
}
