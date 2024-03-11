// var hits=0;
// var abcd={
//     higher:[3,4,5]
// };
// console.log(abcd.higher);

var view = {
    displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
    
    }
   };


   var model = { 
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [{ locations: [0,0,0], hits: ["", "", ""] },
            { locations: [0,0,0], hits: ["", "", ""] },
            { locations: [0,0,0], hits: ["", "", ""] }],    
   
    fire : function(guess){

for (var i = 0; i < this.numShips; i++) {
           var ship = this.ships[i];
           var index=ship.locations.indexOf(guess);
                if (index >= 0){
                   ship.hits[index]="hit";
                   view.displayHit(guess);
                   view.displayMessage("HIT!");

                   if (this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                   }
                  return true;
          }
  
    }
  view.displayMiss(guess);
  view.displayMessage("YOU MISSED.");
  return false; 
},

isSunk : function(ship){
         for(i = 0; i < this.shipLength; i++)  {
          if (ship.hits[i] !== "hit"){
           return false;

     }  
  }
  return true;
},

generateShipLocations: function() {
  var locations;
  for (var i = 0; i < this.numShips; i++) {
  do {
  locations = this.generateShip();
  } while (this.collision(locations));
  this.ships[i].locations = locations;
  }
 },

 generateShip: function() {
  var direction = Math.floor(Math.random() * 2);
  var row, col;
  if (direction === 1) { 
  row = Math.floor(Math.random() * this.boardSize);
  col = Math.floor(Math.random() * (this.boardSize - 2));
  } else { 
  row = Math.floor(Math.random() * (this.boardSize - 2));
  col = Math.floor(Math.random() * this.boardSize);
  }

  var newShipLocations = [];
 for (var i = 0; i < this.shipLength; i++) {
 if (direction === 1) { 
  newShipLocations.push(row + "" + (col + i));
 }
else{ 
  newShipLocations.push((row + i)+ "" + col);}
}
return newShipLocations;
},

collision: function(locations) {
  for (var i = 0; i < this.numShips; i++) {
  var ship = model.ships[i];
  for (var j = 0; j < locations.length; j++) {
  if (ship.locations.indexOf(locations[j]) >= 0) {
  return true;  }

 }
}
  return false;
 }

 
} ;

function parseguess(guess){
  if(guess===null||guess.length!==2){
    alert("Oops, please enter a letter and a number on the board.");
  }
  else{
    var alphabet=["A","B","C","D","E","F","G"];
    var row=alphabet.indexOf(guess.charAt(0).toUpperCase());
    var column=guess.charAt(1);
       if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");  }
       else if (row < 0 || row >= model.boardSize ||column < 0 || column >= model.boardSize) {
      alert("Oops, that's off the board!");  } 
      else {
      return row + column;  }

  }
  return null;
  
  }

var controller ={
  guesses: 0,
processGuess:function(guess){
  var location=parseguess(guess);
  if(location){
    var hit=model.fire(location)
    this.guesses++;
  if (hit && model.shipsSunk===model.numShips){
view.displayMessage (" GAME OVER !! You sank all my battleship in "+ this.guesses +" guesses.");
  } }
}
 };


function handleFireButton(){
  var guessInput= document.getElementById("guessInput");
  var guess=guessInput.value;
  controller.processGuess(guess);
  guessInput.value="";

}
  
function handleKeyPress(eventObj) {
  var fireButton = document.getElementById("fireButton");
  if (eventObj.keyCode === 13) {
  fireButton.click();
  return false;
  }

 }



 function init(){
  model.generateShipLocations();
  
 var fireButton=document.getElementById("fireButton");
 fireButton.onclick=handleFireButton;
 var guessInput = document.getElementById("guessInput");
guessInput.onkeypress = handleKeyPress;  //when we do this the browser immediately passes an event object to the handler that has an information about which key was pressed on it's keycode property.
 }
 window.onload=init;
 











