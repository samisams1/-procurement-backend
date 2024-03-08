import  User  from '../user/model';
import Product from '../product/model';
import Quotation from '../Quotation/model';
import ProductPrice from './model';
import  Supplier  from '../supplier/model';
import sequelize from '../../config/database';

interface CreateProductPriceInput {
  price: number;
  disCountPrice:number;
  productId: number;
  quotationId: number;
  status: string;
}
interface UpdateProductPriceInput {
  id: number;
  shippingPrice?: number;
  status?: string;
  productPrices?: ProductPriceItemInput[];
}

class ProductPriceItemInput {
  public id!: number;
  public price!: number;
  public disCountPrice!:number;
}
interface CreateProductPriceQuotationRequestInput {
  productPrices: CreateProductPriceInput[];
  status: string;
  shippingPrice: number;
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
    getAllProductPrices: async (_:any, { id }: { id: number }) => {  
      try {
        const productPrices = await ProductPrice.findAll({
         // where: { status: "ordered" },
          include: [
            {
              model: Quotation,
              as: 'quotation',
              where: { status: "quoted",customerId:id },
              include: [
                {
                  model: User,
                  as: 'customer',
                },
              ],
            },
            {
              model: Product,
              as: 'product',
            },
          ],
        //  attributes: ['quotationId'], // Include only the 'quotationId' column
       //   group: ['quotationId'], // Group the records by 'quotationId'
          order: [['id', 'DESC']],
        //  having: sequelize.literal('COUNT(DISTINCT ProductPrice.purchaseRequestId) = 1'), // Filter out groups with more than one 'purchaseRequestId'
        });
        return productPrices;
      } catch (error) {
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
    quotationByRequestIdAdSupplierId: async (_:any, { id,supplierId }: { id: number,supplierId:number }) => {
      try {
        const productPrices = await ProductPrice.findAll({
          include:[
           { model: Quotation,as:'quotation', where: { purchaseRequestId:id,supplierId:supplierId } },
           { model: Product,as:'product'}
          ]
        });
        return productPrices;
      } 
      catch (error) {
        throw new Error('Failed to fetch product prices');
      }
    },
    quotationByRequestId: async (_:any, { id }: { id: number }) => {
      try {
        const productPrices = await ProductPrice.findAll({
          include:[
           { 
          model: Quotation,as:'quotation',
           where: { purchaseRequestId:id,status:"quoted"},
           include: [
            { 
              model: User,
              as: 'customer',
            },
            { 
              model: Supplier,
              as: 'supplier',
            }
          ],
          },
           { model: Product,as:'product'},
          
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
    createProductPrice: async (_:any, { input }: { input: CreateProductPriceQuotationRequestInput }) => {
      const { productPrices, status, shippingPrice } = input;

      try {
        // Update the quotation table with shipping price and status
        const quotationId = productPrices[0].quotationId; // Assuming all product prices have the same quotation ID
        const quotation = await Quotation.findByPk(quotationId);
        if (quotation) {
          quotation.shippingPrice = shippingPrice;
          quotation.status = status;
          await quotation.save();
        }

        // Create product prices in the database
      //  const createdProductPrices = await ProductPrice.bulkCreate(productPrices);

    //    return createdProductPrices;
      } catch (error) {
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
    updateProductPrices: async (
      _: any,
      { id, input }: { id: number; input: UpdateProductPriceInput }
    ) => {
      try {
        console.log(input.productPrices);
        const productPrice = await ProductPrice.findByPk(id);
        if (!productPrice) {
          throw new Error('ProductPrice not found');
        }
  
        // Update the individual product prices and shipping price if input.productPrices is defined
        if (input.productPrices) {
          for (const price of input.productPrices) {
            const productPriceItem = await ProductPrice.findByPk(price.id);
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
          const quotation = await Quotation.findByPk(productPrice.quotationId);
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
      } catch (error) {
        console.error('Error updating productPrice:', error);
        throw new Error('Failed to update productPrice');
      }
    }
  },
};

export default ProductPriceResolver;