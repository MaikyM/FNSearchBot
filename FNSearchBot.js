const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

var tokenBot = "<token here>";

client.on('ready', () => {
    console.log("Logged");
});

client.on('message', msg => {

    if (msg.content.startsWith("!"))
    {
        let textFull = msg.content.substr(1);
        let textCommand = textFull.split(" ");
        let command = textCommand[0];
        let text = textCommand.splice(1).join(" ");

        if (command == "search")
        {
            axios({
                url: "http://benbotfn.tk:8080/api/cosmetics/search",
                params: { displayName: text },
                method: "GET",
                responsType: "json"
            }).then(data => {
                var benResult = data.data;

                let embed = new Discord.RichEmbed()
                .setThumbnail(benResult.icon)
                .setColor("#ff8000")
                .setDescription("Search result")
                .addField("Name:", benResult.displayName)
                .addField("Description:", benResult.description)
                .addField("Type:", benResult.type)
                .addField("Rarity:", benResult.rarity)
                .addField("ID:", benResult.id);

                return msg.channel.send(embed);
            });
        }
    }
});

client.login(tokenBot);
