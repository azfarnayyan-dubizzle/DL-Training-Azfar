const express = require("express");
const fs = require("fs");
const { Transform } = require("stream");
const { Worker } = require("worker_threads");
const path = require("path");

const app = express();
const PORT = 3000;

const logFile = path.join(__dirname, "large-log.txt");

// 1. Express Middleware - Request Processing Time

app.use((req, res, next) => {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
        const end = process.hrtime.bigint();

        const duration = Number(end - start) / 1_000_000;

        console.log(
            `${req.method} ${req.originalUrl} - ${duration.toFixed(2)} ms`
        );
    });

    next();
});


// 2. Transform Stream - Convert Log File to Uppercase

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const upperCaseData = chunk.toString().toUpperCase();

        callback(null, upperCaseData);
    }
});

// Endpoint to process the large log file
app.get("/process-log", (req, res) => {
    res.setHeader("Content-Type", "text/plain");

    const readStream = fs.createReadStream(logFile, {
        encoding: "utf8"
    });

    readStream.on("error", (error) => {
        console.error("File read error:", error);
        res.status(500).send("Unable to read log file.");
    });

    // Read file -> Transform -> Response
    readStream
        .pipe(upperCaseTransform)
        .pipe(res);
});


// 3. Worker Thread - Count Words


app.get("/count-words", (req, res) => {
    const worker = new Worker(
        path.join(__dirname, "wordCounter.js"),
        {
            workerData: {
                filePath: logFile
            }
        }
    );

    worker.on("message", (result) => {
        res.json({
            message: "Word count completed",
            wordCount: result
        });
    });

    worker.on("error", (error) => {
        console.error("Worker error:", error);
        res.status(500).json({
            error: "Word counting failed"
        });
    });

    worker.on("exit", (code) => {
        if (code !== 0) {
            console.error(
                `Worker stopped with exit code ${code}`
            );
        }
    });
});

// Start Server

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
