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
