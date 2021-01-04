var postHelpList = function (){

  $.ajax({url: 'https://fiddle.jshell.net/robots.txt', success: function(result){
          addTextToResults(result);
      }});

  fetch('https://fiddle.jshell.net/robots.txt')
    .then((response) => response.text().then(yourCallback));

  function yourCallback( retrievedText ) {
    addTextToResults(retrievedText);
  }

  // $.ajax({
  //   url:"help.txt",
  //   success: function (data){
  //     addTextToResults(data)
  //     //parse your data here
  //     //you can split into lines using data.split('\n')
  //     //an use regex functions to effectively parse it
  //   }
  // } 'text');
  var url = 'https://fiddle.jshell.net/robots.txt';
  var storedText;

  fetch(url)
    .then(function(response) {
      response.text().then(function(text) {
        storedText = text;
        done();
      });
    });

  function done() {
    addTextToResults(storedText);
  }

  $.get('https://github.com/Irreq/irreq.github.io/blob/main/help.txt', function(data) {
     addTextToResults(data);
  }, 'text');

  addTextToResults('Hello worldää');


}



this.typewriter = function() {

  var u = "<p>" + textToAdd + "</p>";


  var aText = new Array(u);

  var iSpeed = 60; // time delay of print out
  var iIndex = 0; // start printing array at this posision
  var iArrLength = aText[0].length; // the length of the text array
  var iScrollAt = 20; // start scrolling up at this many lines
  // var iTextPos = 0; // initialise text position
  // var sContents = ''; // initialise contents variable
  // var iRow; // initialise current row


  sContents =  ' ';
  iRow = Math.max(0, iIndex-iScrollAt);
  var destination = document.getElementById('terminalReslutsCont');

  // while ( iRow < iIndex ) {
  //   sContents += aText[iRow++] + '<br />';
  // }
  destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "|";
  if ( iTextPos++ == iArrLength ) {
    iTextPos = 0;
    iIndex++;

    if ( iIndex != aText.length ) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", iSpeed);
    }
  } else {
    setTimeout("typewriter()", iSpeed - Math.random() ** 2 * iSpeed);
  }

  // document.getElementById('terminalReslutsCont').innerHTML += "<p>" + this.textToAdd + "</p>";
}
