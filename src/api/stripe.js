const stripe = require("stripe")(process.env.STRIPE_SK);

module.exports.handler = async (event, ctx) => {
  console.log(event.pathParameters.amount);
  let amount = event.pathParameters.amount;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "eur"
  });

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ paymentIntent: paymentIntent.id })
  };

  return response;
};
