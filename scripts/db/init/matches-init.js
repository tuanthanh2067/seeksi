db = new Mongo().getDB("seeksi");

db.createCollection("matches", { capped: false });

db.matches.insertMany([
  {
    pairID: [
      { $oid: "6199d9abf6a0af3064000283" },
      { $oid: "6199d9abf6a0af3047000286" },
    ],
    isUnmatched: true,
    roomID: { $oid: "6199da18f6a0af30a0000289" },
  },
  {
    pairID: [
      { $oid: "6199d9abf6a0af30a80002a0" },
      { $oid: "6199d9abf6a0af30a0000286" },
    ],
    isUnmatched: false,
    roomID: { $oid: "6199da18f6a0af304700028a" },
  },
  {
    pairID: [
      { $oid: "6199d9abf6a0af3064000284" },
      { $oid: "6199d9abf6a0af308e000283" },
    ],
    isUnmatched: false,
    roomID: { $oid: "6199da18f6a0af308e000286" },
  },
  {
    pairID: [
      { $oid: "6199d9abf6a0af30a800029f" },
      { $oid: "6199d9abf6a0af30a800029b" },
    ],
    isUnmatched: false,
    roomID: { $oid: "6199da18f6a0af305d000289" },
  },
  {
    pairID: [
      { $oid: "6199d9abf6a0af30a400027f" },
      { $oid: "6199d9abf6a0af30a800029e" },
    ],
    isUnmatched: false,
    roomID: { $oid: "6199da18f6a0af3064000287" },
  },
]);
