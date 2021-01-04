
  /**
  * @app ReadMoreJS
  * @desc Breaks the content of an element to the specified number of words
  * @version 1.1.0
  * @license The MIT License (MIT)
  * @author George Raptis | http://georap.gr
  */
  ;(function (win, doc, undef) {
  	'use strict';

  	/**
  	 * @desc this object holds all functions
  	*/
  	var RM = {};

  	/* ============================== */
  	/*             HELPERS            */
  	/* ============================== */
  	RM.helpers = {
  		extendObj: function() {
  			for (var i = 1, l = arguments.length; i < l; i++) {
  				for (var key in arguments[i]) {
  		            if (arguments[i].hasOwnProperty(key)) {
  		                if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
  		                	arguments[0][key] = arguments[0][key] || {};
  		                	this.extendObj(arguments[0][key], arguments[i][key]);
  		                } else {
  		                	arguments[0][key] = arguments[i][key];
  		                }
  		            }
  			    }
  			}
  			return arguments[0];
  		}
  	};

  	/* ============================== */
  	/*         MAIN FUNCTIONS         */
  	/* ============================== */

  	// Return the number of words of string.
  	RM.countWords = function (str) {
    		return str.split(/\s+/).length;
  	};

  	// Rturn string starting from first word untill number specified.
  	RM.generateTrimmed = function (str, wordsNum) {
  		return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
  	};

  	// Plugin Initialization
  	RM.init = function (options) {
  		var defaults = {
  			target: '',
  			numOfWords: 50,
  			toggle: true,
  			moreLink: 'read more...',
  			lessLink: 'read less',
  			linkClass: 'rm-link',
  			containerClass: false
  		};
  		options = RM.helpers.extendObj({}, defaults, options);

  		var target = doc.querySelectorAll(options.target),                                                // Get the node list of target elements specified by the user.
  			targetLen = target.length,                                                                    // Length of the targets node list.
  			targetContent,                                                                                // The initial text that is contained in the target element.
  			trimmedTargetContent,                                                                         // The final (trimmed) text.
  			targetContentWords,                                                                           // The number of words the initial text has.
  			initArr = [],                                                                                 // Array to hold the initial text of each target element.
  			trimmedArr = [],                                                                              // Array to hold the final (trimmed) text of each target element.
  			i, j, l, moreContainer, rmLink, moreLinkID, index;

  		// Loop through all target elements
  		for (i = 0; i < targetLen; i++) {
  			targetContent = target[i].innerHTML;                                                          // Get the initial text of each target element.
  			trimmedTargetContent = RM.generateTrimmed(targetContent, options.numOfWords);                 // Generate the trimmed version of the initial text.
  			targetContentWords = RM.countWords(targetContent);                                            // Count the number of words the initial text has.

  			initArr.push(targetContent);                                                                  // Push the initial text to initArr.
  			trimmedArr.push(trimmedTargetContent);                                                        // Push the trimmed text to trimmedArr.

  			// Procceed only if the number of words specified by the user
  			// is smaller than the number of words the target element has.
  			if (options.numOfWords < targetContentWords - 1) {
  				target[i].innerHTML = trimmedArr[i];                                                      // Populate the target element with the trimmed version of text.

  				moreContainer = doc.createElement('div');                                                 // Create a div element to hold the More/Less link.
  				if(options.containerClass) {
  					moreContainer.className = options.containerClass;
  				}

  				moreContainer.innerHTML = '<a id="rm-more_'+ i + '"'                                               // Create the More/Less link.
  					+ ' class="'+ options.linkClass +'"'
  					+ ' style="cursor:pointer;" data-readmore="anchor">'
  					+ options.moreLink
  					+ '</a>';
  				target[i].parentNode.insertBefore(moreContainer, target[i].nextSibling);                  // Insert the More/Less link after the target element.
  			}
  		}

  		rmLink = doc.querySelectorAll('[data-readmore="anchor"]');                                                        // Reference the More/Less link.
  		// Loop through all links and attach event listeners.
  		for (j = 0, l = rmLink.length; j < l; j++) {
  			rmLink[j].onclick = function () {
  				moreLinkID = this.getAttribute('id');                                                     // Get each link's unique identifier.
  				index = moreLinkID.split('_')[1];                                                         // Extract index number from each link's 'id'.

  				// if (!helpers.classList.contains(this, 'less')) {
  				if (this.getAttribute('data-clicked') !== 'true') {
  					target[index].innerHTML = initArr[index];
  					if (options.toggle !== false) {
  						this.innerHTML = options.lessLink;
  						this.setAttribute('data-clicked', true);
  					} else {
  						this.innerHTML = '';
  					}
  				} else {
  					target[index].innerHTML = trimmedArr[index];
  					this.innerHTML = options.moreLink;
  					this.setAttribute('data-clicked', false);
  				}
  			};
  		}
  	};

  	// Return as global object
  	window.$readMoreJS = RM;
  }(this, this.document));


$readMoreJS.init({
  target: '.dummy p',           // Selector of the element the plugin applies to (any CSS selector, eg: '#', '.'). Default: ''
  numOfWords: 50,               // Number of words to initially display (any number). Default: 50
  toggle: true,                 // If true, user can toggle between 'read more' and 'read less'. Default: true
  moreLink: 'read more ...',    // The text of 'Read more' link. Default: 'read more ...'
  lessLink: 'read less'         // The text of 'Read less' link. Default: 'read less'
});


document.querySelector('button').addEventListener('click', function() {
  document.querySelector('#content').style.height= 'auto';
  this.style.display= 'none';
});







(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();
