"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const model_1 = require("./model");
const verificationResolver = {
    Mutation: {
        async verifyUser(_, { token }) {
            const verification = await model_1.Verification.findOne({
                where: { token },
                include: { model: user_1.User, as: 'user' },
            });
            if (!verification) {
                throw new Error('Invalid verification token');
            }
            await user_1.User.update({ isVerified: true }, { where: { id: verification.userId } });
            await model_1.Verification.destroy({ where: { id: verification.id } });
            return verification.user;
        },
    },
};
exports.default = verificationResolver;
