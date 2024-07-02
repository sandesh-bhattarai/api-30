const http = require("http")
const app = require("./src/config/express.config")

const server = http.createServer(app);

// port no: 0 - 2^16-1 ~65535
// ~100 port => well known ports, for different services
// listen(portno, host, (err) => {})
server.listen(9005, '127.0.0.1', (err) => {
    if(!err) {
        console.log("Server is running on port 9005")
        console.log("Press ctrl+c to discontinue server...")
        // process.exit(1)
    }
})