// queries.js
// Week 1 - MongoDB Fundamentals
// Author: [Your Name]
// Description: MongoDB queries demonstrating CRUD, advanced queries, aggregation, and indexing.

const { MongoClient } = require("mongodb");

// 🔗 Update this connection string to match your setup
const uri = "mongodb://127.0.0.1:27017"; // or your MongoDB Atlas URI

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("libraryDB");
    const books = db.collection("books");

    // ────────────────────────────────
    // 📘 TASK 2: BASIC QUERIES (CRUD)
    // ────────────────────────────────

    // 1️⃣ Find all books in a specific genre
    const genre = "Science Fiction";
    const booksByGenre = await books.find({ genre }).toArray();
    console.log("📚 Books in genre:", genre, booksByGenre);

    // 2️⃣ Find books published after a certain year
    const booksAfterYear = await books.find({ published_year: { $gt: 2010 } }).toArray();
    console.log("📖 Books published after 2010:", booksAfterYear);

    // 3️⃣ Find books by a specific author
    const author = "George Orwell";
    const booksByAuthor = await books.find({ author }).toArray();
    console.log("✍️ Books by author:", author, booksByAuthor);

    // 4️⃣ Update the price of a specific book
    const updateResult = await books.updateOne(
      { title: "1984" },
      { $set: { price: 19.99 } }
    );
    console.log("💰 Price updated:", updateResult.modifiedCount);

    // 5️⃣ Delete a book by its title
    const deleteResult = await books.deleteOne({ title: "The Great Gatsby" });
    console.log("🗑️ Book deleted:", deleteResult.deletedCount);

    // ────────────────────────────────
    // 📗 TASK 3: ADVANCED QUERIES
    // ────────────────────────────────

    // 1️⃣ Find books that are both in stock and published after 2010
    const advancedFilter = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 },
    }).toArray();
    console.log("✅ Books in stock & after 2010:", advancedFilter);

    // 2️⃣ Use projection to return only title, author, and price
    const projectedBooks = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log("🎯 Projected books:", projectedBooks);

    // 3️⃣ Sort books by price ascending and descending
    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("⬆️ Books sorted by price (asc):", sortedAsc);
    console.log("⬇️ Books sorted by price (desc):", sortedDesc);

    // 4️⃣ Implement pagination (5 books per page)
    const page = 2; // change this value to move between pages
    const booksPerPage = 5;
    const paginatedBooks = await books.find()
      .skip((page - 1) * booksPerPage)
      .limit(booksPerPage)
      .toArray();
    console.log(`📄 Page ${page} books:`, paginatedBooks);

    // ────────────────────────────────
    // 📙 TASK 4: AGGREGATION PIPELINES
    // ────────────────────────────────

    // 1️⃣ Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
    ]).toArray();
    console.log("💵 Average price by genre:", avgPriceByGenre);

    // 2️⃣ Author with the most books
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 },
    ]).toArray();
    console.log("🏆 Author with the most books:", topAuthor);

    // 3️⃣ Group books by publication decade
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: { $floor: { $divide: ["$published_year", 10] } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          decade: { $multiply: ["$_id", 10] },
          count: 1,
          _id: 0,
        },
      },
      { $sort: { decade: 1 } },
    ]).toArray();
    console.log("📆 Books by decade:", booksByDecade);

    // ────────────────────────────────
    // 📘 TASK 5: INDEXING
    // ────────────────────────────────

    // 1️⃣ Create an index on the title field
    const titleIndex = await books.createIndex({ title: 1 });
    console.log("⚡ Index created on title:", titleIndex);

    // 2️⃣ Create a compound index on author and published_year
    const compoundIndex = await books.createIndex({ author: 1, published_year: -1 });
    console.log("⚡ Compound index created:", compoundIndex);

    // 3️⃣ Use explain() to compare query performance
    const explainBefore = await books.find({ title: "1984" }).explain("executionStats");
    console.log("🔍 Explain before indexing (title query):", explainBefore.executionStats);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();
