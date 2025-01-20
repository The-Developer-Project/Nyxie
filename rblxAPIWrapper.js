import fetch from 'node-fetch';

async function getUserFromUsername(name) {
    const url = "https://users.roblox.com/v1/usernames/users";
    const params = `{"usernames": ["${name}"],"excludeBannedUsers": false}`;
    const response = await fetch(url, {method: 'POST', body: params});
    const json = await response.json();
    return json.data[0];
}

async function getMugshot(id, size=100) {
    const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=${size}x${size}&format=Png`;
    const response = await fetch(url);
    const json = await response.json();
    return json.data[0].imageUrl;
}

async function getFriendCount(id) {
    const url = `https://friends.roblox.com/v1/users/${id}/friends/count`;
    const response = await fetch(url);
    const json = await response.json();
    return json.count;
}

async function getFollowerCount(id) {
    const url = `https://friends.roblox.com/v1/users/${id}/followers/count`;
    const response = await fetch(url);
    const json = await response.json();
    return json.count;
}

export { getUserFromUsername, getMugshot, getFriendCount, getFollowerCount };