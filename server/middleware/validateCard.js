module.exports = (req, res, next) => {
    const { card } = req.body;
    if (!card || card <= 1000) {
        return res.status(400).json({ message: "Card must be greater than 1000" });
    }
    next();
};
