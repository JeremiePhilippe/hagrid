const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const config = require("./config.json");

client.login(config.token);
client.on("ready", ()=>{
	console.log("Salut les p'tits potes!")
});

var excuse = ["Buck s'est enfui.", "mon araignée géante s'est encore perdue.", "Dumbledore a besoin de moi.", "j'ai laissé une soupe sur le feu.", "il parait que Norbert est une fille maintenant.", "je n'ai pas fini mon épisode de la Boulangerie Graphique. Je suis fan !", "un serpentard s'amuse à dessiner des cochons-bite partout !", "Stéphane Bern a porté plainte contre une élève pour photoshop non autorisé sur sa personne."]
var pickExcuse = "yo";

client.on("message", message =>{
	if (message.author === client.user || message.author.bot) return; //If hagrid or a bot do command, do nothing
	if (message.content === `yo <@!${client.user.id}>`) message.channel.send(`Yo ! mon préfixe c'est ${config.prefix}`);
	if (!message.content.startsWith(config.prefix)) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command==="tennis"){
		return message.channel.send("de table !");
	}

	else if (command==="harry"){
		randomExcuse();
		message.channel.send(new Discord.MessageEmbed()
			// .setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setImage('https://media1.tenor.com/images/ed06a57e1a9ac68bc80295b3e2859734/tenor.gif?itemid=13830351')
			.setColor("#562a50")
			// .setTimestamp()
			.setThumbnail('https://live.staticflickr.com/5245/5336738899_08586443e5_b.jpg')
			// .setFooter("Où est-ce que j'ai mis ma baguette ?")
			.setURL("https://coworcoeur.blandeen.com/")
			.setTitle("Bonjour les enfants !")
			.setDescription("Il est 9 heures, il faut se mettre au travail !\n\n J'espère que vous avez passé une bonne nuit et que votre journée sera remplie de projets. Je dois y aller, "+ pickExcuse +" \n\nJe vous laisse avec le GIF du jour.\n\n Bisous \:heart:")          
		)
	}

});

function randomExcuse(){
	pickExcuse = excuse[Math.floor(excuse.length * Math.random())];
}

function wakeUp(){

}