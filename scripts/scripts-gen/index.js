const fs = require("fs");
const Cryptr = require("cryptr");

const cryptr = new Cryptr("SUPER_SECURE_KEY");

const messages = [
  "Oh? Bob!",
  "Hey Sam! Good to see you!",
  "How's it going?",
  "Yeah, good. Working a lot. And you?",
  "I went back to school.",
  "Good for you!",
  "This is a nice way to greet someone when you haven't seen them in a while.",
  "This is a nice way to congratulate a friend on their successes or accomplishments.",
  "Oh, yeah. I think it went well. I don't know if I got the job yet, but they said they would call in a few days.",
  "Well, I'm sure you did great. Good luck.",
  "Thanks. I'm just happy that it's over. I was really nervous about it.",
  "I can understand that. I get nervous before interviews, too.",
  "Sure, no problem.",
  "Like with “How's it going?” the other person might not always reply to this question. If they do, they'll probably either actually tell you what's going on, or just say, “Not much.”",
  "In the conversation above, Nathan and Alicia both say “not much” is going on with them, but then they end up talking about Alicia's interview. This is pretty common. A person might sometimes even reply “not much,” and then immediately start talking about all the things that actually are going on.",
  "This is a casual way of saying “You're welcome” when someone thanks you.",
  "Hey, so I'm having a party at my place next weekend. Do you want to come?",
  "Let's see. I think it's going to be Jerome, Talia, Anna, Juan, Celeste, Michelle and possibly Jamie. It's not really going to be a party, more like a small get-together. I'm cooking dinner, and we can just hang out.",
  "Can I bring anything?",
  "Oh, anytime between 6 and 7 would be fine.",
  "I'll do that, then. Thanks for inviting me.",
  "If someone invites you to an event, or just invites you to do something with them, this is a nice way to say “yes.”",
  "Once you've made plans and greeted your friends, all that's left to do is just… well, be a friend. Friends go to each other for help, for advice and when they want to share their opinions and experiences.",
  "Yeah, maybe. But that might just make him even more interested.",
  "What do you think I should do?",
  "But I'm so annoyed with Clare!",
  "Hi",
  "Maybe speak to Clare, tell her how you feel. She shouldn't be sharing people's private photos.",
  "Okay, yeah. Thanks for the advice, Makayla. I'll talk to her.",
  "Yeah, I know, I know. I won't.",
  "The above two phrases are good for checking on your friends if it seems like something might be wrong.",
  "Oh, really? Like what?",
];

function generateScript(collectionName, data) {
  let script = "";
  for (let i = 0; i < data.length; i++) {
    script += `db.${collectionName}.insertOne(${JSON.stringify(data[i])})\n`;
  }

  return script;
}

function writeToTextFile(filename, data) {
  // data returned will be an array of script
  fs.writeFileSync(filename, data.toString());
}

function main() {
  fs.readdir("./mockdata", function (err, files) {
    if (err) {
      console.log("error ne moi nguoi");
    }

    fs.rm("./scripts", { recursive: true }, function () {
      fs.mkdir("./scripts", { recursive: true }, function (err, path) {
        files.forEach(function (file) {
          const filename = file.replace(/.[^/.]+$/, "");
          const script = generateScript(
            filename,
            require(`./mockdata/${file}`)
          );
          writeToTextFile(`${path}/${filename}.txt`, script);
        });
      });
    });
  });
}
function generateMessages() {
  let encryptMessages = "";

  messages.forEach((mes) => {
    encryptMessages += cryptr.encrypt(mes) + "\n";
  });

  fs.rm("./message", { recursive: true }, function () {
    fs.mkdir("./message", { recursive: true }, function (err, path) {
      writeToTextFile(`${path}/messages.txt`, encryptMessages);
    });
  });
}

main();
generateMessages();
