"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getCurrentUser = getCurrentUser;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
async function register(req, res) {
    try {
        const data = User_1.CreateUserSchema.parse(req.body);
        // Check if user already exists
        const existing = await User_1.UserModel.findByEmail(data.email);
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        const user = await User_1.UserModel.create(data);
        // Do not return password_hash
        const { password_hash, ...userSafe } = user;
        res.status(201).json(userSafe);
    }
    catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }
        // Normalize email to lowercase for case-insensitive comparison
        const normalizedEmail = email.toLowerCase();
        const user = await User_1.UserModel.findByEmail(normalizedEmail);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const valid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT with user details
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role,
            name: user.name,
            email: user.email
        }, JWT_SECRET, { expiresIn: '7d' });
        // Return token and user details
        const { password_hash, ...userWithoutPassword } = user;
        res.json({
            success: true,
            token,
            user: userWithoutPassword
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
}
async function getCurrentUser(req, res) {
    try {
        // req.user is set by auth middleware
        // @ts-ignore
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const user = await User_1.UserModel.findById(userId);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        // Remove password from response
        const { password_hash, ...userWithoutPassword } = user;
        return res.json({ user: userWithoutPassword });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch user.' });
    }
}
