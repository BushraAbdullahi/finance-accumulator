# Finance Accumulator

Finance Accumulator is a Node.js app, which allows users to connect to their business accounts, and automatically import statistics of income (expenses/income) from:

- **Stripe** (for business income), being able to retrieve:
  - Income associated with the business
  - Tax documents
  - Expense invoices (if available)
  - Refunded payments

- **PayPal Business**, being able to retrieve:
  - Income associated with the business
  - Tax documents
  - Expense invoices (if available)
  - Refunded payments

- **Shopify**, being able to retrieve:
  - Income associated with an online shop
  - Paid invoice details
  - Refunded invoices

![Diagram](https://www.plantuml.com/plantuml/svg/ZLDDRzim3BthLn2z1xtxCDHmzf4XwTnwNGz13wpCE4HioP2fOi6G_pxOZXF7KO0UTE5xZzJZnqCZwCHNfHAMak0R6pIQ8DRQLxv4iGvYfxSifCKxKgf6lSE2u2v-pUxWdm8uHUPMxyX1OeqW6t8zF28ysfn-PX3NzG01h9TeSZO5f5ZGsn3Cn75Di312XKDXQqvGYliKoo2KRMtDctqGcwFWEpRXd2yDEOYzRCa8wqiizc8h5ChXDpNIzF63Qj-5-MF-mTbwjS-UbczNl6HndymXvPfADcVsTvOV_XrYtTO-5badDYTjFwwJhAnXiOvDSKgGbQXtKtC7TL0ATJl5rg9IdT7PxCkaxH317svOHdXW0X2DUqGZSc0cjycXAKtPAbY_amS72H4igjewWHPMmGzzNXtyuQVbwWQhIz1l1KIGYNKq2Cw7CTIPd5AhUFO65gRXd5G0xsJnQzOovrINTayv_3AXvDEDXWXISXlhgZwWhXcTxd9rXoyT9LEmKqos6YBu-fUq5peHRmY7pOS8LeIDTmI9_I271OKSXUwtxJ4NPlPItozjmS5EdE-eevF98Ix9jNx6KB-sLmS64JnQuSrUgGSokQ_A_m00)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)


## Features

- Connect to Stripe, PayPal, and Shopify accounts.
- Import income, tax documents, expense invoices, and refunded payments.
- Store financial data in a MySQL database.
- User authentication and session management.
- Automated testing with unit tests, integration tests, and end-to-end tests.
- Continuous integration and deployment using GitHub Actions.
- Monitoring and alerts via Slack.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- Docker
- AWS account
- MySQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BushraAbdullahi/finance-accumulator.git
   cd finance-accumulator