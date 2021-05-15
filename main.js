const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file =>  file.endsWith('.js'));

for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('Harry is high!');
});

client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ + /);
	const command = args.shift().toLowerCase();
	 
	if (command == 'bauispogi')
	{
		client.commands.get('bauispogi').execute(message,args);
	}
	else if (command == 'maegisugli')
	{
		message.channel.send('harry thinks that is true!');
	}
	else if (command == 'maegispretti')
	{
		message.channel.send('harry thinks that is false!');
	}
});

client.login('ODQyODMxMzk5NTIxMzUzNzk5.YJ7B6A.BQ_teZM_YzV7WddqHhvlpfDOg3A');