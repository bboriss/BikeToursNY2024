"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const secret = process.env.JWT_SECRET || 'my_jwt_secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'my_refresh_jwt_secret';
const createToken = (id, expiresIn) => {
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn });
};
const createRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, refreshSecret, { expiresIn: '7d' });
};
const register = async (req, res) => {
    const { firstName, lastName, username, email, password, role } = req.body;
    try {
        const newUser = new User_1.default({ firstName, lastName, username, email, password, role });
        await newUser.save();
        const userId = newUser._id;
        const token = createToken(userId, '1h');
        const refreshToken = createRefreshToken(userId);
        const userData = {
            id: newUser._id,
            username: newUser.username,
            role: newUser.role,
        };
        res.status(201).json({ token, refreshToken, user: userData });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User_1.default.findOne({ username }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const userId = user._id;
        const token = createToken(userId, '1h');
        const refreshToken = createRefreshToken(userId);
        const userData = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        res.status(200).json({ token, refreshToken, user: userData });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token not provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, refreshSecret);
        const userId = decoded.id;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const newToken = createToken(userId, '1h');
        const newRefreshToken = createRefreshToken(userId);
        const userData = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        res.status(200).json({ token: newToken, refreshToken: newRefreshToken, user: userData });
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};
exports.refreshToken = refreshToken;
