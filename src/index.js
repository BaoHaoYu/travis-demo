const fs = require("fs-extra");
const path = require("path");
const _ = require("loadsh");
const shelljs = require("shelljs");

shelljs.exec(
  'git log -1 --pretty=format:"%cD" ' + path.join(__dirname, "./src")
);

fs.writeFile(path.join(process.cwd(), "./demo.txt"), _.random(1, 100));