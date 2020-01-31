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
                        });
                    }
                    if (reaction.emoji.name === '⚔️'){
                        if (result[0].player1 === user.id)
                        connection.query(`UPDATE bf1v1 SET player1YES = 'YES' WHERE idGAME = '${reaction.message.id}'`, err=> {
                            if (err) throw err;
                            doublesyes(reaction, connection)
                        });
                        if (result[0].player2 === user.id)
                        connection.query(`UPDATE bf1v1 SET player2YES = 'YES' WHERE idGAME = '${reaction.message.id}'`, err=> {
                            if (err) throw err;
                            doublesyes(reaction, connection)
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


function doublesyes(reaction, connection){
    connection.query(`SELECT * FROM bf1v1 WHERE idGAME = ${reaction.message.id}`, (err, result) => {
        if (err) throw err;
        var player1YES = result[0].player1YES
        var player2YES = result[0].player2YES
        var player1 = result[0].player1
        var player2 = result[0].player2
        var player1ELO = result[0].player1ELO
        var player2ELO = result[0].player2ELO

        console.log(player1YES + player2YES)
        connection.query(`SELECT * FROM userepic WHERE userID IN (${player1},${player2})`,(err, result) => {
            if (err) throw err;
            console.log(result)
            if (player1YES === 'YES' && player2YES === 'YES'){
                doublesyesEmbed = new Discord.RichEmbed()
                .setColor('#2BFFF9')
                .setTitle('BuilfFight 1v1 Start')
                .setDescription('Les 2 participant on accepter le duel! \nAjouter votre adversaire au jeux! \nEtuliser le code de cette maps(a venir) \n\nLe premier avec 5 win gagne \nReact si tu as Win ou perdu \nWin: <:win:672576575090327563> \nPerdu: <:perdu:672576831945310211>')
                .addField(`Player 1` , `<@${player1}>\n` + `${result[0].userEPIC}` + `\nElo - ${player1ELO}`, true)
                .addField(`Player 2` , `<@${player2}>\n` + `${result[1].userEPIC}` + `\nElo - ${player2ELO}`, true)
                reaction.message.edit(doublesyesEmbed)
            }
        });
    });
        
}


function gamestart(){

}


function gameend(){

}

module.exports.GameLunch = GameLunch;
module.exports.GameLunchBotReaction = GameLunchBotReaction;