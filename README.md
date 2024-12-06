Overview of Book-Shop:

> Book Shop is a web application developed with Express, TypeScript, and MongoDB. 
> It allows users to manage a bookstore by performing tasks such as adding, updating, and retrieving book information, placing orders, and calculating revenue from orders.
> The application uses Mongoose to interact with the MongoDB database and ensures data integrity with schema validation.

Live Production Link : https://book-shop-server-chi.vercel.app/


🌟Features:

> Product Management: Add, get, update, and delete books.
> Search: Books can be searched by title, author, or category using searchTerm=category.
> Order Placement: Place an order for a book.
> Inventory Management: Decreases book quantity when an order is placed.
> Stock Management: Handles insufficient stock and updates the book's availability status(inStock).
> Revenue Calculation: Calculates total revenue from all orders using MongoDB aggregation.

Getting Started🚀
=================
Follow these steps to set up and run the project locally:

Prerequisites
Make sure you have the following installed:

> Node.js (LTS version recommended)
> MongoDB (locally or use a cloud-based solution like MongoDB Atlas)
> npm (Node Package Manager)

Installation:
-------------

1.Clone the repository: https://github.com/arifanadia/Book-Shop-Server.git
2.Navigate to the project directory: cd book-shop
3. npm install
4.Set up the environment variables:
  > Create a .env file in the root directory of the project.
  > Add the following environment variables:

    DATABASE_URL=<Your Mongo_URI>
    PORT=<Your Available port>

Running the Application: npm run dev 
"it will be running your localhost"

Testing:
========
You can use Postman or any other API testing tool to test the application endpoints.

⚙️Technologies Used:
---------------------
> Express: For building the server and handling routes.
> TypeScript: For static typing and improved developer experience.
> MongoDB: For database management.
> Mongoose: For data modeling and schema validation.
