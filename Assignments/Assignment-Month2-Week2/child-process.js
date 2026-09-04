const { spawn } = require("child_process");

const child = spawn("node", ["-e", "console.log('Child process running')"]);

console.log("Parent PID:", process.pid);
console.log("Child PID:", child.pid);
