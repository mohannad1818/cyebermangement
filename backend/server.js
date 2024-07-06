// Imports and initial setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cybermanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Add a new user
app.post('/api/users', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
});

// Admin login route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username, password, role: 'admin' });
    if (admin) {
      res.status(200).json({ message: 'Admin logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Error during admin login', error: error.message });
  }
});

// User login route
app.post('/api/user/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password, role: 'user' });
    if (user) {
      res.status(200).json({ message: 'User logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Error during user login', error: error.message });
  }
});

// Add admin route for manual creation
app.get('/add-admin', async (req, res) => {
  try {
    const admin = new User({ username: 'admin123', password: 'adminpassword', role: 'admin' });
    await admin.save();
    res.send('Admin added');
  } catch (error) {
    res.status(500).send('Error adding admin');
  }
});



// إضافة مسار للحصول على عدد الضوابط لكل حالة
app.get('/api/controls', async (req, res) => {
  try {
    const complete = await Control.countDocuments({ status: 'complete' });
    const partial = await Control.countDocuments({ status: 'partial' });
    const notApplied = await Control.countDocuments({ status: 'notApplied' });

    res.json({ complete, partial, notApplied });
  } catch (error) {
    console.error('Error fetching controls:', error);
    res.status(500).json({ message: 'Error fetching controls', error: error.message });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
