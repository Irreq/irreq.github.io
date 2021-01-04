// set up text to print, each item in array is new line
var data = new Array(
"There are only 10 types of people in the world:",
"Those who understand binary, and those who don't"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision

var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter(data) {
  var iArrLength = data[0].length; // the length of the text array
  sContents =  ' ';
  iRow = Math.max(0, iIndex-iScrollAt);
  var destination = document.getElementById("typedtext");

  while ( iRow < iIndex ) {
    sContents += data[iRow++] + '<br />';
  }
  destination.innerHTML = sContents + data[iIndex].substring(0, iTextPos) + "_";
  if ( iTextPos++ == iArrLength ) {
    iTextPos = 0;
    iIndex++;
    if ( iIndex != data.length ) {
      iArrLength = data[iIndex].length;
      setTimeout("typewriter()", iSpeed);
    }
  } else {
    setTimeout("typewriter()", iSpeed - Math.random() * iSpeed);
  }
}

typewriter();
