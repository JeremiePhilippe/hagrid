const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()
const config = require("./config.json");
const fetch = require("node-fetch");
require("dotenv").config();
client.login(process.env.BOTTOKEN);
client.on("ready", ()=>{
	console.log("Salut les p'tits potes!")
});

var excuse = ["Buck s'est enfui.", "mon araignée géante s'est encore perdue.", "Dumbledore a besoin de moi.", "j'ai laissé une soupe sur le feu.", "il parait que Norbert est une fille maintenant.", "je n'ai pas fini mon épisode de la Boulangerie Graphique. Je suis fan !", "un serpentard s'amuse à dessiner des cochons-bite partout !", "Stéphane Bern a porté plainte contre une élève pour photoshop non autorisé sur sa personne."]
var pickExcuse = "Dumbledore a besoin de moi.";
var hourChecked;
var messageIntro = "Bonjour !";
var authorMessage;

var gif = 'https://media1.tenor.com/images/ed06a57e1a9ac68bc80295b3e2859734/tenor.gif?itemid=13830351';

client.on("message", gotMessage);


async function gotMessage(message){

	let token = message.content.split(" ");

	if (message.author === client.user || message.author.bot) return; //If hagrid or a bot do command, do nothing
	if ((token[0] + " " + token[1]) === `Bonjour <@!${client.user.id}>` || (token[0] + " " + token[1])  === `bonjour <@!${client.user.id}>`) {
		authorMessage = `<@!${message.author.id}>`
		randomExcuse();
		checkHour();

		// ICI

		let keyword = "hello"	

		if (token.length > 2){
			keyword = token.slice(2, token.length).join(" ");
		}

		let url = `https://g.tenor.com/v1/search?q=`+keyword+`&key=${process.env.TENORKEY}&ContentFilter=high`
		// console.log(url);
		let response = await fetch(url);
		let json = await response.json();
		const index = Math.floor(Math.random() * json.results.length);
		// console.log(json)
		gif = json.results[index].url;
		// console.log(gif);

		message.channel.send(new Discord.MessageEmbed()
			// .setAuthor(message.author.tag, message.author.displayAvatarURL())
			// .setImage(gif)
			.setColor('#562a50')
			// .setTimestamp()
			.setThumbnail('https://live.staticflickr.com/5245/5336738899_08586443e5_b.jpg')
			// .setFooter("Où est-ce que j'ai mis ma baguette ?")
			.setURL('https://coworcoeur.blandeen.com/')
			.setTitle(messageIntro)
			.setDescription(hourChecked+ pickExcuse +' \n\nVoici ton GIF.\n\n Bisous \:heart: \:closed_umbrella:')          
		);

		message.channel.send(gif);
	}


	if (!message.content.startsWith(config.prefix)) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command==="café"){
		return message.channel.send(`Voici ton café <@!${message.author.id}> \n \:coffee:`);
	}

	if (command==="thé"){
		return message.channel.send(`Voici ton thé <@!${message.author.id}> \n \:tea:`);
	}

};


function randomExcuse(){
	pickExcuse = excuse[Math.floor(excuse.length * Math.random())];
}

function checkHour(){
	var today = new Date();
	// var hour = 10;
	var hour = today.getHours();
	if (hour < 6 ) {
		hourChecked = "Qui me réveille à cette heure ? Ah mais c'est toi " + authorMessage +" ! Bonjour, je te souhaite une bonne journée. N'hésite pas à dormir plus longtemps la prochaine fois.\n\nTu sais, l'avenir appartient à ceux qui rrrrzzzzzzzzzzzzzz.\n\nHein ?! Quoi?! Oh, mais j'y pense, je dois te laisser, ";
		messageIntro = "Rrrrrrzzzz... Hein ?"
	}

	if (hour >= 6 && hour < 8) {
		hourChecked = "Comment vas-tu " + authorMessage + " ? Tu es bien matinal.e aujourd'hui ! J'espère que tu es quand même assez reposé.es pour travailler. \n\nJe te souhaite une bonne journée, remplie de projets. Quant à moi, je te laisse, ";
		messageIntro = "Bonjour !"
	}

	if (hour >= 8 && hour < 9) {
		hourChecked = "J'espère que tu vas bien"+ authorMessage +". Il est bientôt 9h, il va falloir se mettre au travail. \n\nJe te souhaite une bonne journée, remplie de projet. Quant à moi, je te laisse, ";
		messageIntro = "Bonjour !"
	}

	if (hour >= 9 && hour < 10) {
		hourChecked = "Ça va " + authorMessage + " ? J'espère que tu vas tout doucement commencer à te mettre au travail. Certains de tes collègues ont déjà commencés, eux. \n\nJe ne te juge pas, bien sûr. Tu sais, moi-même j'ai pris un chemin différent des autres. Je ne le regrette pas tu sais, ma vie a été bien remplie et puis je n'ai pas vraiment choisi au final. Mais j'adore Poudlard !\n\nOula, je m'égare un peu. En plus, je dois y aller, ";
		messageIntro = "Bonjour !"
	}

	if (hour >= 10 && hour < 12) {
		hourChecked = "J'espère que tu passez une bonne journée " + authorMessage + " et que tu travailles sur plein de projets ! \n\nOh, mais c'est bientôt la pause midi ! J'ai hâte ! Je commence à avoir un peu faim. \n\n Je dois te laisser, ";
		messageIntro = "Bonjour !"
	}

	if (hour >= 12 && hour < 16) {
		hourChecked = "J'espère que tu passes une bonne journée " + authorMessage + " et que tu travailles sur plein de projets ! \n\nOh, mais c'est bientôt l'heure du goûter ! J'ai hâte je commence à avoir un peu faim.\n\n Je dois te laisser, ";
		messageIntro = "Bonjour !"
	}

	if (hour >= 16 && hour < 18) {
		hourChecked = "Tu m'appeles un peu tard aujourd'hui," + authorMessage +", c'est presque la fin de la journée. \n\nEnfin, ce n'est pas grave, j'espère que tu as passé une bonne journée !\n\nJe ne vais pas trainer, ";
		messageIntro = "Bonjour  !"
	}

	if (hour >= 18 && hour < 24) {
		hourChecked = "Mais attends... Tu es encore là "+ authorMessage +" ? Tu sais que tu peux arrêter de travailler. Il faut aussi penser à te reposer !\n\nEnfin bref, je ne peux par rester, ";
		messageIntro = "Bonsoir !"
	}
}
























