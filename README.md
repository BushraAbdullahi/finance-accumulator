# Finance Accumulator

Finance Accumulator is a Node.js app, which allows users to connect to their Revolut and Stripe accounts, and automatically import statistics of income (expenses/income) from:

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