db = new Mongo().getDB("seeksi");

db.createCollection("potential_matches", { capped: false });

db.potential_matches.insertMany([
  {
    _id: ObjectId("61e761eefc13ae15550001a5"),
    pairID: [
      ObjectId("6199d9abf6a0af308e000282"),
      ObjectId("6199d9abf6a0af305d000286"),
    ],
    status: ["rejected", "pending"],
    matchScore: 0.71,
  },
  {
    _id: ObjectId("61e761eefc13ae15550001a6"),
    pairID: [
      ObjectId("6199d9abf6a0af30a300027f"),
      ObjectId("6199d9abf6a0af308e000283"),
    ],
    status: ["rejected", "pending"],
    matchScore: 1.0,
  },
  {
    _id: ObjectId("61e761eefc13ae15550001a7"),
    pairID: [
      ObjectId("6199d9abf6a0af305d000285"),
      ObjectId("6199d9abf6a0af3047000287"),
    ],
    status: ["pending", "rejected"],
    matchScore: 0.93,
  },
  {
    _id: ObjectId("61e761eefc13ae15550001a8"),
    pairID: [
      ObjectId("6199d9abf6a0af30a80002a0"),
      ObjectId("6199d9abf6a0af30a800029e"),
    ],
    status: ["liked", "pending"],
    matchScore: 0.49,
  },
  {
    _id: ObjectId("61e761eefc13ae15550001a9"),
    pairID: [
      ObjectId("6199d9abf6a0af30a3000280"),
      ObjectId("6199d9abf6a0af30a800029b"),
    ],
    status: ["pending", "liked"],
    matchScore: 0.64,
  },
]);
