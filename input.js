

const RIGHT_CODE = 68;
const DOWN_CODE = 83;
const LEFT_CODE = 65;
const UP_CODE = 87;
const SPACE_CODE = 32;
const PLUS_CODE = 107;
const MINUS_CODE = 109;
const ESCAPE_CODE = 27;

let mouse = {
    x: 0,
    y: 0,
    isDown: false,
    wentDown: false,
    wentUp: false,
    worldX: 0,
    worldY: 0,
    scrolled: 0
}


function addKey() {
    let key = {
        wentDown: false,
        wentUp: false,
        isDown: false,
    }
    return key;
}
/*
window.addEventListener('scroll', function() {
    ;
  });
*/

window.onwheel = function (event) {
    mouse.scrolled = event.deltaY;
}

window.onmousemove = function mousemove(event) {
    let rect = canvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) * canvas.width / rect.width;
    mouse.y = (event.clientY - rect.top) * canvas.height / rect.height;
}

window.onmousedown = function mousedown(event) {
    handleKeyDown(mouse, true, true);
}

window.onmouseup = function mousedown(event) {
    handleKeyUp(mouse, true, true);
}

function clearMouse() {
    mouse.wentUp = false;
    mouse.wentDown = false;

}

let downKey = addKey();
let leftKey = addKey();
let rightKey = addKey();
let upKey = addKey();
let spaceKey = addKey();
let plusKey = addKey();
let minusKey = addKey();
let escapeKey = addKey();


function clearKey(k) {
    k.wentUp = false;
    if (k.wentDown) {
        k.wentDown = false;
        k.isDown = true;
    }
}

function clearKeys() {
    clearKey(downKey);
    clearKey(upKey);
    clearKey(leftKey);
    clearKey(rightKey);
    clearKey(spaceKey);
    clearKey(plusKey);
    clearKey(minusKey);
    clearKey(escapeKey);
    clearMouse;
}

function handleKeyDown(key, eventKeyCode, keyCode) {
    if (keyCode === eventKeyCode) {
        if (!key.isDown) {
            key.isDown = true;
            key.wentDown = true;
        }
    }
}

function handleKeyUp(key, eventKeyCode, keyCode) {
    if (keyCode === eventKeyCode) {
        if (key.isDown) {
            key.isDown = false;
            key.wentUp = true;
        }
    }
}


window.onkeydown = function keydown(event) {
    handleKeyDown(rightKey, event.keyCode, RIGHT_CODE);
    handleKeyDown(leftKey, event.keyCode, LEFT_CODE);
    handleKeyDown(upKey, event.keyCode, UP_CODE);
    handleKeyDown(downKey, event.keyCode, DOWN_CODE);
    handleKeyDown(spaceKey, event.keyCode, SPACE_CODE);
    handleKeyDown(plusKey, event.keyCode, PLUS_CODE);
    handleKeyDown(minusKey, event.keyCode, MINUS_CODE);
    handleKeyDown(escapeKey, event.keyCode, ESCAPE_CODE);
}

window.onkeyup = function keyup(event) {
    handleKeyUp(rightKey, event.keyCode, RIGHT_CODE);
    handleKeyUp(leftKey, event.keyCode, LEFT_CODE);
    handleKeyUp(upKey, event.keyCode, UP_CODE);
    handleKeyUp(downKey, event.keyCode, DOWN_CODE);
    handleKeyUp(spaceKey, event.keyCode, SPACE_CODE);
    handleKeyUp(plusKey, event.keyCode, PLUS_CODE);
    handleKeyUp(minusKey, event.keyCode, MINUS_CODE);
    handleKeyUp(escapeKey, event.keyCode, ESCAPE_CODE);
}

