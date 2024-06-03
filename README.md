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

![Diagram](https://www.plantuml.com/plantuml/svg/ZLDDRzim3BtpLn2z1xtxCDHmzf4XBT9vHG-13wpCEK9ioP2fOi6G_px8ZlDXgq0FFfZlyP4K7nyw8IU-gK6qr8pVj26Z65EbVEDh4kimTMgdXPLunm0jgJrLZ7VfQtw7_m3n75bQjMU7cJL2sh0Ru2l2aotvPuvfsuuGudPDfjIcmWrLN8p1N9nk6LT6k78asfepjA73XkeebEzig_ySejYIXDweYsk-TEmmzR9Z8rhTOgaNsv1mYR-vasw87o5yDyEVzCV9je-7_7bTp7ZPwZvRuaQtN6jpON_NyiE_OQf2xLEHRMPBLlPzBl9eZHRhjAdE0dbDQZyTxWX7059XYs54W7xGnUBBzDalySZBOtBzDdn5ZkpYOt9iErDsj7oV7TqV9hXgMki40mpHVZwV7Mtmq-dm0QiN6Co02UPY7Oy9btiOwqmkg81vQ62chtaHKvYvTHOPUBSs39tzycPWm0piCoOEnGI__cNbmzAY_D6ycFIocDbtTbHnhElO_ON7qfLPlBJtQrjf4ykxt441rpydmyrE8jYjPYSTm0ERqZVrVm00)

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