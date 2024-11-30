
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const { Message } = require("@mui/icons-material");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "sucess !" });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    /*  console.log("payment received", total);
        res.send(total) */
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});
app.listen(5000, (err)=>{
    if(err) throw err
    console.log("amazon server running on PORT:5000, http://localhost:5000");
})

