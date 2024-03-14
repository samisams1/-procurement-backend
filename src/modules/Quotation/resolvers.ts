import  User  from "../user/model";
import  Supplier  from "../supplier/model";
import Quotation from "./model";
import ProductPrice from "../ProductPrice/model";
import PurchaseRequest  from "../PurchaseRequest/model";
import Product from "../product/model";
import Notification  from '../Notification/model';
interface CreateQuotationInput extends Partial<Quotation>, Record<string, any> {}

interface UpdateQuotationInput extends Partial<CreateQuotationInput> {
  id: number;
}
interface  countQuotation {
  supplierId:number;
  status:string;
}
interface UpdateQuotationArgs {
  input: {
    id: number;
    status?: string;
    shippingPrice?: number;
    productPrices?: { id: number; price: number,disCountPrice:number }[];
  };
}
interface countPurchase {
  customerId: number;
   status: string;
}

const quotationResolver = {
  Query: {
    getQuotation: async (_:any, { id }: { id: number }) => {
      try {
        const quotation = await Quotation.findByPk(id, {
            include: [
              { model: Supplier, as: 'supplier' },
              { model: Supplier, as: 'supplier' },
              { model: User, as: 'customer' },
               { model: PurchaseRequest, as: 'purchaseRequest' },
            ],
          });
        return quotation;
      } catch (error) {
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
    countGetQuotationByStatus: async (parent: any, { data }: { data: countPurchase }) => {
      const {customerId,status} =data;
      try {
        const count = await Quotation.count({ where: {customerId,status }});
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    countQuotationBySupplierId: async (parent: any, { data }: { data: countQuotation }) => {
      const {supplierId,status} =data;
      try {
        const count = await Quotation.count({ where: {supplierId,status }});
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    quotationBydSupplierId: async (_:any, { suplierId }: { suplierId: number }) => {
      try {
        const quotation = await Quotation.findAll({
          where:{supplierId:suplierId},
            include: [
              { model: Supplier, as: 'supplier' },
              { model: User, as: 'customer' },
              { model: PurchaseRequest, as: 'purchaseRequest', include: [{ model: Product, as: 'products' }] },

            ],
            order: [['id', 'DESC']],
          });
        return quotation;
      } catch (error) {
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
    updateQuotation: async (_: any, { id, input }: { id: number; input: UpdateQuotationInput }) => {
      const { status,remark,sentBy,availabilityDate,shippingPrice, productPrices } = input;
      
      // Fetch the quotation record from the database using the provided ID
      const quotation = await Quotation.findByPk(id);
    
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
      if(availabilityDate){
        quotation.availabilityDate = availabilityDate;
      }
      if(remark){
        quotation.remark =remark;
      }
      if(sentBy){
        quotation.sentBy = sentBy;
      }
      console.log("samisams")
      console.log(status)
      await Notification.create({
        type: 'rfq',
        message: 'RFQ received. Price details enclosed. Thank you.',
        recipientId: Number(quotation.customerId),
        specificid:quotation.id,
        timestamp: new Date(),
        status: 'unread',
      });
      // Update product prices
      if (productPrices) {
        const updatedProductPrices = productPrices.map(({ id, price,disCountPrice }: { id: number; price: number;disCountPrice:number; }) => {
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
          const existingProductPrice = await ProductPrice.findByPk(updatedProductPrice.id);
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
    deleteQuotation: async (_:any, { id }: { id: number }) => {
      try {
        const quotation = await Quotation.findByPk(id);
        if (!quotation) {
          throw new Error('Quotation not found');
        }
        await quotation.destroy();
        return true;
      } catch (error) {
        console.error('Error deleting quotation:', error);
        throw new Error('Failed to delete quotation');
      }
    },
  },
};

export default quotationResolver;
