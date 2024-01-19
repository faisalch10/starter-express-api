const welcomeTemplate = (emailAddress, password) => {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #f4f4f4;
      padding: 0;
      margin: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333333;
      text-align: center;
      margin-bottom: 2rem;
    }

    p {
      color: #666666;
      margin-bottom: 0.5rem;
    }

    .note {
      margin-bottom: 2rem;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Thanks for joining us!</h1>
    <p class="note">Below are your credentials for using our platform.</p>
    <p>
      <strong>Email: </strong><span>${emailAddress}</span>
    </p>
    <p>
      <strong>Password: </strong><span>${password}</span>
    </p>
  </div>
  </div>
</body>

</html>
  `;
};

export default welcomeTemplate;
