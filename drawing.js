'use strict'

let canvas = window.document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const SCREEN_RATIO = 16 / 9;

function handleResize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.height = rect.width / SCREEN_RATIO + 'px';
}

handleResize();
window.addEventListener('resize', handleResize);

const CYAN_COLOR = "#81d4fa";

function drawCard(card, x, y, delayedCard, big = false, attraction = false) {
    if (!attraction) {
        let sizeMultiplier = 1;
        if (big) {
            sizeMultiplier = 2;
        }
        let cardWidthMultiplied = CARD_WIDTH * sizeMultiplier;
        let cardHeight = CARD_HEIGHT * sizeMultiplier;
        drawRect(x, y, cardWidthMultiplied, cardHeight, 0, CYAN_COLOR);
        drawRect(x, y - 2 * cardHeight / 5, cardWidthMultiplied, cardHeight / 5, 0, CARD_COLORS[card.type]);
        drawRoundedRect(x + 3 * cardWidthMultiplied / 8, y - 4 * cardHeight / 10, cardWidthMultiplied / 4, cardWidthMultiplied / 4, cardWidthMultiplied / 4, 0, "white");
        drawSprite(x + 3 * cardWidthMultiplied / 8, y - 4 * cardHeight / 10, imgArray[card.specification], 0, cardWidthMultiplied / 4, cardWidthMultiplied / 4);
        drawRoundedRect(x - 3 * cardWidthMultiplied / 8, y - 4 * cardHeight / 10, cardWidthMultiplied / 4, cardWidthMultiplied / 4, cardWidthMultiplied / 16, 0, "white");
        if (card.dyeValueFirst !== card.dyeValueLast) {
            drawText(x - 3 * cardWidthMultiplied / 8, y - 7.5 * cardHeight / 20, card.dyeValueFirst, 0, 'center', 'black', false, 'bold ' + 20 * sizeMultiplier + 'px Arial');
            drawRoundedRect(x - 3 * cardWidthMultiplied / 8 + cardWidthMultiplied / 4, y - 4 * cardHeight / 10, cardWidthMultiplied / 4, cardWidthMultiplied / 4, cardWidthMultiplied / 16, 0, "white");
            drawText(x - 3 * cardWidthMultiplied / 8 + cardWidthMultiplied / 4, y - 7.5 * cardHeight / 20, card.dyeValueLast, 0, 'center', 'black', false, 'bold ' + 20 * sizeMultiplier + 'px Arial');
        }
        else {
            drawText(x - 3 * cardWidthMultiplied / 8, y - 7.5 * cardHeight / 20, card.dyeValueFirst, 0, 'center', 'black', false, 'bold ' + 20 * sizeMultiplier + 'px Arial');
        }
        if (card.sellable) {
            drawCircle(x - 3 * cardWidthMultiplied / 8, y - 2 * cardHeight / 10, cardHeight / 12, 0, 'yellow');
            drawText(x - 3 * cardWidthMultiplied / 8, y - 1.75 * cardHeight / 10, card.properties.cost, 0, 'center', 'white', true, 'bold ' + 20 * sizeMultiplier + 'px Arial');
        }

        //drawParagraph(x + 0.15 * cardWidthMultiplied / 4, y - 2.15 * cardHeight / 5, lang.getName(card.name), cardWidthMultiplied * 0.7, 15);
        drawParagraph(x + 0.15 * cardWidthMultiplied / 4, y, lang.getName(card.name), cardWidthMultiplied * 0.7, 15 * sizeMultiplier, 'arial', false, 'navy');
        //drawParagraph(x, y + cardHeight / 4, lang.getEffect(card.name), cardWidthMultiplied * 0.9, 12 * sizeMultiplier, 'arial', true, 'navy');
        drawConvenientParagraph(x, y + cardHeight / 4, lang.getEffect(card.name), cardWidthMultiplied * 0.9, cardHeight / 3, 40, 'arial', true, 'navy')
    }
    else {
        drawAttractionCard(card, x, y, big, true)
    }
    if (isMouseInRectangle(x, y, CARD_WIDTH, CARD_HEIGHT)) {
        delayedCard = {
            card: card,
            exist: true,
            x: x,
            y: y,
            attraction: attraction
        }
    }
    return delayedCard
}

function setDelayedCard(delayedCard, card, x, y, attraction) {
    delayedCard.x = x;
    delayedCard.y = y;
    delayedCard.card = card;
    delayedCard.exist = true;
    delayedCard.attraction = attraction;
    return delayedCard;
}

function drawBigCard(card, x, y, attraction) {
    drawCard(card, x, y, 0, true, attraction)
}

function drawAttractionCard(card, x, y, big = false) {
    let backColor = "#474747"
    if (card.active) {
        backColor = "#ff8c00";
    }
    let sizeMultiplier = 1;
    if (big) {
        sizeMultiplier = 2;
    }
    let cardWidthMultiplied = CARD_WIDTH * sizeMultiplier;
    let cardHeightMultiplied = CARD_HEIGHT * sizeMultiplier;
    drawRect(x, y, cardWidthMultiplied, cardHeightMultiplied, 0, backColor);
    drawRect(x, y - 2 * cardHeightMultiplied / 5, cardWidthMultiplied, cardHeightMultiplied / 5, 0, "navy");
    drawCircle(x - 3 * cardWidthMultiplied / 10, y - 2 * cardHeightMultiplied / 10, cardHeightMultiplied / 10, 0, 'yellow');
    drawText(x - 3 * cardWidthMultiplied / 10, y - 1.75 * cardHeightMultiplied / 10, card.properties.cost, 0, 'center');
    drawParagraph(x + 0.15 * cardWidthMultiplied / 4, y - 2.15 * cardHeightMultiplied / 5, lang.getName(card.name), cardWidthMultiplied * 0.7, 15);
    drawParagraph(x, y, lang.getEffect(card.name), cardWidthMultiplied * 0.9);
}

function drawClosedCard(x, y) {
    drawRect(x, y, CARD_WIDTH, CARD_HEIGHT, 0, "#777747", 1);
}

function drawRoundedRect(x, y, width, height, radius = width / 4, angle, color) {
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(-width / 2, -height / 2, width, height, [radius, radius, radius, radius]);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.restore();
}

// function drawRoundedRect(x, y, width, height, radius = width / 4, angle, color) {

//     ctx.save();

//     ctx.translate(canvas.width / 2, canvas.height / 2);
//     ctx.scale(SizeMultiplier, SizeMultiplier);
//     ctx.translate(-camera.x, -camera.y);
//     ctx.translate(x, y);
//     ctx.rotate(angle);

//     let x1 = 0 - width / 2;
//     let y1 = 0 - height / 2;
//     let x2 = 0 + width / 2;
//     let y2 = 0 + height / 2;
//     radius = Math.min(radius, (x2 - x1) / 2, (y2 - y1) / 2); // избегаем артефактов, в случае если радиус скругления больше одной из сторон
//     ctx.beginPath();
//     ctx.moveTo(x1 + radius, y1);
//     ctx.lineTo(x2 - radius, y1);
//     ctx.arcTo(x2, y1, x2, y1 + radius, radius);
//     ctx.lineTo(x2, y2 - radius);
//     ctx.arcTo(x2, y2, x2 - radius, y2, radius);
//     ctx.lineTo(x1 + radius, y2);
//     ctx.arcTo(x1, y2, x1, y2 - radius, radius);
//     ctx.lineTo(x1, y1 + radius);
//     ctx.arcTo(x1, y1, x1 + radius, y1, radius);
//     ctx.fillStyle = color;
//     ctx.fill();
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 5;
//     ctx.stroke();



//     ctx.restore();

// }

function drawRect(x, y, width, height = width, angle, color, thickness = 5) {

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = color;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = thickness;
    ctx.strokeRect(-width / 2, -height / 2, width, height);

    ctx.restore();

}

function drawCircle(x, y, radius, angle, color) {

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.restore();

}

function drawEmptyRect(x, y, width, height, angle, color) {

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.strokeRect(-width / 2, -height / 2, width, height);

    ctx.restore();

}


function checkButton(object) {
    let result = false;
    drawRect(object.x, object.y, object.width, object.height, 0, object.color);
    drawEmptyRect(object.x, object.y, object.width * 1.1, object.height * 1.1, 0, 'white')
    //drawText(object.x - object.width * 0.5, object.y, object.text, 0, 'middle');
    drawConvenientParagraph(object.x, object.y, lang.getName(object.text) + object.appendText, object.width, object.height, 10000)
    if (isMouseInRectangle(object.x, object.y, object.width, object.height)) {
        if (mouse.isDown) {
            object.pressed = true;
        }

        if (object.pressed) {
            if (mouse.wentUp) {
                result = true
            }
        }
        drawEmptyRect(object.x, object.y, object.width, object.height, 0, 'green');
    }
    else { object.pressed = false }
    return result;
}

function checkMessage(object) {
    let result = false;
    drawRect(object.x, object.y, object.width, object.height, 0, object.color);
    drawEmptyRect(object.x, object.y, object.width * 1.1, object.height * 1.1, 0, 'white')
    //drawText(object.x - object.width * 0.5, object.y, object.text, 0, 'middle');
    drawConvenientParagraph(object.x, object.y - object.height / 3, lang.getName(object.text) + object.appendText, object.width, object.height * 0.75, 10000)
    if (checkButton(object.button)) {
        result = true;
    }
    return result;
}


function drawText(x, y, text, angle = 0, textAlign = 'middle', color = 'white', outline = true, font = '20px Arial', textBaseline = 'center', outLineColor = 'black', outlineWidth = 10) {
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;

    // setup these to match your needs
    ctx.miterLimit = outlineWidth;
    ctx.lineJoin = 'round';

    // draw an outline, then filled
    if (outline) {
        ctx.strokeStyle = outLineColor;
        ctx.lineWidth = 5;
        ctx.strokeText(text, 0, 0);
    }
    ctx.fillText(text, 0, 0);

    ctx.restore();
}

function drawShortenedText(x, y, text, width, angle = 0, textAlign = 'middle', font = '20px Arial', color = 'white', textBaseline = 'center', outLineColor = 'black', outlineWidth = 10) {
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;

    ctx.miterLimit = outlineWidth;
    ctx.lineJoin = 'round';

    // draw an outline, then filled
    ctx.strokeStyle = outLineColor;
    ctx.lineWidth = 5;
    ctx.strokeText(text, 0, 0, width);
    ctx.lineWidth = 2;
    ctx.fillText(text, 0, 0, width);

    ctx.restore();
}

function drawSprite(x, y, sprite, angle, width, height) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);

    ctx.rotate(angle);

    let compWidth = width || sprite.width;
    let compHeight = height || sprite.height;
    ctx.drawImage(sprite, -compWidth / 2, -compHeight / 2, compWidth, compHeight);

    ctx.restore();
}
// function drawConvenientParagraph(x, y, text, width = 0, height = 500, kegel = 40,
//     font = 'arial', bold = false, color = 'white', textBaseline = "middle", textAlign = "center") {
//     if (width === void 0) { width = 999999; }
//     if (height == void 0) { height = 20 }
//     ctx.save();
//     ctx.translate(canvas.width / 2, canvas.height / 2);
//     ctx.scale(SizeMultiplier, SizeMultiplier);
//     ctx.translate(-camera.x, -camera.y);
//     ctx.translate(x, y);
//     ctx.fillStyle = color;
//     let fullFont = '';
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;

//     ctx.textBaseline = textBaseline;
//     ctx.textAlign = textAlign;
//     var paragraphs = text.split('\n');

//     x = 0;
//     let startY = y;
//     let isFitting = true;
//     let interval = kegel;
//     let maxStrings = Math.floor(height / interval);
//     let currentStrings = 1;
//     fullFont = kegel + 'px ' + font;
//     ctx.font = fullFont;
//     for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
//         currentStrings++;
//         let paragraph = paragraphs[paragraphIndex];
//         let line = '';
//         let words = paragraph.split(' ');
//         for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
//             let supposedLine = line + words[wordIndex] + ' ';
//             if (ctx.measureText(supposedLine).width > width) {
//                 y += interval;
//                 currentStrings++;
//                 line = words[wordIndex] + ' ';
//             }
//             else {
//                 line = supposedLine;
//             }
//         }
//         y += interval;
//     }
//     if (maxStrings < currentStrings) {
//         kegel = Math.floor(kegel * maxStrings / currentStrings);
//         fullFont = kegel + 'px ' + font;
//         ctx.font = fullFont;
//     }
//     y = 0;
//     for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
//         let paragraph = paragraphs[paragraphIndex];
//         let line = '';
//         let words = paragraph.split(' ');
//         for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
//             let supposedLine = line + words[wordIndex] + ' ';
//             if (ctx.measureText(supposedLine).width > width) {
//                 ctx.strokeText(line, x, y);
//                 ctx.fillText(line, x, y);
//                 y += interval;
//                 line = words[wordIndex] + ' ';
//             }
//             else {
//                 line = supposedLine;
//             }
//         }
//         ctx.strokeText(line, x, y);
//         ctx.fillText(line, x, y);
//         y += interval;
//     }
//     ctx.restore();
// }

function setTextContext(kegel, font, bold, color, textBaseline, textAlign) {
    ctx.fillStyle = color;
    let fullFont = '';
    if (bold) {
        fullFont += 'bold ';
    }

    fullFont += kegel + 'px ' + font;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = fullFont;
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
}

function getLinesCount(text, width, kegel, font, bold, color, textBaseline, textAlign) {
    setTextContext(kegel, font, bold, color, textBaseline, textAlign);

    var paragraphs = text.split('\n');
    let count = 0;
    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        let paragraph = paragraphs[paragraphIndex];
        let line = '';
        count++;
        let words = paragraph.split(' ');
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            let supposedLine = line + words[wordIndex] + ' ';
            if (ctx.measureText(supposedLine).width > width) {
                line = words[wordIndex] + ' ';
                count++;
            }
            else {
                line = supposedLine;
            }
        }
    }

    return count;
}

function getNewInterval(text, width, height, kegel, font, bold, color, interval, textBaseline, textAlign) {
    let linesCount = getLinesCount(text, width, kegel, font, bold, color, textBaseline, textAlign);
    while (linesCount * interval > height) {
        interval = height / linesCount;
        linesCount = getLinesCount(text, width, kegel, font, bold, color, textBaseline, textAlign);
    }
    return interval;
}

function drawConvenientParagraph(x, y, text, width = 0, height = 10000, kegel = 16, font = 'arial', bold = false, color = 'white',
    interval = kegel, textBaseline = "middle", textAlign = "center") {
    if (kegel > height) {
        kegel = height;
    }
    interval = getNewInterval(text, width, height, kegel, font, bold, color, interval, textBaseline, textAlign);
    if (interval < kegel) {
        kegel = interval;
    }

    drawParagraph(x, y, text, width, kegel, font, bold, color, interval, textBaseline, textAlign);
}

function drawParagraph(x, y, text, width = 0, kegel = 16, font = 'arial', bold = false, color = 'white',
    interval = kegel, textBaseline = "middle", textAlign = "center") {
    if (width === void 0) { width = 999999; }
    if (interval === void 0) { interval = 0; }
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);

    x = 0;
    y = 0;

    setTextContext(kegel, font, bold, color, textBaseline, textAlign);

    var paragraphs = text.split('\n');
    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        let paragraph = paragraphs[paragraphIndex];
        let line = '';
        let words = paragraph.split(' ');
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            let supposedLine = line + words[wordIndex] + ' ';
            if (ctx.measureText(supposedLine).width > width) {
                ctx.strokeText(line, x, y);
                ctx.fillText(line, x, y);
                y += interval;
                line = words[wordIndex] + ' ';
            }
            else {
                line = supposedLine;
            }
        }
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
        y += interval;
    }
    ctx.restore();
}

function countLinesInScrollingParagraph(text, width = 0, kegel = 16, font = 'arial', bold = false, color = 'white',
    interval = kegel, textBaseline = "middle", textAlign = "center") {
    if (width === void 0) { width = 999999; }
    if (interval === void 0) { interval = 0; }

    setTextContext(kegel, font, bold, color, textBaseline, textAlign);

    let lineCount = 0;
    var paragraphs = text.split('\n');
    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        let paragraph = paragraphs[paragraphIndex];
        let line = '';
        let words = paragraph.split(' ');
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            let supposedLine = line + words[wordIndex] + ' ';
            if (ctx.measureText(supposedLine).width > width) {
                lineCount++;
                line = words[wordIndex] + ' ';
            }
            else {
                line = supposedLine;
            }
        }
        lineCount++;
    }
    ctx.restore();
    console.log(lineCount);
    return lineCount;
}


function drawScrollingParagraph(x, y, text, lineStart, lineEnd, width = 0, kegel = 16, font = 'arial', bold = false, color = 'white',
    interval = kegel, textBaseline = "middle", textAlign = "center") {
    if (width === void 0) { width = 999999; }
    if (interval === void 0) { interval = 0; }
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(SizeMultiplier, SizeMultiplier);
    ctx.translate(-camera.x, -camera.y);
    ctx.translate(x, y);

    x = 0;
    y = 0;

    setTextContext(kegel, font, bold, color, textBaseline, textAlign);

    let lineCount = 0;
    var paragraphs = text.split('\n');
    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        let paragraph = paragraphs[paragraphIndex];
        let line = '';
        let words = paragraph.split(' ');
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            let supposedLine = line + words[wordIndex] + ' ';
            if (ctx.measureText(supposedLine).width > width) {
                if (lineCount >= lineStart && lineCount <= lineEnd) {
                    ctx.strokeText(line, x, y);
                    ctx.fillText(line, x, y);

                    y += interval;
                }
                lineCount++;
                line = words[wordIndex] + ' ';
            }
            else {
                line = supposedLine;
            }
        }
        if (lineCount >= lineStart && lineCount <= lineEnd) {
            ctx.strokeText(line, x, y);
            ctx.fillText(line, x, y);

            y += interval;
        }
        lineCount++;
    }
    ctx.restore();
} 
