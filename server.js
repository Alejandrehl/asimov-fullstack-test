const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT;
const path = require("path");

connectDB();

app.use(express.json({extended: false}));
app.use("/api/appointments", require("./routes/appointments"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));