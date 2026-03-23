export interface Medicine {
  id: number;
  name: string;
  isPrescriptionRequired: boolean;
}

export interface Batch {
  id: number;
  batchNumber: string;
  expiryDate: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  batchId: number;
  batchNumber: string;
  price: number;
  medicineName : string;
  quantity: number;
}