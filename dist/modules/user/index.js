"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = exports.resolvers = exports.User = void 0;
const model_1 = __importDefault(require("./model"));
exports.User = model_1.default;
const resolver_1 = __importDefault(require("./resolver"));
exports.resolvers = resolver_1.default;
const schema_1 = __importDefault(require("./schema"));
exports.typeDefs = schema_1.default;
