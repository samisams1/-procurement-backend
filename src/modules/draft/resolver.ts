import Draft from "./model";

const draftResolver = {
  Query: {
    getDraftById: async (_: any, { id }: { id: number }) => {
      try {
        const draft = await Draft.findByPk(id);
        return draft;
      } catch (error) {
        // Handle error
        throw new Error('Failed to retrieve draft by ID');
      }
    },
    getDraftProductsByRequestId: async (_: any, { purchaseRequestId }: { purchaseRequestId: number }) => {
      try {
        const draft = await Draft.findAll({
          where:{purchaseRequestId:purchaseRequestId},
         /* include: [
            {
              model: Draft,
              as: 'drafts',
            },
          ]*/
        });
        return draft;
      } catch (error) {
        // Handle error
        throw new Error('Failed to retrieve draft by ID');
      }
    },
    getAllDrafts: async () => {
      try {
        const drafts = await Draft.findAll();
        return drafts;
      } catch (error) {
        // Handle error
        throw new Error('Failed to retrieve drafts');
      }
    },
  },
  Mutation: {
    createDraft: async (_: any, { input }: { input: Draft }) => {
      try {
        const draft = await Draft.create(input);
        console.log(input)
        return draft;
      } catch (error) {
        // Handle error
        throw new Error('Failed to create draft');
      }
    },
    updateDraft: async (_: any, { id, input }: { id: number, input: Draft }) => {
      try {
        const draft = await Draft.findByPk(id);
        if (!draft) {
          throw new Error('Draft not found');
        }
        await draft.update(input);
        return draft;
      } catch (error) {
        // Handle error
        throw new Error('Failed to update draft');
      }
    },
    deleteDraft: async (_: any, { id }: { id: number }) => {
      try {
        const draft = await Draft.findByPk(id);
        if (!draft) {
          throw new Error('Draft not found');
        }
        await draft.destroy();
        return true;
      } catch (error) {
        // Handle error
        throw new Error('Failed to delete draft');
      }
    },
  },
};

export default draftResolver;