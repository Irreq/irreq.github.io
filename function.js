var globalhistory = "";

var globalpath = "~/"

var dict = {

   "name": "Isac",
   "fullname": "Isac Per Ragnar Bruce",
   "phone": "(+46) 079 348 9745",
   "contact": "I'd Like To Hear From You.<br>Hit me up whenever you wan't, <br>I will try to answer any question, big or small.",
   "mail": "<a href='mailto:irreq@protonmail.com'><u>irreq@protonmail.com</u></a>",
   "location": "<a href='https://goo.gl/maps/D2MUaJTjyXvk5rzw9'><u><br><br>Thorildsplans gymnasium <br>Drottningholmsvägen 82 <br>112 43 Stockholm</u></a>",
   "occupation": "Student, Developer & Hobby Scientist",
   "programming_languages": "Python, Julia, R & JS",

};

document.getElementById('terminalReslutsCont').innerHTML = "Welcome to the interactive terminal!<br>I will try to guide you upon your visit on this page<br><br>Good Luck!<br>"

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

  var message = function(msg, hint) {

    if (hint != undefined) {
        addTextToResults("<br>"+msg + "<br><p><i>hint: try " + hint + "</i></p>");
    }
    else {
      addTextToResults("<br>"+msg);
    }

  }

  // cd
  var changeDir = function(data) {
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
  }

  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }



  // Core functions

  // Print the data
  var addTextToResults = function(textToAdd){

    // Initialise text position
    var localTextPos = 0;

    // Time delay of print out
    var timeDelay = 30;

    // Text buffer
    var textData = "";

    // Pure string needs to have padding if no padding is present
    if (textToAdd.substring(0,2) != "<p") {
      textData = "<p>" + textToAdd + "</p>";
    }

    else {
      textData = textToAdd;
    }

    // The typewriter function
    this.typewriter = function() {

      // Writes to 'terminalReslutsCont'
      var destination = document.getElementById('terminalReslutsCont');

      // Previous data is stored on first iteration
      if (localTextPos == 0) {
        globalhistory = destination.innerHTML;
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

      // Next iteration
      // localTextPos++

      // I'm guessing the function overflows and dies but that is no issue
      setTimeout("typewriter()", Math.random() * timeDelay);

    }

    // Clears typed inpput
    clearInput();

    // Initialise typewriter function
    typewriter(textToAdd);
  }

  // Having a specific text reply to specific strings
  var textReplies = function() {
    switch(textInputValueLowerCase){

      case "test":
        message("difgkjdfgksdjhhhhhhhhhhhhhhhhhhh<br>dskjhfgjshdgfhksdgfkhsdgggggggfffffffffffffffffffffffffffff<br>edjfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff<br>dheffffffffffffffffffffffffffffffff")
        break;

      case "bird":
        message("<pre>"+
                "               __<br>"+
                "             <(o )___<br>"+
                "              ( ._> /<br>"+
                "               `---'   "+
                "</pre>")
        break;

      // replies
      case "about":
      case "info":
        message("Hello!<br><br>I am an AI enthusiast with a peculiar inclination for learning and problem-solving. <br>Whenever I am not working on my computer, you will find me running or riding Mountainbike in the local forests.");
        break;

      case "details":
        message("Here are my details:<br><br>Full name: "+dict["fullname"]+"<br>Occupation: "+dict["ccupation"]+"<br>");
        break;

      case "name":
        message("hello my name is "+dict["name"] + " <p><i>hint: try 'fullname'</i></p>");
        break;

      case "cls":
      case "clear":
        document.getElementById('terminalReslutsCont').innerHTML = "";
        clearInput();
        break;

      case "pwd":
        message(globalpath)
        break;

      case "fullname":
        message("My full name is " + dict["fullname"]);
        break;


      // Languages

      case "languages":
      case "language":
      case "programming languages":
        message("I speak several languages, and I program in even more",
        "typing 'python' or 'julia' or 'r' <br>or even spoken languages like 'swedish' or 'german'");
        break;

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
        message("I have experienced knowledge in JavaScript. <br>Fun fact: this program you are interacting with is written in pure JS",
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

      case "services":
      case "job":
      case "offer":
        message("I tailor my services to fit the projects in the best ways possible."+
          "<br>I am based in Stockholm, but I am open for relocating if necessary."+
          "<br>I will make sure the project is due in time."+
          "<br>If no major work is required, check out my "+dict['programming_languages']+" gigs instead:<br>Contact me at "+dict["mail"],
        "typing 'consulting' or 'tutoring' or 'cluster' or even 'contracting' for further information")
        break;

      case "consult":
      case "consulting":
        message("I can provide general help with finding the right solutions <br>to meet your project's deadline in due time.<br>Contact me at "+dict["mail"]);
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
        message("Learn how to solve problems using code. <br>You choose what to cover during Skype or Discord sessions <br>ranging from fundamental syntax to Machine Learning.<br>Contact me at "+dict["mail"]);
        break;

      case "parallel":
      case "distributed":
      case "beowulf":
      case "cluster":
      case "clustering":
        message("Try parallel computing for educational purposes <br>on a PoC Linux Beowulf Cluster on limited hardware.<br>Contact me at "+dict["mail"]);
        break;


      // Projects

      case "projects":
      case "project":
      case "programs":
        message("I have developed several Open Source projects, have a look at the following:"+
                "<br><a href='https://www.github.com/irreq/tism'><u>tism</u></a> -- A Deep Learning acoustic modem"+
                "<br><a href='https://www.github.com/irreq/tism'><u>Lynn</u></a> -- An allround intelligent chatbot",
              "typing 'Lynn' or 'tism' for further information if you prefer to stay on this page");
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

      case "contact":
        message(dict["contact"] + "<br><br>Phone: "+dict["phone"]+"<br><br>Email: "+dict["mail"]);
        break;

      case "location":
      case "address":
        message("You can find me at: "+dict["location"]);
        break;

      case "linkedin":
        message("You can find me at LinkedIn <a href='https://www.linkedin.com/in/isac-bruce-b234a41a5'><u>here</u></a>");
        break;

      case "github":
        message("You can find me at GitHub <a href='https://www.github.com/irreq'><u>here</u></a>");
        break;

      case "twitter":
        message("You can find me at Twitter <a href='https://www.twitter.com/'><u>here</u></a>");
        break;

      case "instagram":
      case "ig":
        message("You can find me at Instagram <a href='https://www.instagram.com/'><u>here</u></a>");
        break;



      case "code":
        message("Source code is available <a href='https://github.com/irreq/irreq.github.io'><u>here</u></a>");
        break;

      case "founder":
        message("Founder is Isac");
        break;

      case "isac":
        message("Isac is founder of this portfolio and he is a "+dict["occupation"].toLowerCase(),
                "Have you tried typing 'founder'?");
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
        message("Hello, I am your assistant... I am based on pure JavaScript.");
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

      case "cd":
        message("Type cd + a path, eg: 'home'.");
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

      case "help":
      case "?":
        postHelpList();
        break;

      default:
      message("<i>The command <b>" + textInputValue + "</b> was not found.</i>"," Type <b>Help</b> to see all commands.");
      break;
    }
  }

// Main function to check the entered text and assign it to the correct function
  var checkWord = function() {

    // Get the text from the text input to a variable
    textInputValue = document.getElementById('terminalTextInput').value.trim();

    // lower case of the string
    textInputValueLowerCase = textInputValue.toLowerCase();

    if (textInputValue != "") {

      // Check if text was entered
      document.getElementById('terminalReslutsCont').innerHTML += "<br><p class='userEnteredText'>"+globalpath+"> " + textInputValue + "</p>";

      // If the first 5 characters = open + space
      if (textInputValueLowerCase.substr(0,5) == "open ") {
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        message("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,3) == "cd ") {
        changeDir(textInputValueLowerCase.substr(3) + " ");
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
      } else{
        textReplies();
      }
    }
  };

});
