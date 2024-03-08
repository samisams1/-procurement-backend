"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const model_1 = require("./model");
class VerificationService {
    async createVerificationToken(userId) {
        const verificationToken = crypto_1.default.randomBytes(20).toString('hex');
        const verification = await model_1.Verification.create({ token: verificationToken, userId });
        return verificationToken;
    }
}
exports.VerificationService = VerificationService;
