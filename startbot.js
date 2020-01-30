const Discord = require('discord.js');
const client = new Discord.Client();
const BuildFightFunction = require("./ChannelBuild")

function startboton(client) {
    client.channels.get("664632351560695808").send("Bot on!");
    client.channels.get("664632351560695808").send("La connection a la base de donnez a bien etes fait!");
    client.channels.get('664633494319661067').send("Bot pret!").then(message => {
        message.channel.bulkDelete(100);
        BuildChannel()
        message.channel.send(ChannelBuildStart)
        BuildFightFunction.buildQueue(client)
    })
    client.channels.get('664632648131543050').send("Bot pret!").then(message => {
        message.channel.bulkDelete(100);
        InscriptionEmbed()
        message.channel.send(InscriptionEmbedWrite)
    })      
};



function BuildChannel(){
    ChannelBuildStart = new Discord.RichEmbed();
    ChannelBuildStart.setColor('#FFAD00')
    ChannelBuildStart.setTitle('BuildFight');
    ChannelBuildStart.setDescription('Voici quelque commande!');
    ChannelBuildStart.addBlankField()
//    ChannelBuildStart.addField('!build', 'Pour lancer un lobby!' , true);
    ChannelBuildStart.addField('!join', 'Pour rejoindre le lobby! ', true);
//    ChannelBuildStart.addField('!start', 'Pas encore implementer! ', true);
    ChannelBuildStart.addField('!leave', 'Pour quiter le lobby ', true);  
    ChannelBuildStart.setTimestamp()
    ChannelBuildStart.setFooter('Développé par MrSpinoQc', 'https://static-cdn.jtvnw.net/jtv_user_pictures/6c05515e-054b-47a3-b33a-cb07e4fb81cb-profile_image-300x300.jpg');
    }

function InscriptionEmbed(){
    InscriptionEmbedWrite = new Discord.RichEmbed();
    InscriptionEmbedWrite.setColor('00B096');
//    InscriptionEmbedWrite.setAuthor('EpicGame','https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/800px-Epic_Games_logo.svg.png','https://www.epicgames.com/store/fr/')
    InscriptionEmbedWrite.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/800px-Epic_Games_logo.svg.png')
    InscriptionEmbedWrite.setTitle('Inscription de votre compte Epic game!')
    InscriptionEmbedWrite.setDescription('Utiliser la commande !EpicAdd {votre nom Epic game}');
    InscriptionEmbedWrite.addField('Exemple', '!EpicAdd Nobu MrSpinoQc' , true);
    InscriptionEmbedWrite.addBlankField()
    InscriptionEmbedWrite.addField('Autre commande!','Si vous êtes déjà inscrit', false);
    InscriptionEmbedWrite.addField('!EpicCheck', 'Pour voir le compte Epic enregistrer', true);
    InscriptionEmbedWrite.addField('!EpicModif', 'Pour modifier le compte Epic', true);
    InscriptionEmbedWrite.addField('!EpicDel', 'Suprimer votre compte [PAS ENCORE IMPLEMENTER]', true);
    InscriptionEmbedWrite.setTimestamp()
    InscriptionEmbedWrite.setFooter('Développé par MrSpinoQc', 'https://static-cdn.jtvnw.net/jtv_user_pictures/6c05515e-054b-47a3-b33a-cb07e4fb81cb-profile_image-300x300.jpg');

}


module.exports.startboton = startboton;