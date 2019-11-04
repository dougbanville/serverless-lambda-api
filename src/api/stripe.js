const stripe = require("stripe")(process.env.STRIPE_SK);

module.exports.handler = async (event, ctx) => {
  console.log(event.pathParameters.amount);
  let amount = event.pathParameters.amount;
  let currency = event.pathParameters.currency;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency
  });

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://app.hi-ya.com",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ paymentIntent: paymentIntent.client_secret })
  };

  return response;
};
