'use strict'

const CAMERA_TRANSITION = 0.07;
const TRANSITION_DELAY = 0.2;

const GAME_STATE_MENU = 0;
const GAME_STATE_GAME = 1;
const GAME_STATE_END = 2;
const GAME_STATE_PAUSE = 3;

const NECESSARYCARDS = 10;

const CARD_WIDTH = 140;
const CARD_HEIGHT = CARD_WIDTH / 2 * 3;
const CARD_SELECT_FRAME_WIDTH = 3;
const CARD_SELECT_FRAME_HEIGHT = 3;
const MENU_BUTTONS_HEIGHT = CARD_HEIGHT / 3;

const DISTANCE_BETWEEN_CLOSED_CARDS = CARD_WIDTH / 6;
const DISTANCE_BETWEEN_SHOP_CARDS = CARD_WIDTH * 1.2;
const DISTANCE_BETWEEN_OTHER_CARDS = CARD_HEIGHT / 9;
const DISTANCE_BETWEEN_MENU_BUTTONS = MENU_BUTTONS_HEIGHT * 1.2;

const PLAYER_CARDS_WIDTH = 0.8 * (canvas.width / 2 - CARD_WIDTH);
const MAX_VISIBLE_OTHER_CARDS = 12;
const MAX_VISIBLE_SELF_CARDS = 5;

const LOG_HEIGHT = CARD_HEIGHT*1.5;
const OFFSET_LEFT = -300;
const OFFSET_TOP = -300;
const OFFSET_RIGHT_LOG = canvas.width / 2 - CARD_WIDTH * 2;
const OFFSET_RIGHT_ATTRACTIONS = CARD_WIDTH;
const OFFSET_LEFT_INFO = -canvas.width / 2 + CARD_WIDTH * 2;
const OFFSET_LEFT_TEXT = -CARD_WIDTH * 1.5;
const OFFSET_LEFT_ALL_CARDS = -CARD_WIDTH * 1.5;
const OFFSET_LEFT_SHOP = OFFSET_LEFT_ALL_CARDS;
const OFFSET_TOP_CLOSED_CARDS = 5;
const OFFSET_TOP_PLAYER_CARDS = OFFSET_TOP_CLOSED_CARDS + CARD_HEIGHT * 1.5;
const OFFSET_TOP_SHOP_CARDS = OFFSET_TOP_CLOSED_CARDS + CARD_HEIGHT * 3;
const OFFSET_OTHER_PLAYER_DECK = CARD_WIDTH * 1.5;
const OFFSET_TOP_OTHER_CARDS = 0;
const OFFSET_TOP_OTHER_DRAW_CARDS = OFFSET_TOP_OTHER_CARDS + 0.75 * CARD_HEIGHT;
const OFFSET_TOP_LOG = -CARD_HEIGHT / 2;
const OTHER_DECKS_HIDDEN_OFFSET = 200;

const GM_PRETTY = 0;
const GM_PRODUCTIVITY = 1;

let offsetLeftPlayerCards = -CARD_WIDTH * 1.5;

let lang = russianNames;
let sourceCardsArray = [];
let SizeMultiplier = 1;
let gameState = GAME_STATE_GAME;
let graphics_mode = GM_PRODUCTIVITY;

const MOVE_SPEED = 5;
let turnCounter = 1;

let doubleThrown = false;

let offset_left_shop = OFFSET_LEFT_SHOP;


function kek() {
    let a = 1;
    let b = 2;
    return { a, b };
}


let camera = {
    x: 0,
    y: 0,
    targetX: 0, //MENU_POS.x,
    targetY: 0, //MENU_POS.y,
}

let throwFirst = 0;
let language = "russian";
let throwSecond = 0;


//кнопки для броска при активном вокзале
let buttonThrowOne = new Button(- CARD_WIDTH, 0, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonThrowOne");
let buttonThrowTwo = new Button(CARD_WIDTH, 0, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonThrowTwo");

//пропуск хода
let buttonSkip = new Button(0, 0, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonSkip");

//кнопки в игровом меню
let buttonOpenMenu = new Button(-canvas.width / 2 + CARD_WIDTH, -canvas.height / 2 + CARD_HEIGHT / 2, MENU_BUTTONS_HEIGHT, MENU_BUTTONS_HEIGHT, "buttonOpenMenu");

let buttonAutoskip = new Button(-canvas.width / 2 + CARD_WIDTH, -canvas.height / 2 + CARD_HEIGHT / 2, CARD_WIDTH * 1.5, CARD_HEIGHT / 4, "buttonAutoskip", '#ff5349');
let buttonSkipControl = new Button(-canvas.width / 2 + CARD_WIDTH * 3, -canvas.height / 2 + CARD_HEIGHT / 2, CARD_WIDTH * 1.5, CARD_HEIGHT / 4, "buttonSkip");
let buttonHidOtherPlayersControl = new Button(-canvas.width / 2 + CARD_WIDTH * 3, -canvas.height / 2 + CARD_HEIGHT, CARD_WIDTH * 1.5, CARD_HEIGHT / 4, "buttonHid");
let buttonReturnToMenuControl = new Button(-canvas.width / 2 + CARD_WIDTH, -canvas.height / 2 + CARD_HEIGHT, CARD_WIDTH * 1.5, CARD_HEIGHT / 4, "buttonReturnToMenu");

//кнопки главного меню
let buttonStartNewGame = new Button(0, -DISTANCE_BETWEEN_MENU_BUTTONS, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonStartNewGame");
let buttonSetLanguage = new Button(0, DISTANCE_BETWEEN_MENU_BUTTONS, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonSetLanguage");
let buttonSetPlayers = new Button(0, DISTANCE_BETWEEN_MENU_BUTTONS * 2, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonSetPlayers");
let buttonSetPlayWithBot = new Button(0, DISTANCE_BETWEEN_MENU_BUTTONS * 3, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonSetPlayWithBot")

//кнопки при активном порте
let buttonAddTwo = new Button(- CARD_WIDTH, 0, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonAddTwo");
let buttonDoNotAddTwo = new Button(CARD_WIDTH, 0, CARD_WIDTH * 1.5, MENU_BUTTONS_HEIGHT, "buttonDoNotAddTwo");
buttonSetLanguage.append(language);
buttonSetPlayWithBot.append(false);

//сообщение о том, выпал ли дубль
let messageDouble = new Message(0, 0, "messageDoubleThrown", "messageOk");
let currentMessage = messageDouble;

let lineStart = 0;
let maxLineCount = 1;
let logString = '';
let throwResult = 0;
let closedGameDeck = new Deck(sourceCardsArray, false);
let shopDeck = new Deck(closedGameDeck, true);

let showMessage = true;
let numberOfPlayers = 3;
let firstPlayer = new Player("Donbass", 1);
let secondPlayer = new Player("Андрей", 2, true);
let thirdPlayer = new Player("Саня", 3, true);
let players = [firstPlayer, secondPlayer, thirdPlayer];
let currentPlayer = firstPlayer;
let distanceBetweenPlayerCards = CARD_WIDTH * 1.2;
let somethingBuilt = false;
let winner = firstPlayer;
let otherDecksHidden = false;
/*
firstPlayer.attractions.cards[RADIOTOWER_INDEX].active = true;
doubleThrown = true;*/



startNewGame();

doubleThrown = true;

function startNewGame() {
    logString= '';
    sourceCardsArray = [];
    turnCounter = 1;
    gameState = GAME_STATE_GAME;
    initiateShopDeck(numberOfPlayers, sourceCardsArray);
    buttonSetPlayers.append(numberOfPlayers);
    closedGameDeck = new Deck(sourceCardsArray, false);
    firstPlayer.update();
    secondPlayer.update();
    thirdPlayer.update();
    shopDeck = new Deck(closedGameDeck, true);
}

function fillScreen() {
    drawRect(camera.x, camera.y, canvas.width / SizeMultiplier, canvas.height / SizeMultiplier, 0, '#474747');
}

function getTop(group) {
    let top = group[0];
    for (let index = 0; index < group.length; index++) {
        if (group[index].money > top.money) {
            top = group[index]
        }
    }
    return top;
}

function drawDeck(delayedCard, deck, offsetLeft, offsetTop, mainDist = CARD_WIDTH, condition = false, condDist = mainDist, text = '', offsetLeftText = OFFSET_LEFT) {
    if (text !== '') {
        drawText(offsetLeftText, offsetTop - CARD_WIDTH, text);
    }
    let distanceBetweenCards = mainDist;
    if (condition || (!deck.isShopDeck && otherDecksHidden)) {
        distanceBetweenCards = condDist;
    }
    let unrepeatingCard = 0;
    let repeatingCard = 0;
    for (let deckIndex = 0; deckIndex < deck.getDeckLength(); deckIndex++) {
        if (deckIndex > 0) {
            if (deck.getCardByIndex(deckIndex).name === deck.getCardByIndex(deckIndex - 1).name) {
                repeatingCard++;
                if (!deck.isShopDeck && graphics_mode === GM_PRETTY) {
                    if (otherDecksHidden || deck.isShopDeck) {
                        delayedCard = drawCard(deck.getCardByIndex(deckIndex), -CARD_WIDTH * 4 + offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop + repeatingCard * (CARD_HEIGHT / 5), delayedCard);
                    }
                    else {
                        delayedCard = drawCard(deck.getCardByIndex(deckIndex), offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop + repeatingCard * (CARD_HEIGHT / 24), delayedCard);
                    }
                }
                else {
                    //drawRect(offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop - CARD_HEIGHT/1.8, CARD_HEIGHT*0.2)
                    drawText(offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop - CARD_HEIGHT / 1.8, repeatingCard + 1)
                }

            }
            else {

                repeatingCard = 0;
                unrepeatingCard++;
                if (otherDecksHidden || deck.isShopDeck) {
                    delayedCard = drawCard(deck.getCardByIndex(deckIndex), -CARD_WIDTH * 4 + offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop, delayedCard);
                }
                else {
                    delayedCard = drawCard(deck.getCardByIndex(deckIndex), offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop, delayedCard);
                }
            }
        }
        else {

            repeatingCard = 0;
            unrepeatingCard++;
            if (otherDecksHidden || deck.isShopDeck) {
                delayedCard = drawCard(deck.getCardByIndex(deckIndex), -CARD_WIDTH * 4 + offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop, delayedCard);
            }
            else {
                delayedCard = drawCard(deck.getCardByIndex(deckIndex), offsetLeft + (unrepeatingCard - 1) * distanceBetweenCards, offsetTop, delayedCard);
            }
        }
    };
    return delayedCard;
}

function drawDecks(delayedCard, closedDeck, shopDeck, playerDeck) {

    drawText(OFFSET_LEFT_INFO, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS - 125, "Самый жадный: " + getTop(players).name + "; Деньги: " + getTop(players).money);
    drawText(OFFSET_LEFT_INFO, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS - 100, "Мышь x " + mouse.x + " y " + mouse.y);
    drawText(OFFSET_LEFT_INFO, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS - 75, "Выброшено значение: " + throwFirst + " + " + throwSecond);
    drawText(OFFSET_LEFT_INFO, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS - 50, "Текущий игрок: " + currentPlayer.name + "; Деньги: " + currentPlayer.money + "; А: " + currentPlayer.attractions.activeCount + currentPlayer.attractions.cards.length);

    delayedCard = drawDeck(delayedCard, playerDeck, offsetLeftPlayerCards, OFFSET_TOP + OFFSET_TOP_PLAYER_CARDS, PLAYER_CARDS_WIDTH / (playerDeck.countNonRepeat()), playerDeck.countNonRepeat() < 5, CARD_WIDTH * 1.2, "текущий игрок [" + playerDeck.getDeckLength() + "]")



    drawText(OFFSET_LEFT, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS - CARD_WIDTH, "закрытка [" + closedDeck.getDeckLength() + "]");
    let distanceBetweenClosedCards = PLAYER_CARDS_WIDTH * 0.25 / (closedDeck.getDeckLength());
    for (let cDeckIndex = 0; cDeckIndex < closedDeck.getDeckLength(); cDeckIndex++) {
        drawClosedCard(OFFSET_LEFT_ALL_CARDS + cDeckIndex * distanceBetweenClosedCards, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS);
    };

    drawText(OFFSET_RIGHT_ATTRACTIONS, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS - CARD_WIDTH, "достопримечательности        деньги: " + currentPlayer.money);
    let distanceBetweenAttractives = PLAYER_CARDS_WIDTH / currentPlayer.attractions.cards.length;
    for (let cDeckIndex = 0; cDeckIndex < currentPlayer.attractions.cards.length; cDeckIndex++) {
        delayedCard=drawCard(currentPlayer.attractions.cards[cDeckIndex], OFFSET_RIGHT_ATTRACTIONS + cDeckIndex * distanceBetweenAttractives, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS, delayedCard, false, true);
    };

     
    if (!otherDecksHidden || playerDeck.countNonRepeat()<10) {
        offsetLeftPlayerCards = OFFSET_LEFT_ALL_CARDS;
    }
    else {
        offsetLeftPlayerCards-=MOVE_SPEED*leftKey.isDown;
        offsetLeftPlayerCards+=MOVE_SPEED*rightKey.isDown;
        if (offsetLeftPlayerCards<OFFSET_LEFT_ALL_CARDS-CARD_WIDTH*10) {
            offsetLeftPlayerCards=OFFSET_LEFT_ALL_CARDS-CARD_WIDTH*10;
        }
        if (offsetLeftPlayerCards>OFFSET_LEFT_ALL_CARDS) {
            offsetLeftPlayerCards=OFFSET_LEFT_ALL_CARDS;
        }
    }
    delayedCard = drawDeck(delayedCard, shopDeck, offset_left_shop, OFFSET_TOP + OFFSET_TOP_SHOP_CARDS, DISTANCE_BETWEEN_SHOP_CARDS, false, 0, "магазик [" + shopDeck.getDeckLength() + "]");

    //lineStart+=mouse.scrolled;
    lineStart-=upKey.isDown;
    lineStart+=downKey.isDown;
    if (lineStart<0) {
        lineStart = 0;
    }
    
    let lineEnd = LOG_HEIGHT/16+lineStart;
    if (lineStart>maxLineCount-LOG_HEIGHT/16) {
        lineStart=maxLineCount-LOG_HEIGHT/16;
    }

    drawScrollingParagraph(OFFSET_RIGHT_LOG, OFFSET_TOP_LOG, logString, lineStart, lineEnd, CARD_WIDTH * 2);

    return delayedCard;
}

function drawOtherDecks(delayedCard, position, player, hidden = false) {
    let hiddenOffset = 0;
    if (hidden) {
        hiddenOffset = OTHER_DECKS_HIDDEN_OFFSET;
    }
    const deckSize = player.getNumberOfCards();
    drawText(-canvas.width / 2 + CARD_WIDTH * 0.25 + (position - 1) * CARD_WIDTH * 2, OFFSET_TOP + OFFSET_TOP_OTHER_CARDS, "Колода игрока " + player.name + " [" + deckSize + "]");
    let distanceBetweenOtherCards = DISTANCE_BETWEEN_OTHER_CARDS;
    if (deckSize < MAX_VISIBLE_OTHER_CARDS) {
        distanceBetweenOtherCards = DISTANCE_BETWEEN_OTHER_CARDS * MAX_VISIBLE_OTHER_CARDS / deckSize;
    }

    let unrepeatingCard = 0;
    let repeatingCard = 0;
    let deck = player.deck;

    for (let deckIndex = 0; deckIndex < deckSize; deckIndex++) {
        const currentCard = deck.getCardByIndex(deckIndex);
        const previousCard = deckIndex > 0 ? deck.getCardByIndex(deckIndex - 1) : null;

        if (previousCard && currentCard.name === previousCard.name) {
            repeatingCard++;

            if (graphics_mode === GM_PRETTY) {
                delayedCard = drawCard(currentCard, -canvas.width / 2 + CARD_WIDTH + (position - 1) * CARD_WIDTH * 2 - hiddenOffset, OFFSET_TOP + OFFSET_TOP_OTHER_DRAW_CARDS + unrepeatingCard * distanceBetweenOtherCards, delayedCard);
            } else {
                drawText(-canvas.width / 2 + CARD_WIDTH + (position - 1) * CARD_WIDTH * 2 + CARD_WIDTH / 2, OFFSET_TOP + OFFSET_TOP_OTHER_DRAW_CARDS - 2 * CARD_HEIGHT / 5, repeatingCard + 1);
            }
        } else {
            repeatingCard = 0;
            delayedCard = drawCard(currentCard, -canvas.width / 2 + CARD_WIDTH + (position - 1) * CARD_WIDTH * 2 - hiddenOffset, OFFSET_TOP + OFFSET_TOP_OTHER_DRAW_CARDS + unrepeatingCard * distanceBetweenOtherCards, delayedCard);
            unrepeatingCard++;
        }
    }

    return delayedCard;
}


function checkSelectBot(shopDeck, currentPlayer) {
    let cardsAvailableToBuy = [];
    let somethingBuilt = false;
    let canBuy = false;
    let nextTurn = false;
  
    // Проверка доступных карт для покупки из колоды текущего игрока
    for (let i = 0; i < currentPlayer.attractions.cards.length; i++) {
      let currentCard = currentPlayer.attractions.cards[i];
      if (!currentCard.active && currentPlayer.getMoney() >= currentCard.properties.cost) {
        canBuy = true;
        cardsAvailableToBuy.unshift([i, false]); // Добавление индекса карты в массив
      }
    }
  
    // Проверка доступных карт для покупки из магазина
    for (let i = 0; i < shopDeck.cards.length; i++) {
      let currentCard = shopDeck.cards[i];
      if (!nextTurn && currentPlayer.getMoney() >= currentCard.properties.cost) {
        canBuy = true;
        cardsAvailableToBuy.unshift([i, true]); // Добавление индекса карты в массив
      }
    }
  
    if (!canBuy) {
      nextPlayerTurn(currentPlayer);
    } 
    else {
      let randCardIndex = randomInt(0, cardsAvailableToBuy.length - 1);
      let randCard = cardsAvailableToBuy[randCardIndex];
  
      if (randCard[1]) { // Если выбрана карта из магазина
        let currentCard = shopDeck.getCardByIndex(randCard[0]);
        currentPlayer.money -= currentCard.properties.cost;
        currentPlayer.deck.addCard(currentCard);
        shopDeck.removeCardByIndex(randCard[0]);
      } 
      else {
        let currentArray = currentPlayer.attractions.cards;
        currentPlayer.money -= currentArray[randCard[0]].properties.cost;
        currentArray[randCard[0]].active = true;
        currentPlayer.attractions.activeCount++;
      }
      
      somethingBuilt = true;
      nextTurn = true;
    }
  
    if (nextTurn || !canBuy) {
      if (!somethingBuilt) {
        logString += 'ничего не построено';
      }
      currentPlayer = nextPlayerTurn(currentPlayer);
    }
  
    return currentPlayer;
  }

function checkSelect(shopDeck, currentPlayer) {
    let canBuy = false;
    let somethingBuilt = false;
    let nextTurn = false;
    let currentArray = currentPlayer.attractions.cards;
    let frameWidth = CARD_WIDTH + CARD_SELECT_FRAME_WIDTH;
    let frameHeight = CARD_HEIGHT + CARD_SELECT_FRAME_HEIGHT;
    for (let sDeckIndex = 0; sDeckIndex < currentArray.length; sDeckIndex++) {
        let currentCost = currentArray[sDeckIndex].properties.cost;
        if (currentPlayer.getMoney() >= currentCost && !currentArray[sDeckIndex].active) {
            canBuy = true;
            let distanceBetweenAttractives = PLAYER_CARDS_WIDTH / currentPlayer.attractions.cards.length;
            let frameX = OFFSET_RIGHT_ATTRACTIONS + sDeckIndex * distanceBetweenAttractives - (CARD_WIDTH - distanceBetweenAttractives) / 2;
            let frameY = OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS;
            //OFFSET_RIGHT_ATTRACTIONS + cDeckIndex * distanceBetweenAttractives, OFFSET_TOP + OFFSET_TOP_CLOSED_CARDS
            frameWidth = CARD_WIDTH + CARD_SELECT_FRAME_WIDTH - CARD_WIDTH + distanceBetweenAttractives;
            drawEmptyRect(frameX, frameY, frameWidth, frameHeight, 0, 'red');
            if (isMouseInRectangle(frameX, frameY, frameWidth, frameHeight)) {
                if (checkClick(frameX, frameY, frameWidth, frameHeight, currentArray[sDeckIndex])) {
                    currentPlayer.money -= currentCost;
                    currentArray[sDeckIndex].active = true;
                    currentPlayer.attractions.activeCount++;
                    somethingBuilt = true;
                    nextTurn = true;
                }
                drawEmptyRect(frameX, frameY, frameWidth, frameHeight, 0, 'green');
            }
        }
    }
    frameWidth = CARD_WIDTH + CARD_SELECT_FRAME_WIDTH;
    frameHeight = CARD_HEIGHT + CARD_SELECT_FRAME_HEIGHT;
    let selectedCard = '';
    let unrepeatingCard = 0;
    let repeatingCard = 0;

    for (let deckIndex = 0; deckIndex < shopDeck.cards.length; deckIndex++) {
        if (deckIndex > 0) {
            if (shopDeck.getCardByIndex(deckIndex).name === shopDeck.getCardByIndex(deckIndex - 1).name) {
                repeatingCard++;
            }
            else {
                if (currentPlayer.getMoney() >= shopDeck.cards[deckIndex].properties.cost) {
                    canBuy = true;
                    let frameX = offset_left_shop - CARD_WIDTH * 4 + unrepeatingCard * DISTANCE_BETWEEN_SHOP_CARDS;
                    let frameY = OFFSET_TOP + OFFSET_TOP_SHOP_CARDS;
                    drawEmptyRect(frameX, frameY, frameWidth, frameHeight, 0, 'red');
                    if (isMouseInRectangle(frameX, frameY, frameWidth, frameHeight)) {
                        selectedCard = shopDeck.getCardByIndex(deckIndex).name;
                        if (checkClick(frameX, frameY, frameWidth, frameHeight, shopDeck.cards[deckIndex])) {
                            currentPlayer.money -= shopDeck.cards[deckIndex].properties.cost;
                            currentPlayer.deck.addCard(shopDeck.getCardByIndex(deckIndex));
                            shopDeck.removeCardByIndex(deckIndex);
                            somethingBuilt = true;
                            nextTurn = true;
                        }
                        drawEmptyRect(frameX, frameY, frameWidth, frameHeight, 0, 'green');
                    }
                }
                repeatingCard = 0;
                unrepeatingCard++;
            }
        }
        else {
            repeatingCard = 0;

            if (currentPlayer.getMoney() >= shopDeck.cards[deckIndex].properties.cost) {
                canBuy = true;
                let frameX = offset_left_shop - CARD_WIDTH * 4 + unrepeatingCard * DISTANCE_BETWEEN_SHOP_CARDS;
                let frameY = OFFSET_TOP + OFFSET_TOP_SHOP_CARDS;
                drawEmptyRect(frameX, frameY, frameWidth, frameHeight, 0, 'red');
                if (isMouseInRectangle(frameX, frameY, frameWidth, frameHeight)) {
                    if (checkClick(frameX, frameY, frameWidth, frameHeight, shopDeck.cards[deckIndex])) {
                        currentPlayer.money -= shopDeck.cards[deckIndex].properties.cost;
                        currentPlayer.deck.addCard(shopDeck.getCardByIndex(deckIndex));
                        shopDeck.removeCardByIndex(deckIndex);
                        somethingBuilt = true;
                        nextTurn = true;
                    }
                    drawEmptyRect(frameX, frameY, frameWidth, frameHeight, 0, 'green');
                }
            }
            unrepeatingCard++;
        }
    }

    if (nextTurn) {
        currentPlayer = nextPlayerTurn(currentPlayer);
    }
    else {
        if (!canBuy) {
            if (currentPlayer.autoskip) {
                currentPlayer = nextPlayerTurn(currentPlayer);
            }
            else {
                if (checkButton(buttonSkip)) {
                    currentPlayer = nextPlayerTurn(currentPlayer);
                }
            }
        }
    }
    return currentPlayer;
}

function isMouseInRectangle(x, y, width, height) {
    return (mouse.x > x * SizeMultiplier - width * SizeMultiplier / 2 && mouse.x < x * SizeMultiplier + width * SizeMultiplier / 2
        && mouse.y > y * SizeMultiplier - height * SizeMultiplier / 2 && mouse.y < y * SizeMultiplier + height * SizeMultiplier / 2)
}

function nextPlayerTurn(currentPlayer) {
    shopDeck.updateShopDeck(closedGameDeck);
    if (currentPlayer.attractions.activeCount >= currentPlayer.attractions.cards.length) {
        winner = currentPlayer;
        gameState = GAME_STATE_END;
    }
    if (doubleThrown && currentPlayer.checkIfActive(RADIOTOWER_INDEX)) {
        currentMessage = messageDouble;
        showMessage = true;
        gameState = GAME_STATE_PAUSE;
    }
    else {
        if (currentPlayer.order === numberOfPlayers) {
            turnCounter++;
            currentPlayer = players[0];
        }
        else {
            currentPlayer = players[currentPlayer.order];
        }
    }
    doubleThrown = false;
    currentPlayer.thrown = false;
    currentPlayer.throwEnded = false;
    return currentPlayer;
}

function checkDeck(currentPlayer, type, selectedPlayer = currentPlayer) {
    for (let currentCardIndex = 0; currentCardIndex < selectedPlayer.getNumberOfCards(); currentCardIndex++) {
        let currentCard = selectedPlayer.deck.getCardByIndex(currentCardIndex);
        if (compareThrowResult(throwResult, currentCard) && currentCard.type === type && currentCard.properties.condition(selectedPlayer)) {
            let income = 0;
            if (currentCard.properties.incomeFunction) {
                income = currentCard.properties.income(selectedPlayer, throwResult);
            }
            else {
                income = currentCard.properties.income;
            }
            logString += 'С помощью карты ' + lang.getName(currentCard.name) + ' игрок ' + selectedPlayer.name + ' зарабатывает ' + income + ' денег!\n';
            maxLineCount = countLinesInScrollingParagraph(logString, CARD_WIDTH * 2);
            selectedPlayer.money += income;

        }
    }
}

function occureBotTurn(currentPlayer) {
    if (!currentPlayer.thrown) {
        currentPlayer.reroll = true;
        if (currentPlayer.checkIfActive(RAILWAY_INDEX)) {
            let throwOne = randomInt(1, 2)
            if (throwOne === 1) {
                throwFirst = randomInt(1, 6);
                throwSecond = 0;
                throwResult = throwFirst + throwSecond;
                currentPlayer.thrown = true;
            }
            else {
                throwFirst = randomInt(1, 6);
                throwSecond = randomInt(1, 6);
                throwResult = throwFirst + throwSecond;
                if (throwFirst === throwSecond) {
                    doubleThrown = true;
                }
                currentPlayer.thrown = true;
            }
        }
        else {
            throwFirst = randomInt(1, 6);
            throwSecond = 0;
            throwResult = throwFirst;
            currentPlayer.thrown = true;
        }
    }
    if (currentPlayer.thrown && !currentPlayer.throwEnded) {
        if (currentPlayer.checkIfActive(RADIOTOWER_INDEX) && currentPlayer.reroll) {
            let throwOne = randomInt(1, 2)
            if (currentPlayer.botLogic.rerollDecision()) {
                currentPlayer.throwEnded = true;
                currentPlayer.reroll = false;
            }
            else {
                currentPlayer.throwEnded = true;
                currentPlayer.reroll = false;
            }
        }
        else {
            currentPlayer.throwEnded = true;
        }
        if (currentPlayer.checkIfActive(HARBOR_INDEX) && throwResult >= 10) {
            let throwOne = randomInt(1, 2)
            if (throwOne === 1) {
                throwResult += 2;
                throwSecond = throwSecond + ' + 2';
                currentPlayer.throwEnded = true;
            }
            else {
                currentPlayer.throwEnded = true;
            }
        }
        else {
            currentPlayer.throwEnded = true;
        }
    }
    if (currentPlayer.thrown && currentPlayer.throwEnded) {
        logString += lang.getName("logStringNextTurn") + "[" + turnCounter + "]\n";
        maxLineCount = countLinesInScrollingParagraph(logString, CARD_WIDTH * 2);
        for (let currentPlayerIndex = 0; currentPlayerIndex < numberOfPlayers; currentPlayerIndex++) {
            let selectedPlayer = players[currentPlayerIndex];
            //колода врага
            if (currentPlayer !== selectedPlayer) {
                for (let currentCardIndex = 0; currentCardIndex < selectedPlayer.getNumberOfCards(); currentCardIndex++) {
                    let currentCard = selectedPlayer.deck.getCardByIndex(currentCardIndex);
                    if (compareThrowResult(throwResult, currentCard)) {
                        //активна вражеская красная
                        if (currentCard.type === RED_TYPE && currentCard.properties.condition(currentPlayer)) {
                            let stolen = currentPlayer.takeMoney(currentCard.properties.income);
                            if (selectedPlayer.checkIfActive(SHOPPINGMALL_INDEX)) {
                                stolen++;
                            }
                            logString += 'С помощью карты ' + lang.getName(currentCard.name) + ' игрок ' + selectedPlayer.name + ' ворует ' + stolen + ' денег у игрока ' + currentPlayer.name + '!\n';
                            maxLineCount = countLinesInScrollingParagraph(logString, CARD_WIDTH * 2);
                            selectedPlayer.money += stolen;
                        }
                    }
                }
            }
        }
        checkDeck(currentPlayer, GREEN_TYPE)
        //прогон по врагам (и себе, но по синему типу)
        for (let currentPlayerIndex = 0; currentPlayerIndex < numberOfPlayers; currentPlayerIndex++) {
            let selectedPlayer = players[currentPlayerIndex];
            //колода врага
            checkDeck(currentPlayer, BLUE_TYPE, selectedPlayer)
        }
        if (currentPlayer.getMoney() === 0) {
            currentPlayer.money++;
        }
    }
}

function occureBeginOfTurn(currentPlayer) {
    if (!currentPlayer.thrown) {
        if (currentPlayer.checkIfActive(RAILWAY_INDEX)) {
            if (checkButton(buttonThrowOne)) {
                throwFirst = randomInt(1, 6);
                throwSecond = 0;
                throwResult = throwFirst + throwSecond;
                currentPlayer.thrown = true;
            }
            if (checkButton(buttonThrowTwo)) {
                throwFirst = randomInt(1, 6);
                throwSecond = randomInt(1, 6);
                throwResult = throwFirst + throwSecond;
                if (throwFirst === throwSecond) {
                    doubleThrown = true;
                }
                currentPlayer.thrown = true;
            }
        }
        else {
            throwFirst = randomInt(1, 6);
            throwSecond = 0;
            throwResult = throwFirst;
            currentPlayer.thrown = true;
        }
    }
    if (currentPlayer.thrown && !currentPlayer.throwEnded) {
        if (currentPlayer.checkIfActive(HARBOR_INDEX) && throwResult >= 10) {
            if (checkButton(buttonAddTwo)) {
                throwResult += 2;
                throwSecond = throwSecond + ' + 2'
                currentPlayer.throwEnded = true;
            }
            if (checkButton(buttonDoNotAddTwo)) {
                currentPlayer.throwEnded = true;
            }
        }
        else {
            currentPlayer.throwEnded = true;
        }
    }
    if (currentPlayer.thrown && currentPlayer.throwEnded) {
        logString += lang.getName("logStringNextTurn")  + turnCounter;
        maxLineCount = countLinesInScrollingParagraph(logString, CARD_WIDTH * 2);
        for (let currentPlayerIndex = 0; currentPlayerIndex < numberOfPlayers; currentPlayerIndex++) {
            let selectedPlayer = players[currentPlayerIndex];
            //колода врага
            if (currentPlayer !== selectedPlayer) {
                for (let currentCardIndex = 0; currentCardIndex < selectedPlayer.getNumberOfCards(); currentCardIndex++) {
                    let currentCard = selectedPlayer.deck.getCardByIndex(currentCardIndex);
                    if (compareThrowResult(throwResult, currentCard)) {
                        //активна вражеская красная
                        if (currentCard.type === RED_TYPE && currentCard.properties.condition(currentPlayer)) {
                            let stolen = currentPlayer.takeMoney(currentCard.properties.income);
                            if (selectedPlayer.checkIfActive(SHOPPINGMALL_INDEX)) {
                                stolen++;
                            }
                            logString += lang.getName("logStringWithThisCard") + lang.getName(currentCard.name) + lang.getName("logStringPlayer") + selectedPlayer.name + ' ворует ' + stolen + ' денег у игрока ' + currentPlayer.name + '!\n';
                            maxLineCount = countLinesInScrollingParagraph(logString, CARD_WIDTH * 2);
                            selectedPlayer.money += stolen;
                        }
                    }
                }
            }
        }
        checkDeck(currentPlayer, GREEN_TYPE)
        //прогон по врагам (и себе, но по синему типу)
        for (let currentPlayerIndex = 0; currentPlayerIndex < numberOfPlayers; currentPlayerIndex++) {
            let selectedPlayer = players[currentPlayerIndex];
            //колода врага
            checkDeck(currentPlayer, BLUE_TYPE, selectedPlayer)
        }
        if (currentPlayer.getMoney() === 0) {
            currentPlayer.money++;
        }
    }
    lineStart=maxLineCount-LOG_HEIGHT/16;
}

function drawControlButtons(currentPlayer) {
    if (checkButton(buttonSkipControl)) {
        currentPlayer = nextPlayerTurn(currentPlayer);
    }
    if (checkButton(buttonAutoskip)) {
        currentPlayer.autoskip = !(currentPlayer.autoskip);

    }
    if (checkButton(buttonHidOtherPlayersControl)) {
        otherDecksHidden = !otherDecksHidden;
    }
    if (checkButton(buttonReturnToMenuControl)) {
        gameState = GAME_STATE_MENU;
    }
    if (currentPlayer.autoskip) {
        buttonAutoskip.color = '#90ee90';
    }
    else {
        buttonAutoskip.color = '#ff5349';
    }
    return currentPlayer;
}

function delayedDrawing(delayedCard) {
    if (delayedCard.exist) {
        if (delayedCard.y >= canvas.height / 4) {
            delayedCard.y = canvas.height / 4 - CARD_HEIGHT / 2;
        }
        drawBigCard(delayedCard.card, delayedCard.x, delayedCard.y, delayedCard.attraction)
    }
}
function loopGame() {

    let delayedCard = {
        exist: false,
        x: 0,
        y: 0,
        card: 0,
        attraction: false
    };
    delayedCard = drawDecks(delayedCard, closedGameDeck, shopDeck, currentPlayer.deck);
    if (!currentPlayer.throwEnded) {
        if (currentPlayer.bot) {
            occureBotTurn(currentPlayer);

        }
        else {
            currentPlayer.throwEnded = false;
            occureBeginOfTurn(currentPlayer)
        }
    }
    else {
        if (currentPlayer.bot) {
            currentPlayer = checkSelectBot(shopDeck, currentPlayer);
        }
        else {

            currentPlayer = checkSelect(shopDeck, currentPlayer);
        }

    }

    let position = 0;
    if (!otherDecksHidden) {
        for (let showPlayerIndex = 0; showPlayerIndex < numberOfPlayers; showPlayerIndex++) {
            if (showPlayerIndex !== currentPlayer.order - 1) {
                position++;
                delayedCard = drawOtherDecks(delayedCard, position, players[showPlayerIndex]);
            }
        }
    }

    if (delayedCard.exist && currentPlayer.thrown) {
        delayedDrawing(delayedCard)
    };
    currentPlayer = drawControlButtons(currentPlayer);

}

//TODO make more ifs
function loopPause() {
    if (Message.showMessage) {
        if (checkMessage(currentMessage)) {
            Message.showMessage = false;
            gameState = GAME_STATE_GAME;
        }
    }
    else {
        gameState = GAME_STATE_GAME;
    }
}

function loopEnd() {
    drawText(0, 0, 'Победил ' + winner.name);
    if (checkButton(buttonStartNewGame)) {
        startNewGame();
    }
}

function loopMenu() {
    drawText(camera.x, camera.y - 400, 'Кидай-город', 0, "center", "orange", true, '90px Arial', 'middle', 'black', 3);
    if (checkButton(buttonStartNewGame)) {
        startNewGame();
    }
    if (checkButton(buttonSetLanguage)) {

        if (language == "russian") {
            language = "engslih";
            lang = englishNames;
        }
        else {
            language = "russian";
            lang = russianNames;
        }
        buttonSetLanguage.append(language)
    }
    if (checkButton(buttonSetPlayers)) {

        if (numberOfPlayers === 2) {

            numberOfPlayers = 3;
            firstPlayer = new Player("Лёха", 1);
            secondPlayer = new Player("Андрей", 2);
            thirdPlayer = new Player("Саня", 3);
            players = [firstPlayer, secondPlayer, thirdPlayer];

        }
        else {
            numberOfPlayers = 2;
            firstPlayer = new Player("PieceOfPeace", 1);
            secondPlayer = new Player("Donbass", 2);
            players = [firstPlayer, secondPlayer];
        }
        buttonSetPlayers.append(numberOfPlayers)

    }
    if (checkButton(buttonSetPlayWithBot)) {

        secondPlayer.bot = !secondPlayer.bot;
        if (numberOfPlayers === 3) {
            thirdPlayer.bot = !thirdPlayer.bot;
        }
        buttonSetPlayWithBot.append(secondPlayer.bot)
    }
}


function loop() {
    mouse.x += camera.x - canvas.width * 0.5;
    mouse.y += camera.y - canvas.height * 0.5;
    mouse.startX += camera.x - canvas.width * 0.5;
    mouse.startY += camera.y - canvas.height * 0.5;



    switch (gameState) {
        case GAME_STATE_GAME: {
            fillScreen();
            loopGame();
        } break;
        case GAME_STATE_END: {
            fillScreen();
            loopEnd();
        } break;
        case GAME_STATE_MENU: {
            fillScreen();
            loopMenu();
        } break;
        case GAME_STATE_PAUSE: {
            loopPause();
        }
    }

    clearMouse();



    mouse.x -= camera.x - canvas.width * 0.5;
    mouse.y -= camera.y - canvas.height * 0.5;
    mouse.startX -= camera.x - canvas.width * 0.5;
    mouse.startY -= camera.y - canvas.height * 0.5;

    camera.x += (camera.targetX - camera.x) * CAMERA_TRANSITION;
    camera.y += (camera.targetY - camera.y) * CAMERA_TRANSITION;
    if (camera.targetY === 0) {
        camera.x = 0;
        camera.y = 0;
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);