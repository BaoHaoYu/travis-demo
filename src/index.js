const fs = require("fs-extra");
const path = require("path");
const _ = require("loadsh");
const shelljs = require("shelljs");
const child_process = require("child_process");
child_process.execSync(
  'git log -1 --pretty=format:"%cD" ' + path.join(__dirname, "./src")
);
child_process.spawnSync(
  'git log -1 --pretty=format:"%cD" ' + path.join(__dirname, "./src")
);
shelljs.exec(
  'git log -1 --pretty=format:"%cD" ' + path.join(__dirname, "./src")
);

fs.writeFile(path.join(process.cwd(), "./demo.txt"), _.random(1, 100));
