// Variables and values
var globalhistory = "";   // Everything entered in the terminal, before flush. Governed by 'storageLength' if in typewriter mode
var storageLength = 3000; // How many characters the terminal will keep in memory
var globalpath = "";   // The initial path
var terminalTextLengthLimit = 80;   // The maximum horizontal length
var timeDelay = 2;   // Time delay of print out
var oldTypeWriter = true; // If the site should be typed as a typewriter

const duck = "<pre style='border: 0; font-family: var(--font); background: yellow; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>"+
             "               __<br>"+
             "             <(o )___<br>"+
             "              ( ._> /<br>"+
             "               `---'   "+
             "</pre>";

const metaInfo = {
  "rooturl": "https://raw.githubusercontent.com/Irreq/irreq.github.io/main/",
  "name": "Irreq",
  "mail": "<a href='mailto:irreq@protonmail.com'><u>irreq@protonmail.com</u></a>",
  "occupation": "Student, Developer & Hobby Scientist",
  "construction": "<pre style='color: yellow; border: 0; font-family: var(--font);'>                              _<br>"+
                  "                     /======/                           <br>"+
                  "            ____    //      \\___,      ,/101010         <br>"+
                  "             | \\   //          ,:,   ./101010101        <br>"+
                  "     |¨¨¨¨¨¨¨|__|_//            ,;:; /10010101101        <br>"+
                  "    _L_____________\o            ,;;;/1010101011101      <br>"+
                  ".,,.(O_o_o_o_o_o_o_O),,.,.,.,...,.-/101010101010101,,.,.</pre>",
  "landing": "Oh a mildly interesting terminal... (°‿°)<br><br>"+
             //"Hey!<br><br>"+
             "The terminal in front of you is known as a 'Command-Line Interface' and it processes your commands in the form of lines of text. "+
             "Unlike the majority of websites, this one can be navigated with just a <i>keyboard</i>.<br><br>"+
             "You have to take my word for this, but the terminal is harmless and won't leave your device "+'"hacked". '+
             "Here is a harmless cyber duck for further comfort:<br>"+duck+
             "I will guide you upon your visit. Even though I am a program, I cannot interpret everything (yet)"+
             ", so please be patient and type keywords so I can help!<br><br>"+
             "</pre>Good  Luck!<br>",

  "mobile_": "<pre style='border: 0; font-family: var(--font); background: red; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>WARNING</pre><br>"+
            "Dear visitor, <br><br>This portfolio was developed to look like a terminal, it is therefore recomended to continue your visit on a computer."+
            "<br><br>( ._.)<br><br>But please hang on, I am working on a mobile version too, <a href='https://www.github.com/irreq'><u>here</u></a>!<br><br>"+
            "If you still want to proceed, here is the desktop site:<br><br><br><br>",
  "mobile": "<p style='color: #ff0000;'>* * * WARNING * * *<br><br>"+
                                       "Dear visitor,<br><br>"+
                                       "To get the optimum<br>"+
                                       "experience, please<br>"+
                                       "visit on a desktop<br>"+
                                       "or a laptop<br><br>"+
                                       "/Irreq<br><br>"+
                                       "* * * * * * * * * *<br><br></p>",
}

// Notify Mobile users
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) != true) {
  let dde = document.documentElement;
  dde.addEventListener("mousemove", e => {
    dde.style.setProperty('--mouseY', 0.08*(window.innerHeight/2 - e.clientY) + "px");
    dde.style.setProperty('--mouseX', 0.08*(window.innerWidth/2 - e.clientX) + "px");
  });
} else {
  document.getElementById('terminalContentsResult').innerHTML = metaInfo.mobile;
}


// "Landing page"
document.getElementById('terminalContentsResult').innerHTML += metaInfo.landing;

// Intitialize CLI
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

  // Quick commands
  if (textInputValueLowerCase.substr(0,5) == "echo ") {
    printTerminal(textInputValue.substr(5))
  } else {
    textReplies(textInputValue)
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

function printTerminal(textData, hint) {
  if (hint != undefined) {
    textData += "<br><br><span class='hint'>Hint, try typing: </span>"+hint
  }
  if (textData.substring(0,2) != "<p") { // Pure string needs to have padding if no padding is present
    textData = "<p>" + textData + "</p>";
  }
  document.getElementById('terminalContentsResult').innerHTML += textData;
  scrollToBottomOfResults();
}
