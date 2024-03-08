"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../ProductPrice/model"));
const generateReferenceNumber_1 = require("../../utils/common/generateReferenceNumber");
const model_2 = __importDefault(require("../Quotation/model"));
const model_3 = __importDefault(require("../product/model"));
const model_4 = __importDefault(require("./model"));
const model_5 = __importDefault(require("../Notification/model"));
const model_6 = __importDefault(require("../user/model"));
const mailerService_1 = require("../mailer/mailerService");
//import { publishEvent, subscribeToEvent } from '../../PubSub/pubsub';
const sequelize_1 = require("sequelize");
const model_7 = __importDefault(require("../Category/model"));
const model_8 = __importDefault(require("../user/model"));
const model_9 = __importDefault(require("../draft/model"));
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const mailerService = new mailerService_1.MailerService();
const referenceNumberGenerator = new generateReferenceNumber_1.ReferenceNumberGeneratorService();
function generateRandomToken(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}
const Queue = require('bull');
const emailQueue = new Queue('emailQueue');
const purchaseRequestResolver = {
    Query: {
        purchaseRequests: async () => {
            try {
                // Retrieve all purchase requests
                const purchaseRequests = await model_4.default.findAll({
                    include: [
                        {
                            model: model_3.default,
                            as: 'products',
                        },
                    ],
                    order: [['id', 'DESC']],
                });
                // Return the purchase requests
                return purchaseRequests;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve purchase requests');
            }
        },
        purchaseRequestByUserId: async (_, { userId }) => {
            try {
                // Retrieve all purchase requests
                const purchaseRequests = await model_4.default.findAll({
                    where: { userId },
                    include: [
                        {
                            model: model_3.default,
                            as: 'products',
                        },
                    ],
                    order: [['id', 'DESC']],
                });
                // Return the purchase requests
                return purchaseRequests;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve purchase requests');
            }
        },
        savedRequestByUserId: async (_, { userId }) => {
            try {
                // Retrieve all purchase requests
                const purchaseRequests = await model_4.default.findAll({
                    where: { userId, status: "saved" },
                    include: [
                        {
                            model: model_3.default,
                            as: 'products',
                        },
                    ],
                    order: [['id', 'DESC']],
                });
                // Return the purchase requests
                return purchaseRequests;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve purchase requests');
            }
        },
        purchaseRequestById: async (_, { id }) => {
            try {
                // Retrieve purchase requests by id
                const purchaseRequests = await model_4.default.findAll({
                    where: { id },
                    include: [
                        {
                            model: model_3.default,
                            as: 'products',
                        },
                        {
                            model: model_6.default,
                            as: 'user',
                        },
                        {
                            model: model_7.default,
                            as: 'category',
                        },
                    ],
                    order: [['createdAt', 'DESC']], // Order by createdAt in descending order
                });
                // Return the purchase requests
                return purchaseRequests;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve purchase requests');
            }
        },
        /* purchaseRequestBYSupplierId: async (_: any, { userId }: { userId: number }) => {
           try {
             // Retrieve purchase requests by id
             const purchaseRequests = await PurchaseRequest.findAll({
               where: { userId:userId },
               include: [
                 {
                   model: Product,
                   as: 'products',
                 },
                 {
                   model: User,
                   as: 'user',
                 },
               ],
             });
             // Return the purchase requests
             return purchaseRequests;
           } catch (error) {
             console.error(error);
             throw new Error('Failed to retrieve purchase requests');
           }
         }, */
        purchaseRequestBYSupplierId: async (_, { userId, search, filter, orderBy, page, pageSize, }) => {
            try {
                const offset = (page - 1) * pageSize;
                let whereCondition = { userId };
                let order = [['createdAt', 'DESC']];
                if (search) {
                    whereCondition = {
                        ...whereCondition,
                        [sequelize_1.Op.or]: [
                            { referenceNumber: { [sequelize_1.Op.like]: `%${search}%` } },
                            //{ customerName: { [Op.like]: `%${search}%` } },
                            // { createdDate: { [Op.like]: `%${search}%` } },
                        ],
                    };
                }
                if (filter && Array.isArray(filter)) {
                    filter.forEach((filterItem) => {
                        const { field, value } = filterItem;
                        whereCondition[field] = { [sequelize_1.Op.like]: `%${value}%` };
                    });
                }
                if (orderBy === 'referenceNumber_ASC') {
                    order = [['referenceNumber', 'ASC']];
                }
                else if (orderBy === 'referenceNumber_DESC') {
                    order = [['referenceNumber', 'DESC']];
                }
                else if (orderBy === 'createdAt_ASC') {
                    order = [['createdAt', 'ASC']];
                }
                else if (orderBy === 'createdAt_DESC') {
                    order = [['createdAt', 'DESC']];
                }
                const purchaseRequests = await model_4.default.findAll({
                    where: whereCondition,
                    include: [
                        {
                            model: model_3.default,
                            as: 'products',
                        },
                        {
                            model: model_6.default,
                            as: 'user',
                        },
                    ],
                    order,
                    offset,
                    limit: pageSize,
                });
                return purchaseRequests;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve purchase requests');
            }
        },
        /*countPurchaseRequestBystatus: async (_:any,{ status }: { status: string },{ userId }: { userId: number }) => {
          try {
            const count = await PurchaseRequest.count({ where: { status } });
            return count;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve orders');
          }
        },*/
        countPurchaseRequestBystatus: async (parent, { data }) => {
            const { userId, status } = data;
            try {
                const count = await model_4.default.count({ where: { userId, status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        countAllRequestByStatus: async (_, { status }) => {
            try {
                const count = await model_4.default.count({ where: { status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve orders');
            }
        }
    },
    Mutation: {
        createPurchaseRequest: async (_, { input }) => {
            try {
                const { purchaseRequest, products, suppliers } = input;
                const token = generateRandomToken();
                const referenceNumber = referenceNumberGenerator.generateReferenceNumber();
                const createdPurchaseRequest = await model_4.default.create({
                    ...purchaseRequest,
                    referenceNumber,
                });
                const purchaseRequestId = createdPurchaseRequest.get('id');
                const productPrices = await model_3.default.bulkCreate((products === null || products === void 0 ? void 0 : products.map((product) => ({
                    ...product,
                    purchaseRequestId,
                    //   quotationId: quotation.id,
                }))) || []);
                const newQuotation = await Promise.all(suppliers.map(async (supplier) => {
                    //   const supplierData = await Supplier.findByPk(supplier.id) as SupplierDataWithUserId;
                    console.log("supplierData");
                    const quotation = await model_2.default.create({
                        supplierId: supplier.id,
                        customerId: purchaseRequest.userId, // Set the customer ID accordingly
                        status: 'pending',
                        purchaseRequestId,
                        shippingPrice: 0, // Set the shipping price accordingly
                    });
                    await model_5.default.create({
                        type: 'purchaseRequest',
                        message: 'Purchase request notification',
                        recipientId: 4,
                        specificid: purchaseRequestId,
                        timestamp: new Date(),
                        status: 'unread',
                    });
                    // const user = await Supplier.findOne({ where: { id:  supplier.id },include:[{ model: User,as:'customer'}] });
                    const supplierId = await model_8.default.findOne({
                        where: { id: supplier.id },
                    });
                    /*emailQueue.process('sendNotificationEmail', async (job: Job<SendNotificationEmailData>) => {
                      const { recipientEmail, token, purchaseRequestId } = job.data;
          
                      // Implement your email sending logic here, using the provided data
                      await mailerService.sendNotificationEmail(recipientEmail, token, purchaseRequestId);
          
                      // Return any relevant result or status if needed
                      return { success: true };
                    });*/
                    const productPriceIds = productPrices.map((productPrice) => productPrice.id);
                    await model_1.default.bulkCreate(productPriceIds.map((productId) => ({
                        price: 0, // Set the price accordingly
                        productId,
                        quotationId: quotation.id,
                    })));
                    return quotation.toJSON();
                }));
                if (products && products.length > 0) {
                    return {
                        ...createdPurchaseRequest.toJSON(),
                        //    products: createdProducts,
                        suppliers: {
                            connect: suppliers.map((supplier) => ({ id: supplier.id })),
                        },
                    };
                }
                return {
                    ...createdPurchaseRequest.toJSON(),
                    newQuotation,
                    suppliers: {
                        connect: suppliers.map((supplier) => ({ id: supplier.id })),
                    },
                };
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create purchase request');
            }
        },
        createDraftequest: async (_, { input }) => {
            try {
                const { purchaseRequest, products, suppliers } = input;
                const createdPurchaseRequest = await model_4.default.create({
                    ...purchaseRequest,
                });
                const purchaseRequestId = createdPurchaseRequest.get('id');
                console.log(products);
                console.log("products");
                console.log(purchaseRequestId);
                await model_9.default.bulkCreate((products === null || products === void 0 ? void 0 : products.map((product) => ({
                    ...product,
                    purchaseRequestId,
                    //   quotationId: quotation.id,
                }))) || []);
                return {
                    ...createdPurchaseRequest.toJSON(),
                };
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create purchase request');
            }
        }
        /* message queu
        createPurchaseRequest: async (_: any, { input }: CreatePurchaseRequestInput) => {
      try {
        const { purchaseRequest, products, suppliers } = input;
    
        const user = await User.findOne({ where: { id: purchaseRequest.userId } });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        const token = generateRandomToken();
        const referenceNumber = referenceNumberGenerator.generateReferenceNumber();
    
        const createdPurchaseRequest = await PurchaseRequest.create({
          ...purchaseRequest,
          referenceNumber,
        });
    
        const purchaseRequestId = createdPurchaseRequest.get('id') as number;
    
        const productPrices = await Product.bulkCreate(
          products?.map((product) => ({
            ...product,
            purchaseRequestId,
            //   quotationId: quotation.id,
          })) || []
        );
    
        const newQuotation = await Promise.all(
          suppliers.map(async (supplier) => {
            const quotation = await Quotation.create({
              supplierId: supplier.id,
              customerId: purchaseRequest.userId, // Set the customer ID accordingly
              status: 'pending',
              purchaseRequestId,
              shippingPrice: 0, // Set the shipping price accordingly
            });
    
            const notification = await Notification.create({
              type: 'purchaseRequest',
              message: 'Purchase request notification',
              recipientId: supplier.id,
              specificid: purchaseRequestId,
              timestamp: new Date(),
              status: 'notSeen',
            });
            const productPriceIds = productPrices.map((productPrice) => productPrice.id);
    
            await ProductPrice.bulkCreate(
              productPriceIds.map((productId) => ({
                price: 0, // Set the price accordingly
                productId,
                quotationId: quotation.id,
              }))
            );
    
            // Publish a message to the message queue
            await messageQueue.publish({
              email: user.email,
              token,
              purchaseRequestId,
            });
    
            return quotation.toJSON();
          })
        );
    
        return {
          ...createdPurchaseRequest.toJSON(),
          newQuotation,
          suppliers: {
            connect: suppliers.map((supplier) => ({ id: supplier.id })),
          },
        };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create purchase request');
      }
    }
        */
        /*  createPurchaseRequest: async (_: any, { input }: CreatePurchaseRequestInput) => {
            try {
              const { purchaseRequest, products, userId, selectedType, suppliers } = input;
       
              const user = await User.findOne({ where: { id:userId } });
      
              if (!user) {
                throw new Error('User not found');
              }
        
              const token = generateRandomToken();
              // Generate the reference number
              const referenceNumber = referenceNumberGenerator.generateReferenceNumber();
      
              // Create the purchase request
              const createdPurchaseRequest = await PurchaseRequest.create({
                ...purchaseRequest,
                referenceNumber,
              });
      
              const purchaseRequestId = createdPurchaseRequest.get('id') as number;
              const supplierIds = [{ id: 1 }, { id: 2 }];
              // Create quotation entries for each supplier
              const newQuotation = await Promise.all(
                supplierIds.map(async (supplier) => {
                  const quotation = await Quotation.create({
                    supplierId: supplier.id,
                    customerId: 1, // Set the customer ID accordingly
                    status: 'pending',
                    purchaseRequestId,
                    shippingPrice: 0, // Set the shipping price accordingly
                  });
      
                  // Create the product prices for the quotation
                  await Promise.all(
                    products?.map(async (product) => {
                      const createdProduct = await Product.create({ ...product, purchaseRequestId });
      
                      const productPriceInput: ProductPriceAttributes = {
                        price: 0, // Set the price accordingly
                        productId: createdProduct.id, // Use the created product's id as the productId
                        quotationId: quotation.id, // Associate the product price with the quotation
                      };
      
                      const productPrice = await ProductPrice.create(productPriceInput);
      
                      return productPrice.toJSON(); // Convert the product price to JSON before returning
                    }) || []
                  );
      
                  return quotation.toJSON(); // Convert the quotation to JSON before returning
                })
              );
      
              if (products && products.length > 0) {
                // Create the associated products
                const createdProducts = await Promise.all(
                  products.map((product) =>
                    Product.create({ ...product, purchaseRequestId })
                  )
                );
              // create otification
           const notification =    await Notification.create({
                type: 'purchaseRequest',
                message: 'Purchase request notification',
                recipientId: 1,
                timestamp: new Date(),
                status: 'notSeen',
              });
      
              publishEvent('NEW_NOTIFICATION', { newNotification: notification });
      
            const updatedNotificationCount = await Notification.count();
            publishEvent('UPDATED_NOTIFICATION_COUNT', { updatedNotificationCount });
      
              await mailerService.sendNotificationEmail(user.email, token,purchaseRequestId);
              // Return the created purchase request with associated products
                return {
                  ...createdPurchaseRequest.toJSON(),
                  products: createdProducts,
                  suppliers: {
                    connect: supplierIds.map((supplier) => ({ id: supplier.id })),
                  },
                };
              }
      
              // Return the created purchase request with the associated quotations
              return {
                ...createdPurchaseRequest.toJSON(),
                newQuotation,
                suppliers: {
                  connect: suppliers.map((supplier) => ({ id: supplier.id })),
                },
              };
             
            } catch (error) {
              console.error(error);
              throw new Error('Failed to create purchase request');
            }
          },*/
    },
    Subscription: {
        newNotification: {
            subscribe: () => pubsub.asyncIterator('NEW_NOTIFICATION'),
        },
        updatedNotificationCount: {
            subscribe: () => pubsub.asyncIterator('UPDATED_NOTIFICATION_COUNT'),
        },
    },
};
// Subscribe to the ORDER_CREATED event
exports.default = purchaseRequestResolver;
