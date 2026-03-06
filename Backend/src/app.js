const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173","https://moodify-iota-gray.vercel.app/"],
    credentials: true
}))

app.get("/", (req, res) => {
  res.send("Moodify API is running 🚀");
});

const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth",authRoutes)
app.use("/api/song",songRoutes)

module.exports = app