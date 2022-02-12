db = new Mongo().getDB("seeksi");

db.createCollection("Reports", { capped: false });

db.reports.insertMany([
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e6"),
    title: "mattis nibh ligula",
    problem: "Harassment",
    description:
      "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    reportedUserID: ObjectId("6199d9abf6a0af30a800029b"),
    reporterID: ObjectId("6199d9abf6a0af308e000282"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e7"),
    title: "lacus purus aliquet at feugiat",
    problem: "Something else",
    description:
      "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    reportedUserID: ObjectId("6199d9abf6a0af3047000287"),
    reporterID: ObjectId("6199d9abf6a0af30a800029b"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e8"),
    title: "nam dui proin leo odio porttitor",
    problem: "Fake account",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    reportedUserID: ObjectId("6199d9abf6a0af30a80002a0"),
    reporterID: ObjectId("6199d9abf6a0af30a80002a0"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000e9"),
    title: "leo odio porttitor id consequat in",
    problem: "Sharing inappropriate content",
    description: "Aliquam erat volutpat. In congue.",
    reportedUserID: ObjectId("6199d9abf6a0af30a800029f"),
    reporterID: ObjectId("6199d9abf6a0af30a0000285"),
  },
  {
    _id: ObjectId("61e761fcfc13ae75bd0000ea"),
    title: "cras in purus eu magna",
    problem: "Harassment",
    description:
      "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    reportedUserID: ObjectId("6199d9abf6a0af308e000283"),
    reporterID: ObjectId("6199d9abf6a0af30a3000280"),
  },
]);
