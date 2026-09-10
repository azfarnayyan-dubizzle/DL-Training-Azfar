const fs = require("fs");
const { workerData, parentPort } = require("worker_threads");

// Get file path from the main thread
const filePath = workerData.filePath;

let wordCount = 0;

// Read the file as a stream
const readStream = fs.createReadStream(filePath, {
    encoding: "utf8"
});

let leftover = "";

readStream.on("data", (chunk) => {
    // Combine leftover from previous chunk
    // with the current chunk
    const text = leftover + chunk;

    // Split text into words
    const words = text.split(/\s+/);

    // Last item may be an incomplete word
    leftover = words.pop();

    wordCount += words.length;
});

readStream.on("end", () => {
    // Count the final leftover word
    if (leftover.trim().length > 0) {
        wordCount++;
    }

    // Send result back to main thread
    parentPort.postMessage(wordCount);
});

readStream.on("error", (error) => {
    throw error;
});
