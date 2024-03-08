/*import ProductPrice, { ProductPriceAttributes } from '../ProductPrice/model';
import { ReferenceNumberGeneratorService } from '../../utils/common/generateReferenceNumber';
import Quotation from '../Quotation/model';
import Product from '../product/model';
import PurchaseRequest from './model';

interface PurchaseRequestInput {
  userId?: number;
  status: string;
  remark?: string;
  addressDetail?: string;
  estimatedDelivery?: string;
  imageUrl?: string | null;
  referenceNumber?: string;
  createdAt?: Date;
}

interface CreatePurchaseRequestInput {
  input: {
    purchaseRequest: PurchaseRequestInput;
    selectedType: string;
    userId: string;
    products?: {
      id: number;
      title: string;
      mark: string;
      model: string;
      manufacturer: string;
      code: string;
      Description: string;
      partNumber: string;
      uom: string;
      quantity: number;
    }[];
    suppliers: { id: number }[];
  };
}
const referenceNumberGenerator = new ReferenceNumberGeneratorService();

const purchaseRequestResolver = {
  Query: {
    purchaseRequests: async () => {
      try {
        // Retrieve all purchase requests
        const purchaseRequests = await PurchaseRequest.findAll({
          include: [
            {
              model: Product,
              as: 'products',
            },
          ],
          order: [['id', 'DESC']],
        });
        // Return the purchase requests
        return purchaseRequests;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve purchase requests');
      }
    },
    purchaseRequestById: async (_: any, { id }: { id: number }) => {
      try {
        // Retrieve purchase requests by id
        const purchaseRequests = await PurchaseRequest.findAll({
          where: { id },
          include: [
            {
              model: Product,
              as: 'products',
            },
          ],
        });
        // Return the purchase requests
        return purchaseRequests;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve purchase requests');
      }
    },
    purchaseRequestBySupplierId: async (_: any, { userId }: { userId: number }) => {
      try {
        // Retrieve purchase requests by supplier id
        const purchaseRequests = await PurchaseRequest.findAll({
          where: { userId },
          include: [
            {
              model: Product,
              as: 'products',
            },
          ],
        });
        // Return the purchase requests
        return purchaseRequests;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve purchase requests');
      }
    },
  },
  Mutation: {
    createPurchaseRequest: async (_: any, { input }: CreatePurchaseRequestInput) => {
      try {
        const { purchaseRequest, products, userId, selectedType, suppliers } = input;

        // Generate the reference number
        const referenceNumber = referenceNumberGenerator.generateReferenceNumber();

        // Create the purchase request
        const createdPurchaseRequest = await PurchaseRequest.create({
          ...purchaseRequest,
          referenceNumber,
        });

        const purchaseRequestId = createdPurchaseRequest.get('id') as number;

        // Create quotation entries for each supplier
        const newQuotation = await Promise.all(
          suppliers.map(async (supplier) => {
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
                const productPriceInput: ProductPriceAttributes = {
                  price: 0, // Set the price accordingly
                  productId: product.id,
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

          // Return the created purchase request with associated products
          return {
            ...createdPurchaseRequest.toJSON(),
            products: createdProducts,
            suppliers: {
              connect: suppliers.map((supplier) => ({ id: supplier.id })),
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
    },
  },
};

export default purchaseRequestResolver;*/