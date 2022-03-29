db = new Mongo().getDB("seeksi");

db.createCollection("reports", { capped: false });

db.reports.insertMany([
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e6"),
    title: "mattis nibh ligula",
    problem: "harassment",
    description:
      "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    reportedUserID: ObjectId("6207f6f7f0323933be000009"),
    reporterID: ObjectId("6207f6f7f0323933be000008"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e7"),
    title: "lacus purus aliquet at feugiat",
    problem: "something else",
    description:
      "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    reportedUserID: ObjectId("6207f6f7f0323933be000009"),
    reporterID: ObjectId("6207f6f7f0323933be00000a"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e8"),
    title: "nam dui proin leo odio porttitor",
    problem: "fake account",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    reportedUserID: ObjectId("6207f6f6f03239323600000e"),
    reporterID: ObjectId("6207f6f6f0323930a700000f"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e9"),
    title: "leo odio porttitor id consequat in",
    problem: "sharing inappropriate content",
    description: "Aliquam erat volutpat. In congue.",
    reportedUserID: ObjectId("6207f6f6f032392d1c00000f"),
    reporterID: ObjectId("6207f6f7f0323933be000009"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000ea"),
    title: "cras in purus eu magna",
    problem: "harassment",
    description:
      "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    reportedUserID: ObjectId("6207f6f6f032392eaf00000e"),
    reporterID: ObjectId("6207f6f6f032392d1c00000f"),
  },
]);
