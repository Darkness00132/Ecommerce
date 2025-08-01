const { Resend } = require("resend");
const email = require("./email.js");
const resend = new Resend(process.env.RESEND_API_KEY);

async function welcomeEmail({ name, to }) {
  const body = `
  Thank you for joining the Lacoste family 🐊<br /><br />
  At our shop, fashion meets comfort. Whether you're into classic polos, premium streetwear, or elegant accessories — we've got something just for you.<br /><br />
  As a warm welcome, here’s a **10% discount** on your first order! 🎁<br />
  <strong>Use code:</strong> WELCOME10 at checkout.<br /><br />
  Need help or style advice? Our team is just an email away.<br /><br />
  Stay stylish,<br />
  <strong>The Lacoste Store Team</strong>
`;
  const html = email({ name, body });
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "delivered@resend.dev",
      subject: "Welcome!",
      html,
    });

    if (data.error) console.log(error);
  } catch (e) {
    console.error(e);
  }
}

async function sendforgotPasswordEmail({ url, to }) {
  const body = `
  We received a request to reset your password for your Lacoste Store account.<br /><br />
  No worries — it happens to the best of us. Just click the button below to choose a new password:<br /><br />
  If you didn’t request this change, you can safely ignore this email. Your account is still secure.<br /><br />
  Stay stylish,<br />
  <strong>The Lacoste Store Team</strong>
`;
  const html = email({ body, url, buttonText: "Reset password" });
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "delivered@resend.dev",
      subject: "forget password!",
      html,
    });

    if (data.error) console.log(error);
  } catch (e) {
    console.error(e);
  }
}

module.exports = { welcomeEmail, sendforgotPasswordEmail };
