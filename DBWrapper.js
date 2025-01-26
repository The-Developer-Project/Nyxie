const db = require('better-sqlite3')('database/database.db');
const crypto = require("crypto");
const {getMugshot} = require("./rblxAPIWrapper.js");
const {getUsernameFromId} = require("./newa.js");
const {smithWaterman} = require("./smithwaterman.js");


function createVerification(id) {
    var rid = crypto.randomBytes(3*4).toString('base64');
    const insertData = db.prepare("INSERT INTO limbo (code, discord_id) VALUES (?, ?);");
    insertData.run(rid.toString(), id.toString());
    return rid;
}

async function acceptVerification(code, ruser) {
    const stmt = db.prepare("SELECT * FROM limbo WHERE code = ?");
    const limboEntry = stmt.get(code);

    const updateUserQuery = `
        UPDATE users
        SET roblox_id = ?
        WHERE discord_id = ?;
    `;

    const insertUserQuery = `
        INSERT INTO users (discord_id, roblox_id, reputation)
        VALUES (?, ?, 0);
    `;

    const updateStmt = db.prepare(updateUserQuery);
    const insertStmt = db.prepare(insertUserQuery);

    // Try updating the user first
    const result = updateStmt.run(ruser, limboEntry.discord_id);

    // If no rows were updated, insert a new user
    if (result.changes === 0) {
        insertStmt.run(limboEntry.discord_id, ruser);
    }

    const deleteLimboStmt = db.prepare("DELETE FROM limbo WHERE discord_id = ?");
    deleteLimboStmt.run(limboEntry.discord_id);
}


function addProduct(user, product) {
    const insertProductStmt = db.prepare(
        `INSERT INTO products (name, description, type, tags, robloxassetid, rating) 
         VALUES (?, ?, ?, ?, ?, ?)`
      );
      const productResult = insertProductStmt.run(
        product.name,
        product.description,
        product.type,
        product.tags,
        product.robloxassetid,
        product.rating
      );

      // Get the product ID of the newly inserted product
      const productId = productResult.lastInsertRowid;

      // Insert an association into the user_products table
      const insertUserProductStmt = db.prepare(
        "INSERT INTO user_products (user_discord_id, product_id) VALUES (?, ?)"
      );
      insertUserProductStmt.run(user, productId);
}

function searchProduct(query) {
    const getAllProductsStmt = db.prepare("SELECT * FROM products");
    const products = getAllProductsStmt.all();

    // Calculate scores for each product
    const scoredProducts = products.map(product => {
        const score = smithWaterman(query, product.name).score;
        return { ...product, score };
    });

    // Sort by score descending and take the top 50
    const topProducts = scoredProducts
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);

    return topProducts;
}

function getUserByRobloxId(id) {
    try {
        const getUserStmt = db.prepare("SELECT * FROM users WHERE roblox_id = ?");
        let user = getUserStmt.get(id);
        user.success = true;
        return user
    }
    catch {
        return {"success": false};
    }
}

function getProductById(id) {
    try {
        const getStmt = db.prepare("SELECT * FROM products WHERE product_id = ?");
        let product = getStmt.get(Number(id));
        product.success = true;
        return product
    }
    catch {
        return {"success": false};
    }
}

function getDiscordIdByProductID(id) {
    try {
        const getStmt = db.prepare("SELECT * FROM user_products WHERE product_id = ?");
        let box = getStmt.get(Number(id));
        return {"success": true, "id": box.user_discord_id}
    }
    catch {
        return {"success": false};
    }
}

module.exports = { createVerification, acceptVerification, addProduct, searchProduct, getUserByRobloxId, getProductById,  getDiscordIdByProductID}