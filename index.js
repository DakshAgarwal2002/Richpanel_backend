const connectToMongo = require('./db');
const express = require('express')
const logger = require("morgan");
const cors = require("cors");
const router = express.Router();

connectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(logger("dev"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.post("/api/stripe-payment", (req, res) => {
  console.log("Hellojj")
  const stripe = require("stripe")(
    "sk_test_51NdmpESJLHvrRzKqrFgSZZ73bIqwJ8L47mkt4Rm2ZQoRLbko5jkY7h4YZ5KbfhV9Qh4OQa2lier3A7bCtQ6HPx0h00ZPVEUqJG"
  );
  const { amount, email, token } = req.body;
console.log("Hellojj")
  stripe.customers
    .create({
      email: email,
      source: token.id,
      name: token.card.name,
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: parseFloat(amount),
        description: `Payment for USD ${amount}`,
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => res.status(200).send(charge))
    .catch((err) => console.log(err));
});

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/subscribe', require('./routes/subs'))
// app.use('/api/stripe-payment',require('./routes/subs'))
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})