db = new Mongo().getDB("seeksi");

db.createCollection("reports", { capped: false });

db.reports.insertMany([
  {
    reportID: { $oid: "61e761fcfc13ae75bd0000e6" },
    title: "mattis nibh ligula",
    problem: "Harassment",
    description:
      "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    reportedUserID: { $oid: "6199d9abf6a0af30a800029b" },
    reporterID: { $oid: "6199d9abf6a0af308e000282" },
  },
  {
    reportID: { $oid: "61e761fcfc13ae75bd0000e7" },
    title: "lacus purus aliquet at feugiat",
    problem: "Something else",
    description:
      "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    reportedUserID: { $oid: "6199d9abf6a0af3047000287" },
    reporterID: { $oid: "6199d9abf6a0af30a800029b" },
  },
  {
    reportID: { $oid: "61e761fcfc13ae75bd0000e8" },
    title: "nam dui proin leo odio porttitor",
    problem: "Fake account",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    reportedUserID: { $oid: "6199d9abf6a0af30a80002a0" },
    reporterID: { $oid: "6199d9abf6a0af30a80002a0" },
  },
  {
    reportID: { $oid: "61e761fcfc13ae75bd0000e9" },
    title: "leo odio porttitor id consequat in",
    problem: "Sharing inappropriate content",
    description: "Aliquam erat volutpat. In congue.",
    reportedUserID: { $oid: "6199d9abf6a0af30a800029f" },
    reporterID: { $oid: "6199d9abf6a0af30a0000285" },
  },
  {
    reportID: { $oid: "61e761fcfc13ae75bd0000ea" },
    title: "cras in purus eu magna",
    problem: "Harassment",
    description:
      "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    reportedUserID: { $oid: "6199d9abf6a0af308e000283" },
    reporterID: { $oid: "6199d9abf6a0af30a3000280" },
  },
]);
