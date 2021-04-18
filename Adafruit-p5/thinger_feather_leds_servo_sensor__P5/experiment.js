var thingerUrl = ["https://api.thinger.io/v3/users/xumengh/devices/esp8266/resources/", "?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcHJvamVjdDNiIiwidXNyIjoieHVtZW5naCJ9.D-mwpRTMDg3qQXaQX_DYe4ktDb_czYIhDeOlxedNnXI"]

var resources = ["LED1", "SONIC", "dhtTemp", "dhtHumi", "SERVOstop", "SERVOforward"];


var Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcHJvamVjdDNiIiwidXNyIjoieHVtZW5naCJ9.D-mwpRTMDg3qQXaQX_DYe4ktDb_czYIhDeOlxedNnXI";

////// variables for the 2 seperate data sets and the 2 seperate buttons
var data1;
var data2;
var ledButton1;
var ledButton2;
var servoStop;
var servoFor;
var DHTsensorTem;
var DHTsensorHum;

var url = [];


function setup() {
    //// make the canvas whatever size you require
    createCanvas(windowWidth, windowHeight);


    for (let i = 0; i < resources.length; i++) {
        url[i] = thingerUrl[0] + resources[i] + thingerUrl[1];
    };


    //////experimenting with p5 buttons
    ledButton1 = createButton('LED1')
        .style('border', '2px solid #83EE9E')
        .position(width / 2 - 100, height / 6)
        .mouseClicked(ledOn1)
        .doubleClicked(ledOff1)
        .mouseOver(() => (ledButton1.style('background-color', "#F3F8FF")))
        .mouseOut(() => (ledButton1.style('background-color', "#83EE9E")));


    fill(0);
    textSize(22);

    text(url[2], width, 40);
    text(url[3], width, 40);


    servoStop = createButton('Stop')
        .style('border', '2px solid #83EE9E')
        .position(width / 2 - 100, height / 2)
        .mouseClicked(servoStopT)
        .doubleClicked(servoStopF)
        .mouseOver(() => (servoStop.style('background-color', "#F3F8FF")))
        .mouseOut(() => (servoStop.style('background-color', "#83EE9E")));

    servoFor = createButton('Forward')
        .style('border', '2px solid #83EE9E')
        .position(width / 2 - 100, height / 2 + 120)
        .mouseClicked(servoForT)
        .doubleClicked(servoForF)
        .mouseOver(() => (servoFor.style('background-color', "#F3F8FF")))
        .mouseOut(() => (servoFor.style('background-color', "#83EE9E")));


    ///// some p5 button styling, this affects all the buttons
    let buttons = selectAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i]
            .size(200, 67)
            .style('font-size', '32px')
            .style('color', '#343434')
            .style('background-color', "#83EE9E")
            .style('text-align', 'center')
            .style('transition-duration', '0.4s');
    }


}


function draw() {
    ////// the colour of the background
    background("#F3F8FF");


    console.log(url[2]);
}

////// these are the functions sending data to the switch case based
////// on the specific mouseClicked, this doesnt feel optimizwed but it works
function ledOn1() {
    ////this sends a boolean state of false to the led1 json function
    sendData('ledOn1');
    ledButton1.style('border', '10px solid #83EE9E');
}

function ledOff1() {
    ////this sends a boolean state of false to the led1 json function
    sendData('ledOff1');
    ledButton1.style('border', '2px solid #83EE9E');
}


function servoStopT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoStopT');
    servoStop.style('border', '10px solid #83EE9E');
}

function servoStopF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoStopF');
    servoStop.style('border', '2px solid #83EE9E');
}

function servoForT() {
    ////this sends a boolean state of true to the led2 json function 
    sendData('servoForT');
    servoFor.style('border', '10px solid #83EE9E');
}

function servoForF() {
    ////this sends a boolean state of false to the led2 json function
    sendData('servoForF');
    servoFor.style('border', '2px solid #83EE9E');
}


function temp() {
    sendData('temp');
}

function humi() {
    sendData('humi');
}



function sendData(val) {

    let urlData;
    switch (val) {
        case 'ledOn1':
            urlData = true;
            urli = url[0];
            break;
        case 'ledOff1':
            urlData = false;
            urli = url[0];
            break;

        case 'servoStopT':
            urlData = true;
            urli = url[4];
            break;
        case 'servoStopF':
            urlData = false;
            urli = url[4];
            break;
        case 'servoForT':
            urlData = true;
            urli = url[5];
            break;
        case 'servoForF':
            urlData = false;
            urli = url[5];
            break;

        case 'temp':
            urlData = true;
            urli = url[2];
            DHTsensorTem = url[2];

        case 'humi':
            urlData = true;
            urli = url[3].humidity;
            DHTsensorHum = url[3];
        default:
            urlData = false;
    }




    ////// this function sends the data boolean state for each resource 
    ////// to thinger.io using a json, it uses the switch case above
    ////// to change the authorization, the specific resource address,
    ////// and correct data type based on the case and the button pressed
    let postData = {
        method: "POST",
        Headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': Auth,
            'Accept': "application/json, text/plain, */*"
        },

        "in": urlData
    };
    httpPost(urli, 'application/json', postData, function (result) {
        console.log(postData);
    });
}
