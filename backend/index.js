require("dotenv").config();
const connectdbs = require('./config/dbs');
const express = require('express');
const cors = require('cors');
const payment = require('./controller/paymentController')
const foodRouter = require('./router/foodRouter');
const userRouter = require('./router/userRouter');
const cartRouter = require('./router/cartRouter');
const app = express();
const port = 3000;

connectdbs();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ["http://localhost:5173","https://food-delivery-application-neon.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/images", express.static("public/images"));

app.use("/cart",cartRouter);

app.use("/user",userRouter);

app.use("/food", foodRouter);

app.post("/payment",payment);

app.listen(port, () => console.log(`Server connected to port number -> ${port}`))