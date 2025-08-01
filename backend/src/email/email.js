function email({ name, url, body, buttonText }) {
  const bodyStyle = `
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
    color: #333;
  `;

  const buttonStyle = `
    display: inline-block;
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    margin-top: 20px;
  `;

  return `
    <html>
      <body style="${bodyStyle}">
        ${name ? `<h1>Hello, ${name} 👋</h1>` : ""}
        <p>${body}</p>
        ${buttonText ? `<a href="${url}" style="${buttonStyle}">${buttonText}</a>` : ""}
      </body>
    </html>
  `;
}

module.exports = email;
