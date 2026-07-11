# Investment Platform Backend

# Overview

This project is a backend application built using **Node.js**, **Express.js**, and **MongoDB**. It enables corporates to create investment deals and investors to discover, evaluate, and invest in suitable opportunities through a recommendation engine.

---

## Features

### Authentication & Authorization

* JWT Authentication
* Role-Based Access Control (Investor & Corporate)

### Deal Management

* Create Deal
* Update Deal
* Soft Delete Deal
* Auto Status Update (Open, Partially Filled, Closed)

### Investor Module

* Investor Preferences
* Risk Appetite
* Preferred Industries
* Budget Range

### Smart Recommendation Engine

Deals are recommended using a weighted scoring algorithm:

* Risk Match – 30%
* Industry Match – 25%
* Budget Compatibility – 20%
* ROI Attractiveness – 15%
* Popularity – 10%

### Investment Engine

* Express Interest
* Investment Validation
* Prevent Over-Investment
* Automatic Raised Amount Update

### Analytics

* Total Investors Interested
* Total Amount Raised
* Total Deals
* Conversion Rate

### Advanced Search

* Industry Filter
* Risk Filter
* ROI Filter
* Investment Filter
* Sorting
* Pagination

### Performance

* In-memory Caching
* Optimized MongoDB Queries

### Security

* Password Hashing using bcrypt
* JWT Authentication
* Input Validation
* Role Authorization



## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt.js
* Express Validator



## Folder Structure

```
src
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── utils
└── validators
```

---

## Database Collections

* Users
* Deals
* Investments
* InvestorPreferences

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Deals

POST /api/deals

GET /api/deals

PUT /api/deals/:id

DELETE /api/deals/:id

GET /api/deals/recommended

### Investor

POST /api/investor/preferences

### Investment

POST /api/investments/interest

### Analytics

GET /api/analytics

---

## Installation

```bash
git clone <repository-url>

npm install

npm run dev
```

---

## Environment Variables

```
PORT=

MONGODB_URI=

JWT_SECRET=
```

---

## Seed Data

```bash
node seed.js
```

---

## Future Improvements

* Redis Caching
* Refresh Tokens
* Docker Support
* Unit Testing
* CI/CD Pipeline
* Email Notifications
