import Draft from "./model";
declare const draftResolver: {
    Query: {
        getDraftById: (_: any, { id }: {
            id: number;
        }) => Promise<Draft | null>;
        getAllDrafts: () => Promise<Draft[]>;
    };
    Mutation: {
        createDraft: (_: any, { input }: {
            input: Draft;
        }) => Promise<Draft>;
        updateDraft: (_: any, { id, input }: {
            id: number;
            input: Draft;
        }) => Promise<Draft>;
        deleteDraft: (_: any, { id }: {
            id: number;
        }) => Promise<boolean>;
    };
};
export default draftResolver;
