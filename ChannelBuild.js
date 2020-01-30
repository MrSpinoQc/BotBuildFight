const Discord = require('discord.js');
var buildStart = "non"
playerIn = 0

function BuildFightFunction(client, message, connection) {
    if (message.channel.id === '664633494319661067'){
        if(message.author.bot) return;
            authorName = message.mentions.users
            if (buildStart === "non") {
                if (message.content.toLowerCase() === '!build') {
                    message.delete(1)
                    playercount = "non";
                    playerIn = 0
                    buildStart = "oui"
                    buildembed(playerIn)
                    message.channel.send(Build).then(message => {
                        msgId = message.id;
                        });
                    return
                    }
                }
            if (buildStart === "oui") {
                if (message.content.toLowerCase() === '!build') {
                    message.delete(1)
                    message.channel.send(`Un lobby est deja lancer! ${message.author}`).then(message => message.delete(3000));
                    return
                }
                if (message.content.toLowerCase() === '!leave') {
                    user = message.author.id;
                    message.delete(1)
                    if (playercount === "un") {
                        for (i = 0; i < playerIn; i++) {
                            if (player[i] === user) {
                                player = player.pop(i)
                                
                                    if (playerIn === 1) {
                                        playerIn = 0;
                                        playercount = "non";
                                    }
                                buildembed(playerIn)
                                console.log(player)
                                message.channel.fetchMessage(msgId).then(msg => msg.edit(Build));
                                message.channel.send(`Vous venez de quiter le lobby! ${message.author}`).then(message => message.delete(3000));
                                return
                                }
                            return
                            

                        }
                    }
                }
                if (message.content.toLowerCase() === '!start') {

                }
                if (message.content.toLowerCase() === '!join')  {
                    user = message.author.id;
                    connection.query(`SELECT * FROM userElo WHERE userID = ${message.author.id}`,(err, result) => {
                        if (err) throw err;
                        if(result.length === 0)
                        {   
                            connection.query(`INSERT INTO userElo (userID, userELO) VALUES ('${message.author.id}', '200')`, err => {
                                if (err) throw err;
                            });

                        }
                    });
                    message.delete(1)
                    if (playercount === "un") {
                        for (i = 0; i < playerIn; i++) {
                            if (player[i] === user) {
                                message.channel.send(`Vous etes deja inscri! ${message.author}`).then(message => message.delete(3000));
                                return;
                            }    else{
                                    playerIn = player.push(user);
                                    buildembed(playerIn)
                                    message.channel.fetchMessage(msgId).then(msg => msg.edit(Build));
                                    StartSolo(client, message, connection)
                                    }
                            
                        }
                    }else {
                        playercount = "un";
                        player = [user];
                        playerIn = 1
                        buildembed(playerIn)
                        message.channel.fetchMessage(msgId).then(msg => msg.edit(Build));

                        }
                message.channel.send(`${message.author} Vous etes bien enregistrer!`).then(message => message.delete(3000));
                return;
                }
            }    
            if (buildStart === "non"){

                if (message.content === '!join'){
                    message.delete(1)
                    message.channel.send(`Pas de BuildFight lancer! ${message.author}`).then(message => message.delete(3000));
                    return
                }
            }

    }
    if (message.channel.id === '664633494319661067'){
        if (message.author.bot) {
        
            } else {
                message.delete()
            }
    }
}

function StartSolo(client, message, connection){
    if (playerIn > 1 ){
        SelectPlayer = Math.floor(Math.random() * Math.floor(player.length));
        Player1 = player[SelectPlayer]
        PlayerSelectClear1 = player.splice(SelectPlayer, 1)
        SelectPlayer = Math.floor(Math.random() * Math.floor(player.length));
        Player2 = player[SelectPlayer]
        if (player.length === 1){
            delete player;
            playerIn = 0;
            playercount = "non"
        }else{
            PlayerSelectClear2 = player.splice(SelectPlayer, 1)
        }
        buildembed(playerIn)
        message.channel.fetchMessage(msgId).then(msg => msg.edit(Build));

        connection.query(`SELECT * FROM userEpic WHERE userID IN (${Player1},${Player2})`,(err, result) => {
            if(err) throw err;

            console.log(result)
            PlayerName1 = result[0].userEPIC;
            PlayerMention1 = result[0].userID;
            PlayerName2 = result[1].userEPIC;
            PlayerMention2 = result[1].userID;
            console.log(PlayerName1)
            console.log(PlayerName2)
            connection.query(`SELECT * FROM userElo WHERE userID IN (${Player1},${Player2})`,(err, result) => {
                if(err) throw err;
                UserElo1 = result[0].userELO
                UserElo2 = result[1].userELO
                PlayerSelect(client, PlayerName1, PlayerName2, connection, UserElo1, UserElo2)
            })
        });
        
    }
}



function PlayerSelect(client, PlayerName1, PlayerName2, connection, UserElo1, UserElo2) {
    EmbedSelect = new Discord.RichEmbed();
    EmbedSelect.setColor('#86F600');
    EmbedSelect.setTitle('BuilfFight 1v1');
    EmbedSelect.setDescription('Match trouver! React pour accepter ou refuser le match!\nAccepter : ⚔️\n Refuser : 🚫');
    EmbedSelect.addField(`Player 1` , `<@${PlayerMention1}>\n` + PlayerName1 + `\nElo - ${UserElo1}`, true);
    EmbedSelect.addField(`Player 2` , `<@${PlayerMention2}>\n` + PlayerName2 + `\nElo - ${UserElo2}`, true);
    client.channels.get('669504006514671636').send(EmbedSelect).then(message => {
        connection.query(`INSERT INTO bf1v1 (idGAME, player1, player2, player1ELO, player2ELO, player1YES, player2YES, player1RESULT, player2RESULT) VALUES ('${message.id}', '${PlayerMention1}', '${PlayerMention2}', '${UserElo1}', '${UserElo2}', 'NON', 'NON', 'NONE', 'NONE')`, err => {
            if (err) throw err;       
        });
    })



}

function buildQueue(client, message){
    playercount = "non";
    buildStart = "oui"
    buildembed(playerIn)
    client.channels.get('664633494319661067').send(Build).then(message => {
        msgId = message.id;
        console.log(msgId);
        });
}
function buildembed(playerIn){
    Build = new Discord.RichEmbed();
    Build.setColor('#0099ff')
    Build.setTitle('BuildFight');
    Build.setDescription('!join pour rejoindre le lobby!');
    Build.addField('Nombre je joueur en attente ', playerIn + ' <a:loadingBuild:669255590622789643>');
    }

module.exports.BuildFightFunction = BuildFightFunction;
module.exports.buildQueue = buildQueue;
