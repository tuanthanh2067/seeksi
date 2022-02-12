db = new Mongo().getDB("seeksi");

db.createCollection("PotentialMatches", { capped: false });

db.potential_matches.insertMany([
  {
    _id: ObjectId("6207fbf8f0323933be000010"),
    pairID: [
      ObjectId("6207f6f7f0323933be000008"),
      ObjectId("6207f6f7f0323933be000009"),
    ],
    status: ["liked", "liked"],
    matchScore: 104,
  },
  {
    _id: ObjectId("6207fbf8f032393207000010"),
    pairID: [
      ObjectId("6207f6f6f032392ed500000c"),
      ObjectId("6207f6f6f032392e6900000a"),
    ],
    status: ["liked", "rejected"],
    matchScore: 108,
  },
  {
    _id: ObjectId("6207fbf8f032392eaf000010"),
    pairID: [
      ObjectId("6207f6f6f0323937b7000008"),
      ObjectId("6207f6f7f032392e0300000f"),
    ],
    status: ["pending", "rejected"],
    matchScore: 4,
  },
  {
    _id: ObjectId("6207fbf8f032392ed5000010"),
    pairID: [
      ObjectId("6207f6f6f032392f1500000a"),
      ObjectId("6207f6f6f032392bed00000f"),
    ],
    status: ["pending", "rejected"],
    matchScore: 2,
  },
  {
    _id: ObjectId("6207fbf8f032393828000010"),
    pairID: [
      ObjectId("6207f6f6f0323931fe00000a"),
      ObjectId("6207f6f7f0323933be00000b"),
    ],
    status: ["rejected", "liked"],
    matchScore: 101,
  },
  {
    _id: ObjectId("6207fbf8f0323937b7000010"),
    pairID: [
      ObjectId("6207f6f6f03239329d00000d"),
      ObjectId("6207f6f6f032392bed000009"),
    ],
    status: ["pending", "rejected"],
    matchScore: 0,
  },
  {
    _id: ObjectId("6207fbf8f032392c7d000010"),
    pairID: [
      ObjectId("6207f6f6f03239329d00000e"),
      ObjectId("6207f6f6f032392f15000009"),
    ],
    status: ["rejected", "pending"],
    matchScore: 4,
  },
  {
    _id: ObjectId("6207fbf8f03239320e000010"),
    pairID: [
      ObjectId("6207f6f6f032392eaf000008"),
      ObjectId("6207f6f6f0323930a700000d"),
    ],
    status: ["rejected", "pending"],
    matchScore: 10,
  },
  {
    _id: ObjectId("6207fbf8f032392f15000010"),
    pairID: [
      ObjectId("6207f6f7f03239383c000008"),
      ObjectId("6207f6f6f03239382800000a"),
    ],
    status: ["rejected", "liked"],
    matchScore: 110,
  },
  {
    _id: ObjectId("6207fbf8f032392dda000010"),
    pairID: [
      ObjectId("6207f6f6f03239329d00000a"),
      ObjectId("6207f6f6f032392f1500000d"),
    ],
    status: ["liked", "rejected"],
    matchScore: 109,
  },
  {
    _id: ObjectId("6207fbf8f032392e69000010"),
    pairID: [
      ObjectId("6207f6f6f032393a1f000018"),
      ObjectId("6207f6f6f032392bed000008"),
    ],
    status: ["pending", "rejected"],
    matchScore: 8,
  },
  {
    _id: ObjectId("6207fbf8f032393236000010"),
    pairID: [
      ObjectId("6207f6f6f032393a12000009"),
      ObjectId("6207f6f6f032392de1000009"),
    ],
    status: ["pending", "rejected"],
    matchScore: 4,
  },
  {
    _id: ObjectId("6207fbf8f03239329d000010"),
    pairID: [
      ObjectId("6207f6f7f0323932e700000d"),
      ObjectId("6207f6f6f0323932e7000008"),
    ],
    status: ["liked", "rejected"],
    matchScore: 107,
  },
  {
    _id: ObjectId("6207fbf8f032392bed000010"),
    pairID: [
      ObjectId("6207f6f6f032392eaf00000d"),
      ObjectId("6207f6f6f032392dde00000f"),
    ],
    status: ["pending", "liked"],
    matchScore: 109,
  },
  {
    _id: ObjectId("6207fbf8f032392dde000010"),
    pairID: [
      ObjectId("6207f6f6f032392c7d00000b"),
      ObjectId("6207f6f6f032392de100000c"),
    ],
    status: ["liked", "rejected"],
    matchScore: 105,
  },
  {
    _id: ObjectId("6207fbf8f032392de1000010"),
    pairID: [
      ObjectId("6207f6f6f032392eaf000009"),
      ObjectId("6207f6f6f032392bed000009"),
    ],
    status: ["pending", "rejected"],
    matchScore: 2,
  },
  {
    _id: ObjectId("6207fbf8f03239383c000010"),
    pairID: [
      ObjectId("6207f6f6f032392de100000d"),
      ObjectId("6207f6f6f032392d1c000008"),
    ],
    status: ["liked", "pending"],
    matchScore: 101,
  },
  {
    _id: ObjectId("6207fbf8f032392e03000010"),
    pairID: [
      ObjectId("6207f6f6f032392f1500000c"),
      ObjectId("6207f6f7f0323933be00000f"),
    ],
    status: ["liked", "rejected"],
    matchScore: 104,
  },
  {
    _id: ObjectId("6207fbf8f0323930a7000010"),
    pairID: [
      ObjectId("6207f6f6f032392e6900000c"),
      ObjectId("6207f6f6f032392eaf00000e"),
    ],
    status: ["liked", "rejected"],
    matchScore: 106,
  },
  {
    _id: ObjectId("6207fbf8f0323931fe000010"),
    pairID: [
      ObjectId("6207f6f6f032393a1200000a"),
      ObjectId("6207f6f6f032392dde00000d"),
    ],
    status: ["liked", "pending"],
    matchScore: 108,
  },
]);
