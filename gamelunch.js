const Discord = require("discord.js");


function GameLunch(client, connection, reaction, user){
    if (reaction.message.channel.id === '669504006514671636'){
        if(user.bot) return;
            connection.query(`SELECT * FROM bf1v1 WHERE idGAME = ${reaction.message.id}`, (err, result) => {
                if (err) throw err;
                if (result[0].player1 === user.id || result[0].player2 === user.id)
                    if (reaction.emoji.name === '🚫'){
                        connection.query(`DELETE FROM bf1v1 WHERE idGAME = ${reaction.message.id}`, (err, result) => {
                            if (err) throw err;
                            reaction.message.delete()
                        // message.channel.fetchMessage(reaction.message.id).then(msg => msg.delete());
                        });
                    }
                    if (reaction.emoji.name === '⚔️'){
                        if (result[0].player1 === user.id)
                        connection.query(`UPDATE bf1v1 SET player1YES = 'YES' WHERE idGAME = '${reaction.message.id}'`, err=> {
                            if (err) throw err;
                        });
                        if (result[0].player2 === user.id)
                        connection.query(`UPDATE bf1v1 SET player2YES = 'YES' WHERE idGAME = '${reaction.message.id}'`, err=> {
                            if (err) throw err;
                        });
                    }
            });

    }
    

}

function GameLunchBotReaction(client, message){
    if (message.channel.id === '669504006514671636'){
        if (message.author.bot) {
            if (message.embeds) {
                const BuildReact = message.embeds.find(msg => msg.title === 'BuilfFight 1v1');
                        if (BuildReact) {
                            message.react('⚔️')
                            message.react('🚫')
                            .catch(err => console.error);
                        }
            
                }
                return;
        }
    }
}

module.exports.GameLunch = GameLunch;
module.exports.GameLunchBotReaction = GameLunchBotReaction;