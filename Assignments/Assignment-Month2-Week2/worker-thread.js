const { Worker, isMainThread } = require("worker_threads");

if (isMainThread) {
  console.log("Main PID:", process.pid);

  const worker = new Worker(__filename);

  worker.on("message", (msg) => {
    console.log(msg);
  });
} else {
  console.log("Worker PID:", process.pid);
}
