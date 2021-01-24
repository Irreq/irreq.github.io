// Author: Irreq
//
// This is the core of the website. This file contains:
// [1] Retrieve text from external sites.
// [2] Typewriter abbillities.
// [3] Small chatbot.
//
// See individual comments for further documentation


// Variables and values
var globalhistory = "";   // Everything entered in the terminal
var globalpath = "~/"   // The initial path
var terminalTextLengthLimit = 80;   // The maximum horizontal length
var timeDelay = 10;   // Time delay of print out
var oldTypeWriter = true; // If the site should be typed as a typewriter
var storageLength = 3000; // How many characters the terminal will keep in memory
var dict = {
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
                   "            ____    //      \___,       ,/101010               <br>"+
                   "             | \\   //          ,:,   ./101010101                  <br>"+
                   "     |¨¨¨¨¨¨¨|__|_//            ,;:; /10010101101                   <br>"+
                   "    _L_____________\o           ,;;;/1010101011101                    <br>"+
                   ".,,.(O_o_o_o_o_o_o_O),,.,.,.,...,.-/101010101010101,,.,., Isac Bruce .,.,,,.,.,</pre>",
    "bird": "<pre style='background: yellow; -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>"+
            "               __<br>"+
            "             <(o )___<br>"+
            "              ( ._> /<br>"+
            "               `---'   "+
            "</pre>",
};

// "Landing page"
document.getElementById('terminalContentsResult').innerHTML = "<strong>Welcome to Isac's interactive portfolio!</strong><br><br>   "+
                                                           "This portfolio was developed to look like an old computer, it is therefore recomended to view this terminal on a computer.<br><br>"+
                                                           "I am your assistant and I will help you find out information about Isac.<br><br>"+
                                                           "The terminal in front of you is known as a 'Command-Line Interface' <i>abbreviated to</i> 'CLI'. "+
                                                           "A (CLI) processes commands to a computer program in the form of lines of text. - <i>Wikipedia</i><br><br>"+
                                                           "Unlike the majority of websites, this website can help you find what you are looking for with just a <i>keyboard</i>.<br><br>"+
                                                           "I can assure you that this terminal is completely harmless as it runs in your browser, so do not fear typing anything. If you are still in doubt, here is a harmless cyber duck:<br>"+
                                                           dict["bird"]+
                                                           "</pre>Good  Luck!<br>";


document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault();   // Preventing the form from submitting
    checkWord();    // Will check the entered word/sentence
  }

  document.getElementById('terminalTextInput').focus();   // Get the focus to the text input to enter a word right away.

  var textInputValue = document.getElementById('terminalTextInput').value.trim();   // Getting the text from the input
  var textResultsValue = document.getElementById('terminalContentsResult').innerHTML;    //Getting the text from the results div

  var clearInput = function(){ // Clear text input
    document.getElementById('terminalTextInput').value = "";
  }

  var scrollToBottomOfResults = function(){ // Scroll to the bottom of the results div
    var terminalResultsDiv = document.getElementById('terminalContentsResult');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
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

  // cd
  var changeDir = function(data) {
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
    addTextToResults("<p><i>hint: try 'ls' to list files</i></p>");
  }

  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  var getExternalJSON = function(query) {
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

  // Core functions

  // Retrieve data from remote file
  var getTextData = function(query, ifError) {
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

  // Split text
  var splitter = function(textData) {

    var wholeWordArray = textData.split(" ")
    var result = []
    var indexes = [0,];
    var localLength = 0;
    var localIndex = 0;

    var i;
    for (i in wholeWordArray) {
        if (localLength >= terminalTextLengthLimit) {
            indexes.push(indexes[indexes.length - 1]+localIndex);   // append the length to indexes
            localLength = 0;    // reset values for next loop
            localIndex = 0;
        } else {    // Just the iteration process
          localLength += wholeWordArray[i].length + 1;
          localIndex += 1;
        }
    }

    indexes.push(wholeWordArray.length)

    var k;
    for (var k = 0; k < indexes.length; k += 1) {   // Will put the text together neatly into an array
        result.push(wholeWordArray.slice(indexes[k],indexes[k+1]).join(" "))
    }
    return "<br>" + result.join("<br>");
  }

  // Preprocess the data to print
  var message = function(msg, hint) {

    if (hint != undefined) {
      if (msg.includes("<br>") == false) {    // If a hint is present
        addTextToResults(splitter(msg) + "<br><p><i>hint: try " + hint + "</i></p>")
      } else {
        addTextToResults(msg + "<br><p><i>hint: try " + hint + "</i></p>");
      }
    } else {
      if (msg.includes("<br>") == false) {
        if (msg.includes("<pre>") == false) {
          addTextToResults(splitter(msg));
          // addTextToResults(msg);
        } else {
          addTextToResults(msg);
        }
      } else {
        addTextToResults(msg);
      }
    }
  }

  // Print the data
  var addTextToResults = function(textToAdd){

    var localTextPos = 0;   // Initialise text position
    var textData = "";    // Text buffer

    if (textToAdd.substring(0,2) != "<p") { // Pure string needs to have padding if no padding is present
      textData = "<p>" + textToAdd + "</p>";
    } else {
      textData = textToAdd;
    }

    clearInput();   // Clears typed input

    if (oldTypeWriter == true){
      this.typewriter = function() {    // The typewriter function

        var destination = document.getElementById('terminalContentsResult');   // Writes to 'terminalContentsResult'

        if (localTextPos == 0) {    // Previous data is stored on first iteration
          globalhistory = destination.innerHTML.slice(-storageLength);
        }

        // Getting one element at the position and appending it to the entirety
        globalhistory += textData.substring(localTextPos-1,localTextPos);

        // Writes to the html
        destination.innerHTML = globalhistory;

        // Scroll to the bottom of the results
        scrollToBottomOfResults();

        if (localTextPos++ >= textData.length) {
          return;
        }

        // I'm guessing the function overflows and dies but that is no issue
        setTimeout("typewriter()", Math.random() * timeDelay);
      }

      typewriter(textToAdd);    // Initialise typewriter function

    } else {
      document.getElementById('terminalContentsResult').innerHTML += textData;
      scrollToBottomOfResults();
    }

  }

  // Having a specific text reply This part is extremely long as cases are being used
  var textReplies = function() {
    switch(textInputValueLowerCase){

      case "test":
        message("This might be surprising but length property of an array is not only used to get number of array elements but it's also writable and can be used to set array's length MDN link. This will mutate the array. If current array is not needed anymore and you don't care about immutability or don't want to allocate memory i.e. for a game the fastest way is.")
        break;

      case "bird":
        message(dict["bird"]);
        clearInput();
        break;

      // replies

      case "details":
        message("Here are my details:<br><br>Full name: "+dict["fullname"]+"<br>Occupation: "+dict["ccupation"]+"<br>");
        break;

      case "name":
        message("hello my name is "+dict["name"] + " <p><i>hint: try 'fullname'</i></p>");
        break;

      case "cls":
      case "clear":
        document.getElementById('terminalContentsResult').innerHTML = "";
        clearInput();
        break;

      case "type":
        if (oldTypeWriter == true) {
          oldTypeWriter = false;
          message("The terminal will now statically serve data!")
        } else {
          oldTypeWriter = true;
          message("The terminal will now operate like a typewriter!")
        }


      case "pwd":
      case "ls":
        message(globalpath)
        break;

      case "fullname":
        message("My full name is " + dict["fullname"]);
        break;


      // Languages

      case "python":
      case "python3":
        message("Python 3+ is my main programming language with my highest knowledge","typing 'r'");
        break;

      case "r":
        message("R is another language that I am quite profound in","typing 'julia'");
        break;

      case "julia":
        message("Julia is another language that I am quite profound in","typing 'js'");
        break;

      case "js":
      case "javascript":
        message("I have experienced knowledge in JavaScript. Fun fact: this program you are interacting with is written in pure JS",
                "typing 'python'");
        break;

      case "swedish":
        message("Swedish is my mother tounge", "typing 'english'");
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
        message("I can provide general help with finding the right solutions to meet your project's deadline in due time.<br>Contact me at "+dict["mail"]);
        break;

      case "contracting":
      case "contract":
        message("I write/maintain code to fit your requirements and specifications.<br>Contact me at "+dict["mail"]);
        break;

      case "teach":
      case "teaching":
      case "coach":
      case "coaching":
      case "tutor":
      case "tutoring":
        message("Learn how to solve problems using code. You choose what to cover during Skype or Discord sessions ranging from fundamental syntax to Machine Learning.<br>Contact me at "+dict["mail"]);
        break;

      case "parallel":
      case "distributed":
      case "beowulf":
      case "cluster":
      case "clustering":
        message("Try parallel computing for educational purposes on a PoC Linux Beowulf Cluster on limited hardware.<br>Contact me at "+dict["mail"]);
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
        message("You can reach me on mobile too: "+dict["phone"]);
        break;

      case "email":
      case "mail":
        message("You can easely reach me on my email: " + dict["mail"]);
        break;

      case "location":
      case "address":
        message("You can find me at: "+dict["location"]);
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

      case "founder":
      case "isac":
        message("Isac is founder of this portfolio and he is a "+dict["occupation"].toLowerCase(),
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
        message("Hello, I am your assistant. I am powered by pure JavaScript and fueled by the joy of coding.");
        break;

      case "hahaha":
      case "lmao":
      case "lol":
        message("Hahaha");
        break;

      case "bye":
      case "goodbye":
      case "exit":
      case "stop":
        message("Goodbye for now, I hope you've gained some insight into "+dict["name"]+"'s way of life.");
        break;

      case "nice":
      case "ok":
      case "good":
      case "cool":
        message("Good!");
        break;


      // Help replies

      case "repeat":
      case "echo":
        message("Type 'echo' + something you wan't to echo/repeat, eg. 'Hello, World!'")
        break;

      case "picture":
      case "speed":
        document.getElementById('terminalContentsResult').innerHTML += dict["construction"];
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
      message("<i>The command <b>" + textInputValue + "</b> was not found.</i>"," type <b>Help</b> to see all commands.");
      break;
    }
  }

  // Main function to check the entered text and assign it to the correct function
  var checkWord = function() {

    textInputValue = document.getElementById('terminalTextInput').value.trim();   // Get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase();   // lower case of the string

    if (textInputValue != "") {
      // Check if text was entered
      document.getElementById('terminalContentsResult').innerHTML += "<br><p class='userEnteredText'>"+globalpath+"> " + textInputValue + "</p>";

      if (textInputValueLowerCase.substr(0,5) == "open ") {   // If the first 5 characters = open + space
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        message("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,3) == "cd ") {
        changeDir(textInputValueLowerCase.substr(3) + " ");
      } else if (textInputValueLowerCase.substr(0,5) == "find ") {
        getTextData(dict["rooturl"]+textInputValue.substr(5)+".txt")
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
        getTextData(dict["rooturl"]+textInputValue+".txt", textReplies);    // Last arguments is what happens if a 404 error occurs
      }
    }
  };
});
