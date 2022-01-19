db = new Mongo().getDB("seeksi");

var collectionList = db.getCollectionNames();

for (var i = 0; i < collectionList.length; i++) {
  var collection = db.getCollection(collectionList[i]);
  collection.drop();
}

load(__dirname + "/mongo-init.js");
