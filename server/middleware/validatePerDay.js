module.exports = (req, res, next) => {
    const { perDay } = req.body;
    if (!perDay || perDay <= 0 || perDay >= 90) {
        return res.status(400).json({ 
            message: "PerDay must be greater than 0 and less than 90" 
        });
    }
    next();
};
