import {Client, Message} from "discord.js";
import * as config from "./config.json";

const client:Client = new Client();

client.on("ready", () => {
    console.log("LOL");
});

client.on("message", msg => {

    if(msg.content.toLowerCase().includes("anime")){
        msg.react("🏳️‍🌈");
        msg.react("🇬");
        msg.react("🇦");
        msg.react("🇾");
    }

    if(msg.author.bot) { return; }

    if(!msg.content.startsWith(config.prefix)) { return; }
    
});

client.login(config.token);