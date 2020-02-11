// list to holds all cards
let myCards = document.querySelectorAll(".card");
//put all cards in array
let cards = [...myCards];

// deck of all cards in game
const deck = document.getElementById("card-deck");

//variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

//emapty array to hold opened cards
let openedCards = [];

// move variables
let moves = 0;
let counter = document.querySelector(".moves");

//variables for star icons
const stars = document.querySelectorAll(".fa-star");
//stars list
let starsList = document.querySelectorAll(".stars li");

//variable to get dialog box
let dialogPopUp = document.getElementById("dialog-box");

// timer variables
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// To shuffles cards when page is loads
document.body.onload = initGame();

// function to start a new game 
function initGame(){
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);

    // remove all exisiting classes from each card
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
        deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset rating
    for (let i = 0; i < stars.length; i++){
        stars[i].style.display = 'inline-block;';
    }

    //reset timer
    second = 0; minute = 0; hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0mins0secs";
    clearInterval(interval);   
}

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++){
    myCards = cards[i];
    //add event listener to function displayCard() that add 'open','show',"disabled" class to display cards
    myCards.addEventListener("click", displayCard);
    
    //add event listener to function OpenedCards() that add opened cards to list and check if cards are match or not
    myCards.addEventListener("click", cardOpen);

    //add event listener to function congratulationsPopup() that show congratulations box when all cards match
    myCards.addEventListener("click",congratulationsPopup);
}

//function to add open and show class to display cards
function displayCard() {
    this.classList.add("open", "show", "disabled");
}

// function to add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let openCardLen = openedCards.length;
    if(openCardLen === 2){
        moveCounter();

        //to check if the two cards matched by comparing type
        if(openedCards[0].type === openedCards[1].type){
            openedCards[0].classList.add("match", "disabled");
            openedCards[1].classList.add("match", "disabled");
            openedCards[0].classList.remove("show", "open");
            openedCards[1].classList.remove("show", "open");
            openedCards = [];
        } else {
            openedCards[0].classList.add("unmatched");
            openedCards[1].classList.add("unmatched");
            
            // disables all cards temporarily (while two cards are flipped)
            Array.prototype.filter.call(cards, function(myCards){
                myCards.classList.add('disabled');
            });

            //remove "show", "open","unmatched" classes to flipped back cards
            setTimeout(function(){
                openedCards[0].classList.remove("show", "open","unmatched");
                openedCards[1].classList.remove("show", "open","unmatched");
                enable();
                openedCards = [];
            },1000);
        }
    }
}

//function enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, 
        function(myCards){
            myCards.classList.remove('disabled');
         for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
         }
        }
    );
}


//count player moves for star rating
function moveCounter(){
    moves++;
    counter.innerHTML = moves;

    //start timer on first click
    if(moves == 1){
        startTimer();
    }
    // setting rates based on moves
    if (moves > 10 && moves < 20){
        for(var i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 20){
        for(var i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//function to start timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins"+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


//function to show congratulations pop up when all cards match
function congratulationsPopup(){
    if (matchedCard.length == 16){
       //stop timer 
        clearInterval(interval);
        //set final time in variable 
        let finalTime = timer.innerHTML;

        //show congratulations modal
        dialogPopUp.showModal(); 

        //star rating variable
        let starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on dialog box
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
                
    }
}

//function for play again Button 
function playAgain(){
    dialogPopUp.close();
    initGame();
}

