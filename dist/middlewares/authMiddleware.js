"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const secret = process.env.JWT_SECRET || 'my_jwt_secret';
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await User_1.default.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = {
            id: user._id.toString(),
            username: user.username,
            role: user.role,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.authenticateUser = authenticateUser;
