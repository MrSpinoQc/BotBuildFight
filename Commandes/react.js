const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.react('😄');
    console.log("reaction");
};

module.exports.help = {
    name: 'react'
};
