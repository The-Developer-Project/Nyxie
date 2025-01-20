import fetch from 'node-fetch';
import fs from 'fs';
import { findClosest } from './smithwaterman.js';

const baseDocURL = "https://create.roblox.com/docs/_next/data/ofZlJv4spcQMeb_i2p8Gu/en-us/reference/engine/";
const robloxEngineDocURL = "https://create.roblox.com/docs/_next/data/ofZlJv4spcQMeb_i2p8Gu/en-us/reference/engine.json";
const bdfu = "https://create.roblox.com/docs/en-us/reference/engine/";
let settings = { method: "Get" };

async function updateRobloxDoc() {
    console.log("Updating All Roblox Docs");
    console.log(fetch);

    fetch(robloxEngineDocURL, settings)
    .then(res => res.json())
    .then((json) => {
        let rawdata = fs.readFileSync('robloxDocCache.json');
        let fala= JSON.parse(rawdata);
        let Data = fala.Data;

        let r = json.pageProps.data.references;
        let typos = ["Class", "DataType", "Enum", "Library"];
        for (let i=0;i<typos.length;i++) {
            let d = typos[i];
            let content = r[d];
            for (let x=0;x<content.length;x++) {
                let name = content[x];
                if (!Data[name]) {
                    Data[name] = {};
                }
                Data[name].name = name;
                Data[name].typo = d;

            }
        }
        fala.Data = Data;
        let dad = JSON.stringify(fala);
        fs.writeFileSync('robloxDocCache.json', dad);
        Object.keys(Data).forEach(async function(key) {
            await updateDoc(key);
          });
        console.log("Updated Roblox Docs");
    });
}

async function updateDoc(id) {
    let rawdata = fs.readFileSync('robloxDocCache.json');
    let fala= JSON.parse(rawdata);
    let Data = fala.Data;
    if (!Data[id]) {
        Data[id] = {};
        Data[id].name = id;
        Data[id].typo = "Class";
    }
    let tel = "";
    switch(Data[id].typo) {
        case "Class":
            tel = "classes";
            break;
        case "DataType":
            tel = "datatypes";
            break;
        case "Enum":
            tel = "enums";
            break;
        case "Library":
            tel = "libraries";
            break;
    }
    let url = `${baseDocURL}${tel}/${Data[id].name}.json`;
    try {
        console.log(`GET ${url}`);
        const response = await fetch(url);
        const json = await response.json();
        Data[id].description = json.pageProps.data.description;
        let a = json.pageProps.data.apiReference;
        Data[id].category = a.category;
        Data[id].memoryCategory = a.memoryCategory;
        Data[id].url = `${bdfu}${tel}/${Data[id].name}`
        console.log(Data[id]);
        console.log(Data[id]);
        console.log(Data[id]);
        fala.Data = Data;
        let dad = JSON.stringify(fala);
        fs.writeFileSync('robloxDocCache.json', dad);
    } catch (error) {
        console.log(`ERROR GETTING ${url}, ${error}`);
    }

}

async function checkForUpdate() {
    let rawdata = fs.readFileSync('robloxDocCache.json');
    let fala= JSON.parse(rawdata);
    let Data = fala.lastUpdated;
    let update = false;
    let today = new Date();
    if (Data != "Never") {
        let old = Data;
        if (Math.floor((today - old) / 1000 / 60 / 60 / 24) >= 30) {
            update = true;
        }
    } else update = true;
    if (update) {
        console.log("Updating Roblox Docs");
        await updateRobloxDoc()
        fala.lastUpdated = today;
        let dad = JSON.stringify(fala);
        fs.writeFileSync('robloxDocCache.json', dad);
        console.log("Done Updating Roblox Docs");
    }
}

async function refer(n) {
    let names = [];
    let rawdata = fs.readFileSync('robloxDocCache.json');
    let fala= JSON.parse(rawdata);
    let Data = fala.Data;
    Object.keys(Data).forEach(function(key) {
        names.push(key);
      });
    let k = findClosest(n, names);
    if (!Data[k].description) {
        await updateDoc(k);
        let rawdat = fs.readFileSync('robloxDocCache.json');
        let fa= JSON.parse(rawdat);
        Data = fa.Data;
    }
    return Data[k];
}

export { checkForUpdate, refer };