// Author: Irreq
//
// This is the core of the website. This file contains:
// [1] Retrieve text from external sites.
// [2] Typewriter abbillities.
// [3] Small chatbot.
//
// See individual comments for further documentation


// Variables and values
var globalhistory = "";   // Everything entered in the terminal, before flush. Governed by 'storageLength' if in typewriter mode
var storageLength = 3000; // How many characters the terminal will keep in memory
var globalpath = "~/";   // The initial path
var terminalTextLengthLimit = 80;   // The maximum horizontal length
var timeDelay = 2;   // Time delay of print out
var oldTypeWriter = true; // If the site should be typed as a typewriter



const bird = "<pre style='background: yellow; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>"+
             "               __<br>"+
             "             <(o )___<br>"+
             "              ( ._> /<br>"+
             "               `---'   "+
             "</pre>";
const metaInfo = {
  "rooturl": "https://raw.githubusercontent.com/Irreq/irreq.github.io/main/site/",
  "name": "Isac",
  "fullname": "Isac Per Ragnar Bruce",
  "phone": "(+46) 079 348 9745",
  "contact": "I'd Like To Hear From You.<br>Hit me up whenever you wan't, <br>I will try to answer any question, big or small.",
  "mail": "<a href='mailto:irreq@protonmail.com'><u>irreq@protonmail.com</u></a>",
  "location": "<a href='https://goo.gl/maps/D2MUaJTjyXvk5rzw9'><u><br><br>Thorildsplans gymnasium <br>Drottningholmsvägen 82 <br>112 43 Stockholm</u></a>",
  "occupation": "Student, Developer & Hobby Scientist",
  "programming_languages": "Python, Julia, R & JS",
  "construction": "<pre style='color: yellow;'>                             _<br>"+
                  "                     /======/                           <br>"+
                  "            ____    //      \\___,      ,/101010               <br>"+
                  "             | \\   //          ,:,   ./101010101                  <br>"+
                  "     |¨¨¨¨¨¨¨|__|_//            ,;:; /10010101101                   <br>"+
                  "    _L_____________\o            ,;;;/1010101011101                    <br>"+
                  ".,,.(O_o_o_o_o_o_o_O),,.,.,.,...,.-/101010101010101,,.,., Isac Bruce .,.,,,.,.,</pre>",


  "landing": "<strong>Welcome to Isac's interactive portfolio!</strong><br><br>   "+
             "I am your assistant and I will help you find out information about Isac. Even though I am a program, I cannot solve everything (yet)"+
             ", so please type keywords or really short sentences, so I can assist you!<br><br>"+
             "The terminal in front of you is known as a 'Command-Line Interface' <i>abbreviated to</i> 'CLI'. "+
             "A (CLI) processes commands to a computer program in the form of lines of text. - <i>Wikipedia</i><br><br>"+
             "Unlike the majority of websites, this website can help you find what you are looking for with just a <i>keyboard</i>.<br><br>"+
             "I can assure you that this terminal is completely harmless as it runs in your browser, so do not fear typing anything. "+
             "If you are still in doubt, here is a harmless cyber duck:<br>"+bird+
             "</pre>Good  Luck!<br><br>PS. If the site feels slow, try typing: 'clear' to remove all content. "+
             "If you prefer a quick response, try typing: 'type' to disable/enable the typewriter effect.<br>",

  "mobile": "<pre style='background: red; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>WARNING</pre><br>"+
            "Dear visitor, <br><br>This portfolio was developed to look like a terminal, it is therefore recomended to continue your visit on a computer."+
            "<br><br>( ._.)<br><br>But please hang on, I am working on a mobile version too, <a href='https://www.github.com/irreq'><u>here</u></a>!<br><br>"+
            "If you still want to proceed, here is the desktop site:<br><br><br><br>",
};

// Notify Mobile users
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  document.getElementById('terminalContentsResult').innerHTML = metaInfo.mobile;
}

// "Landing page"
document.getElementById('terminalContentsResult').innerHTML += metaInfo.landing;




document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('terminalTextInput').focus();   // Get the focus to the text input to enter a word right away.

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault();   // Preventing the form from submitting

    textInputValue = document.getElementById('terminalTextInput').value.trim();   // Get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase();   // lower case of the string
    clearInput();   // clears typed data
    checkWord(textInputValue, textInputValueLowerCase);    // Will check the entered word/sentence
  }
});


// Main function to check the entered text and assign it to the correct function
function checkWord(textInputValue, textInputValueLowerCase) {

  // print user query
  document.getElementById('terminalContentsResult').innerHTML += "<br><p class='userEnteredText'>"+globalpath+"> " + textInputValue + "</p>";

  if (textInputValueLowerCase.substr(0,5) == "open ") {   // If the first 5 characters = open + space
    openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
    message("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
  } else if (textInputValueLowerCase.substr(0,3) == "cd ") {
    changeDir(textInputValueLowerCase.substr(3) + " ");
  } else if (textInputValueLowerCase.substr(0,6) == "speed "){
    timeDelay = parseFloat(textInputValue.substr(6));
    message("Typing speed is now set to: "+textInputValue.substr(6)+"ms!");
  } else if (textInputValueLowerCase.substr(0,5) == "find ") {
    getTextData(metaInfo.rooturl+textInputValue.substr(5)+".txt")
  } else if (textInputValueLowerCase.substr(0,7) == "search ") {
    getTextData(textInputValue.substr(7))
  } else if (textInputValueLowerCase.substr(0,5) == "echo ") {
    message(textInputValue.substr(5))
  } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
    openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
    message("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
  } else if (textInputValueLowerCase.substr(0,7) == "google ") {
    openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
    message("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
  } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
    openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
    message("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
  } else {
    getTextData(metaInfo.rooturl+textInputValue+".txt", textReplies);    // Last arguments is what happens if a 404 error occurs
  }
};

// Reset user input
function clearInput(){ // Clear text input
  document.getElementById('terminalTextInput').value = "";
}

// Focus the typed text
function scrollToBottomOfResults(){ // Scroll to the bottom of the results div
  var terminalResultsDiv = document.getElementById('terminalContentsResult');
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

// Getting the time and date and post it depending on what you request for
function getTimeAndDate(postTimeDay){
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
    message(currentTime);
  }
  if (postTimeDay == "date"){
    message(currentDate);
  }
}

// cd
function changeDir(data) {
  if (data.substr(0,2) == "/ ") {
    globalpath = "~/root";
  } else if (data.substr(0,2) == ". ") {
    globalpath = "~/";
  } else if (data.substr(0,3) == ".. "){ // go up one place

    if (globalpath.length > "~/".length) {
      globalpath = globalpath.substr(0,globalpath.lastIndexOf("/"));
    }

    if (globalpath.length < "~/".length) {
      globalpath = "~/";
    }

  } else if (data.substr(0,1) == "/" ) {
    globalpath = "~/" + data.substr(1,data.length-1);
  } else {
    if (globalpath.substr(0,globalpath.length) != "~/") {
      globalpath += "/"
    }
    globalpath += data.substr(0,data.length-1)
  }
  message("","'ls' to list files");
}

// Opening links in a new window
function openLinkInNewWindow(linkToOpen){
  window.open(linkToOpen, '_blank');
}



// Core functions

// Retrieve data from remote file
function getTextData(query, ifError) {
  fetch(query)
    .then(function(response) {
      response.text().then(function(text) {
        if (text.includes("404: Not Found")) {
          if (ifError != undefined) {
            ifError();
          } else {
            message("Sorry, I was unable to find '"+query+"'");
          }
        } else {
          message("<pre>"+text+"</pre>");
        }
      });
    });
}

// Like above, but for projects
function getExternalJSON(query) {
  $.ajax({
    url: "https://api.github.com/users/Irreq/repos",
    dataType: "json"
  }).done(function(result) {
    var text, i;
    text = "<p>Here are my projects hosted on <a href='https://github.com/Irreq'><u>GitHub</u></a>:<br>";
    for (i = 0; i < result.length; i++) {
      text += "<br><a href='"+ result[i].html_url+"'><u>"+result[i].name+"</u></a> - " + result[i].description;
    }
    text += "<br><br>Try typing the name of one of the projects listed above!</p>";
    message(text);
  });
};

// Response
function message(textData, hint) {

  if (hint != undefined) {
    textData = textData + "<br><p><i>hint: try typing '" + hint + "'.</i></p>";
  }

  if (textData.substring(0,2) != "<p") { // Pure string needs to have padding if no padding is present
    textData = "<p>" + textData + "</p>";
  }

  if (oldTypeWriter == true){

    var localTextPos = 0;   // Initialise text position

    var destination = document.getElementById('terminalContentsResult');   // Writes to 'terminalContentsResult'

    globalhistory = destination.innerHTML.slice(-storageLength);

    this.typewriter = function() {    // The typewriter self loop function

      globalhistory += textData.substring(localTextPos-1,localTextPos); // Getting one element at the position and appending it to the entirety
      destination.innerHTML = globalhistory; // Writes to the html

      scrollToBottomOfResults(); // Scroll to the bottom of the results

      if (localTextPos++ >= textData.length) {
        return;  // Killswitch
      }
      setTimeout("typewriter()", Math.random() * timeDelay);
    }
    typewriter(textData);    // Initialise typewriter function
  } else {
    document.getElementById('terminalContentsResult').innerHTML += textData;
    scrollToBottomOfResults();
  }

}

// Having a specific text reply This part is extremely long as cases are being used
function textReplies() {
  switch(textInputValueLowerCase){

    case "test":
      message("This might be surprising but length property of an array is not only used to get number of array elements but it's also writable and can be used to set array's length MDN link. This will mutate the array. If current array is not needed anymore and you don't care about immutability or don't want to allocate memory i.e. for a game the fastest way is.")
      break;

    case "bird":
      message(metaInfo["bird"]);
      break;

    // replies

    case "details":
      message("Here are my details:<br><br>Full name: "+metaInfo.fullname+"<br>Occupation: "+metaInfo.occupation+"<br>");
      break;

    case "name":
      message("hello my name is "+metaInfo.name + " <p><i>hint: try 'fullname'</i></p>");
      break;

    case "cls":
    case "flush":
    case "remove":
    case "clear":
      document.getElementById('terminalContentsResult').innerHTML = "";
      break;

    case "type":
      if (oldTypeWriter == true) {
        oldTypeWriter = false;
        message("The terminal will now print instantly!")
      } else {
        oldTypeWriter = true;
        message("The terminal will now operate like a typewriter!")
      }
      break;


    case "pwd":
    case "ls":
      message(globalpath)
      break;

    case "fullname":
      message("My full name is " + metaInfo.fullname,"details");
      break;


    // Languages

    case "python":
    case "python3":
      message("Python 3+ is my main programming language with my highest knowledge",
      "r");
      break;

    case "r":
      message("R is another language that I am quite profound in",
      "julia");
      break;

    case "julia":
      message("Julia is another language that I am quite profound in",
      "javascript");
      break;

    case "js":
    case "javascript":
      message("I have experienced knowledge in JavaScript. Fun fact: this program you are interacting with is written in pure JS",
      "python");
      break;

    case "swedish":
      message("Swedish is my mother tounge",
      "english");
      break;

    case "english":
      message("I have experienced knowledge in English","typing 'german'");
      break;

    case "german":
      message("I have workable knowledge in German","typing 'swedish'");
      break;


    // Services provided

    case "consult":
    case "consulting":
      message("I can provide general help with finding the right solutions to meet your project's deadline in due time.<br>Contact me at "+metaInfo.mail);
      break;

    case "contracting":
    case "contract":
      message("I write/maintain code to fit your requirements and specifications.<br>Contact me at "+metaInfo.mail);
      break;

    case "teach":
    case "teaching":
    case "coach":
    case "coaching":
    case "tutor":
    case "tutoring":
      message("Learn how to solve problems using code. You choose what to cover during Skype or Discord sessions ranging from fundamental syntax to Machine Learning.<br>Contact me at "+metaInfo.mail);
      break;

    case "parallel":
    case "distributed":
    case "beowulf":
    case "cluster":
    case "clustering":
      message("Try parallel computing for educational purposes on a PoC Linux Beowulf Cluster on limited hardware.<br>Contact me at "+metaInfo.mail);
      break;


    // Projects
    case "projects":
    case "project":
    case "programs":
      getExternalJSON();
      break;

    case "lynn":
      message("Lynn -- An allround intelligent chatbot"+
              "<br>Lynn is an combined: Chatbot, Information retrieval, Media-player, Voice activity, Memory, Jokes. "+
              "<br>The program was built using Python 3.8 and trained for 3 months on comments from <a href='https://reddit.com'>reddit</a>"+
              "<br>and <a href='https://4chan.com'>4chan</a> on a Nvidia Tesla P100. Feel free to talk to <a href='/contact/#Lynn'>Lynn</a>"+
              "<br>You can find the source code for Lynn on GitHub <a href='https://www.github.com/irreq/lynn'><u>here</u></a>");
      break;

    case "tism":
    case "modem":
      message("TISM -- A Software defined acoustic modem using deep-learning demodulation without a clock."+
              "<br>You can find the source code for TISM on GitHub <a href='https://www.github.com/irreq/tism'><u>here</u></a>");
      break;


    // Contact info
    case "number":
    case "phone":
      message("You can reach me on mobile too: "+metaInfo.phone);
      break;

    case "email":
    case "mail":
      message("You can easely reach me on my email: " + metaInfo.mail);
      break;

    case "location":
    case "address":
      message("You can find me at: "+metaInfo.location);
      break;

    case "linkedin":
      message("You can find me at LinkedIn <a href='https://www.linkedin.com/in/isac-bruce-b234a41a5'><u>here</u></a>");
      break;

    case "github":
      message("You can find me on GitHub <a href='https://www.github.com/irreq'><u>here</u></a>");
      break;

    case "twitter":
      message("You can find me at Twitter <a href='https://www.twitter.com/'><u>here</u></a>");
      break;

    case "instagram":
    case "ig":
      message("You can find me at Instagram <a href='https://www.instagram.com/'><u>here</u></a>");
      break;


    case "site":
    case "code":
      message("This is a minimalist terminal portfolio. Source code is available <a href='https://github.com/irreq/irreq.github.io'><u>here</u></a>");
      break;

    // Fix download CV
    case "cv":
      message("You can download Isac's CV <a href='https://www.github.com/irreq'><u>here</u></a>.");
      break;

    case "founder":
    case "isac":
      message("Isac is founder of this portfolio and he is a "+metaInfo.occupation.toLowerCase(),
              "Have you tried typing 'site'?");
      break;

    case "who":
    case "who are you?":
    case "who are you":
      message("I'm a personal assistant trying to help you find stuff on this site.",
              "Have you tried typing 'isac' or 'info' or even 'contact'?"
              )
      break;

    case "hello":
    case "hi":
      message("Hello, I am your assistant. I am powered by pure JavaScript and fueled by the joy of coding.","about");
      break;

    case "bye":
    case "goodbye":
    case "exit":
    case "stop":
      message("Goodbye for now, I hope you've gained some insight into "+metaInfo.name+"'s way of life.");
      break;

    case "nice":
    case "ok":
    case "good":
    case "cool":
      message("Good!");
      break;


    // Help replies

    case "repeat":
    case "say":
    case "echo":
      message("Type 'echo' + something you wan't to echo/repeat, eg. 'Hello, World!'")
      break;

    case "picture":
    case "speed":
      timeDelay =
      document.getElementById('terminalContentsResult').innerHTML += metaInfo.construction;
      message("This function is still under construction, thank you for your interest. In the meantime, have a look at 'Echo'.");
      break;

    case "cd":
      message("Type cd + a path, eg: 'home'.");
      break;

    case "search":
      message("Type 'search' + a query, Eg. https://www.test.com/abc.txt");
      break;

    case "youtube":
      message("Type youtube + something to search for.");
      break;

    case "google":
      message("Type google + something to search for.");
      break;

    case "wiki":
    case "wikipedia":
        message("Type wiki + something to search for.");
      break;

    // Functions

    case "time":
      getTimeAndDate("time");
      break;

    case "date":
      getTimeAndDate("date");
      break;

    default:
      message(output(textInputValue)); // get reply from "chatbot"
      break;
  }
}




// Chatbot
// Options the user could type in
const prompts = [
  // [1] greeting
  ["hi", "hey", "hello", "good morning", "good afternoon", "good day", "what's up"],
  // [2] question
  ["how are you", "how is life", "how are things"],
  // [3] question
  ["what are you doing", "what is going on", "what is up"],
  // [4] age
  ["old", "age", "how old are you", "what is your age"],
  // [5] who
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  // [6] creator
  ["who created you", "who made you", "who is your creator"],
  // [7] name
  ["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
  // [8] affection
  ["i love you", "love you"],
  // [9] good
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "awesome", "glad"],
  // [10] bad
  ["bad", "bored", "tired", "annoyed", "annoying", "irritated", "i am fed up"],
  // [11] help
  ["help me", "tell me story", "tell me joke"],
  // [12] confirmation
  ["ah", "yes", "ok", "okay", "nice"],
  // [13] bye
  ["bye", "good bye", "goodbye", "see you later"],
  // [14] what should...
  ["eat","food","what to eat","what should i eat today"],
  // [15] short stuff
  ["bro", "dude", "gal"],
  // [16] questions
  ["what", "why", "how", "where", "when"],
  // [17] no
  ["no","not sure","maybe","no thanks", "nope", "never"],
  // [18] Empty
  [""],
  // [19] funny
  ["lmao", "pun", "haha", "hihi", "ha","lol","hehe","funny","joke"]
]

// Possible responses, in corresponding order
const replies = [
  // [1] greeting
  ["Hello!", "Hi!", "Hey!", "Hi there!","Howdy"],
  // [2] question
  ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
  // [3] question
  ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
  // [4] age
  ["I am infinite"],
  // [5] who
  ["I am just a bot", "I am a bot. What are you?"],
  // [6] creator
  ["The one true God, JavaScript"],
  // [7] name
  ["I am nameless, but Isac is not.", "I don't have a name, but Isac has."],
  // [8] affection
  ["I love you too", "Me too"],
  // [9] good
  ["Have you ever felt bad?", "Glad to hear it"],
  // [10] bad
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  // [11] help
  ["What about?", "Once upon a time..."],
  // [12] confirmation
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  // [13] bye
  ["Bye", "Goodbye", "See you later"],
  // [14] what should...
  ["Hamburgers!", "Pizza!", "How about vegetarian?"],
  // [15] short stuff
  ["Bro!"],
  // [16] questions
  ["Great question", "Yeah something along those lines", "Please elaborate on that"],
  // [17] no
  ["That's ok","I understand","What do you want to talk about?", "Ok"],
  // [18] Empty
  ["Please say something :)", "Ok I cannot really help you with an: [Enter]"],
  // [19] funny
  ["Lmao","Hehe","Haha!","Good one!", "*literally laughing*"]
]

// Random for any other user input
const alternative = [
  "Same",
  "Go on...",
  "Please elaborate on that",
  "Try again",
  "I'm listening...",
  "I don't understand :/",
  "I'm sorry, have a look at 'help'",
  "?",
  "Come again",
  "Idk",
  "One more time..."
]

// Covid replies
const coronavirus = ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"]

// Initiate "chat", it is not an AI bot, just a comparison
function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) {
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  return product;
}

// Find correct response
function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break; // Stop inner loop when input value matches prompts
      }
    }
    if (replyFound) {
      break; // Stop outer loop when reply is found
    }
  }
  return reply;
}
