

class Language {
    arrayOfNames = [];

    Language() {

    }

    addName(nameProg, name, effect = '') {
        let item = {
            nameProg: nameProg,
            name: name,
            effectText: effect
        }
        this.arrayOfNames.push(item)
    }

    searchForCard(searchName) {
        let n = 0;
        for (let currentItem = 0; currentItem < this.arrayOfNames.length; currentItem++) {
            if ((this.arrayOfNames[currentItem].nameProg) === searchName) {
                n = currentItem;
            }

        };
        return n;
    }

    getName(nameProg) {
        return this.arrayOfNames[this.searchForCard(nameProg)].name;
    }

    getEffect(nameProg) {
        return this.arrayOfNames[this.searchForCard(nameProg)].effectText;
    }

}

russianNames = new Language();
russianNames.addName("nullName", "ИМЯ НЕ ЗАДАНО", "ИМЯ НЕ ЗАДАНО");
russianNames.addName("wheatField", "Пшеничное поле", "Добавляет 1 монету на ходе любого игрока");
russianNames.addName("bakery", "Пекарня", "Добавляет 1 монету на вашем ходе");
russianNames.addName("retailShop", "Магазин", "Добавляет 3 монеты на вашем ходе");
russianNames.addName("cafe", "Кафе", "Игрок отдаёт вам 1 монету");
russianNames.addName("forest", "Лес", "Добавляет 2 монеты на ходе любого игрока");
russianNames.addName("mine", "Рудник", "Добавляет 5 монет на ходе любого игрока");
russianNames.addName("orchard", "Яблоневый сад", "Добавляет 3 монеты на ходе любого игрока");
russianNames.addName("livestockFarm", "Колхоз", "Добавляет 1 монету на ходе любого игрока");
russianNames.addName("flowerPlant", "Цветник", "Добавляет 1 монету на ходе любого игрока");
russianNames.addName("vinegarPlant", "Виноградник", "Добавляет 3 монеты на ходе любого игрока");
russianNames.addName("cornField", "Кукурузное поле", "Добавляет 1 монету, если построено не более 1 достопримечательности");
russianNames.addName("fishermanBoat", "Рыбацкий баркас", "Добавляет 3 монеты, если есть порт");
russianNames.addName("trauler", "Тральщик", "Результат броска кубиков, если есть порт");
russianNames.addName("departmentStore", "Универмаг", "Добавляет 2 монеты, если построено не более 1 достопримечательности");
russianNames.addName("demolishCompany","Компания по сносу зданий","Вы сносите одну достопримечательность, получая 8 монет");
russianNames.addName("creditBureau","Киоск микрозаймов","Лишает 2 монет. Даёт 5 монет при постройке");
russianNames.addName("flowerShop","Цветочная лавка","Добавляет 1 монету за каждый цветник");
russianNames.addName("creamery","Сыроварня","Добавляет 3 монеты за каждый животноводческий объект");
russianNames.addName("furnitureFactory","Мебельная фабрика","Добавляет 3 монеты за каждый ресурсодобывающий объект");
russianNames.addName("winery","Винодельня","Добавляет 6 монет за каждый виноградник, затем закрыть на ремонт");
russianNames.addName("sushiBar","Суши-бар","Игрок отдаёт вам 3 монеты, если у вас есть порт");
russianNames.addName("restaurant","Ресторан","Игрок отдаёт вам 5 монет, если у него 2 и более достопримечательности");
russianNames.addName("pizzeria","Пиццерия","Игрок отдаёт вам 1 монету");
russianNames.addName("burgerShop","Бутербродная","Игрок отдаёт вам 1 монету");
russianNames.addName("bistro","Закусочная","Игрок отдаёт вам 2 монеты");

russianNames.addName("eliteBar","Элитный бар","Игрок отдаёт вам все монеты, если у него 3 и более достопримечательности");

russianNames.addName("transportCompany","Контора грузоперевозок","Отдать любой объект другому игроку, затем добавляет 4 монеты");
russianNames.addName("drinkCompany","Завод напитков","Добавляет 1 монету за каждый ваш ресторанный объект");
russianNames.addName("vegetableStore","Овощной рынок","Добавляет 2 монеты за каждый ваш агрокультурный объект");
russianNames.addName("productStorage","Продуктовый склад","Добавляет 2 монеты за каждый ваш ресторанный объект");

russianNames.addName("airport", "Аэропорт", "Пропуск строительства даёт 10 монет");
russianNames.addName("amusementPark", "Парк развлечений", "Можно один раз перебросить кубики");
russianNames.addName("harbor", "Порт", "Позволяет добавить 2 к результату броска, если выброшено число больше 9");
russianNames.addName("townHall", "Ратуша", "Даёт одну монету перед строительством, если у вас 0 монет");
russianNames.addName("shoppingMall", "Торговый центр", "Увеличивает доход на 1 монету");
russianNames.addName("railway", "Вокзал", "Позволяет делать двойные броски кубиков");
russianNames.addName("radioTower", "Телебашня", "Если выпал дубль, сделайте ещё ход");

russianNames.addName("buttonThrowOne","Бросить один");
russianNames.addName("buttonThrowTwo","Бросить два");
russianNames.addName("buttonSkip","Пропуск хода");
russianNames.addName("buttonAutoskip","Автопропуск");
russianNames.addName("buttonStartNewGame","Начать новую игру");
russianNames.addName("buttonHid","Скрыть");
russianNames.addName("buttonReturnToMenu","Вернуться в меню");
russianNames.addName("buttonSetLanguage","Язык: ");
russianNames.addName("buttonSetPlayers", "Сменить число игроков: ")
russianNames.addName("buttonSetPlayWithBot", "Играть с ботом: ")
russianNames.addName("buttonAddTwo", "Добавить два к броску")
russianNames.addName("buttonDoNotAddTwo", "Не добавлять два к броску")
russianNames.addName("buttonOpenMenu", ">")


russianNames.addName("messageDoubleThrown", "Выпал дубль у игрока ")
russianNames.addName("messageOk", "Ладно")

russianNames.addName("logStringNextTurn", "\n Следующий ход ")
russianNames.addName("logStringWithThisCard",'\nС помощью карты ')
russianNames.addName("logStringPlayer", " игрок ")
russianNames.addName("logStringSteal", " крадёт ")

englishNames = new Language();
englishNames.addName("nullName", "NAME NOT FOUND", "NAME NOT FOUND");
englishNames.addName("wheatField", "Wheat field", "Adds 1 coin at any player's turn");
englishNames.addName("bakery", "Bakery", "Adds 1 coin at your turn");
englishNames.addName("retailShop", "Retail", "Adds 3 coins at your turn");
englishNames.addName("cafe", "Cafe", "Player gives you 1 coin");
englishNames.addName("forest", "Forest", "Adds 2 coins at any player's turn");
englishNames.addName("mine", "Mine", "Adds 5 coins at any player's turn");
englishNames.addName("orchard", "Apple orchard", "Adds 3 coin at any player's turn");
englishNames.addName("livestockFarm", "Livestock farm", "Adds 1 coin at any player's turn");
englishNames.addName("flowerPlant", "Flower plant", "Adds 1 coin at any player's turn");
englishNames.addName("vinegarPlant", "Виноградник", "Добавляет 3 монеты на ходе любого игрока");
englishNames.addName("cornField", "Кукурузное поле", "Добавляет 1 монету, если построено не более 1 достопримечательности");
englishNames.addName("fishermanBoat", "Рыбацкий баркас", "Добавляет 3 монеты, если есть порт");
englishNames.addName("trauler", "Тральщик", "Результат броска кубиков, если есть порт");
englishNames.addName("departmentStore", "Универмаг", "Добавляет 2 монеты, если построено не более 1 достопримечательности");
englishNames.addName("demolishCompany","Компания по сносу зданий","Вы сносите одну достопримечательность, получая 8 монет");
englishNames.addName("creditBureau","Киоск микрозаймов","Лишает 2 монет. Даёт 5 монет при постройке");
englishNames.addName("flowerShop","Цветочная лавка","Добавляет 1 монету за каждый цветник");
englishNames.addName("creamery","Сыроварня","Добавляет 3 монеты за каждый животноводческий объект");
englishNames.addName("furnitureFactory","Мебельная фабрика","Добавляет 3 монеты за каждый ресурсодобывающий объект");
englishNames.addName("winery","Винодельня","Добавляет 6 монет за каждый виноградник, затем закрыть на ремонт");
englishNames.addName("sushiBar","Суши-бар","Игрок отдаёт вам 3 монеты, если у вас есть порт");
englishNames.addName("restaurant","Ресторан","Игрок отдаёт вам 5 монет, если у него 2 и более достопримечательности");
englishNames.addName("pizzeria","Пиццерия","Игрок отдаёт вам 1 монету");
englishNames.addName("burgerShop","Бутербродная","Игрок отдаёт вам 1 монету");
englishNames.addName("bistro","Закусочная","Игрок отдаёт вам 2 монеты");

englishNames.addName("eliteBar","Элитный бар","Игрок отдаёт вам все монеты, если у него 3 и более достопримечательности");

englishNames.addName("transportCompany","Контора грузоперевозок","Отдать любой объект другому игроку, затем добавляет 4 монеты");
englishNames.addName("drinkCompany","Завод напитков","Добавляет 1 монету за каждый ваш ресторанный объект");
englishNames.addName("vegetableStore","Овощной рынок","Добавляет 2 монеты за каждый ваш агрокультурный объект");
englishNames.addName("productStorage","Продуктовый склад","Добавляет 2 монеты за каждый ваш ресторанный объект");

englishNames.addName("airport", "Аэропорт", "Пропуск строительства даёт 10 монет");
englishNames.addName("amusementPark", "Парк развлечений", "Можно один раз перебросить кубики");
englishNames.addName("harbor", "Порт", "Позволяет добавить 2 к результату броска, если выброшено число больше 9");
englishNames.addName("townHall", "Ратуша", "Даёт одну монету перед строительством, если у вас 0 монет");
englishNames.addName("shoppingMall", "Торговый центр", "Увеличивает доход на 1 монету");
englishNames.addName("railway", "Вокзал", "Позволяет делать двойные броски кубиков");
englishNames.addName("radioTower", "Телебашня", "Если выпал дубль, сделайте ещё ход");

englishNames.addName("buttonThrowOne","Throw one");
englishNames.addName("buttonThrowTwo","Throw two");
englishNames.addName("buttonSkip","Skip turn");
englishNames.addName("buttonAutoskip","Autoskip turn");
englishNames.addName("buttonStartNewGame","Start new game");
englishNames.addName("buttonHid","Hide");
englishNames.addName("buttonReturnToMenu","Return to menu");
englishNames.addName("buttonSetLanguage","Language: ");
englishNames.addName("buttonSetPlayers", "Change number of players: ")
englishNames.addName("buttonSetPlayWithBot", "Play with bot: ")

englishNames.addName("logStringNextTurn", "\nСледующий ход\n")

/*
let russianNames = {
    wheatFieldName: "Пшеничное поле",
    wheatFieldEffect: "Добавляет 1 монету на ходе любого игрока",
    bakeryName: "Пекарня",
    bakeryEffect: "Добавляет 1 монету на вашем ходе",
    retailShopName: "Магазин",
    retailShopEffect: "Добавляет 3 монеты на вашем ходе",
    cafeName: "Кафе",
    cafeEffect: "Сделавший этот ход игрок должен отдать вам 1 монету",
    forestName: "Лес",
    forestEffect: "Добавляет 2 монеты на ходе любого игрока",
}*/