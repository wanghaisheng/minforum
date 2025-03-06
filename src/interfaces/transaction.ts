export interface transactionProp {
  id?: string;
  beneficiary?: string;
  amount?: number;
  narration?: string;
  referenceId?: string;
  provider?: string;
  user?: any;
  userId?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
