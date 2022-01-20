db = new Mongo().getDB("seeksi");

db.createCollection("questions", { capped: false });

db.questions.insertMany([
  {
    questionID: { $oid: "61e76220fc13ae3015000000" },
    question: "Have you ever seen an alligator or crocodile?",
    topics: ["Foods", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000001" },
    question: "Have you ever shaken hands with a monkey?",
    topics: ["Sports", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000002" },
    question: "Have you ever gone skiing?",
    topics: ["Music", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000003" },
    question: "Have you ever shaken hands with a monkey?",
    topics: ["Foods", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000004" },
    question: "Have you ever gone to a concert?",
    topics: ["Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000005" },
    question: "Have you ever met a celebrity?",
    topics: ["Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000006" },
    question: "Have you ever ridden on an ostrich?",
    topics: ["Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000007" },
    question: "Have you ever received a love letter?",
    topics: ["Travel", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000008" },
    question: "Have you ever seen an alligator or crocodile?",
    topics: ["Sports", "Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000009" },
    question: "Have you ever regretted saying I love you?",
    topics: ["Movies", "Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500000a" },
    question: "Have you ever told a big lie to someone you love?",
    topics: ["Sports", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500000b" },
    question: "Have you ever ridden on an ostrich?",
    topics: ["Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500000c" },
    question: "Have you ever been on TV?",
    topics: ["Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500000d" },
    question: "Have you ever gone to a concert?",
    topics: ["Movies", "Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500000e" },
    question: "Have you ever sung in public?",
    topics: ["Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500000f" },
    question: "Have you ever sung in public?",
    topics: ["Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000010" },
    question: "Have you ever received a love letter?",
    topics: ["Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000011" },
    question: "Have you ever cheated on a test?",
    topics: ["Sports", "Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000012" },
    question: "Have you ever told a big lie to someone you love?",
    topics: ["Travel", "Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000013" },
    question: "Have you ever ridden a horse?",
    topics: ["Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000014" },
    question: "Have you ever played a joke on one of your teachers?",
    topics: ["Sports", "Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000015" },
    question: "Have you ever eat Pho?",
    topics: ["Music", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000016" },
    question: "Have you ever received a love letter?",
    topics: ["Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000017" },
    question: "Have you ever sung in public?",
    topics: ["Movies", "Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000018" },
    question: "Have you ever gotten a horrible haircut?",
    topics: ["Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000019" },
    question: "Have you ever ridden a horse?",
    topics: ["Movies", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500001a" },
    question: "Have you ever met a celebrity?",
    topics: ["Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500001b" },
    question: "Have you ever shaken hands with a monkey?",
    topics: ["Movies", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500001c" },
    question: "Have you ever seen an alligator or crocodile?",
    topics: ["Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500001d" },
    question: "Have you ever ridden on an ostrich?",
    topics: ["Sports", "Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500001e" },
    question: "Have you ever watched the Titanic Movie?",
    topics: ["Music", "Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500001f" },
    question: "Have you ever watched the Titanic Movie?",
    topics: ["Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000020" },
    question: "Have you ever cheated on a test?",
    topics: ["Sports", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000021" },
    question: "Have you ever gone to a concert?",
    topics: ["Travel", "Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000022" },
    question: "Have you ever received more than 10 cards on Valentines day?",
    topics: ["Sports", "Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000023" },
    question: "Have you ever been to a zoo?",
    topics: ["Travel", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000024" },
    question: "Have you ever cheated on a test?",
    topics: ["Travel", "Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000025" },
    question: "Have you ever gone to a concert?",
    topics: ["Travel", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000026" },
    question: "Have you ever cheated on a test?",
    topics: ["Movies", "Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000027" },
    question: "Have you ever eat Pho?",
    topics: ["Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000028" },
    question: "Have you ever gotten a horrible haircut?",
    topics: ["Music", "Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000029" },
    question: "Have you ever received more than 10 cards on Valentines day?",
    topics: ["Music", "Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500002a" },
    question: "Have you ever ridden on an ostrich?",
    topics: ["Sports", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500002b" },
    question: "Have you ever eat Pho?",
    topics: ["Foods"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500002c" },
    question: "Have you ever told a big lie to someone you love?",
    topics: ["Foods", "Movies"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500002d" },
    question: "Have you ever told a big lie to someone you love?",
    topics: ["Foods", "Sports"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500002e" },
    question: "Have you ever shaken hands with a monkey?",
    topics: ["Music"],
  },
  {
    questionID: { $oid: "61e76220fc13ae301500002f" },
    question: "Have you ever cheated on a test?",
    topics: ["Music", "Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000030" },
    question: "Have you ever received a love letter?",
    topics: ["Travel"],
  },
  {
    questionID: { $oid: "61e76220fc13ae3015000031" },
    question: "Have you ever met a celebrity?",
    topics: ["Travel"],
  },
]);
