const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/user");
const StressLevel = require("./model/stressLevelModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const http = require("http");
const spawner = require("child_process").spawn;
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

// Connect to MongoDB
const URI =
  "mongodb+srv://siddraimb:XqIdW7BEAOEx6hyj@cluster0.us6nzjb.mongodb.net/minorRegisterdb?retryWrites=true&w=majority"; //connection string
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = http.createServer(app);
const io = socketio(server);
const botName = "ChatCord Bot";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const roomsWithLimit = [
      "Dr.Smith",
      "Dr.Johnson",
      "Dr.Williams",
      "Dr.Brown",
      "Dr.Davis",
      "Dr.Miller",
      "Dr.Wilson",
      "Dr.Taylor",
      "Dr.Anderson",
      "Dr.Thomas",
    ];

    if (roomsWithLimit.includes(room)) {
      const roomUsers = getRoomUsers(room);

      if (roomUsers.length >= 2) {
        // Emit a message to the user indicating that the room is full
        socket.emit(
          "message",
          formatMessage(botName, "Sorry, this room is already full.")
        );
        return;
      }
    }
    // Check if the room already has two users

    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.post("/api/predict", async (req, res) => {
  try {
    const {
      gender,
      age,
      openness,
      neuroticism,
      conscientiousness,
      agreeableness,
      extraversion,
    } = req.body;

    const data_to_pass_in = [
      gender,
      age,
      openness,
      neuroticism,
      conscientiousness,
      agreeableness,
      extraversion,
    ];

    const py = spawner("python", ["./app.py", JSON.stringify(data_to_pass_in)]);

    let result = "";

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.on("close", (code) => {
      if (code === 0) {
        // Successfully executed
        res.status(200).json({ result });
      } else {
        // Python script encountered an error
        console.error("Python script execution failed.");
        res.status(500).json({ error: "Internal server error." });
      }
    });
  } catch (error) {
    console.error("Error on server side:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Handle user login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

// Handle user registration
app.post("/api/register", async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (plainTextPassword.length < 6) {
    return res.json({
      status: "error",
      error: "Password should be at least 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    await User.create({
      username,
      email,
      password,
    });

    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }
});

app.post("/api/savestresslevel", async (req, res) => {
  try {
    // Get the user's username from the token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    // Create a new stress level entry with the username
    const stressLevelEntry = new StressLevel({
      username: username,
      score: req.body.score,
      timestamp: req.body.timestamp || new Date(),
    });

    // Save the stress level entry to the database
    await stressLevelEntry.save();

    res.json({
      status: "ok",
      message: "Stress level score saved to the database",
    });
  } catch (error) {
    console.error("Error saving stress level score:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

app.get("/api/stresslevel", async (req, res) => {
  try {
    // Get the user's username from the token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;

    // Fetch stress level data only for the logged-in user
    const stressLevelData = await StressLevel.find({ username })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(stressLevelData);
  } catch (error) {
    console.error("Error fetching stress level data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
