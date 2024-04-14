const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }


  res.json({ message: 'Login successful' });
});

app.post('/signup', (req, res) => {
  const { name, email, age, country, password, confirmPassword } = req.body;

  if (!Name || !Email || !Age || !country || !Password || !ConfirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (isNaN(age)) {
    return res.status(400).json({ error: 'Age must be a number' });
  }

  if (Password !== ConfirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }


 
  res.json({ message: 'Signup successful' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//email verification page 
app.post('/verify', (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required' });
    }
    res.json({ email, code });
  });