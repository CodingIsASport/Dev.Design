const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle URL-encoded form data (like our contact form)
app.use(express.urlencoded({ extended: true }));

// Serve all static files (HTML, CSS, JS, images) from the current directory
app.use(express.static(__dirname));

// Custom POST route for the contact form
app.post('/submit-form', (req, res) => {
    // req.body contains the submitted form data: name, email, subject, message
    const { name, email, subject, message } = req.body;

    // Here you would typically connect this to a mailer (like Nodemailer or Resend),
    // or log it to a database. For a basic setup, we'll just log it in the console on Render.
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------');

    // Redirect the user to the success page
    res.redirect('/success.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
