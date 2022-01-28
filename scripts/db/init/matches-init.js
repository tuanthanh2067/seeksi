db = new Mongo().getDB("seeksi");

db.createCollection("matches", { capped: false });

db.matches.insertMany([
  {
    pairID: [
      ObjectId("6199d9abf6a0af3064000283"),
      ObjectId("6199d9abf6a0af3047000286"),
    ],
    isUnmatched: true,
    roomID: ObjectId("6199da18f6a0af30a0000289"),
  },
  {
    pairID: [
      ObjectId("6199d9abf6a0af30a80002a0"),
      ObjectId("6199d9abf6a0af30a0000286"),
    ],
    isUnmatched: false,
    roomID: ObjectId("6199da18f6a0af304700028a"),
  },
  {
    pairID: [
      ObjectId("6199d9abf6a0af3064000284"),
      ObjectId("6199d9abf6a0af308e000283"),
    ],
    isUnmatched: false,
    roomID: ObjectId("6199da18f6a0af308e000286"),
  },
  {
    pairID: [
      ObjectId("6199d9abf6a0af30a800029f"),
      ObjectId("6199d9abf6a0af30a800029b"),
    ],
    isUnmatched: false,
    roomID: ObjectId("6199da18f6a0af305d000289"),
  },
  {
    pairID: [
      ObjectId("6199d9abf6a0af30a400027f"),
      ObjectId("6199d9abf6a0af30a800029e"),
    ],
    isUnmatched: false,
    roomID: ObjectId("6199da18f6a0af3064000287"),
  },
]);
