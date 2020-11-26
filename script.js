const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// FileReader object allows us to read a content of a file
const reader = new FileReader();
const img = new Image();
//solution for CORS problem
img.crossOrigin = "Anonymous";

// function uploadImage receives an event details and draw the uploaded image on the canvas
const uploadImage = event => {
    reader.onload = () => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0])
}

const imageLoader = document.getElementById('uploader');
imageLoader.addEventListener('change', uploadImage);

//random image generator

const generateRandomImage = () => {
    img.src = "https://picsum.photos/600/400";
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    }
    reader.result = img.src;
}

// function for generating a function for manipulation of image
const generateChangeFn = (dataManipulator) => () => {
    //getImageData grabs the pixel data from canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    //loop through all of the pixel data
    //each pixel has four values: red, green, blue, alpha - so we increment by 4
    //data[i] - red, data[i+1] - green, data[i+2] - blue
    for(let i=0; i<data.length; i+= 4) {
        dataManipulator(data,i);
    }
    ctx.putImageData(imageData, 0, 0);
}

// greyscale
const greyManipulator = (data,i) => {
    const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
    data[i] = grey;
    data[i+1] = grey;
    data[i+2] = grey;
}

const greyscale = generateChangeFn(greyManipulator);

/*

const greyscale = () => {
    //getImageData grabs the pixel data from canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    //loop through all of the pixel data
    //each pixel has four values: red, green, blue, alpha - so we increment by 4
    //data[i] - red, data[i+1] - green, data[i+2] - blue
    for(let i=0; i<data.length; i+= 4) {
        const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
        data[i] = grey;
        data[i+1] = grey;
        data[i+2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
}

*/
// sepia
const sepiaManipulator = (data,i) => {
    const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
        data[i] = grey + 90;
        data[i+1] = grey + 50;
        data[i+2] = grey;
}

const sepia = generateChangeFn(sepiaManipulator);
/*
const sepia = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
        data[i] = grey + 90;
        data[i+1] = grey + 50;
        data[i+2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
}
*/

const invertManipulator = (data, i) => {
    data[i] = 255-data[i];
    data[i+1] = 255-data[i+1];
    data[i+2] = 255-data[i+2];
}

const invert = generateChangeFn(invertManipulator);
/*
const invert = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        data[i] = 255-data[i];
        data[i+1] = 255-data[i+1];
        data[i+2] = 255-data[i+2];
    }
    ctx.putImageData(imageData, 0, 0);
}

*/

// RGB -> RBG
const rbgManipulator = (data, i) => {
    const green = data[i+1];
    data[i+1] = data[i+2];
    data[i+2] = green;
}

const rbg = generateChangeFn(rbgManipulator);

/*
// RGB -> RBG
const rbg = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        const green = data[i+1];
        data[i+1] = data[i+2];
        data[i+2] = green;
    }
    ctx.putImageData(imageData, 0, 0);
}

*/
// RGB -> BGR
const bgrManipulator = (data,i) => {
    const red = data[i];
    data[i] = data[i+2];
    data[i+2] = red;
}

bgr = generateChangeFn(bgrManipulator);

/*
const bgr = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        const red = data[i];
        data[i] = data[i+2];
        data[i+2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}

*/

// RGB -> GBR
const gbrManipulator = (data, i) => {
    const red = data[i];
    data[i] = data[i+1];
    data[i+1] = data[i+2];
    data[i+2] = red;
}

const gbr = generateChangeFn(gbrManipulator);
/*
const gbr = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        const red = data[i];
        data[i] = data[i+1];
        data[i+1] = data[i+2];
        data[i+2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}
*/
// RGB -> GRB
const grbManipulator = (data, i) => {
    const red = data[i];
    data[i] = data[i+1];
    data[i+1] = red;
}

const grb = generateChangeFn(grbManipulator);
/*
const grb = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        const red = data[i];
        data[i] = data[i+1];
        data[i+1] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}
*/
// transparent
const transparentManipulator = (data,i) => {
    transparentValue = document.getElementById('transparent').valueAsNumber;
    data[i+3] = transparentValue;
}

const transparent = generateChangeFn(transparentManipulator);
/*
const transparent = () => {
    transparentValue = document.getElementById('transparent').valueAsNumber;
    console.log(transparentValue);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for(let i=0; i<data.length; i+= 4) {
        data[i+3] = transparentValue;
    }
    ctx.putImageData(imageData, 0, 0);
}
*/
const clearChanges = () => {
    img.src = img.src || reader.result;
}

document.getElementById('random').addEventListener('click', generateRandomImage);
document.getElementById('greyscale').addEventListener('click', greyscale);
document.getElementById('sepia').addEventListener('click', sepia);
document.getElementById('invert').addEventListener('click', invert);
document.getElementById('rbg').addEventListener('click', rbg);
document.getElementById('bgr').addEventListener('click', bgr);
document.getElementById('gbr').addEventListener('click', gbr);
document.getElementById('grb').addEventListener('click', grb);
document.getElementById('transparent').addEventListener('change', transparent);
document.getElementById('clear').addEventListener('click', clearChanges);
