# Payment Service - Core Functions & Cloud Role

## Overview
The **Payment Service** operates as the financial ledger and transaction handler for the system. It guarantees that funds have been secured before an order progresses to fulfillment.

## Core Functions
1. **Transaction Processing:** Takes credit card or alternative payment method instructions and validates them against the total amount defined by the Order Service.
2. **Order Finalization Integration:** Communicates with the **Order Service**. Once a payment successfully posts, this service triggers an update changing the linked Order's status from `Pending Payment` to `Paid`.
3. **Auditing and Revenue Tracking:** Accumulates comprehensive receipt data to provide admins with visibility over total sales and system revenue. 

## DevOps & Cloud Implementation
- **Data Security:** This is the most sensitive microservice. From a DevSecOps perspective, minimal network ingress rules (Security Groups/NSGs) must be enforced so that this container can solely communicate internally within the Virtual Private Cloud (VPC).
- **Public Sandbox Isolation:** Maintains strict least-privilege structures, utilizing AWS IAM roles (or Azure Service Principals) that cannot execute generic read permissions to prevent financial data leaks.
- **Logging & Tracing:** Ideal candidate for robust application logging using CloudWatch or Azure Monitor, as detailed pipeline metrics ensure financial consistency tracking during container re-deployments.
