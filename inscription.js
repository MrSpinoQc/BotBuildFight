const Discord = require("discord.js");

function inscription(client, message, connection){
    if (message.channel.id === '664632648131543050'){
        if(message.author.bot) return;
            if (message.content.startsWith('!EpicAdd')) {
                EpicArgs = message.content.split(" ")
                EpicArgs.splice(0, 1);
                userEpicId = EpicArgs.join(" ");
                connection.query(`SELECT * FROM userepic WHERE userID = ${message.author.id}`,(err, result) => {
                    if (err) throw err;
                    if(result.length === 0) 
                    {
                        connection.query(`INSERT INTO userepic (userID, userEPIC) VALUES ('${message.author.id}', '${userEpicId}')`, err => {
                            if (err) throw err;
                            console.log(`${message.author}` + " A ajouter c'est indentifien dans la basse de données " + message.author.id + userEpicId);
                            client.channels.get("664632351560695808").send(`${message.author}` + " A ajouter ce userEpic dans la base de données " + message.author.id + " " + userEpicId);
                            client.channels.get("664632648131543050").send(`${message.author}` + " Vous avez bien ajouter (" + userEpicId + ") A la base de données!").then(message => message.delete(6000));
                            message.member.addRole('668883267973414923')
                        });
                    } else {
                        client.channels.get("664632648131543050").send(`${message.author}` + " Vous êtes déjà enregistré sous  (" + userEpicId + ") Dans la base de données!").then(message => message.delete(6000));
                    }
                    

                return;
                });
            }
            if (message.content.startsWith('!EpicCheck')) {
                connection.query(`SELECT * FROM userepic WHERE userID = ${message.author.id}`,(err, result) => {
                    if (err) throw err;
                    if(result.length === 0) 
                    {
                        client.channels.get("664632648131543050").send(`${message.author}` + " Vous êtes pas encore inscris dans la base de données!").then(message => message.delete(6000));
                    } else {

                        client.channels.get("664632648131543050").send(`${message.author}` + " Vous enregistré sous  (" + `${result[0].userEPIC}` + ")").then(message => message.delete(6000));
                    }

                    

                return;
                });
            }
            if (message.content.startsWith('!EpicModif')) {
                ModifEpicArgs = message.content.split(" ")
                ModifEpicArgs.splice(0, 1);
                userEpicIdModif = ModifEpicArgs.join(" ")
                connection.query(`SELECT * FROM userepic WHERE userID = ${message.author.id}`,(err, result) => {
                    if (err) throw err;
                    if(result.length === 0){
                        client.channels.get("664632648131543050").send(`${message.author}` + "Vous n'êtes pas encore inscrit à la base de données!")
                    }else connection.query(`UPDATE userepic SET userEPIC = '${userEpicIdModif}' WHERE userID = '${message.author.id}'`, err=> {
                            if (err) throw err;
                            client.channels.get("664632351560695808").send(`${message.author}` + " A modifier son userEpic dans la base de données par --> " + userEpicIdModif);
                            client.channels.get("664632648131543050").send(`${message.author}` + " Vous avez bien modifier (" + userEpicIdModif + ") A la base de données!").then(message => message.delete(6000));
                            console.log(`${message.author} update userEpic par ${userEpicIdModif}`)
                    });
                })

            }
        }

    if (message.channel.id === '664632648131543050'){
        if (message.author.bot) {
        
            } else {
                message.delete()
            }
    }
}

module.exports.inscription = inscription;
