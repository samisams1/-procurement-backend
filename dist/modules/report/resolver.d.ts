declare const reportResolver: {
    Query: {
        dailyReport: (_: any, { id }: {
            id: number;
        }) => Promise<{
            date: any;
            totalAmount: any;
        }[]>;
        monthlyReport: (_: any, { id }: {
            id: number;
        }) => Promise<{
            month: any;
            totalAmount: any;
        }[]>;
        yearlyReport: (_: any, { id }: {
            id: number;
        }) => Promise<{
            year: any;
            totalAmount: any;
        }[]>;
    };
};
export default reportResolver;
