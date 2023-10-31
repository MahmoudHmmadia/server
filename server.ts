import { ExpressPeerServer } from "peer";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
// import { fileURLToPath } from "url"; ==> PRODUCTION <==
// import { dirname } from "path"; ==> PRODUCTION <==
import logger from "morgan";
import helmet from "helmet";
import multer from "multer";
import cookieParser from "cookie-parser";
import { createStream } from "rotating-file-stream";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import meetRoutes from "./routes/meetRoutes";
import serverRoutes from "./routes/serverRoutes";

config();
// const __filename = fileURLToPath(import.meta.url); ==> PRODUCTION <==
// const __dirname = dirname(__filename); ==> PRODUCTION <==

// ==> MAIN CONFIGURATION <== //

const app = express();
const server = http.createServer(app);
const storage = multer.diskStorage({
  destination: (_req, _res, callback) => {
    callback(null, "public/images");
  },
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
const accessLogStream = createStream("accessLog.log", { path: "./logs" });
app.use(logger("combined", { stream: accessLogStream }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser());
app.use("/assets", express.static("public"));

// ==> PEER <== //

const expressPeerServer = ExpressPeerServer(server, {
  path: "/",
  corsOptions: {
    origin: true,
  },
});
app.use(expressPeerServer);

// ==> ROUTES <== //
// app.use(express.static("dist"));
app.use("/", serverRoutes);
// app.use("/auth", upload.single("profile"), authRoutes);
// app.use("/user", userRoutes);
// app.use("/meet", meetRoutes);

// ==> RUN SERVER <== //

server.listen(process.env.PORT || 5000, () => {
  console.log(`THE SERVER RUNNING ON PORT ${process.env.PORT}`);
});

// ==> SOCKET <== //

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("connected", "CONNECTED");
  socket.on("get-code", (code) => {
    socket.emit("meet-code", code);
    socket.on("room", (id) => {
      console.log(code);
      socket.join(code);
      socket.to(code).emit("user-connected", id);
      socket.on("disconnect", () => {
        socket.to(code).emit("user-disconnected", id);
      });
    });
  });
});
