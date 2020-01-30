const Discord = require("discord.js");
var test = 1
module.exports.run = (client, message, args) => {
    console.log(message.id)    
    message.delete()
    if (test < 2){
        message.channel.send(test).then(msg => {
            idmsg = msg.id;
            console.log(idmsg)
            return(idmsg);
        })

    }
    if(test > 1){
        message.channel.fetchMessage(idmsg).then(msg => msg.edit(test));
    }
    test = test + 1;
}
module.exports.help = {
    name: 'test'
};


//client.on("ready", () => { 
//   client.channels.get("664632351560695808").send("Bot on!");
//});


// client.on('message', message => {
//     if (message.author.bot) {
//         if (message.embeds) {
//             const BuildReact = message.embeds.find(msg => msg.title === 'BuildFight');
//             if (BuildReact) {
//                 message.react('😄')
//                     .catch(err => console.error);
//             }

//         }
//         return;
//     }

//     if (message.content.toLowerCase() === '!build') {
//         playercount = "non";
//         startBuild = "oui"
//         Build = new Discord.RichEmbed();
//         Build.setColor('#0099ff')
//         Build.setTitle('BuildFight');
//         Build.setDescription('React to joind');
//         Build.addField('Regular field title', 'Some value here')
//         message.channel.send(Build);
//         console.log(playercount);
//     }

// });

// client.on('messageReactionAdd', (reaction, user) => {
//     if (user.bot)
//         return;
//     if (playercount === "un") {
//         playerIn = player.push(user.username);
//     } else {
//         playercount = "un";
//         player = [user.username];
//     }
//     console.log(player)
//     embedPlayer = new Discord.RichEmbed();
//     embedPlayer.setTitle('PlayerIn');
//     for (i = 0; i < player.length; i++) {
//         embedPlayer.addField(player[i]);
//     };
//     if (startBuild === "oui") {
//         startBuild = "non";
//         client.channels.get('664633494319661067').send(embedPlayer)
//     };
//     client.on('message', message => {
//         if (message.author.bot) {
//             if (message.embeds) {
//                 const embedPlayerCheck = message.embeds.find(msg => msg.title === 'PlayerIn');
//                 if (embedPlayerCheck) {
//                     message.edit(embedPlayer);
//                 }
//                 console.log("triste")
//                 console.log(startBuild)
//             };

//         };


//     });
// });
