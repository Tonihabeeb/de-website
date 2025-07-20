"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getCurrentUser = getCurrentUser;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const audit_1 = require("../utils/audit");
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '7d';
async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered.' });
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = new User_1.User({ name, email, passwordHash, role });
        await user.save();
        await (0, audit_1.logAudit)({ userId: user._id, action: 'register', details: { email, name, role } });
        return res.status(201).json({ message: 'User registered successfully.' });
    }
    catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Registration failed.' });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const valid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        await (0, audit_1.logAudit)({ userId: user._id, action: 'login', details: { email } });
        return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    catch (err) {
        return res.status(500).json({ error: 'Login failed.' });
    }
}
async function getCurrentUser(req, res) {
    try {
        // req.user is set by auth middleware
        // @ts-ignore
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const user = await User_1.User.findById(userId).select('-passwordHash');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        return res.json({ user });
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to fetch user.' });
    }
}
