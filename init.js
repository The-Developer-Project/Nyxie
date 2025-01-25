console.log("creating DB");
const db = require('better-sqlite3')('database/database.db', { verbose: console.log });
db.prepare("CREATE TABLE users (discord_id TEXT PRIMARY KEY, roblox_id TEXT, reputation INTEGER);").run();
db.prepare("CREATE TABLE products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, type TEXT, tags TEXT, robloxassetid TEXT, rating INTEGER);").run();
db.prepare("CREATE TABLE user_products (user_discord_id TEXT, product_id INTEGER, FOREIGN KEY(user_discord_id) REFERENCES users(discord_id), FOREIGN KEY(product_id) REFERENCES products(product_id), PRIMARY KEY(user_discord_id, product_id));").run();
db.prepare("CREATE TABLE limbo (code TEXT PRIMARY KEY, discord_id TEXT);").run();
console.log("created DB");
db.close();