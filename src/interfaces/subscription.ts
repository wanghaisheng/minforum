export interface subscriptionProp {
  id?: string;
  plan?: string;
  amount?: number;
  gracePeriod?: string;
  narration?: string;
  beneficiary?: string;
  referenceId?: string;
  provider?: any;
  user?: any;
  subscriptions?: number;
  userId?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
