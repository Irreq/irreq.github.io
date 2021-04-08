// Variables and values
var globalhistory = "";   // Everything entered in the terminal, before flush. Governed by 'storageLength' if in typewriter mode
var storageLength = 3000; // How many characters the terminal will keep in memory
var globalpath = "";   // The initial path
var terminalTextLengthLimit = 80;   // The maximum horizontal length
var timeDelay = 2;   // Time delay of print out
var oldTypeWriter = true; // If the site should be typed as a typewriter

const bird = "<pre style='border: 0; font-family: var(--font); background: yellow; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>"+
             "               __<br>"+
             "             <(o )___<br>"+
             "              ( ._> /<br>"+
             "               `---'   "+
             "</pre>";

const metaInfo = {
  "rooturl": "https://raw.githubusercontent.com/Irreq/irreq.github.io/main/site/",
  "name": "Irreq",
  "mail": "<a href='mailto:irreq@protonmail.com'><u>irreq@protonmail.com</u></a>",
  "occupation": "Student, Developer & Hobby Scientist",
  "landing": "Oh a mildly interesting terminal on my screen...<br><br>(°‿°)<br><br>"+
             // "<strong>Welcome to Isac's interactive portfolio!</strong><br><br>   "+
             "I am your assistant and I will help you find out information about Isac. Even though I am a program, I cannot solve everything (yet)"+
             ", so please type keywords or really short sentences, so I can assist you!<br><br>"+
             "The terminal in front of you is known as a 'Command-Line Interface' and process your commands in the form of lines of text. "+
             "Unlike the majority of websites, this one can help you find what you are looking for with just a <i>keyboard</i>.<br><br>"+
             "I can assure you that this terminal is completely harmless and it runs in your browser, so do not fear typing. "+
             "If you are still in doubt, here is a harmless cyber duck:<br>"+bird+
             "</pre>Good  Luck!<br><br>PS. If the site feels slow, try typing: 'clear' to remove all content. "+
             "If you prefer a quick response, try typing: 'type' to disable/enable the typewriter effect.<br>",

  "mobile_": "<pre style='border: 0; font-family: var(--font); background: red; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>WARNING</pre><br>"+
            "Dear visitor, <br><br>This portfolio was developed to look like a terminal, it is therefore recomended to continue your visit on a computer."+
            "<br><br>( ._.)<br><br>But please hang on, I am working on a mobile version too, <a href='https://www.github.com/irreq'><u>here</u></a>!<br><br>"+
            "If you still want to proceed, here is the desktop site:<br><br><br><br>",
  "mobile": "<p style='color: #ff0000;'>* * * WARNING * * *<br><br>"+
                                       // "You should try this<br>"+
                                       "Dear visitor,<br><br>"+
                                       "To get the optimum<br>"+
                                       "experience, please<br>"+
                                       "visit on a desktop<br>"+
                                       "or a laptop<br><br>"+
                                       "/Irreq<br><br>"+
                                       // "site on a desktop or<br>"+
                                       // "a laptop for a more<br>"+
                                       // "immersive experience<br><br>"+
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
  // document.getElementById('terminalContentsResult').innerHTML = "<p style='color: #ff0000;'>* * * WARNING * * *<br><br>You should try this<br>site on a desktop or<br>a laptop for a more<br>immersive experience<br><br>* * * * * * * * * *<br><br></p>";
}


// "Landing page"
document.getElementById('terminalContentsResult').innerHTML += metaInfo.landing;
// // "Landing page"
// document.getElementById('terminalContentsResult').innerHTML += "Oh a mildly interesting terminal on my screen...<br><br>(°‿°)<br><br>";

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
