const fs = require('fs');

const parseAndAddTime = (c, timeString) => {
    const [minutes, hours, days, weeks, months, years] = timeString
        .split("/")
        .map((value) => parseInt(value, 10) || 0);
    const currentDate = c;
    if (minutes) currentDate.setMinutes(currentDate.getMinutes() + minutes);
    if (hours) currentDate.setHours(currentDate.getHours() + hours);
    if (days) currentDate.setDate(currentDate.getDate() + days);
    if (weeks) currentDate.setDate(currentDate.getDate() + weeks * 7);
    if (months) currentDate.setMonth(currentDate.getMonth() + months);
    if (years) currentDate.setFullYear(currentDate.getFullYear() + years);
    return currentDate;
};

function getGiveaway(by, value) {
    let rawdata = fs.readFileSync('giveaways.json'); 
    let giveaways = JSON.parse(rawdata).giveaways;
    for (let i = 0; i < giveaways.length; i++) {
        if (giveaways[i][by] == value) {
            return [giveaways[i], i, giveaways];
        }
    }
    return;
}

function editGiveaway(pos, value, giveawayl) {
    let giveaways = giveawayl;
    giveaways[pos] = value;
    let data = JSON.stringify({"giveaways": giveaways});
    fs.writeFileSync('giveaways.json', data);
} 


function createGiveaway(c, f, giveaway) {
    try {
        let future = f;
        let now = c;
        if (future < now) return false;
        let rawdata = fs.readFileSync('giveaways.json'); 
        let giveaways = JSON.parse(rawdata).giveaways;
        let image = giveaway[6];
        image ??= "";
        let d = 
        {
            "channelId": giveaway[0],
            "messageId": giveaway[1],
            "expiry": future.toISOString(),
            "title": giveaway[3],
            "description": giveaway[4],
            "winners": Number(giveaway[5]),
            "image": image,
            "participants": [],
            "host": giveaway[7]
        };
        giveaways.push(d);
        let data = JSON.stringify({"giveaways": giveaways});
        fs.writeFileSync('giveaways.json', data);
        return d;
    }
    catch (error) {
        console.log(error);
        return {"error": error};

    }
    
}

function shuffleGiveaway(giveaway) {
    if (!giveaway) return;
    let array = giveaway.participants;
    let shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j] = shuffledArray[j], shuffledArray[i]]
    }

    let newGiveaway = giveaway;
    newGiveaway.participants = shuffledArray;

    return newGiveaway;
    
}

function addplayerToGiveaway(id, uid) {
    let giveaway = getGiveaway("messageId", id);
    if (!giveaway) return {"same": 1};
    let array = giveaway[0].participants;
    if (array.indexOf(uid) != -1) return {"same": 1};
    array.push(uid);
    let shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j] = shuffledArray[j], shuffledArray[i]]
    }

    let newGiveaway = giveaway[0];
    newGiveaway.participants = shuffledArray;

    editGiveaway(giveaway[1], newGiveaway, giveaway[2]);
    return newGiveaway;
    
}

function removePlayerFromGiveaway(id, uid) {
    let giveaway = getGiveaway("messageId", id);
    if (!giveaway) return;
    let array = giveaway[0].participants;
    array.splice(array.indexOf(uid), 1);
    let shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j] = shuffledArray[j], shuffledArray[i]]
    }

    let newGiveaway = giveaway[0];
    newGiveaway.participants = shuffledArray;

    editGiveaway(giveaway[1], newGiveaway, giveaway[2]);

    console.log(2);
    console.log(newGiveaway);
    return newGiveaway;
    
}

function checkGiveaways() {
    let rawdata = fs.readFileSync('giveaways.json'); 
    let giveaways = JSON.parse(rawdata).giveaways;
    let expired = [];
    
    const now = new Date();

    // Filter out expired giveaways
    let ngiveaways = giveaways.filter(giveaway => {
        if (now >= new Date(giveaway.expiry)) {
            expired.push(giveaway);
            return false; // Remove this item
        }
        return true;
    });

    // Save updated giveaways list
    let data = JSON.stringify({ "giveaways": ngiveaways });
    fs.writeFileSync('giveaways.json', data);

    return expired;
}

module.exports = {createGiveaway, addplayerToGiveaway, removePlayerFromGiveaway, checkGiveaways, parseAndAddTime, shuffleGiveaway}