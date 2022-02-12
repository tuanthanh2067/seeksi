db = new Mongo().getDB("seeksi");

db.createCollection("matches", { capped: false });

db.matches.insertMany([
  {
    roomID: ObjectId("62080f1ff0323933be00006e"),
    pairID: [
      ObjectId("6207f6f7f0323933be000008"),
      ObjectId("6207f6f7f0323933be000009"),
    ],
    isUnmatched: false,
  },
  {
    roomID: ObjectId("62080f20f032393207000078"),
    pairID: [
      ObjectId("6207f6f7f032392e0300000e"),
      ObjectId("6207f6f7f0323933be000008"),
    ],
    isUnmatched: false,
  },
  {
    roomID: ObjectId("62080f20f032392e6900002e"),
    pairID: [
      ObjectId("6207f6f6f032392dde00000c"),
      ObjectId("6207f6f6f0323931fe00000c"),
    ],
    isUnmatched: false,
  },
  {
    roomID: ObjectId("62080f20f0323937b7000041"),
    pairID: [
      ObjectId("6207f6f7f0323933be000008"),
      ObjectId("6207f6f7f0323933be00000f"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032392de100004e"),
    pairID: [
      ObjectId("6207f6f6f032393a1f00001d"),
      ObjectId("6207f6f6f032392f15000008"),
    ],
    isUnmatched: false,
  },
  {
    roomID: ObjectId("62080f20f032392c7d000045"),
    pairID: [
      ObjectId("6207f6f6f03239382800000e"),
      ObjectId("6207f6f6f03239323600000d"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f0323930a7000053"),
    pairID: [
      ObjectId("6207f6f6f032392de1000008"),
      ObjectId("6207f6f6f0323931fe000009"),
    ],
    isUnmatched: false,
  },
  {
    roomID: ObjectId("62080f20f03239320e000052"),
    pairID: [
      ObjectId("6207f6f6f032393a1f000011"),
      ObjectId("6207f6f7f032392e0300000a"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032392ed500005d"),
    pairID: [
      ObjectId("6207f6f6f032392bed000008"),
      ObjectId("6207f6f6f032392eaf00000e"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032393828000048"),
    pairID: [
      ObjectId("6207f6f7f0323933be00000f"),
      ObjectId("6207f6f7f0323933be000009"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f21f032392bed000059"),
    pairID: [
      ObjectId("6207f6f6f032392e6900000e"),
      ObjectId("6207f6f6f032392bed00000a"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f22f032392eaf00003c"),
    pairID: [
      ObjectId("6207f6f6f032393a12000009"),
      ObjectId("6207f6f6f032392de100000c"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032392dda00005a"),
    pairID: [
      ObjectId("6207f6f6f032392d1c00000b"),
      ObjectId("6207f6f6f0323937b700000e"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f0323931fe000043"),
    pairID: [
      ObjectId("6207f6f6f032392ed500000c"),
      ObjectId("6207f6f7f0323932e700000b"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032392dde000068"),
    pairID: [
      ObjectId("6207f6f7f0323933be00000e"),
      ObjectId("6207f6f6f03239320e000009"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032392e0300005b"),
    pairID: [
      ObjectId("6207f6f6f032393828000009"),
      ObjectId("6207f6f6f03239320700000d"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f032392f1500004f"),
    pairID: [
      ObjectId("6207f6f6f032392de100000a"),
      ObjectId("6207f6f6f032392eaf00000d"),
    ],
    isUnmatched: true,
  },
  {
    roomID: ObjectId("62080f20f03239329d00003b"),
    pairID: [
      ObjectId("6207f6f6f0323937b700000e"),
      ObjectId("6207f6f6f032393a1f00001a"),
    ],
    isUnmatched: true,
  },
]);
