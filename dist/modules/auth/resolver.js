"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const comparePassword_1 = require("../../utils/authentication/comparePassword");
const user_1 = require("../user");
const authResolver = {
    Mutation: {
        async login(_, { username, password }) {
            username = username.toLowerCase();
            const user = await user_1.User.findOne({ where: { username } });
            if (!user || !(await (0, comparePassword_1.comparePassword)(password, user.password))) {
                throw new Error('Incorrect username or password');
            }
            /*  if (user.status !== 'ACTIVE') {
                throw new Error('User account is suspended');
              }*/
            /*  if (!user.isVerified) {
                throw new Error('The account is Not verified please check your email ');
              }*/
            const token = jsonwebtoken_1.default.sign({ email: user.email }, 'secretkey123', { expiresIn: '1d' });
            return {
                token,
                user,
            };
        },
    },
    /*loginWithGoogle: (_:any, { input }) => {
      return new Promise((resolve, reject) => {
        // Authenticate the user with Google
        passport.authenticate('google', { session: false }, (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve({ token });
          }
        })(input);
      });
    },*/
};
exports.authResolver = authResolver;
