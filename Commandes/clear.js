const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('Administrateur')) { return message.channel.send('Vous n\'avez pas les permissions !'); }
    if (!args[0]) { return message.channel.send('Vous devez spécifier un nombre de messages à supprimer !'); }
    else if (isNaN(args[0])) { return message.channel.send('Veuillez spécifier un nombre !'); }     
                                                            
        message.channel.bulkDelete(args[0])
            .then((messages) => {
                message.channel.send(`**${messages.size}** messages ont été supprimés !`).then(message => message.delete(4000));
                client.channels.get("664632351560695808").send(`**${messages.size}** messages ont été supprimés par ${message.author}`);
            });
};

module.exports.help = {
    name: 'clear'
};