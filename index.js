const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const startbot  = require("./startbot")
const BuildFightFunction = require("./ChannelBuild")
const inscription = require("./inscription")
const GameLunch = require("./gamelunch")
var mysql = require('mysql')
client.login('NjY0NjMyNjY1MTUyMTU5NzY0.XjNRGw.eM0M1PovYpd39JVRm6LebQF6940')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "BuildFight"
});

client.on("ready", () => { 
    startbot.startboton(client)
});

connection.connect(function(err){
    if(err) throw err;
    console.log("La connection a la base de donnez a bien etes fait!");
});



fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
    let commandes = f.filter(f => f.split('.').pop() === 'js');
    if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);
        client.commands.set(commande.help.name, commande);
    });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./Events/${f}`);
        let event = f.split('.')[0];
        client.on(event, events.bind(null, client));
    });
});


client.on('message', message => {
    BuildFightFunction.BuildFightFunction(client, message, connection)
    inscription.inscription(client, message, connection)
    GameLunch.GameLunchBotReaction(client, message)
});

client.on('messageReactionAdd', (reaction, user) => {
    GameLunch.GameLunch(client, connection, reaction, user)

});
