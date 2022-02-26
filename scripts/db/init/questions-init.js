db = new Mongo().getDB("seeksi");

db.createCollection("questions", { capped: false });

// Source: https://randomwordgenerator.com/json/question-never-have-i-ever.json

db.questions.insertMany([
  {
    _id: ObjectId("6199d7cef6a0af305d00027e"),
    question: "Never have I ever watched Star Wars",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af305d00027f"),
    question: "Never have I ever been to a concert",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af304700027e"),
    question: "Never have I ever walked out of a movie",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af304700027f"),
    question: "Never have I ever watched a superhero movie",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af306400027e"),
    question: "Never have I ever watched the Academy Awards",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af306400027f"),
    question: "Never have I ever seen the Emmy Awards",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a000027e"),
    question: "Never have I ever watched the Grammy Awards",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a000027f"),
    question: "Never have I ever a foreign film",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af308e00027e"),
    question: "Never have I ever watched a movie with subtitles",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af308e00027f"),
    question: "Never have I ever listened to country music",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a300027d"),
    question: "Never have I ever met a movie star",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a300027e"),
    question: "Never have I ever met a TV star",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a400027d"),
    question: "Never have I ever famous singer",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a400027e"),
    question: "Never have I ever seen a TV show live",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a8000295"),
    question: "Never have I ever been to Universal Studios",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a8000296"),
    question: "Never have I ever been to Hollywood",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a8000297"),
    question: "Never have I ever seen the Hollywood walk of stars",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a8000298"),
    question: "Never have I ever been to a stadium concert",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a8000299"),
    question: "Never have I ever been to see Cirque du Soleil",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId("6199d7cef6a0af30a800029a"),
    question: "Never have I ever have I been to Las Vegas",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a Comic Con",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a professional football game",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a professional basketball game",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a professional baseball game",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a professional hockey game",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a movie on the first day of release",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to an amusement park",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to Disney World",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever ridden a roller coaster",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever subscribed to Netflix",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever created a Youtube video",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever participated in a school play",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone on a famous person tour",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had my photo taken with a famous person",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gotten a famous person's signature",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sung karaoke",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever created a Facebook account",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever created an Instagram account",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever created a Youtube account",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever watched a Hallmark movie",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever watched a horror movie",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever snuck candy into a movie theater",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever snuck into a concert",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had popcorn at the movie theater",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever watched Game of Thrones",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I read an ebook",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever gone down the rabbit hole while on the Internet",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever found myself entertaining",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I paid a cover charge",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone to a movie by myself",
    topics: ["entertainment"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dressed up as the opposite sex",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      'Never have I ever "cleaned up" by shoving everything under the bed',
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pretended to know someone I didn't",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone out in my pajamas",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I high fived and nobody responded",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I tripped for no apparent reason",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sung a song loudly in the shower",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally laughed out loud with earphones on",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever I blamed a pet for something I did",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a comedy show",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever laughed at my own jokes",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally worn a piece of clothing inside out",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally forgot to take the price tag off a piece of clothing I wore",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever told a dad joke",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever laughed at an inappropriate time",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever laughed so hard I cried",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever laughed so hard I peed in my pants a little",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever danced when I thought nobody was watching, but people were",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever told a joke and nobody laughed",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played a practical joke on my friends",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: 'Never have I ever chuckled to myself while writing "lol"',
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever colored my hair a crazy color",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried cutting my friend's hair",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever spilled a drink all over myself",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a drink come out my nose",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever done a duck face selfie",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been caught picking my nose in public",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally sent a sexy email to the wrong person",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever Googled my own name",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever cried so hard I started laughing",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever covered a wall with crayons when I was little",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever put stickers all over the car windows",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried to fake my report card",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried to write an excuse note for myself",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever caught something on fire while cooking",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten food that had already been thrown away",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever walked around with a stain on my shirt I didn't realize was there",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever walked into something",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to spit out food because it tasted so bad",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally mixed up salt and sugar on my food",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever have I thought I knew the words to a song, but they were completely wrong",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever tried a Youtube challenge and failed miserably",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drawn on someone when they were asleep",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever have I put someone sleeping's hand into warm water",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever put peanut butter on a dog's nose",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pretended that vanilla pudding was mayonnaise",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone skinny dipping",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever participated in a school prank",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever started a funny rumor",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever have I convinced someone that something utterly ridiculous is actually true",
    topics: ["funny"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever traveled internationally",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever re-gifted a present I received",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to more than half the US states",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever traveled by helicopter",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been on stage in front of a big crowd",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever I lied on my resume",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sung karaoke",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever considered my spiritual animal",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever enjoyed watching cartoons as an adult",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever locked myself out of my car",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dined and dashed",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever given money to a street artist",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever helped out a homeless person",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever seen a face on the moon",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried parachuting",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever broken a bone",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made a wish at a wishing well",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been surfing",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever zip-lining",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been bungee jumping",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stayed up for 24 hours straight",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever colored my hair a strange color",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten an insect",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten something cold and got brain freeze",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried sushi",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone to a professional baseball game",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been in a car accident",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been in an earthquake",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever seen history being made",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever performed a random act of kindness",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever voted in a presidential election",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever cracked a screen on any of my phones",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been untruthful about my age",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever ridden a roller coaster",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to wear braces",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever shot a gun",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever posted a video to Youtube",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever taken a selfie with a selfie stick",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone swimming in the ocean",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been fishing",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever learned to read music",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever found something worth more than $20",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever found a lost wallet",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever flown in a small plane",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever owned an Apple product",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a gym membership",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever fainted",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had stitches",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever ridden a horse",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a pet dog",
    topics: ["good_questions"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever copied someone else's homework",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever cheated on a test",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever put my tongue on a frozen pole",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever slept with a nightlight",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever thought there was something under my bed at night",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever skipped Halloween",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pretended to be sick when I wasn't",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gotten sick eating too much candy",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever thought there might be something hiding in my closet at night",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever attended a sleepover",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever snuck outside after my bedtime",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever not been able to blow out all the candles on my birthday cake",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever lied to my teacher about homework",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been part of a school talent show",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever participated in a spelling bee",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played hide and seek",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been absent from school",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever late to school",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sang on a stage",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn a school uniform",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played on a school sports team",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to see the school nurse",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever hurt myself at school",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a crush on a classmate",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever forgotten my homework",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been scared on an amusement park ride",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever visited a haunted house",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been through a corn maze",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever cut down a Christmas tree",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever skipped a class",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a crush on one of my teachers",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I been sent to the principal's office",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever I given out a Valentine",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I played the ground is lava",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever camped out in the backyard in a tent",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to walk to school",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone camping with my family",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever passed notes during class",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever fallen asleep in class",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever ridden on a school bus",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever fed my dinner to pet",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever blamed something I did on a sibling",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried to hide my report card",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever done all my summer homework the day before going back to school",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to a pool party",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever traded food items with friends from my lunch",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had detention",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever brought something to school I wasn't supposed to",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever broken the school's dress code",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever liked a school lunch",
    topics: ["for_kids"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally farted loudly in front of someone I liked",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sharted in my pants",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever told a joke that nobody thought was funny",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been caught singing loudly in my car",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally walked in on someone on the toilet",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever had someone walk in on me when I was on the toilet",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever texted something inappropriate to the wrong person,",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever tried to pass a silent far that ended up being really loud",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tripped while walking in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever accidentally pooped in my pants",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally thought a woman was pregnant that wasn't",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever mistaken someone for the incorrect sex",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever butt-dialed someone who heard something they weren't supposed to",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever accidentally peed in my pants",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been caught picking a wedgie in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever walked into the wrong room or meeting",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever lost part of my swimsuit at a public pool",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever accidentally broken something at someone else's house",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had something stuck in my teeth all day",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever walked around with my pant's fly open",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn new clothes with the price tag still on",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn clothes inside out in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn clothes backward in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had noticeable dandruff",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had toothpaste on my face in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had toothpaste on my clothes in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a big stain on my clothes I didn't notice",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever turned an entire clothes washing pink",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever forgotten to brush my hair before going out",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever spilled food all over myself in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dropped food in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever said something dumb in front of someone I liked",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had gum stuck in my hair",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn the wrong uniform to a game",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever spilled food on someone else",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever fallen asleep and snored loudly in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made a huge mistake in front of others",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever received a terrible haircut",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever called someone by the wrong name",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever forgotten someone's name I should have known",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever mistaken someone for someone else",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever slipped and fallen in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tripped and fallen in public",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever walked into something while on my phone",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had toilet paper stuck to my shoe",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever forgotten something important I was supposed to bring",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever thought someone was waving at me but they were waving to someone else",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever taken my friends to the wrong place",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever tried to do something cool but failed miserably",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever said I was good at something and then proven I'm actually really bad",
    topics: ["embarrassing"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever picked my nose and ate it",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had others catch me picking my nose",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been told that my breath smells bad",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sneezed and had snot shoot out my nose",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been caught popping a pimple in public",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever popped a pimple and smelled it",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried tasting my earwax",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pulled out my nose hair in public",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stuck a pencil up my nose",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever given someone a wet willy",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever received a wet willy",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever forgot to wear deodorant on a hot day",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever farted in an elevator with others in it",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sneezed on someone",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever blown spit bubbles in public",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever spit in a public area",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever done a farmer's blow",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever left skid marks in my underwear",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a bird poop on me",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stepped in dog doo",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever put chewed gum under a table",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever found chewed gum under a table",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever clipped my toenails in public",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever thrown up in front of others",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever not washed my hands after going to the bathroom",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever sweated so much while sleeping the sheets were wet",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever peed in the shower",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pooed in the shower",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever peed in a public pool",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had lice",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried wet dog food",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever changed a baby's diaper",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever borrowed someone's toothbrush to brush my teeth",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn someone else's underwear",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever I wiped my runny nose on my arm",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever managed to clog a toilet",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn the same underwear for a week",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever left a toilet seat unclean",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever chewed someone else's already chewed gum",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten something I dropped on the ground",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten something that was already in the trash",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever smelled the armpits of worn clothes to determine if I could wear them again without washing",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever burped and tasted a previous meal",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever picked my scabs in public",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever popped a zit and shown it to others",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever picked stuff out of my belly button and smalled it",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever had to throw away my socks because they smelled so bad",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever left dishes unwashed so long they began to grow mold",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever helped someone else pop their pimples",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever not picked up my dog's poop while walking him/her",
    topics: ["gross"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever a peanut butter and banana sandwich",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a deep-fried candy bar",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten an entire large pizza by myself",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten sushi",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a deep-fried Twinkie",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten Cheese Wiz from a can",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a McDonald's McRib",
    topics: ["food"],
  },
  { _id: ObjectId(), question: "Never have I ever Spam", topics: ["food"] },
  {
    _id: ObjectId(),
    question: "Never have I ever Rocky Mountain oysters",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stolen food from someone else's plate",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a pizza with pineapple on it",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten whip cream directly from the can",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever put french fries on my burger",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever attempted a restaurant food eating challenge",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten street food",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten food from a food truck",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten something before I knew what it was",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever given food I didn't like to my dog under the table",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever stolen and eaten Halloween candy from my sibling",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten food I actually caught or raised",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever eaten something I didn't like to impress my crush",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone from hating a food to loving it",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone from loving a food to hating it",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever eaten the exact same meal for three or more days in a row",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten food that I dumpster-dived for",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten someone else's half-eaten food",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dipped my pizza in mayonnaise",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dipped my pizza crust in honey to eat",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten cotton candy",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a candied apple",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten food that smelled bad",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gotten food poisoning",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever found a hair from someone else in my food",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever wild game",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten fruit directly from a tree",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a spoonful of sugar and nothing else",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever done a cinnamon challenge",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten something so spicy it made me cry",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a ghost pepper",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten snake",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten alligator or crocodile",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten with chopsticks",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a meal with only my hands",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten a vegetable I didn't like",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten baby food",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever burned my tongue on hot food",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten caviar",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten truffles",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever eaten at aa all-you-can-eat buffet",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever stolen someone else's marked food out of the refrigerator",
    topics: ["food"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been pulled over by the cops",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gotten a ticket",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever talked my way out of a ticket",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever driven without a driver's license",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever jay-walked",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever texted while driving",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been the cause of an accident",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever driven through a red light",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been arrested",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a fake ID,",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever snuck into an event without paying",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stolen money from my parents",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stolen money from a friend",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever broken into a house or building where I wasn't supposed to be",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: 'Never have I ever ignored a "No Trespassing" sign',
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been put into handcuffs",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: 'Never have I ever walked against a "Don\'t Walk" sign',
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever seen a crime in progress",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever spray-painted graffiti",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever littered",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question:
      'Never have I ever walked on the grass with a "do not walk on the grass" sign',
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to call the police",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been robbed",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever run a stop sign",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever run a red light",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to court",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever used someone else's credit card without their permission",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever stayed out past my curfew",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever told my parents a lie about where I was staying the night",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been in a fistfight",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever vandalized something",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried to use fake money",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever shoplifted something",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever smoked before turning 18",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drank before turning 21",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever created fake social media accounts",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever taken illegal drugs",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever not returned a book I borrowed from the library",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever looked at 18+ websites before I turned 18",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever driven someone's car without permission",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever bought something for someone underage",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pirated a movie",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever pirated music",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made a prank call",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tossed out someone else's mail",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gambled before turning 21",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever purchased something that's illegal",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever peed in public",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever swam where there was no swimming allowed",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever lied about something I was trying to sell",
    topics: ["rule_breaking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played a drinking game",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had beer from a keg",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had alcohol before my 21st birthday",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever attended a Spring Break party",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drank champagne",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried vodka",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried whiskey",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried tequila",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried boxed wine",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried a microbrew",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried gin",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried sake",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried jello shots",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had vodka watermelon",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever mixed beer, wine, and hard alcohol during an evening of drinking",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I enjoyed alcohol with my parents",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been denied entrance to a bar",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drank someone else's drink",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever asked someone to buy me alcohol",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried a flaming shot",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever chugged a beer",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever done a beer bong",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried a beer sampler",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever passed out",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drank so much I got sick",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever drank so much I couldn't remember everything the next day",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever called an ex while drunk",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever left a drunken voicemail",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a Bloody Mary to help with a hangover",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a hangover",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever tried alcohol-free beer",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone wine tasting",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever woke up in the morning and wondered where I was",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever said something I regretted while drunk",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I spilled a drink",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever gone online and purchased random things when drunk",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever posted something on social media while drunk I later regretted",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever tried to sneak in alcohol to an event where it was prohibited",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever have I bought a round of drinks for my friends",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I bought a round of drinks for strangers",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drank alcohol out of a brown paper bag",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been asked to leave a bar",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gotten into a drunken fight",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever taken a body shot off a stranger",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to take care of a drunk friend",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been a designated driver",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever taken a breathalyzer test",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever have I had a friend take away my car keys when out drinking",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever paid a cover charge to get into a bar",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone drinking in a foreign country",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever drank a Corona with lime at the beach",
    topics: ["drinking"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone on a blind date",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever used a dating app",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever made out with someone I didn't know 24 hours before",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever used a pick-up line in a bar or party",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever had someone try a bad pick-up line on me that worked",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever sent sexy selfies to someone",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been on a double date",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been skinny dipping with others",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever gone commando in public",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made out in a hot tub",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever done a walk of shame",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I had a one night stand",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dated a friend's sibling",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made out at a drive-in movie theater",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question:
      'Never have I ever been in a "friends with benefits" relationship',
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I dated someone 10 years older than me",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever have I dated someone 10 years younger than me",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever walked up to a stranger and asked them out",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been handcuffed to a bed",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever let someone handcuff me to a bed",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a sexy encounter with whip cream",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a sexy encounter with chocolate sauce",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever asked a friend to find out whether someone else likes me",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever seen an adult movie",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever bought an adultmagazine",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dated more than one person at the same time",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever dated an ex's best friend",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been naked with someone with the lights on",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever worn lingerie specifically for someone",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been to an adult store",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played strip poker",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played spin the bottle",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made out in a public place",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been a peeping tom",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever have I kissed someone within the first hour of meeting them",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had a crush on a teacher",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question:
      "Never have I ever left my phone number for someone without them asking",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever given a hickey",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever received a hickey",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever played hard to get",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever remained friends with an ex",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been injured in bed",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever taken nude photos of myself",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made a personal adult video",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever given a backrub that lead to more",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had to sneak out of bed the next morning",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever had an office romance",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been set up on a date by a friend",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever been in bed with more than one person",
    topics: ["dirty"],
  },
  {
    _id: ObjectId(),
    question: "Never have I ever made out with someone of the opposite sex",
    topics: ["dirty"],
  },
]);
