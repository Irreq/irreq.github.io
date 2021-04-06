// Chatbot
// Options the user could type in
const prompts = [
  // [1] greeting
  ["hi", "hey", "hello", "good morning", "good afternoon", "good day", "what's up", "woo!", "hey!"],
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
  ["Hello!", "Hi!", "Hey!", "Hi there!","Howdy", "Hi", "Hey", "Hello!", "Good morning", "Good afternoon", "Good day", "What's up", "Woo!"],
  // [2] question
  ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
  // [3] question
  ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
  // [4] age
  ["I am infinite"],
  // [5] who
  ["I am just a bot", "I am a bot. What are you?", "ERROR HUMAN INTERACTION IS WORKING IMPROPERLY. INSERT 'PUN' HERE"],
  // [6] creator
  ["The one true God, JavaScript"],
  // [7] name
  ["I am nameless, but Isac is not.", "I don't have a name, but Isac has.", "Do you have a name for me?", "Sorry I don't have a name yet"],
  // [8] affection
  ["I love you too", "Me too", "You are sweet!"],
  // [9] good
  ["Have you ever felt bad?", "Glad to hear it"],
  // [10] bad
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  // [11] help
  ["What about?", "Once upon a time...", "Maybe try <u>this</u>"],
  // [12] confirmation
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  // [13] bye
  ["Bye", "Goodbye", "See you later", "See ya", "Please come back soon, I enjoyed talking"],
  // [14] what should...
  ["Hamburgers!", "Pizza!", "How about vegetarian?"],
  // [15] short stuff
  ["Bro!"],
  // [16] questions
  ["Great question", "Yeah something along those lines", "Please elaborate on that", "WOW I haven't thought about that before"],
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


function chatBot(input) {
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
