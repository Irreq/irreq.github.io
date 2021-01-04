var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<p>'+this.txt+'</p>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = (Math.random() * 100) + 10;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};


var globalhistory = "";

var globalpath = "~/"

// var iTextPos = 0; // initialise text position
// var sContents = ''; // initialise contents variable
// var initial_data = "";
// var iRow; // initialise current row


// var addTextToResults = function(textToAdd){
//
// this.typewriter = function() {
//
//   var u = "<p>" + textToAdd + "</p>";
//
//
//   var aText = new Array(u);
//
//   var typeSpeed = 60; // time delay of print out
//   var iIndex = 0; // start printing array at this posision
//   var iArrLength = aText[0].length; // the length of the text array
//   var iScrollAt = 10; // start scrolling up at this many lines
//   // var iTextPos = 0; // initialise text position
//   // var sContents = ''; // initialise contents variable
//   // var iRow; // initialise current row
//
//
//   sContents =  ' ';
//   iRow = Math.max(0, iIndex-iScrollAt);
//   var destination = document.getElementById('terminalReslutsCont');
//
//   // while ( iRow < iIndex ) {
//   //   sContents += aText[iRow++] + '<br />';
//   // }
//   destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "|";
//   if ( iTextPos++ == iArrLength ) {
//     iTextPos = 0;
//     iIndex++;
//
//     if ( iIndex != aText.length ) {
//       iArrLength = aText[iIndex].length;
//       setTimeout("typewriter()", typeSpeed);
//     }
//   } else {
//     setTimeout("typewriter()", typeSpeed - Math.random() ** 2 * typeSpeed);
//   }
//
//   // document.getElementById('terminalReslutsCont').innerHTML += "<p>" + this.textToAdd + "</p>";
// }
//
// typewriter(textToAdd);
//
// // typewriter();
// };


async function loadText(url) {
    text = await fetch(url);
    //awaits for text.text() prop
    //and then sends it to readText()
    readText(await text.text());
}

function readText(text){
    //here you can continue with your JS normal logic
    console.log(text);
}

var dict = {

   "name": "Isac",
   "fullname": "Isac Per Ragnar Bruce",
   "phone": "(+46) 079 348 9745",
   "contact": "I'd Like To Hear From You.<br>Hit me up whenever you wan't, <br>I will try to answer any question, big or small.",
   "mail": "irreq@protonmail.com",
   "location": "<a href='https://goo.gl/maps/D2MUaJTjyXvk5rzw9'><u><br><br>Thorildsplans gymnasium <br>Drottningholmsvägen 82 <br>112 43 Stockholm</u></a>",

};


document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0,150);
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();

  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;

  // Clear text input
  var clearInput = function(){
    document.getElementById('terminalTextInput').value = "";
  }

  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function(){
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // // Add text to the results div
  // var addTextToResults = function(textToAdd){
  //
  //   document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
  //
  //   // lol(textToAdd);
  //
  //   scrollToBottomOfResults();
  // }

  var addTextToResults = function(textToAdd){

    var localTextPos = 0; // initialise text position

    var typeSpeed = 60; // time delay of print out

    var textData = "";


    if (textToAdd.substring(0,2) != "<p") {
      textData = "<p>" + textToAdd + "</p>";
    }

    else {
      textData = textToAdd;
    }


    this.typewriter = function() {

      var destination = document.getElementById('terminalReslutsCont');

      if (localTextPos == 0) {
        globalhistory = destination.innerHTML;
      }



      globalhistory += textData.substring(localTextPos-1,localTextPos); //getting one element at the position and appending it to the entirety

      destination.innerHTML = globalhistory;

      scrollToBottomOfResults();

      localTextPos++

      // I'm guessing the function overflows and dies but that is no issue

      setTimeout("typewriter()", Math.random() * typeSpeed);

    }

    clearInput();

    typewriter(textToAdd);
  }

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function(){
    // Array of all the help keywords
    var helpKeyWords = [
      "- Open + website URL to open it in the browser (ex. open webdevtrick.com)",
      "- Google + keyword to search directly in Google (ex. google web development)",
      "- YouTube + keyword to search directly in YouTube (ex. Technical Freaks)",
      "- Wiki + keyword to search directly in Wikipedia (ex. wiki numbers)",
      "- 'Time' will display the current time.",
      "- 'Date' will display the current date.",
      "- 'tech' will make you expert by watching videos",
      "PS. There are more keywords for you to discover. ;)"
    ].join('<br>');
    addTextToResults(helpKeyWords);
  }

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function(postTimeDay){
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10){ // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10){ // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time"){
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date"){
      addTextToResults(currentDate);
    }
  }

  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  // Having a specific text reply to specific strings
  var textReplies = function() {
    switch(textInputValueLowerCase){
      // replies

      case "about":
      case "info":
        // clearInput();
        addTextToResults("Hello!<br><br>I am an AI enthusiast with a peculiar inclination for learning and problem-solving. <br>Whenever I am not working on my computer, you will find me running or riding Mountainbike in the local forests.");
        break;

      case "details":
        // clearInput();
        addTextToResults("Here are my details:<br><br>Full name: Isac Per Ragnar Bruce<br>Occupation: Student, Developer & Hobby Scientist<br>");
        break;

      case "name":
        // clearInput();
        addTextToResults("hello my name is "+dict["name"] + " <p><i>hint: try 'fullname'</i></p>");
        break;

      case "cls":
      case "clear":
        // globalhistory = "";
        document.getElementById('terminalReslutsCont').innerHTML = ""
        // clearInput();
        addTextToResults("");
        break;

      case "pwd":
        addTextToResults(globalpath)
        break;

      case "fullname":
        // clearInput();
        addTextToResults("My full name is " + dict["fullname"]);
        break;

      case "number":
      case "phone":
        // clearInput();
        addTextToResults("You can reach me on mobile too: "+dict["phone"]);
        break;

      case "email":
      case "mail":
        // clearInput();
        addTextToResults("You can easely reach me on my email: " + dict["mail"]);
        break;

      case "contact":
        // clearInput();
        addTextToResults(dict["contact"] + "<br><br>Phone: "+dict["phone"]+"<br><br>Email: "+dict["mail"]);
        break;

      case "location":
      case "address":
        // clearInput();
        addTextToResults("You can find me at: "+dict["location"]);
        break;


      case "code":
        // clearInput();
        addTextToResults("Source code is available <a href='https://github.com/irreq/irreq.github.io'><u>here</u></a>");
        break;

      case "founder":
        // clearInput();
        addTextToResults("Webdevtrick's founder is Shaan");
        break;

      case "shaan":
        // clearInput();
        addTextToResults("Shaan is founder of this blog and he is a Developer, SEO, and Graphic Designer");
        break;

      case "web development":
      case "web dev":
      case "webdevelopment":
        // clearInput();
        addTextToResults('Web development examples!');
        openLinkInNewWindow('https://webdevtrick.com/web-development/');
        break;

      case "hello":
      case "hi":
        // clearInput();
        addTextToResults("Hello, I am your assistant... I am based on pure vanilla JavaScript.");
        break;




      // replies

      case "cd":
        addTextToResults("Type cd + a path, eg: 'home'.");
        break;

      case "youtube":
        // clearInput();
        addTextToResults("Type youtube + something to search for.");
        break;

      case "google":
        // clearInput();
        addTextToResults("Type google + something to search for.");
        break;

        case "wiki":
        case "wikipedia":
          // clearInput();
          addTextToResults("Type wiki + something to search for.");
          break;

      case "time":
        // clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        // clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        // clearInput();
        postHelpList();
        break;

      default:
      // clearInput();
      addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>");
      break;
    }
  }

// Main function to check the entered text and assign it to the correct function
  var checkWord = function() {
    textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string

    if (textInputValue != ""){ //checking if text was entered
      document.getElementById('terminalReslutsCont').innerHTML += "<p class='userEnteredText'>"+globalpath+"> " + textInputValue + "</p>";
      // addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
      if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,3) == "cd ") {

        var data = textInputValueLowerCase.substr(3) + " ";

        if (data.substr(0,2) == "/ ") {globalpath = "~/root"}
        else if (data.substr(0,2) == ". ") {globalpath = "~/"}
        else if (data.substr(0,3) == ".. "){
          // go up one place

          if (globalpath.length > "~/".length) {
            globalpath = globalpath.substr(0,globalpath.lastIndexOf("/"));

          }

          if (globalpath.length < "~/".length) {
            globalpath = "~/";
          }

        }
        else if (data.substr(0,1) == "/" ) {

          globalpath = "~/" + data.substr(1,data.length-1);

        }

        else {
          if (globalpath.substr(0,globalpath.length) != "~/") {
            globalpath += "/"

          }
          globalpath += data.substr(0,data.length-1)
        }

        addTextToResults("<p><i>hint: try 'ls' to list files</i></p>");

      } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
        addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
        addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
        openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
      } else{
        textReplies();
      }
    }
  };

});
