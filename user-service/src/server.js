import express from 'express';
import cors from 'cors';
import config from './config.js';
import bodyParser from 'body-parser';
import cluster from "cluster";
import os from "os";

// Import API route handlers for different versions
import v1api from './v1/api/routes/index.js';

const totalCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }


    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {

    // Create an Express application
    const app = express();
    app.use("*", cors());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: "50mb" }));
   

    // Register route handlers for different API versions
    v1api(app);

    app.get('/', (req, res) => {
        res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jobzseed API</title>
      <style> 
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
    }

    .container {
        max-width: 800px;
        margin: 50px auto;
        text-align: center;
    }

    h1 {
        color: #333;
    }

    p {
        color: #666;
    }

      </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Suzuki Digital Assignment API</h1>
        </div>
    </body>
    </html>
    `);
    });

    app.listen(config.PORT, () => {
        console.log(`server started at http://localhost:${config.PORT}`);
    });

}
