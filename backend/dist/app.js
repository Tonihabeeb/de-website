"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = __importDefault(require("./routes/auth"));
const document_1 = __importDefault(require("./routes/document"));
const audit_1 = __importDefault(require("./routes/audit"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
// Load .env.local if it exists, otherwise .env
const envPath = fs_1.default.existsSync(path_1.default.join(__dirname, '../.env.local'))
    ? path_1.default.join(__dirname, '../.env.local')
    : path_1.default.join(__dirname, '../.env');
dotenv_1.default.config({ path: envPath });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploads statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || '', {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Auth routes
app.use('/api/auth', auth_1.default);
// Document routes
app.use('/api/documents', document_1.default);
// Audit log routes
app.use('/api/audit', audit_1.default);
// Dashboard routes
app.use('/api/dashboards', dashboard_1.default);
// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Deep Engineering Backend API' });
});
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
exports.default = app;
