"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const draftResolver = {
    Query: {
        getDraftById: async (_, { id }) => {
            try {
                const draft = await model_1.default.findByPk(id);
                return draft;
            }
            catch (error) {
                // Handle error
                throw new Error('Failed to retrieve draft by ID');
            }
        },
        /* getDraftProductsByRequestId: async (_: any, { purchaseRequestId }: { purchaseRequestId: number }) => {
           try {
             const draft = await Draft.findAll({
               where:{purchaseRequestId:purchaseRequestId},
               include: [
                 {
                   model: Draft,
                   as: 'drafts',
                 },
               ]
             });
             return draft;
           } catch (error) {
             // Handle error
             throw new Error('Failed to retrieve draft by ID');
           }
         },*/
        getAllDrafts: async () => {
            try {
                const drafts = await model_1.default.findAll();
                return drafts;
            }
            catch (error) {
                // Handle error
                throw new Error('Failed to retrieve drafts');
            }
        },
    },
    Mutation: {
        createDraft: async (_, { input }) => {
            try {
                const draft = await model_1.default.create(input);
                console.log(input);
                return draft;
            }
            catch (error) {
                // Handle error
                throw new Error('Failed to create draft');
            }
        },
        updateDraft: async (_, { id, input }) => {
            try {
                const draft = await model_1.default.findByPk(id);
                if (!draft) {
                    throw new Error('Draft not found');
                }
                await draft.update(input);
                return draft;
            }
            catch (error) {
                // Handle error
                throw new Error('Failed to update draft');
            }
        },
        deleteDraft: async (_, { id }) => {
            try {
                const draft = await model_1.default.findByPk(id);
                if (!draft) {
                    throw new Error('Draft not found');
                }
                await draft.destroy();
                return true;
            }
            catch (error) {
                // Handle error
                throw new Error('Failed to delete draft');
            }
        },
    },
};
exports.default = draftResolver;
