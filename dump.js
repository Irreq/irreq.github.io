case "help":
case "?":
  postHelpList();
  break;

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function(){

    // Array of all the help keywords
    var helpKeyWords = [
      "<br>",
      "- 'Projects' will display projects.",
      "- 'Services' will display services.",
      "- 'About' will display information about " + dict["name"]+ ".",
      "- 'languages' will display information about languages.",
      "- Open + website URL to open it in the browser (ex. open webdevtrick.com)",
      "- Google + keyword to search directly in Google (ex. google web development)",
      "- YouTube + keyword to search directly in YouTube (ex. Technical Freaks)",
      "- Wiki + keyword to search directly in Wikipedia (ex. wiki numbers)",
      "- 'Time' will display the current time.",
      "- 'Date' will display the current date.",
      "- 'tech' will make you expert by watching videos",
    ].join('<br>');

    document.getElementById('terminalReslutsCont').innerHTML += helpKeyWords+dict["bird"];
    message("Here are some stuff for you to try out! <br>PS. there is more for you to discover.")

  }
