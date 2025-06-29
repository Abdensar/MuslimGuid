const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
     const userData = {
      userId: user._id,
      name: user.username,
      email: user.email,
      city :user.city,
      prayerNotifications:user.prayerNotifications,
      favorites:user.favorites,
      chathistory:user.chatHistory
    };

    res.json({ 
      success: true,
      user: userData 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
 const userData = {
      userId: user._id,
      name: user.username,
      email: user.email,
      city :user.city,
      prayerNotifications:user.prayerNotifications,
      favorites:user.favorites,
      chathistory:user.chatHistory
    };

    res.json({ 
      success: true,
      user: userData 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};