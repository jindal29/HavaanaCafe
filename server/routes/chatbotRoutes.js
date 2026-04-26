const express = require('express');
const router = express.Router();

// Mock dictionary simulating AI mapping logic
const INTENT_DICTIONARY = {
  hours: "We are open Monday to Friday from 7:00 AM to 8:00 PM, and on weekends from 8:00 AM to 9:00 PM.",
  timing: "We are open Monday to Friday from 7:00 AM to 8:00 PM, and on weekends from 8:00 AM to 9:00 PM.",
  menu: "Our menu features aesthetic cold brews, cortados, mochas, and freshly baked croissants. Head over to the 'Menu' page in the navigation bar to see everything!",
  coffee: "Our beans are 100% ethically sourced Arabica. We roast them locally to ensure the freshest pull every single time.",
  offers: "We currently have a 'Buy 1 Get 1 Free' on our signature Havaana Cold Brew on weekends! Check out our 'Offers' page for more specifics.",
  hello: "Hi there! I'm the Havaana Virtual Barista. How can I assist you today?",
  hi: "Hey! Welcome to Havaana Coffee. What can I do for you?",
};

// @route   POST /api/chatbot
// @desc    Process incoming user message and return a smart reply
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ reply: "I didn't quite catch that. Could you try asking again?" });
    }

    // Convert lowercase and clean generic punctuation for basic keyword matching
    const cleanMessage = message.toLowerCase().replace(/[.,!?]/g, "");
    const words = cleanMessage.split(' ');

    let reply = "I'm just a simple barista bot, but I can tell you about our menu, hours, or recent offers! Could you clarify what you're looking for?";
    
    // Check for exact keywords matches to map logic
    for (const word of words) {
        if (INTENT_DICTIONARY[word]) {
            reply = INTENT_DICTIONARY[word];
            break;
        }
    }

    /* 
     // OPTIONAL: Future OpenAI integration slot placeholder
     const openai = new OpenAI(process.env.OPENAI_API_KEY);
     const completion = await openai.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: [{ role: 'user', content: message }]
     });
     reply = completion.choices[0].message.content;
    */

    // Simulate slight network typing delay for a natural feel (approx 600ms)
    setTimeout(() => {
        res.status(200).json({ reply });
    }, 600);

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ reply: 'Sorry, my server system is currently taking a coffee break. Please try again later.' });
  }
});

module.exports = router;
