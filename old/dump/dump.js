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
