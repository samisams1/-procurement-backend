export class ReferenceNumberGeneratorService {
    generateReferenceNumber(): string {
      const prefix = 'PR'; // Prefix for the reference number
      const uniqueIdentifier = Math.floor(Math.random() * 1000000); // Generate a random unique identifier
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Get the current date in YYYYMMDD format
      const referenceNumber = `${prefix}-${currentDate}-${uniqueIdentifier}`;
  
      return referenceNumber;
    }
  }