const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const dealRoutes = require("./routes/dealRotes");
const investorRoutes = require("./routes/investorRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/investor", investorRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Investment Platform API is running "
  });
});


module.exports = app;