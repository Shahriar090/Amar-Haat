# AAmar Haat
## A multi vendor E-Commerce web application 
### Aamar Haat is a multi-vendor full‑stack e‑commerce platform where multiple vendors can sell their products following the application's protocols. The project started with the MERN stack, but the long‑term goal is to integrate other languages, databases, and technologies whenever needed to improve robustness, scalability, and user experience.

## Current Development Status
### I am currently working on the authentication module, implementing a hybrid JWT + Session‑based authentication system. Pure JWT‑based authorization is not sufficient for a multi‑vendor e‑commerce platform where security, session tracking, and revocation control are critical. The hybrid approach allows better control, safer logout flows, per‑device session management, and stronger security.

## Project Overview
### This repository implements a MERN (MongoDB, Express, React, Node) multi-vendor e-commerce application. Vendors can register, list products, and manage orders. Customers can browse, search, filter, and purchase products from multiple vendors. Admins manage vendors, users, and platform settings.

**NOTE**: ***This README focuses on practical setup, hard constraints, and operational guidance. Read it before you change authentication, database schemas, or deployment settings.***

## Key Features
- Multi-vendor onboarding and vendor-specific dashboards
- Product CRUD with categories, variants, images
- Cart, checkout, order lifecycle (placed → confirmed → shipped → delivered → cancelled/returned)
- Payment gateway integration (placeholder for Stripe/PayPal/SSL Commerz) — keep credentials secure
- Role-based access control: admin, vendor, customer (and guest)
- Reviews, ratings, and reporting for products and vendors
- Admin panel: user/vendor/product/order management
- Search (text index), filters, pagination, sorting, and basic recommendations
- Audit logs & basic analytics (views, conversions, seller performance)


## Tech Stack & Architecture
* Backend: Node.js + Express.
* Database: MongoDB (+ Mongoose ODM).
* Frontend: React.JS with React Router.
* State management: Context API, Redux Toolkit or React Query (Pick one of them or use multiple approach based on project's needs).
* Auth: Hybrid approach (short-lived JWT for APIs + server-stored sessions for revocation/control). Use secure HttpOnly cookies for tokens
* File storage: Local uploads/ for dev. Cloudinary for production.

**Architecture note (strict)**: ***keep domain logic out of controllers. Controllers orchestrate, services contain business rules, Data Source handle DB. If you're mixing business logic in controllers, stop. Refactor.***

## Prerequisites

* Node.js (LTS >= 18)
* PNPM
* MongoDB / MongoDB Compass
* Git & GitHub

## Environment Variables
Create a .env file in both /server and /client. Example .env.example (values must be replaced):

## SERVER
MONGODB_URI='YOUR MONGODB URI'

PORT=7000

NODE_ENV='development'

BCRYPT_SALT_ROUND=12

ACCESS_TOKEN_SECRET=''

ACCESS_TOKEN_EXPIRY=20m

REFRESH_TOKEN_SECRET=''

REFRESH_TOKEN_EXPIRY=7d



## CLIENT (Will be implemented)
REACT_APP_API_URL=http://localhost:5000/api

**Security rule:** ***never commit real secrets. Ever. Add .env to .gitignore.***

## Installation (Local Development)

**Clone the repo**
```
git clone https://github.com/Shahriar090/Amar-Haat.git
```
**Navigate to the right directory api/web**
```
cd aamar-haat/api
```
**Install dependencies**
```
pnpm install
```
**Start development mode**
```
pnpm run start:dev
```
**OR start in production mode (after building)**
```
npm run build
```
```
npm start
```
**Note:** ***Make sure to create a .env file based on .env.example before running the server.***

## Folder Structure

### This project is following Monorepo structure where I have separated Cient & Server side into api and web folders within the root folder. Here is the high level folder structure of the server side (api) and I will update this Readme after organizing client (web) side.

* **Aamar Haat** => Root
* **.husky** => For monitoring structured git commit messages
* **apps** => Within this folder I have created client and server side
* **shared** => Shared zod schema and infered types to re-use across client and server
* **.commitlinterrc.json** => Conventions to follow before pushing each commit message to git
* **gitignore** => Storing all files which should never tracked by git
* **biome.json** => All linting and formatting rules
* **package.json** => Root package.json of the monorepo
* **tsconfig.base.json** => Root TypeScript configuration files of the monorepo

### Within the apps Folder

* **api** => Containing all server side logic
* **web** => Containing all client side logic

### Within api folder

* **dist** => JS compiled code
* **src** => Organizing server side folders and containing app.ts and server.ts (entry point)
* **app** => This folder is organizing all other server side folders
* **config** => Within this folder validating the environment variables and exporting them from a central place 
* **errors** => All server side error handling logic will be within this folder
* **middlewares** => All server side middleware will be within this folder
* **module_routes** => Organizing all routes in a central place
* **modules** => Containing each separate module of the server side such as user, auth, product, etc.
* **utils** => Containing server side utility functions
