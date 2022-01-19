db = new Mongo().getDB("seeksi");

db.createCollection("potential_matches", { capped: false });

db.potential_matches.insertMany([
  {
    potentialMatchID: { $oid: "61e761eefc13ae15550001a5" },
    pairID: [
      { $oid: "6199d9abf6a0af308e000282" },
      { $oid: "6199d9abf6a0af305d000286" },
    ],
    status: ["rejected", "pending"],
    matchScore: 0.71,
  },
  {
    potentialMatchID: { $oid: "61e761eefc13ae15550001a6" },
    pairID: [
      { $oid: "6199d9abf6a0af30a300027f" },
      { $oid: "6199d9abf6a0af308e000283" },
    ],
    status: ["rejected", "pending"],
    matchScore: 1.0,
  },
  {
    potentialMatchID: { $oid: "61e761eefc13ae15550001a7" },
    pairID: [
      { $oid: "6199d9abf6a0af305d000285" },
      { $oid: "6199d9abf6a0af3047000287" },
    ],
    status: ["pending", "rejected"],
    matchScore: 0.93,
  },
  {
    potentialMatchID: { $oid: "61e761eefc13ae15550001a8" },
    pairID: [
      { $oid: "6199d9abf6a0af30a80002a0" },
      { $oid: "6199d9abf6a0af30a800029e" },
    ],
    status: ["liked", "pending"],
    matchScore: 0.49,
  },
  {
    potentialMatchID: { $oid: "61e761eefc13ae15550001a9" },
    pairID: [
      { $oid: "6199d9abf6a0af30a3000280" },
      { $oid: "6199d9abf6a0af30a800029b" },
    ],
    status: ["pending", "liked"],
    matchScore: 0.64,
  },
]);
