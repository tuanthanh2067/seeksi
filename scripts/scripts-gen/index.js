const fs = require("fs");

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

main();
