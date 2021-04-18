//thinger LIBRARIES
#include <SPI.h>
#include <ESP8266WiFi.h>       //ESP8266 WiFi connection library
#include <ThingerESP8266.h>    //THINGER.IO library

//DHT22 LIBRARIES
#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>

//SERVO LIBRARIES
#include <Servo.h>

//dht functions and pins
#define DHTPIN 14
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

//led pins
#define LED1 12

int distance;

//servo pins
#define servoPin 16
Servo servo1;

// Thinger.io connection parameters
#define user "xumengh"
#define device_Id "esp8266"
#define device_credentials "###########"
ThingerESP8266 thing(user, device_Id, device_credentials);



void setup() {
  Serial.begin(9600);

  //sensor control
  dht.begin();
  pinMode(DHTPIN, INPUT);

  //led control
  pinMode(LED1,OUTPUT);

  //servo control
  pinMode(servoPin, OUTPUT);
  servo1.attach(servoPin);
  servo1.write(90);
  
  // Setup WiFi
  thing.add_wifi("##########", "####");
  // Define the 'thing' with a name and data direction

  thing["LED1"]<< digitalPin(LED1);


  #define TRIGGER_PIN 15
  #define ECHO_PIN 13
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);



  thing["SONIC"] >> [] (pson& out){
      double duration, distance;
      digitalWrite(TRIGGER_PIN, LOW);  // Get Start
//      delayMicroseconds(2); // stable the line 
      digitalWrite(TRIGGER_PIN, HIGH); // sending 10 us pulse
//      delayMicroseconds(10); // delay 
      digitalWrite(TRIGGER_PIN, LOW); // after sending pulse wating to receive signals 
      duration = pulseIn(ECHO_PIN, HIGH); // calculating time 
      distance = (duration/2) / 29.1; // single path 
//      out["Distance"] = distance;
      out = distance;
  };


    //sensor 
    thing["dhtTemp"] >> [](pson& out){
    // Add the values and the corresponding code
//      out["celsius"] = dht.readTemperature();
      out = dht.readTemperature();
    };

    thing["dhtHumi"] >> [](pson& out){
//      out["humidity"] = dht.readHumidity();
      out = dht.readHumidity();
    };

  //servo control
    ///// stop speed
  thing["SERVOstop"] << [] (pson & in) {
    if (!in.is_empty()) {
      servo1.write(90);
    }
    in = false;
  };

  ///// slow forward speed
  thing ["SERVOforward"] << [] (pson & in) {
    if (!in.is_empty()) {
      servo1.write(110);
    }
    in = false;
  };

}

void loop() {
 thing.handle();
 Serial.print("Temperature: "); 
 Serial.println(dht.readTemperature());
 Serial.print("Humidity: ");
 Serial.println(dht.readHumidity());

Serial.print("Distance");
Serial.println(distance);
 delay(500);
}
