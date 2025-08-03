async function paypalCheck(orderID) {
  const PAYPAL_API = "https://api-m.sandbox.paypal.com";
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
    "base64"
  );

  try {
    // 1. Get Access Token
    const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return false;

    // 2. Get Order Info
    const orderRes = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const orderData = await orderRes.json();

    // 3. Check Status
    return orderData.status === "COMPLETED";
  } catch (err) {
    console.error("Error checking PayPal payment:", err);
    return false;
  }
}

module.exports = paypalCheck;
