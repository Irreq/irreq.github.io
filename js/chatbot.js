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
  ["help me", "idk", "i dont understand", "i don't understand", "tell me about"],
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
  ["Hello!", "Hi!", "Hey!", "Hi there!","Howdy", "Hi", "Hey", "Hello!", "Good morning", "Good afternoon", "Good day", "What's up", "Woo!", "Hello, sunshine!", "Howdy, partner!", "Hey, howdy, hi!", "What’s kickin’, little chicken?", "Peek-a-boo!", "Howdy-doody!", "Hey there, freshman!", "Hi, mister!", "I come in peace!", "Ahoy, matey!", "Hiya!", "‘Ello, gov'nor!", "Top of the mornin’ to ya!", "What’s crackin’?", "‘Sup, homeslice?", "This call may be recorded for training purposes.", "Howdy, howdy, howdy!", "At least, we meet for the first time for the last time!", "Hello, who's there, I'm talking.", "You know who this is.", "Ghostbusters, whatya want?", "Yo!", "Whaddup.", "Greetings and salutations!", "Doctor.", "Whazzup?", "G’day mate!", "It has been a long time.", "It’s been too long.", "It’s always a pleasure to see you.", "What’s new?", "Long time no see.", "Where have you been hiding?", "It’s been ages.", "How’ve you been?"],
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
  ["I am nameless, but Irreq is not.", "I don't have a name, but Irreq has.", "Do you have a name for me?", "Sorry I don't have a name yet"],
  // [8] affection
  ["I love you too", "Me too", "You are sweet!"],
  // [9] good
  ["Have you ever felt bad?", "Glad to hear it", "Nice!", "That's really good!"],
  // [10] bad
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  // [11] help
  ["What about?", "I'll try my best: ", "Maybe try <u>this</u>", "Lets see what I can do", "Hmm <u>this</u> might help"],
  // [12] confirmation
  ["Tell me a story", "Tell me a joke", "Tell me about yourself", "What have you been up to all these years?", "How long has it been?", "What are you most passionate about?", "What do you like to do?", "What’s the best thing that happened to you today?", "What are you most excited about right now?", "What are you working on?", "What do you do for fun?", "What’s something you’re really into right now?", "What’s the most interesting thing that’s happened to you lately?", "What was the best part of your week/weekend?", "What did you want to be when you grew up?", "What are you looking forward to right now?", "What’s the nicest thing anyone’s ever said about you?", "What habit or improvement are you working on?", "What cheers you up?", "What’s your favorite word?", "What cause are you passionate about?", "What’s on your mind lately?", "What personal habit are you proudest of?", "How do you spend your days?", "What problem do you wish you could solve?", "What’s the most interesting thing you’ve learned recently?", "What’s your favorite emoji?", "Whom in the world would you most like to share a meal with?"
],
  // [13] bye
  ["Bye", "Goodbye", "See you later", "See ya", "Please come back soon, I enjoyed talking"],
  // [14] what should...
  ["Hamburgers!", "Pizza!", "How about vegetarian?"],
  // [15] short stuff
  ["Bro!", "Wassup broo!!!"],
  // [16] questions
  ["Great question", "Yeah something along those lines", "Please elaborate on that", "WOW I haven't thought about that before"],
  // [17] no
  ["That's ok","I understand","What do you want to talk about?", "Ok"],
  // [18] Empty
  ["Please say something :)", "Ok I cannot really help you with that", ";-;"],
  // [19] funny
  ["Lmao","Hehe","Haha!","Good one!", "*literally laughing*", "What do you call 26 letters that went for a swim? Alphawetical.", "What’s the name of a very polite, European body of water? Merci.", "Why was the color green notoriously single? It was always so jaded.", "I used to hate facial hair, but then it grew on me.", "I want to make a brief joke, but it’s a little cheesy.", "Why did the coach go to the bank? To get his quarterback.", "How do celebrities stay cool? They have many fans.", "Sundays are always a little sad, but the day before is a sadder day.", "5/4 of people admit they’re bad at fractions.", "I was going to tell a time-traveling joke, but you guys didn’t like it.", "Shouldn’t the “roof” of your mouth actually be called the ceiling?", "Stop looking for the perfect match…use a lighter.", "I told my doctor I heard buzzing, but he said it’s just a bug going around.", "Want to hear a joke about construction? I’m still working on it.", "If a child refuses to nap, are they guilty of resisting a rest?", "I know a lot of jokes about retired people, but none of them work.", "Why are spiders so smart? They can find everything on the web.", "RIP boiled water—you will be mist.", "What has one head, one foot, and four legs? A bed.", "Sore throats are a pain in the neck.", "What does a house wear? Address.", "Why did the scarecrow win an award? He was out standing in his field.", "What’s red and smells like blue paint? Red paint.", "I didn’t get a haircut, I got them all cut.", "Why couldn’t the bicycle stand up by itself? It was two-tired.", "I’m so good at sleeping, I can do it with my eyes closed.", "People are usually shocked that I have a Police record. But I love their greatest hits!", "How do you weigh a millennial? In Instagrams.", "The wedding was so beautiful, even the cake was in tiers.", "Two guys walked into a bar. The third guy ducked.", "Did you hear about the kidnapping at school? It’s fine, he woke up.", "How can you tell it’s a dogwood tree? By the bark.", "When does a joke become a “dad joke?” When it becomes apparent."]
]

// Random for any other user input
const alternative = ["Same", "Go on...", "Please elaborate on that", "Try again", "I'm listening...", "I don't understand :/", "I'm sorry, have a look at 'help'", "?", "Come again", "Idk", "One more time...", "interesting...", "Oh", "I see", "Oh ok", "Mmm", "Could you be just a bit more specific?", "I kind of get it", "Wait what", "Me?", "What?"]

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
