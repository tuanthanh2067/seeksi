db = new Mongo().getDB("seeksi");

load(__dirname + "/init/hobbies-init.js");
load(__dirname + "/init/questions-init.js");
load(__dirname + "/init/opening-lines-init.js");
load(__dirname + "/init/users-init.js");
load(__dirname + "/init/chat-rooms-init.js");
load(__dirname + "/init/potential-matches-init.js")
load(__dirname + "/init/matches-init.js");
load(__dirname + "/init/game-rooms-init.js");
load(__dirname + "/init/reports-init.js");
