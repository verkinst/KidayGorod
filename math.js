function randomFloat(min, max) {
    let random = Math.random() * (max - min) + min;
    return random;
}

function randomInt(min, max) {
    let roundRandom = Math.round(randomFloat(min, max));
    return roundRandom;
}

function compareThrowResult(throwResult, currentCard) {
    return (throwResult >= currentCard.dyeValueFirst && throwResult <= currentCard.dyeValueLast)
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

        // поменять элементы местами
        // мы используем для этого синтаксис "деструктурирующее присваивание"
        // подробнее о нём - в следующих главах
        // то же самое можно записать как:
        // let t = array[i]; array[i] = array[j]; array[j] = t

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkClick(x, y, width, height, object) {
    if (isMouseInRectangle(x, y, width, height)) {
        if (mouse.isDown) {
            object.pressed = true;
        }

        if (object.pressed) {
            if (mouse.wentUp) {
                return true
            }
        }
    }
    else { object.pressed = false }
}