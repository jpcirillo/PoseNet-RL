const socket = io("ws://localhost:3000");
let lastPose = "";

// When client successfully connects to server
socket.on("connect", () => {
  console.log(`Connected to server`);
});

// Receive message from backend
socket.on("message", (data) => {
  console.log(`Server: ${data}`);
});

function getPose(pose) {
  if (lastPose === pose) return false;

  lastPose = pose;
  return socket.send(pose);
}
