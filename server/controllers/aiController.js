const { spawn } = require('child_process');
const path = require('path');
const ChatHistory = require('../models/ChatHistory');
const User = require('../models/User');

exports.chat = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const pythonProcess = spawn('python3', [path.join(__dirname, '../ai/chat.py')], {
      cwd: path.dirname(path.join(__dirname, '../ai/chat.py'))
    });

    let responseData = '';
    pythonProcess.stdin.write(JSON.stringify({ message }));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => responseData += data.toString());
    pythonProcess.stderr.on('data', (data) => console.error(`[PYTHON ERROR] ${data}`));

    pythonProcess.on('close', async () => {
      try {
        const result = JSON.parse(responseData);
        if (userId) {
          await ChatHistory.create({
            userId,
            question: message,
            answer: result.response
          });

          // Update user's chat history
          await User.findByIdAndUpdate(userId, {
            $push: { chatHistory: { message, response: result.response } }
          });
        }
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};