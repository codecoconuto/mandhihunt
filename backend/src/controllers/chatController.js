const geminiService = require('../services/geminiService');

exports.chat = async (req, res, next) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ status: 'fail', message: 'Message is required' });
        }

        const text = await geminiService.generateChatResponse(message);

        res.status(200).json({
            status: 'success',
            data: { text }
        });
    } catch (error) {
        next(error);
    }
};