const redSlider = document.querySelector(".red");
const greenSlider = document.querySelector(".green");
const blueSlider = document.querySelector(".blue");
const colorOutput = document.querySelector(".color-output");
const randomColorButton = document.querySelector("#random-color-button");

const state = {
    red: redSlider.value,
    green: greenSlider.value,
    blue: blueSlider.value,
};

render();

redSlider.addEventListener("input", handleInputEvent);
greenSlider.addEventListener("input", handleInputEvent);
blueSlider.addEventListener("input", handleInputEvent);
randomColorButton.addEventListener("click", randomColorApi);

function updateState() {
    state.red = redSlider.value;
    state.green = greenSlider.value;
    state.blue = blueSlider.value;
}

function valuesToInt() {
    state.red = parseInt(redSlider.value);
    state.green = parseInt(greenSlider.value);
    state.blue = parseInt(blueSlider.value);
}

function rgbToHex() {
    state.red = state.red.toString(16);
    state.green = state.green.toString(16);
    state.blue = state.blue.toString(16);

    if (state.red.length === 1) {
        state.red = "0" + state.red;
    }
    if (state.green.length === 1) {
        state.green = "0" + state.green;
    }
    if (state.blue.length === 1) {
        state.blue = "0" + state.blue;
    }
}

function randomColorApi() {
    fetch("https://dummy-apis.netlify.app/api/color")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            redSlider.value = data.rgb.r;
            greenSlider.value = data.rgb.g;
            blueSlider.value = data.rgb.b;
            handleInputEvent();
        });
}

function render() {
    colorOutput.innerHTML = `#${state.red}${state.green}${state.blue}`;
    document.body.style.backgroundColor = `#${state.red}${state.green}${state.blue}`;
}

function handleInputEvent() {
    updateState();
    valuesToInt();
    rgbToHex();
    render();
}