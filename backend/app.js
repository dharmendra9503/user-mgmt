const express = require('express');
var http = require('http');
const connectDB = require('./db/config');
const indexRouter = require('./routes');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log("Server connected on port =", port);
});
connectDB();

app.use('/api', indexRouter);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}