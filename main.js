const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();


//// DISCORD PREFIX
const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
}

for (const file of eventFiles)
{
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	} 
}

client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	 
	if (command === 'bauispogi')
	{
		client.commands.get('bauispogi').execute(message,args);
	}
	else if (command === 'cool')
	{
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if(args[0] === 'bau')
		{
			message.channel.send(`You're right, bau is cool ${message.author}!`);
		}
		else if (args[0] === 'maeg')
		{
			message.channel.send(`You're wrong, maeg isn't cool ${message.author}!`);
		}
	}
	else if (command === 'welcome')
	{
		const welcomeLetter = new Discord.MessageEmbed()
			.setColor('#F5D86A')
			.setTitle('Welcome to Hogwarts')
			.setDescription(`You are hereby accepted to the Hogwarts School of Witchcraft and Wizardry, ${message.author}!`)
			.setImage('https://i.imgur.com/3ZwdT6N.png')
			.setTimestamp()
		message.channel.send(welcomeLetter);
	}
	else if (command === 'dp')
	{
		const avatarEmbed = new Discord.MessageEmbed()
        	.setColor(0x333333)
        	.setAuthor(message.author.username)
        	.setImage(message.author.AvatarURL);

		message.channel.send(avatarEmbed);
	}

});

client.login(config.token);