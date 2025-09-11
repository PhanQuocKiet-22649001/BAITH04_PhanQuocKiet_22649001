module.exports = (req, res, next) => {
    const { pack } = req.body;
    if (!pack || pack <= 0) {
        return res.status(400).json({ message: "Pack must be greater than 0" });
    }
    next();
};
