# Payment Service - API Contract (OpenAPI/Swagger Format)

## Base URL
`/api/payments`

## Endpoints

### 1. Process Payment
**POST** `/`
- **Description:** Processes a payment for a specific approved order.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "orderId": "64bacdef9876543210",
    "paymentMethod": "Credit Card",
    "amount": 31.98
  }
  ```
- **Responses:**
  - `201 Created`: Payment processed, generates automated receipt.
  - `400 Bad Request`: Order already paid or invalid input.
  - `404 Not Found`: Order ID is not found.

### 2. Get Payment by ID
**GET** `/{id}`
- **Description:** Retrieves the receipt details for a specific transaction.
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`: Returns payment details (amount, status, date).
  - `404 Not Found`: Invalid payment ID.

### 3. Get All Payments (Admin)
**GET** `/`
- **Description:** Provides an administrative dashboard view of all money processed through the system.
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`: Array of payment histories across the platform.
