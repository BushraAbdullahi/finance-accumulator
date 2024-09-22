const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/stripe-info", async (req, res) => {
  const { secretKey } = req.body; 

  if (!secretKey) {
    return res.status(400).json({ error: "API key is required" });
  }

  try {
    const stripe = require("stripe")(secretKey);

    const balance = await stripe.balance.retrieve();

    const payments = await stripe.charges.list();

    res.json({ balance, payments: payments.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
