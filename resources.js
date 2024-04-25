let resourcesWaitingForLoadCount = 0;
let resourcesLoadedCount = 0;
let canBeginGame = false;

function resourceLoaded(src) {
    resourcesLoadedCount++;

    // console.log('loaded', src);
    if (resourcesWaitingForLoadCount === resourcesLoadedCount) {
        canBeginGame = true;
    }
}

function loadImage(src) {
    let img = new Image();
    img.src = "sprites/" + src;
    resourcesWaitingForLoadCount++;
    img.onload = () => resourceLoaded(src);

    return img;
}
/*
const TYPE_AGRO = 0;
const TYPE_BOAT = 1;
const TYPE_FACTORY = 2;
const TYPE_MYASO = 3;
const TYPE_OFFICE = 4;
const TYPE_RESOURCE = 5;
const TYPE_RESTAURANT = 6;
const TYPE_RETAIL = 7;
const TYPE_VEGETABLE = 8;
*/

let imgError = loadImage("error.bmp");
let imgRestaurant = loadImage("restaurant.png");
let imgAgro = loadImage("wheat.png");
let imgResource = loadImage("resource.png");
let imgRetail = loadImage("retail.png");
let imgBoat = loadImage("boat.png");
let imgMyaso = loadImage("myaso.png");
let imgFactory = loadImage("factory.png");
let imgOffice = loadImage("office.png");
let imgVegetable = loadImage("vegetable.png");
let imgArray = [imgAgro,imgBoat,imgFactory,imgMyaso,imgOffice,imgResource,imgRestaurant,imgRetail,imgVegetable]