📘 MongoDB Fundamentals – Week 1 Assignment
🧩 Overview

This project demonstrates how to use MongoDB with Node.js to perform core database operations and analysis tasks.
It includes two main scripts:

insert_books.js – Populates your MongoDB database with sample data.

queries.js – Contains all MongoDB queries for CRUD operations, advanced filters, aggregation pipelines, and indexing.

Both scripts use the official MongoDB Node.js driver to interact with the database.

⚙️ Setup Requirements

Before running the scripts, make sure you have the following installed:

MongoDB Community Edition
 or a MongoDB Atlas
 account

Node.js
 (includes npm)

MongoDB Shell (mongosh)

Check installation with:

node -v
npm -v
mongosh --version


Install the MongoDB driver:

npm install mongodb

🗃️ Database Information

Database name: plp_bookstore

Collection name: books

All data and queries in these scripts use the above database and collection names.

🚀 How to Run the Scripts
1️⃣ insert_books.js

Purpose:
This script connects to MongoDB, clears any existing data, and inserts a new set of 15 sample books.
Each book document contains:

title

author

genre

price

published_year

in_stock

Run command:

node insert_books.js


What happens when you run it:

Connects to MongoDB (plp_bookstore)

Deletes all existing documents in the books collection (to avoid duplicates)

Inserts sample book data

Displays how many books were added

Closes the database connection

Example Output:

✅ Connected to MongoDB
🧹 Cleared existing data from 'books' collection.
✅ Successfully inserted 10 books into 'books' collection.
🔒 Connection closed.


Verify the data in Mongo Shell or Compass:

mongosh
use plp_bookstore
db.books.find().pretty()

2️⃣ queries.js

Purpose:
This script contains a comprehensive set of MongoDB queries demonstrating your understanding of:

CRUD operations

Advanced filters and projections

Sorting and pagination

Aggregation pipelines

Indexing and performance analysis

Run command:

node queries.js


What happens when you run it:

Connects to MongoDB and selects the plp_bookstore database.

Executes multiple query examples grouped by task.

🔹 CRUD Queries

Find books by genre, author, or publication year.

Update a book’s price.

Delete a book by title.

🔹 Advanced Queries

Find books that are in stock and published after 2010.

Use projection to show only title, author, and price fields.

Sort books by price (ascending and descending).

Implement pagination with .limit() and .skip() (5 books per page).

🔹 Aggregation Pipelines

Calculate the average price of books by genre.

Find the author with the most books.

Group books by publication decade and count how many were published per decade.

🔹 Indexing

Create a single-field index on title.

Create a compound index on author and published_year.

Use the explain() method to show performance improvements for indexed queries.

Example Output:

✅ Connected to MongoDB
📚 Books in genre: Science Fiction [...]
💵 Average price by genre [...]
⚡ Index created on title: title_1
🔒 Connection closed

🧠 Script Dependencies

Both scripts use:

const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017"; // or your MongoDB Atlas URI


If you’re using MongoDB Atlas, replace the uri value with your connection string:

const uri = "mongodb+srv://nganduterrence0_db_user:terrymild1@cluster0.ap9qg1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;

📸 Submission Notes

Your submission should include:

insert_books.js

queries.js

README.md

Screenshot of your MongoDB Compass or Atlas showing the plp_bookstore and books collection with sample data

Commit and push to your GitHub Classroom repository:

git add .
git commit -m "Completed MongoDB Fundamentals Week 1 scripts"
git push origin main

✅ Expected Outcome

After running both scripts:

Your MongoDB database should contain 15 sample books.

All queries in queries.js should execute successfully and log output in the terminal.

Aggregation and indexing results should show correct calculations and optimizations.