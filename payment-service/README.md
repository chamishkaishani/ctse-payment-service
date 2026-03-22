# Payment Service

Payment microservice for the Online Bookstore system.

## Features

- Process payment records
- Retrieve payments by user
- Admin endpoint to retrieve all payments
- JWT-protected routes

## API

- `POST /payments`
- `GET /payments/:userId`
- `GET /payments` (admin only)
- `GET /health`

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Default port: `5004`
