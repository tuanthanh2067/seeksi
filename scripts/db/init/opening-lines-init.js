db = new Mongo().getDB("seeksi");

db.createCollection("openinglines", { capped: false });

db.openinglines.insertMany([
  {
    _id: ObjectId("61e7615afc13ae336b000014"),
    content:
      "Pop quiz: What are your thoughts on pineapple pizza? No pressure; but this could seal our fate.",
    useCount: 82,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000015"),
    content:
      "I think there's something wrong with my phone... because I can't find your number in it.",
    useCount: 92,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000016"),
    content:
      "[Insert GIF of the Titanic splitting in half] An icebreaker. There; I did the thing.",
    useCount: 33,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000017"),
    content:
      "In case you were wondering; dad jokes are the way to my heart. Anddd fire away! The cornier; the better.",
    useCount: 10,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000018"),
    content:
      "Two truths and one lie — go. Fair warning: Im pretty good at this.",
    useCount: 87,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000019"),
    content:
      "Looking for the Jim to my Pam... know anyone who might be interested?",
    useCount: 88,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00001a"),
    content:
      "I have this rule where I only talk to strangers on the Internet about pizza. So; thin crust or deep dish?",
    useCount: 82,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00001b"),
    content:
      "You can tell a lot about a person by their Netflix queue. So; what's the last thing you watched?",
    useCount: 11,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00001c"),
    content:
      "I'm going to make this real easy. If you want to make me swoon; send me the best animal GIF you can find.",
    useCount: 29,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00001d"),
    content:
      "What size bowling shoes should I get for you? You know; for our date at the bowling alley this weekend.",
    useCount: 43,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00001e"),
    content: "If you were a vegetable; you'd be a cute-cumber.",
    useCount: 46,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00001f"),
    content: "If you were a fruit; you'd be a fine-apple.",
    useCount: 35,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000020"),
    content:
      "When your mom told you she wanted the best for you; I'm pretty sure she was talking about me.",
    useCount: 40,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000021"),
    content:
      "My grandparents met on Seeksi; so I'm feeling really good about this.",
    useCount: 64,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000022"),
    content:
      "I've heard that flattery will get you everywhere; so has anyone ever told you that you look like [insert celeb's name]?",
    useCount: 64,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000023"),
    content:
      "I don't mean to brag but I happen to be really good at overthinking my dating app messages. What about you?",
    useCount: 81,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000024"),
    content:
      "Wanna send memes back and forth until we finally feel comfortable enough to meet up IRL?",
    useCount: 94,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000025"),
    content:
      "I'm from the future and we need to be together because our child will achieve world peace.",
    useCount: 100,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000026"),
    content:
      "Let's just skip to the important stuff: Chunky or smooth peanut butter?",
    useCount: 16,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000027"),
    content:
      "Sorry it took me so long to message you; I was at Trader Joe's trying to figure out what to buy you for breakfast.",
    useCount: 44,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000028"),
    content: "Serious question. Best invention: tacos or Seeksi?",
    useCount: 55,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000029"),
    content:
      "Here's my life story in five emojis. I'd love to hear your interpretation of that. Better yet; what's yours?",
    useCount: 67,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00002a"),
    content: "I call big spoon. Is that gonna be a problem?",
    useCount: 38,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00002b"),
    content:
      "Real talk. Is that actually your cute dog or did you borrow him for bait? (BTW; it's totally working).",
    useCount: 57,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00002c"),
    content: "Sorry; I'm looking for the exit; so we can go out?",
    useCount: 72,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00002d"),
    content: "If you could live in any sitcom; what sitcom would it be?",
    useCount: 18,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00002e"),
    content:
      "You're putting together a mixtape for your crush; what's your opener song?",
    useCount: 86,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00002f"),
    content:
      "I can tell a lot about a person from their favorite Disney movie. What's yours?",
    useCount: 69,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000030"),
    content:
      "Choose your own adventure: Brunch date; hiking date; or movie date?",
    useCount: 6,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000031"),
    content: "What's the worst opening line you've ever received?",
    useCount: 88,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000032"),
    content: "What's the best place you've traveled?",
    useCount: 32,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000033"),
    content:
      "We're married. I'm complaining that I don't know what I want to eat. You suggest...?",
    useCount: 68,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000034"),
    content: "What three characters combined best describe you?",
    useCount: 12,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000035"),
    content: "Why'd you swipe right?",
    useCount: 56,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000036"),
    content:
      "When sharing ice cream; do you dig out all of the best parts or share them equally?",
    useCount: 54,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000037"),
    content: "What show are you marathon watching right now?",
    useCount: 40,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000038"),
    content: "What's your favorite book?",
    useCount: 33,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000039"),
    content: "Are you a Stark; Lannister; Baratheon; or Targaryen?",
    useCount: 37,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00003a"),
    content: "What's the first thing you do when you wake up in the morning?",
    useCount: 11,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00003b"),
    content: "What's your idea of a perfect first date?",
    useCount: 93,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00003c"),
    content:
      "If you could switch lives with a celebrity for a day; who would it be and why?",
    useCount: 22,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00003d"),
    content: "What's the best opening line you can think of?",
    useCount: 20,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00003e"),
    content: "Favorite Sunday activities?\t",
    useCount: 16,
  },
  {
    _id: ObjectId("61e7615afc13ae336b00003f"),
    content: "What meme best describes you and why?",
    useCount: 78,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000040"),
    content: "What's the worst nickname you've ever been given?",
    useCount: 74,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000041"),
    content: "Most embarrassing childhood memory? Mine is...",
    useCount: 3,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000042"),
    content: "You have 72 hours left on earth. What do you do?",
    useCount: 41,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000043"),
    content: "Standard greeting; Harry Potter pickup line; or rap battle?",
    useCount: 79,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000044"),
    content: "How many different pasta shapes can you name?",
    useCount: 15,
  },
  {
    _id: ObjectId("61e7615afc13ae336b000045"),
    content:
      "Pop quiz: What are your thoughts on pineapple pizza? No pressure; but this could seal our fate.",
    useCount: 79,
  },
]);
