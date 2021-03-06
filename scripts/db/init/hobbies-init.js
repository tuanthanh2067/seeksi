db = new Mongo().getDB("seeksi");

db.createCollection("hobbies", { capped: false });

db.hobbies.insertMany([
  { _id: ObjectId("62165eb6f03239f04f000000"), name: "Acroyoga" },
  { _id: ObjectId("62165eb6f03239f04f000001"), name: "Acting" },
  { _id: ObjectId("62165eb6f03239f04f000002"), name: "Aerial silk" },
  { _id: ObjectId("62165eb6f03239f04f000003"), name: "Airbrushing" },
  { _id: ObjectId("62165eb6f03239f04f000004"), name: "Amateur radio" },
  { _id: ObjectId("62165eb6f03239f04f000005"), name: "Animation" },
  { _id: ObjectId("62165eb6f03239f04f000006"), name: "Anime" },
  { _id: ObjectId("62165eb6f03239f04f000007"), name: "Aquascaping" },
  { _id: ObjectId("62165eb6f03239f04f000008"), name: "Art" },
  { _id: ObjectId("62165eb6f03239f04f000009"), name: "Astrology" },
  { _id: ObjectId("62165eb6f03239f04f00000a"), name: "Baking" },
  { _id: ObjectId("62165eb6f03239ecb1000000"), name: "Barbershop Music" },
  { _id: ObjectId("62165eb6f03239ecb1000001"), name: "Baton twirling" },
  { _id: ObjectId("62165eb6f03239ecb1000002"), name: "Beatboxing" },
  { _id: ObjectId("62165eb6f03239ecb1000003"), name: "Beer tasting" },
  { _id: ObjectId("62165eb6f03239ecb1000004"), name: "Bell ringing" },
  { _id: ObjectId("62165eb6f03239ecb1000005"), name: "Blogging" },
  { _id: ObjectId("62165eb6f03239ecb1000006"), name: "Board/tabletop games" },
  { _id: ObjectId("62165eb6f03239ecb1000007"), name: "Book discussion clubs" },
  { _id: ObjectId("62165eb6f03239ecb1000008"), name: "Book restoration" },
  { _id: ObjectId("62165eb6f03239ecb1000009"), name: "Bowling" },
  { _id: ObjectId("62165eb6f03239ecb100000a"), name: "Brazilian jiu-jitsu" },
  { _id: ObjectId("62165eb6f03239eedb000000"), name: "Breadmaking" },
  { _id: ObjectId("62165eb6f03239eedb000001"), name: "Bullet journaling" },
  { _id: ObjectId("62165eb6f03239eedb000002"), name: "Calligraphy" },
  { _id: ObjectId("62165eb6f03239eedb000003"), name: "Candle making" },
  { _id: ObjectId("62165eb6f03239eedb000004"), name: "Candy making" },
  { _id: ObjectId("62165eb6f03239eedb000005"), name: "Car fixing & building" },
  { _id: ObjectId("62165eb6f03239eedb000006"), name: "Card games" },
  { _id: ObjectId("62165eb6f03239eedb000007"), name: "Cardistry" },
  { _id: ObjectId("62165eb6f03239eedb000008"), name: "Ceramics" },
  { _id: ObjectId("62165eb6f03239eedb000009"), name: "Chatting" },
  { _id: ObjectId("62165eb6f03239eedb00000a"), name: "Cheesemaking" },
  { _id: ObjectId("62165eb6f03239f11f000000"), name: "Chess" },
  { _id: ObjectId("62165eb6f03239f11f000001"), name: "Cleaning" },
  { _id: ObjectId("62165eb6f03239f11f000002"), name: "Clothesmaking" },
  { _id: ObjectId("62165eb6f03239f11f000003"), name: "Coffee roasting" },
  { _id: ObjectId("62165eb6f03239f11f000004"), name: "Collecting" },
  { _id: ObjectId("62165eb6f03239f11f000005"), name: "Coloring" },
  { _id: ObjectId("62165eb6f03239f11f000006"), name: "Communication" },
  { _id: ObjectId("62165eb6f03239f11f000007"), name: "Community activism" },
  { _id: ObjectId("62165eb6f03239f11f000008"), name: "Computer programming" },
  { _id: ObjectId("62165eb6f03239f11f000009"), name: "Confectionery" },
  { _id: ObjectId("62165eb6f03239f11f00000a"), name: "Conlanging" },
  { _id: ObjectId("62165eb6f03239ed6d000000"), name: "Construction" },
  { _id: ObjectId("62165eb6f03239ed6d000001"), name: "Cooking" },
  { _id: ObjectId("62165eb6f03239ed6d000002"), name: "Cosplaying" },
  { _id: ObjectId("62165eb6f03239ed6d000003"), name: "Couch surfing" },
  { _id: ObjectId("62165eb6f03239ed6d000004"), name: "Couponing" },
  { _id: ObjectId("62165eb6f03239ed6d000005"), name: "Craft" },
  { _id: ObjectId("62165eb6f03239ed6d000006"), name: "Creative writing" },
  { _id: ObjectId("62165eb6f03239ed6d000007"), name: "Crocheting" },
  { _id: ObjectId("62165eb6f03239ed6d000008"), name: "Cross-stitch" },
  { _id: ObjectId("62165eb6f03239ed6d000009"), name: "Crossword puzzles" },
  { _id: ObjectId("62165eb6f03239ed6d00000a"), name: "Cryptography" },
  { _id: ObjectId("62165eb6f03239eb0f000000"), name: "Cue sports" },
  { _id: ObjectId("62165eb6f03239eb0f000001"), name: "Dance" },
  { _id: ObjectId("62165eb6f03239eb0f000002"), name: "Decorating" },
  { _id: ObjectId("62165eb6f03239eb0f000003"), name: "Digital arts" },
  { _id: ObjectId("62165eb6f03239eb0f000004"), name: "Dining" },
  { _id: ObjectId("62165eb6f03239eb0f000005"), name: "Diorama" },
  { _id: ObjectId("62165eb6f03239eb0f000006"), name: "Distro Hopping" },
  { _id: ObjectId("62165eb6f03239eb0f000007"), name: "Diving" },
  { _id: ObjectId("62165eb6f03239eb0f000008"), name: "Djembe" },
  { _id: ObjectId("62165eb6f03239eb0f000009"), name: "DJing" },
  { _id: ObjectId("62165eb6f03239eb0f00000a"), name: "Do it yourself" },
  { _id: ObjectId("62165eb6f03239ea8b000000"), name: "Drama" },
  { _id: ObjectId("62165eb6f03239ea8b000001"), name: "Drawing" },
  { _id: ObjectId("62165eb6f03239ea8b000002"), name: "Drink mixing" },
  { _id: ObjectId("62165eb6f03239ea8b000003"), name: "Electronic games" },
  { _id: ObjectId("62165eb6f03239ea8b000004"), name: "Electronics" },
  { _id: ObjectId("62165eb6f03239ea8b000005"), name: "Embroidery" },
  { _id: ObjectId("62165eb6f03239ea8b000006"), name: "Engraving" },
  { _id: ObjectId("62165eb6f03239ea8b000007"), name: "Entertaining" },
  { _id: ObjectId("62165eb6f03239ea8b000008"), name: "Experimenting" },
  { _id: ObjectId("62165eb6f03239ea8b000009"), name: "Fantasy sports" },
  { _id: ObjectId("62165eb6f03239ea8b00000a"), name: "Fashion" },
  { _id: ObjectId("62165eb6f03239ed4f000000"), name: "Fashion design" },
  { _id: ObjectId("62165eb6f03239ed4f000001"), name: "Feng shui decorating" },
  { _id: ObjectId("62165eb6f03239ed4f000002"), name: "Filmmaking" },
  { _id: ObjectId("62165eb6f03239ed4f000003"), name: "Fingerpainting" },
  { _id: ObjectId("62165eb6f03239ed4f000004"), name: "Fishfarming" },
  { _id: ObjectId("62165eb6f03239ed4f000005"), name: "Fishkeeping" },
  { _id: ObjectId("62165eb6f03239ed4f000006"), name: "Flower arranging" },
  { _id: ObjectId("62165eb6f03239ed4f000007"), name: "Fly tying" },
  {
    _id: ObjectId("62165eb6f03239ed4f000008"),
    name: "Foreign language learning",
  },
  { _id: ObjectId("62165eb6f03239ed4f000009"), name: "Furniture building" },
  { _id: ObjectId("62165eb6f03239ed4f00000a"), name: "Gaming" },
  { _id: ObjectId("62165eb6f03239eb5a000000"), name: "Genealogy" },
  {
    _id: ObjectId("62165eb6f03239eb5a000001"),
    name: "Gingerbread house making",
  },
  { _id: ObjectId("62165eb6f03239eb5a000002"), name: "Giving advice" },
  { _id: ObjectId("62165eb6f03239eb5a000003"), name: "Glassblowing" },
  { _id: ObjectId("62165eb6f03239eb5a000004"), name: "Gardening" },
  { _id: ObjectId("62165eb6f03239eb5a000005"), name: "Graphic design" },
  { _id: ObjectId("62165eb6f03239eb5a000006"), name: "Gunsmithing" },
  { _id: ObjectId("62165eb6f03239eb5a000007"), name: "Hacking" },
  { _id: ObjectId("62165eb6f03239eb5a000008"), name: "Hardware" },
  { _id: ObjectId("62165eb6f03239eb5a000009"), name: "Herp keeping" },
  { _id: ObjectId("62165eb6f03239eb5a00000a"), name: "Home improvement" },
  { _id: ObjectId("62165eb6f03239ea09000000"), name: "Homebrewing" },
  { _id: ObjectId("62165eb6f03239ea09000001"), name: "Houseplant care" },
  { _id: ObjectId("62165eb6f03239ea09000002"), name: "Hula hooping" },
  { _id: ObjectId("62165eb6f03239ea09000003"), name: "Humor" },
  { _id: ObjectId("62165eb6f03239ea09000004"), name: "Hydroponics" },
  { _id: ObjectId("62165eb6f03239ea09000005"), name: "Ice skating" },
  { _id: ObjectId("62165eb6f03239ea09000006"), name: "Inventing" },
  { _id: ObjectId("62165eb6f03239ea09000007"), name: "Jewelry making" },
  { _id: ObjectId("62165eb6f03239ea09000008"), name: "Jigsaw puzzles" },
  { _id: ObjectId("62165eb6f03239ea09000009"), name: "Journaling" },
  { _id: ObjectId("62165eb6f03239ea0900000a"), name: "Juggling" },
  { _id: ObjectId("62165eb6f03239ed8f000000"), name: "Karaoke" },
  { _id: ObjectId("62165eb6f03239ed8f000001"), name: "Karate" },
  { _id: ObjectId("62165eb6f03239ed8f000002"), name: "Kendama" },
  { _id: ObjectId("62165eb6f03239ed8f000003"), name: "Knife making" },
  { _id: ObjectId("62165eb6f03239ed8f000004"), name: "Knitting" },
  { _id: ObjectId("62165eb6f03239ed8f000005"), name: "Knot tying" },
  { _id: ObjectId("62165eb6f03239ed8f000006"), name: "Kombucha brewing" },
  { _id: ObjectId("62165eb6f03239ed8f000007"), name: "Kung fu" },
  { _id: ObjectId("62165eb6f03239ed8f000008"), name: "Lace making" },
  { _id: ObjectId("62165eb6f03239ed8f000009"), name: "Lapidary" },
  { _id: ObjectId("62165eb6f03239ed8f00000a"), name: "Leather crafting" },
  { _id: ObjectId("62165eb6f03239f085000000"), name: "Lego building" },
  { _id: ObjectId("62165eb6f03239f085000001"), name: "Livestreaming" },
  { _id: ObjectId("62165eb6f03239f085000002"), name: "Listening to music" },
  { _id: ObjectId("62165eb6f03239f085000003"), name: "Listening to podcasts" },
  { _id: ObjectId("62165eb6f03239f085000004"), name: "Lock picking" },
  { _id: ObjectId("62165eb6f03239f085000005"), name: "Machining" },
  { _id: ObjectId("62165eb6f03239f085000006"), name: "Macrame" },
  { _id: ObjectId("62165eb6f03239f085000007"), name: "Magic" },
  { _id: ObjectId("62165eb6f03239f085000008"), name: "Makeup" },
  { _id: ObjectId("62165eb6f03239f085000009"), name: "Manga" },
  { _id: ObjectId("62165eb6f03239f08500000a"), name: "Massaging" },
  { _id: ObjectId("62165eb6f03239ec8d000000"), name: "Mazes (indoor/outdoor)" },
  { _id: ObjectId("62165eb6f03239ec8d000001"), name: "Mechanics" },
  { _id: ObjectId("62165eb6f03239ec8d000002"), name: "Meditation" },
  { _id: ObjectId("62165eb6f03239ec8d000003"), name: "Memory training" },
  { _id: ObjectId("62165eb6f03239ec8d000004"), name: "Metalworking" },
  { _id: ObjectId("62165eb6f03239ec8d000005"), name: "Miniature art" },
  { _id: ObjectId("62165eb6f03239ec8d000006"), name: "Minimalism" },
  { _id: ObjectId("62165eb6f03239ec8d000007"), name: "Model building" },
  { _id: ObjectId("62165eb6f03239ec8d000008"), name: "Modeling" },
  { _id: ObjectId("62165eb6f03239ec8d000009"), name: "Model engineering" },
  { _id: ObjectId("62165eb6f03239ec8d00000a"), name: "Music" },
  { _id: ObjectId("62165eb6f03239f187000000"), name: "Nail art" },
  { _id: ObjectId("62165eb6f03239f187000001"), name: "Needlepoint" },
  { _id: ObjectId("62165eb6f03239f187000002"), name: "Origami" },
  { _id: ObjectId("62165eb6f03239f187000003"), name: "Painting" },
  { _id: ObjectId("62165eb6f03239f187000004"), name: "Palmistry" },
  { _id: ObjectId("62165eb6f03239f187000005"), name: "Pen Spinning" },
  { _id: ObjectId("62165eb6f03239f187000006"), name: "Performance" },
  { _id: ObjectId("62165eb6f03239f187000007"), name: "Pet" },
  {
    _id: ObjectId("62165eb6f03239f187000008"),
    name: "Pet adoption & fostering",
  },
  { _id: ObjectId("62165eb6f03239f187000009"), name: "Pet sitting" },
  { _id: ObjectId("62165eb6f03239f18700000a"), name: "Philately" },
  { _id: ObjectId("62165eb6f03239ec45000000"), name: "Photography" },
  { _id: ObjectId("62165eb6f03239ec45000001"), name: "Pilates" },
  { _id: ObjectId("62165eb6f03239ec45000002"), name: "Planning" },
  { _id: ObjectId("62165eb6f03239ec45000003"), name: "Plastic art" },
  {
    _id: ObjectId("62165eb6f03239ec45000004"),
    name: "Playing musical instruments",
  },
  { _id: ObjectId("62165eb6f03239ec45000005"), name: "Poetry" },
  { _id: ObjectId("62165eb6f03239ec45000006"), name: "Poi" },
  { _id: ObjectId("62165eb6f03239ec45000007"), name: "Pole dancing" },
  { _id: ObjectId("62165eb6f03239ec45000008"), name: "Postcrossing" },
  { _id: ObjectId("62165eb6f03239ec45000009"), name: "Pottery" },
  { _id: ObjectId("62165eb6f03239ec4500000a"), name: "Power Nap" },
  { _id: ObjectId("62165eb6f03239eb09000000"), name: "Practical jokes" },
  { _id: ObjectId("62165eb6f03239eb09000001"), name: "Pressed flower craft" },
  {
    _id: ObjectId("62165eb6f03239eb09000002"),
    name: "Proofreading and editing",
  },
  { _id: ObjectId("62165eb6f03239eb09000003"), name: "Proverbs" },
  { _id: ObjectId("62165eb6f03239eb09000004"), name: "Public speaking" },
  { _id: ObjectId("62165eb6f03239eb09000005"), name: "Puppetry" },
  { _id: ObjectId("62165eb6f03239eb09000006"), name: "Puzzles" },
  { _id: ObjectId("62165eb6f03239eb09000007"), name: "Pyrography" },
  { _id: ObjectId("62165eb6f03239eb09000008"), name: "Quilling" },
  { _id: ObjectId("62165eb6f03239eb09000009"), name: "Quilting" },
  { _id: ObjectId("62165eb6f03239eb0900000a"), name: "Quizzes" },
  {
    _id: ObjectId("62165eb6f03239ecda000000"),
    name: "Radio-controlled model playing",
  },
  {
    _id: ObjectId("62165eb6f03239ecda000001"),
    name: "Rail transport modeling",
  },
  { _id: ObjectId("62165eb6f03239ecda000002"), name: "Rapping" },
  { _id: ObjectId("62165eb6f03239ecda000003"), name: "Reading" },
  { _id: ObjectId("62165eb6f03239ecda000004"), name: "Recipe creation" },
  { _id: ObjectId("62165eb6f03239ecda000005"), name: "Refinishing" },
  { _id: ObjectId("62165eb6f03239ecda000006"), name: "Reiki" },
  { _id: ObjectId("62165eb6f03239ecda000007"), name: "Reviewing Gadgets" },
  { _id: ObjectId("62165eb6f03239ecda000008"), name: "Robot combat" },
  { _id: ObjectId("62165eb6f03239ecda000009"), name: "Rubik's Cube" },
  { _id: ObjectId("62165eb6f03239ecda00000a"), name: "Scrapbooking" },
  { _id: ObjectId("62165eb6f03239ede0000000"), name: "Scuba Diving" },
  { _id: ObjectId("62165eb6f03239ede0000001"), name: "Sculpting" },
  { _id: ObjectId("62165eb6f03239ede0000002"), name: "Sewing" },
  { _id: ObjectId("62165eb6f03239ede0000003"), name: "Shoemaking" },
  { _id: ObjectId("62165eb6f03239ede0000004"), name: "Singing" },
  { _id: ObjectId("62165eb6f03239ede0000005"), name: "Sketching" },
  { _id: ObjectId("62165eb6f03239ede0000006"), name: "Skipping rope" },
  { _id: ObjectId("62165eb6f03239ede0000007"), name: "Slot car" },
  { _id: ObjectId("62165eb6f03239ede0000008"), name: "Soapmaking" },
  { _id: ObjectId("62165eb6f03239ede0000009"), name: "Social media" },
  { _id: ObjectId("62165eb6f03239ede000000a"), name: "Spreadsheets" },
  { _id: ObjectId("62165eb6f03239eead000000"), name: "Stamp collecting" },
  { _id: ObjectId("62165eb6f03239eead000001"), name: "Stand-up comedy" },
  { _id: ObjectId("62165eb6f03239eead000002"), name: "Storytelling" },
  { _id: ObjectId("62165eb6f03239eead000003"), name: "Sudoku" },
  { _id: ObjectId("62165eb6f03239eead000004"), name: "Talking" },
  { _id: ObjectId("62165eb6f03239eead000005"), name: "Tapestry" },
  { _id: ObjectId("62165eb6f03239eead000006"), name: "Tarot" },
  { _id: ObjectId("62165eb6f03239eead000007"), name: "Tattooing" },
  { _id: ObjectId("62165eb6f03239eead000008"), name: "Telling jokes" },
  { _id: ObjectId("62165eb6f03239eead000009"), name: "Thrifting" },
  { _id: ObjectId("62165eb6f03239eead00000a"), name: "Upcycling" },
  { _id: ObjectId("62165eb6f03239f390000000"), name: "Video editing" },
  { _id: ObjectId("62165eb6f03239f390000001"), name: "Video game developing" },
  { _id: ObjectId("62165eb6f03239f390000002"), name: "Video gaming" },
  { _id: ObjectId("62165eb6f03239f390000003"), name: "Video making" },
  { _id: ObjectId("62165eb6f03239f390000004"), name: "VR Gaming" },
  { _id: ObjectId("62165eb6f03239f390000005"), name: "Wargaming" },
  { _id: ObjectId("62165eb6f03239f390000006"), name: "Watch making" },
  { _id: ObjectId("62165eb6f03239f390000007"), name: "Watching documentaries" },
  { _id: ObjectId("62165eb6f03239f390000008"), name: "Watching movies" },
  { _id: ObjectId("62165eb6f03239f390000009"), name: "Watching television" },
  { _id: ObjectId("62165eb6f03239f39000000a"), name: "Wax sealing" },
  { _id: ObjectId("62165eb6f03239f39000000b"), name: "Waxing" },
  { _id: ObjectId("62165eb6f03239f39000000c"), name: "Weaving" },
  { _id: ObjectId("62165eb6f03239f39000000d"), name: "Webtooning" },
  { _id: ObjectId("62165eb6f03239f39000000e"), name: "Weight training" },
  { _id: ObjectId("62165eb6f03239f39000000f"), name: "Welding" },
  { _id: ObjectId("62165eb6f03239f390000010"), name: "Whisky" },
  { _id: ObjectId("62165eb6f03239f390000011"), name: "Whittling" },
  { _id: ObjectId("62165eb6f03239f390000012"), name: "Wikipedia editing" },
  { _id: ObjectId("62165eb6f03239f390000013"), name: "Wine tasting" },
  { _id: ObjectId("62165eb6f03239f390000014"), name: "Winemaking" },
  { _id: ObjectId("62165eb6f03239f390000015"), name: "Wood carving" },
  { _id: ObjectId("62165eb6f03239f390000016"), name: "Woodworking" },
  { _id: ObjectId("62165eb6f03239f390000017"), name: "Word searches" },
  { _id: ObjectId("62165eb6f03239f390000018"), name: "Worldbuilding" },
  { _id: ObjectId("62165eb6f03239f390000019"), name: "Writing" },
  { _id: ObjectId("62165eb6f03239f39000001a"), name: "Writing music" },
  { _id: ObjectId("62165eb6f03239f39000001b"), name: "Yo-yoing" },
  { _id: ObjectId("62165eb6f03239f39000001c"), name: "Yoga" },
  { _id: ObjectId("62165eb6f03239f39000001d"), name: "Zumba" },
]);
