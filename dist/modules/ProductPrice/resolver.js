"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../user/model"));
const model_2 = __importDefault(require("../product/model"));
const model_3 = __importDefault(require("../Quotation/model"));
const model_4 = __importDefault(require("./model"));
const model_5 = __importDefault(require("../supplier/model"));
class ProductPriceItemInput {
}
const ProductPriceResolver = {
    Query: {
        /*getAllProductPrices: async () => {
          try {
            const productPrices = await ProductPrice.findAll({
              include:[
               { model: Quotation,as:'quotation'},
               { model: Product,as:'product'}
              ]
            });
            return productPrices;
          }
          catch (error) {
            throw new Error('Failed to fetch product prices');
          }
        },*/
        getAllProductPrices: async (_, { id }) => {
            try {
                const productPrices = await model_4.default.findAll({
                    // where: { status: "ordered" },
                    include: [
                        {
                            model: model_3.default,
                            as: 'quotation',
                            where: { status: "quoted", customerId: id },
                            include: [
                                {
                                    model: model_1.default,
                                    as: 'customer',
                                },
                            ],
                        },
                        {
                            model: model_2.default,
                            as: 'product',
                        },
                    ],
                    //  attributes: ['quotationId'], // Include only the 'quotationId' column
                    //   group: ['quotationId'], // Group the records by 'quotationId'
                    order: [['id', 'DESC']],
                    //  having: sequelize.literal('COUNT(DISTINCT ProductPrice.purchaseRequestId) = 1'), // Filter out groups with more than one 'purchaseRequestId'
                });
                return productPrices;
            }
            catch (error) {
                throw new Error('Failed to fetch product prices');
            }
        },
        /* quotationByRequestIdAdSupplierId: async (_:any, { id }: { id: number }, { supplierId }: { supplierId: number }) => {
           try {
             const productPrices = await ProductPrice.findAll({
               include:[
                { model: Quotation,as:'quotation',where: { purchaseRequestId:21 } },
                { model: Product,as:'product'}
               ]
             });
             return productPrices;
           }
           catch (error) {
             throw new Error('Failed to fetch product prices');
           }
         },*/
        quotationByRequestIdAdSupplierId: async (_, { id, supplierId }) => {
            try {
                const productPrices = await model_4.default.findAll({
                    include: [
                        { model: model_3.default, as: 'quotation', where: { purchaseRequestId: id, supplierId: supplierId } },
                        { model: model_2.default, as: 'product' }
                    ]
                });
                return productPrices;
            }
            catch (error) {
                throw new Error('Failed to fetch product prices');
            }
        },
        quotationByRequestId: async (_, { id }) => {
            try {
                const productPrices = await model_4.default.findAll({
                    include: [
                        {
                            model: model_3.default, as: 'quotation',
                            where: { purchaseRequestId: id, status: "quoted" },
                            include: [
                                {
                                    model: model_1.default,
                                    as: 'customer',
                                },
                                {
                                    model: model_5.default,
                                    as: 'supplier',
                                }
                            ],
                        },
                        { model: model_2.default, as: 'product' },
                    ],
                    limit: 2,
                });
                return productPrices;
            }
            catch (error) {
                throw new Error('Failed to fetch product prices');
            }
        },
    },
    Mutation: {
        createProductPrice: async (_, { input }) => {
            const { productPrices, status, shippingPrice } = input;
            try {
                // Update the quotation table with shipping price and status
                const quotationId = productPrices[0].quotationId; // Assuming all product prices have the same quotation ID
                const quotation = await model_3.default.findByPk(quotationId);
                if (quotation) {
                    quotation.shippingPrice = shippingPrice;
                    quotation.status = status;
                    await quotation.save();
                }
                // Create product prices in the database
                //  const createdProductPrices = await ProductPrice.bulkCreate(productPrices);
                //    return createdProductPrices;
            }
            catch (error) {
                throw new Error(`Failed to create product prices. ${error}`);
            }
        },
        /* updateProductPriceByPurchaseRequestId : async (purchaseRequestId: number, newPrice: number): Promise<void> => {
           try {
             const productPrices = await ProductPrice.fiUpdateProductPriceInputndAll({
               include: [
                 {
                   model: Quotation,
                   as: 'quotation',
                   where: { purchaseRequestId },
                 },
                 { model: Product, as: 'product' },
               ],
             });
         
             // Update the product prices here
             for (const productPrice of productPrices) {
               if (productPrice.product) {
                 // Update the product price with the new price
                 productPrice.price = newPrice;
                 await productPrice.save(); // Save the updated product price
               }
             }
         
             console.log('Product prices updated successfully!');
           } catch (error) {
             throw new Error('Failed to update product prices');
           }
         },*/
        updateProductPrices: async (_, { id, input }) => {
            try {
                console.log(input.productPrices);
                const productPrice = await model_4.default.findByPk(id);
                if (!productPrice) {
                    throw new Error('ProductPrice not found');
                }
                // Update the individual product prices and shipping price if input.productPrices is defined
                if (input.productPrices) {
                    for (const price of input.productPrices) {
                        const productPriceItem = await model_4.default.findByPk(price.id);
                        if (!productPriceItem) {
                            throw new Error(`ProductPrice with ID ${price.id} not found`);
                        }
                        productPriceItem.price = price.price;
                        productPriceItem.disCountPrice = price.disCountPrice;
                        await productPriceItem.save();
                    }
                }
                // Update the shipping price in the quotation if input.shippingPrice is defined
                if (input.shippingPrice) {
                    const quotation = await model_3.default.findByPk(productPrice.quotationId);
                    if (quotation) {
                        quotation.shippingPrice = input.shippingPrice;
                        await quotation.save();
                    }
                }
                // Update the status if input.status is defined
                if (input.status) {
                    productPrice.status = input.status;
                }
                await productPrice.save();
                return productPrice;
            }
            catch (error) {
                console.error('Error updating productPrice:', error);
                throw new Error('Failed to update productPrice');
            }
        }
    },
};
exports.default = ProductPriceResolver;
