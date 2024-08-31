"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tourRoutes_1 = __importDefault(require("./routes/tourRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/tours', tourRoutes_1.default);
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Database connection error:', error);
});
