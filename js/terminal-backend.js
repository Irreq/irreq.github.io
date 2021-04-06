// Variables and values
var globalhistory = "";   // Everything entered in the terminal, before flush. Governed by 'storageLength' if in typewriter mode
var storageLength = 3000; // How many characters the terminal will keep in memory
var globalpath = "";   // The initial path
var terminalTextLengthLimit = 80;   // The maximum horizontal length
var timeDelay = 2;   // Time delay of print out
var oldTypeWriter = true; // If the site should be typed as a typewriter

// "Landing page"
document.getElementById('terminalContentsResult').innerHTML += "Oh a mildly interesting terminal on my screen...<br><br>(°‿°)<br><br>";

document.addEventListener('DOMContentLoaded', function() {
  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    // Preventing the form from submitting
    evt.preventDefault();
    // Get the text from the text input to a variable
    textInputValue = document.getElementById('terminalTextInput').value.trim();
    // Clears typed data
    clearInput();
    // Will check the entered word/sentence
    parseQuery(textInputValue);
  }
});


// Main function to check the entered text and assign it to the correct function
function parseQuery(textInputValue) {
  textInputValueLowerCase = textInputValue.toLowerCase();

  // print user query
  document.getElementById('terminalContentsResult').innerHTML += "<br><p class='userEnteredText'>"+globalpath+"> " + textInputValue + "</p>";

  if (textInputValueLowerCase.substr(0,2) == "hi ") {
    printTerminal("Hi");
  } else if (textInputValueLowerCase.substr(0,3) == "ok ") {
    printTerminal("Ok");
  } else {
    printTerminal(chatBot(textInputValue));
  }
};

// Focus the typed text
function scrollToBottomOfResults(){ // Scroll to the bottom of the results div
  var terminalResultsDiv = document.getElementById('terminalContentsResult');
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

// Clear user input
function clearInput(){
  document.getElementById('terminalTextInput').value = "";
}


function printTerminal(textData) {
  if (textData.substring(0,2) != "<p") { // Pure string needs to have padding if no padding is present
    textData = "<p>" + textData + "</p>";
  }
  document.getElementById('terminalContentsResult').innerHTML += textData;
  scrollToBottomOfResults();
}
