const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory bookings store (replace with a DB in production)
const bookings = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/book', (req, res) => {
  const { name, email, phone, service, date, time, message } = req.body;

  if (!name || !email || !phone || !service || !date || !time) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const booking = {
    id: Date.now(),
    name,
    email,
    phone,
    service,
    date,
    time,
    message: message || '',
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  console.log('New Booking:', booking);

  res.json({
    success: true,
    message: `Thank you, ${name}! Your appointment for ${service} on ${date} at ${time} has been booked. We'll confirm shortly!`,
    booking
  });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`✨ Beauty Care by Rupali is running at http://localhost:${PORT}`);
});
