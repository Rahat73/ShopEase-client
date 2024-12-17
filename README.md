# Project Name : Shopease

## Live website link : https://shopease-xi.vercel.app

### Server github link : https://github.com/Rahat73/ShopEase-server

## Introduction

**_Purrfect Care_** : _ShopEase is your ultimate online shopping destination, offering a seamless experience with a wide range of products, exclusive deals, and user-friendly features. From top-quality essentials to the latest trends, ShopEase ensures convenience, affordability, and satisfaction for every shopper. Shop smarter, live better with ShopEase!._

## Project Description

ShopEase is a robust e-commerce platform designed to deliver a seamless and engaging online shopping experience. The website features a wide range of functionalities, including product listings, user reviews, and personalized recommendations. Users can effortlessly browse products, add items to their cart, compare products, and make secure purchases. ShopEase also includes advanced features like recently viewed products, a comprehensive review system, and product sorting based on vendor-following priority. With vendor management, responsive design, and dynamic dark/light mode for enhanced usability, the platform ensures a user-friendly experience. Additionally, secure authentication, profile management, and a streamlined order system make ShopEase a convenient, efficient, and enjoyable shopping destination for both vendors and customers.

## Features

1. **User Authentication & Management:**

- Secure user registration and login functionality.
- Role-based access control for Admins, Vendors and Customers.
- Vendors can manage their profiles, add products, and handle orders efficiently.
- Admins can manage users, monitor transactions, manage categories.

2. **Product Management:**

- Vendors can create, update, and manage their products with detailed information such as name, description, images, price, and stock availability.
- Products can include discount options, allowing vendors to offer promotions.

3. **Cart & Checkout System:**

- Customers can leave ratings and reviews for products they’ve purchased, sharing feedback with vendors and other buyers.
- Vendors can reply to customer reviews to build trust and improve communication.

4. **Product Reviews & Replies:**

- Customers can leave ratings and reviews for products they’ve purchased, sharing feedback with vendors and other buyers.
- Vendors can reply to customer reviews to build trust and improve communication.

5. **Product Comparison:**

- Customers can compare multiple products side by side, helping them make informed purchasing decisions.
- Users can only compare products that are in same category.

6. **Recently Viewed Products:**

- A personalized section displaying recently viewed products for quick access and convenience.

7. **Search, Filtering, and Sorting:**

- Advanced filtering and sorting options (e.g., price, popularity, discounts) to refine search results.

8. **Order Management:**

- Vendors can view and manage incoming customer orders, including tracking statuses like pending, shipped, and completed.
- Customers can track their order history with order details and order statuses for better transparency.

9. **Dynamic Review System:**

- Customers can submit reviews for each order to ensure feedback is specific and relevant.

10. **Vendor Dashboard:**

- Vendors have a dedicated dashboard to manage products, orders, and customer reviews.
- Insights on product sales and customer engagement help vendors optimize their offerings.

11. **Admin Dashboard:**

- Admin can monitor user activities, manage vendors, and block suspicious accounts or vendors.
- Oversee product listings and ensure platform quality by moderating content.

12. **Secure Payment System:**

- Integrated payment processing ensuring smooth and secure transactions.

13. **Error Handling & Notifications:**

- Real-time notifications for differecnt kinds of actions taken by users.
- Proper error handling with toast notifications to enhance the overall user experience.

14. **Responsive Design:**

- A fully responsive layout ensuring a seamless experience across all devices, including mobile, tablet, and desktop.

15. **Dark/Light Mode:**

- A dynamic theme toggle allowing users to switch between dark and light modes for a better browsing experience.

## Technology Stack

- Frontend: TypeScript, Next.js, Next UI, Tailwind, Framer Motion, Tanstack Query, Axios, React-hook-form, ZOD etc.
- Backend: TypeScript, Node JS, Express JS, PostgresSQL, Prisma ORM, ZOD, AmarPay, Clodinary, Multer, Node Mailer etc.

## Installation Guideline

### Prerequisites

- node, npm must be installed before running the project

### Configure frontend

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
NEXT_PUBLIC_BASE_API --> put the base url of your local server
```

- Run Command `yarn install` to install required modules
- Run command `yarn run dev` to start the server

### Configure server

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
DATABASE_URL= your postgresql database url
DIRECT_URL= your postgresql direct url
ENABLE_PRISMA_CACHING=false
NODE_ENV=development
JWT_SECRET= your jwt secret
EXPIRES_IN= jwt access token expire time
RESET_PASS_SECRET= your jwt secret
RESET_PASS_TOKEN_EXPIRES_IN= expire time
RESET_PASS_LINK= [localhost address]/forgot-password
EMAIL= your email
APP_PASS= your google account pass
CLOUD_NAME= your cloudinary name
CLOUDINARY_API_KEY= your cloudinary api key
CLOUDINARY_API_SECRET= your cloudinary api secret
STORE_ID= aamarpay store id
SIGNATURE_KEY= aamarpay signature key
PAYMENT_URL= aamarpay payment url
PAYMENT_VERIFICATION_URL= aamarpay varification url
```

- Run Command `yarn install` to install required modules
- Run command `yarn dev` to start the server
