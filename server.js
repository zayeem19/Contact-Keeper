const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

//Connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
