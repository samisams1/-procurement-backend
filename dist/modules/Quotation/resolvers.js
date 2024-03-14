"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../user/model"));
const model_2 = __importDefault(require("../supplier/model"));
const model_3 = __importDefault(require("./model"));
const model_4 = __importDefault(require("../ProductPrice/model"));
const model_5 = __importDefault(require("../PurchaseRequest/model"));
const model_6 = __importDefault(require("../product/model"));
const model_7 = __importDefault(require("../Notification/model"));
const quotationResolver = {
    Query: {
        getQuotation: async (_, { id }) => {
            try {
                const quotation = await model_3.default.findByPk(id, {
                    include: [
                        { model: model_2.default, as: 'supplier' },
                        { model: model_2.default, as: 'supplier' },
                        { model: model_1.default, as: 'customer' },
                        { model: model_5.default, as: 'purchaseRequest' },
                    ],
                });
                return quotation;
            }
            catch (error) {
                console.error('Error retrieving quotation:', error);
                throw new Error('Failed to retrieve quotation');
            }
        },
        /* countGetQuotationByStatus: async (_:any,{ status }: { status: string },{ supplierId }: { supplierId: number }) => {
           try {
             const count = await Quotation.count({ where: { status, supplierId:2 } });
             return count;
           } catch (error) {
             console.error(error);
             throw new Error('Failed to retrieve orders');
           }
         },*/
        countGetQuotationByStatus: async (parent, { data }) => {
            const { customerId, status } = data;
            try {
                const count = await model_3.default.count({ where: { customerId, status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        countQuotationBySupplierId: async (parent, { data }) => {
            const { supplierId, status } = data;
            try {
                const count = await model_3.default.count({ where: { supplierId, status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        quotationBydSupplierId: async (_, { suplierId }) => {
            try {
                const quotation = await model_3.default.findAll({
                    where: { supplierId: suplierId },
                    include: [
                        { model: model_2.default, as: 'supplier' },
                        { model: model_1.default, as: 'customer' },
                        { model: model_5.default, as: 'purchaseRequest', include: [{ model: model_6.default, as: 'products' }] },
                    ],
                    order: [['id', 'DESC']],
                });
                return quotation;
            }
            catch (error) {
                console.error('Error retrieving quotation:', error);
                throw new Error('Failed to retrieve quotation');
            }
        },
        /*quotationByRequestIdAdSupplierId: async (_:any, { id }: { id: number }, { suplierId }: { suplierId: number }) => {
          try {
            const quotation = await Quotation.findByPk(id, {
                include: [
                  { model: Supplier, as: 'supplier' },
                  { model: User, as: 'customer' },
              { model: ProductPrice, as: 'productPrices' },
               //{ model: PurchaseRequest, as: 'purchaseRequest' },
             { model: PurchaseRequest, as: 'purchaseRequest', include: [{ model: Product, as: 'products' }] },
    
                ],
              });
            return quotation;
          } catch (error) {
            console.error('Error retrieving quotation:', error);
            throw new Error('Failed to retrieve quotation');
          }
        },*/
    },
    Mutation: {
        /*  createQuotation: async (_, { input }: { input: CreateQuotationInput }) => {
            try {
              const quotation = await Quotation.create(input);
              return quotation;           { model: Order, as: 'order', include: [{ model: User, as: 'customer' },{ model: Supplier, as: 'supplier' }] },
      
            } catch (error) {
              console.error('Error creating quotation:', error);
              throw new Error('Failed to create quotation');
            }
          },*/
        /* updateQuotation: async (_:any, { id, input }: { id: number; input: UpdateQuotationInput }) => {
           try {
             const quotation = await Quotation.findByPk(id);
             if (!quotation) {
               throw new Error('Quotation not found');
             }
             await quotation.update(input);
             return quotation;
           } catch (error) {
             console.error('Error updating quotation:', error);
             throw new Error('Failed to update quotation');
           }
         },*/
        updateQuotation: async (_, { id, input }) => {
            const { status, remark, sentBy, availabilityDate, shippingPrice, productPrices } = input;
            // Fetch the quotation record from the database using the provided ID
            const quotation = await model_3.default.findByPk(id);
            if (!quotation) {
                throw new Error("Quotation not found");
            }
            // Update the quotation record with the provided data
            if (status) {
                quotation.status = status;
            }
            if (shippingPrice) {
                quotation.shippingPrice = shippingPrice;
            }
            if (availabilityDate) {
                quotation.availabilityDate = availabilityDate;
            }
            if (remark) {
                quotation.remark = remark;
            }
            if (sentBy) {
                quotation.sentBy = sentBy;
            }
            console.log("samisams");
            console.log(status);
            await model_7.default.create({
                type: 'rfq',
                message: 'RFQ received. Price details enclosed. Thank you.',
                recipientId: Number(quotation.customerId),
                specificid: quotation.id,
                timestamp: new Date(),
                status: 'unread',
            });
            // Update product prices
            if (productPrices) {
                const updatedProductPrices = productPrices.map(({ id, price, disCountPrice }) => {
                    if (!id) {
                        throw new Error("Invalid id");
                    }
                    return {
                        id,
                        price,
                        status,
                        disCountPrice,
                        quotationId: quotation.id,
                    };
                });
                // Find and update the existing product prices
                for (const updatedProductPrice of updatedProductPrices) {
                    const existingProductPrice = await model_4.default.findByPk(updatedProductPrice.id);
                    if (existingProductPrice) {
                        existingProductPrice.price = updatedProductPrice.price;
                        existingProductPrice.disCountPrice = updatedProductPrice.disCountPrice;
                        await existingProductPrice.save();
                    }
                }
            }
            // Save the updated quotation record to the database
            await quotation.save();
            return quotation;
        },
        deleteQuotation: async (_, { id }) => {
            try {
                const quotation = await model_3.default.findByPk(id);
                if (!quotation) {
                    throw new Error('Quotation not found');
                }
                await quotation.destroy();
                return true;
            }
            catch (error) {
                console.error('Error deleting quotation:', error);
                throw new Error('Failed to delete quotation');
            }
        },
    },
};
exports.default = quotationResolver;
