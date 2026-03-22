# Payment Service - Interactions & Use Cases

## 🎯 Core Use Cases
1. **Transaction Authorization:** Validates dummy or Sandbox payment methods to mock clearing funds.
2. **Receipt Generation:** Acts as the financial ledger, storing timestamps, amounts, and transaction IDs for audits.
3. **Refund Logic:** Handles edge cases if an order is cancelled post-payment.

## 🤝 Interacting Services

### 1. Interacts with: Order Service
**Type of Interaction:** Bi-directional Integration.
- **Why (Rationale):** A payment cannot exist in a vacuum; it must be tied to a valid, pending order. Furthermore, the Payment service is responsible for "closing the loop" by telling the Order service that the money has arrived.
- **Use Case Example (Validation):** Before processing a $50 payment, the Payment Service fetches the order details from the Order Service (`GET /api/orders/:id`) to verify that the Order's total is exactly $50 and it hasn't already been paid.
- **Use Case Example (Fulfillment):** Immediately after the payment succeeds, the Payment Service makes an internal POST/PUT request to the Order Service's webhook (`PUT /api/orders/:id/approve`), unlocking the physical fulfillment process.

### 2. Interacts with: User Service
**Type of Interaction:** Identity Auditing.
- **Why (Rationale):** Financial records require strict auditing. The Payment Service captures the `userId` attached to the JWT to maintain a ledger of which user initiated the transaction, aiding in fraud prevention and customer support queries.
