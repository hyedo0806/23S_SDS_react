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

	socket["nickname"] = "Anon";

	socket.on("join_room", (username, roomID) => {
        socket.nickname = username
        socket.join(roomID);
        socket.to(roomID).emit("welcome", socket.nickname);

    });

	socket.on("offer", (offer, roomName) => {
		socket.to(roomName).emit("offer", offer);
	
	});

	socket.on("answer", (answer, roomName) => {
		socket.to(roomName).emit("answer", answer);
	});
	
	socket.on("ice", (ice, roomName) => {
		console.log('server.js ice: ', ice)
		socket.to(roomName).emit("ice", ice);
	});

	socket.on("send_message", (data) => {

		socket.to(data.room).emit("receive_message", data);
	});

	socket.on("disconnect", () => {

		socket.broadcast.emit("callEnded")
	});



	socket.on("nickname", nickname => socket["nickname"] = nickname);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));