import fetch from 'node-fetch';

async function getUsernameFromId(id) {
    const url = `https://users.roblox.com/v1/users/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.name;
}

export { getUsernameFromId};