export interface ConsumerBrand {
  id?: string;
  name: string;
  industry?: string;
  retailer?: string;
  deductions?: number;
  last_reviewed?: string; // ISO date string
}
