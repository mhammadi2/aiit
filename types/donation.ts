import { PaymentStatus, PaymentMethod, RefundStatus } from '@prisma/client'

export interface Donation {
  id: string
  amount: number
  userId: string
  user?: User
  status: PaymentStatus
  paymentMethod: PaymentMethod
  transactionId?: string | null
  refundStatus: RefundStatus
  createdAt: Date
  updatedAt: Date
}
