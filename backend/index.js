const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./db");
const productsRouter = require("./routes/products");
const path = require("path");
const cors = require("cors");
connectDB();
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "transcendent-otter-444868.netlify.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/products", productsRouter);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../frontend/public/uploads"))
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
