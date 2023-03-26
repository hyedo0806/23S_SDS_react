const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	console.log(`user connected : ${socket.id}`);

	socket["nickname"] = "Anon";
	//socket.emit("me", socket.id);

	socket.on("join_room", (username, roomID) => {
        socket.nickname = username
        socket.join(roomID);
        socket.to(roomID).emit("welcome", socket.nickname);
		console.log(`user with id : ${socket.id}, username : ${username}, joined room : ${roomID}`)
    });

	socket.on("send_message", (data) => {
		console.log("server.js : ", data)
		console.log("server.js : ", data.room)
		socket.to(data.room).emit("receive_message", data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected ", socket.id);
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {ç
		io.to(data.to).emit("callAccepted", data.signal)
	});

	socket.on("nickname", nickname => socket["nickname"] = nickname);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));