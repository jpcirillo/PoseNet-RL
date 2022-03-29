const app = require("http").createServer(handler);
const io = require("socket.io")(app);
const fs = require("fs");
const Actions = require("./actions");

function handler(req, res) {
  const url = req.url;
  try {
    let fileLocation;
    switch (url) {
      case "/":
        fileLocation = `${__dirname}\\index.html`;
        break;
      case "/client.js":
        fileLocation = `${__dirname}\\client.js`;
        break;
      case "/socket.io":
        fileLocation = `${__dirname}\\node_modules\\socket.io\\client-dist\\socket.io.min.js`;
        break;
      default:
        throw new Error("Invalid file name");
    }

    const data = fs.readFileSync(fileLocation);
    res.writeHead(200);
    return res.end(data);
  } catch (err) {
    res.writeHead(500);
    return res.end(`There was an error while accessing ${url}`);
  }
}

io.on("connection", (client) => {
  console.log(`Client Connected: ${client.id}`);

  client.on("message", (data) => {
    console.log(`Client (${client.id}): ${data}`);
    Actions.releaseAllKeys();

    switch (data) {
      case "Left":
        Actions.holdKey("W");
        Actions.holdKey("A");
        break;
      case "Right":
        Actions.holdKey("W");
        Actions.holdKey("D");
        break;
      case "Forward":
        Actions.holdKey("W");
        break;
      case "Jump":
        Actions.pressKey("K");
        break;
      case "Boost":
        Actions.holdKey("P");
        break;
      case "Break":
        Actions.holdKey("S");
        break;
      case "FF":
        Actions.ff("");
        break;
      case "Nothing":
        break;
    }
  });

  client.on("disconnect", () => {
    console.log(`Client Disconnected: ${client.id}`);
  });
});

app.listen("3000");
