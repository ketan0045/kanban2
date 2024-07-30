const express = require("express");
const app = express();
const tasksRouter = require("./routes/router");
const cors = require("cors");
const PORT = 5009;

require("./db/conn");

app.get("/", (req, res) => {
  res.status(201).json("server created-----kkkk ");
});

app.use(express.json());
app.use(cors());
// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       credentials: true, 
//     })
//   );


app.use("/api/tasks", tasksRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
