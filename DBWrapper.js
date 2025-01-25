const db = require('better-sqlite3')('database/database.db');
const crypto = require("crypto");
const {getMugshot} = require("./rblxAPIWrapper.js");
const {getUsernameFromId} = require("./newa.js");


function createVerification(id) {
    var rid = crypto.randomBytes(3*4).toString('base64');
    const insertData = db.prepare("INSERT INTO limbo (code, discord_id) VALUES (?, ?);");
    insertData.run(rid.toString(), id.toString());
    return rid;
}

async function acceptVerification(code, ruser) {
    const stmt = db.prepare("SELECT * FROM limbo WHERE code = ?");
    const limboEntry = stmt.get(code);
    const rusername = await getUsernameFromId(ruser);
    const mug = await getMugshot(ruser);
    const deleteUserQuery = `
        DELETE FROM users
        WHERE discord_id = ? OR roblox_id = ?;
    `;
    const insertUserQuery = `
        INSERT INTO users (discord_id, roblox_id, reputation)
        VALUES (?, ?, 0);
    `;
    const deleteStmt = db.prepare(deleteUserQuery);
    const insertStmt = db.prepare(insertUserQuery);
    deleteStmt.run(limboEntry.discord_id, ruser);
    insertStmt.run(limboEntry.discord_id, ruser);
}

module.exports = { createVerification, acceptVerification }