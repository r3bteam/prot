const Discord = require('discord.js');
const client = new Discord.Client(); 
const fs = require('fs');
const antic = JSON.parse(fs.readFileSync('./antic.json', 'utf8'));
  client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('<:look:533628235922276352> <a:idk:535523806685691905> pong');
  }
});
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
  });
  
	let channelr = {};
	client.on('channelDelete', async (channel) => {
	const rebellog = client.channels.find("name", "532234981347426315"),
	Oguild = channel.guild,
	Onumber = 3,
	Otime = 10000;
	const audit = await channel.guild.fetchAuditLogs({limit: 1});
	const channelremover = audit.entries.first().executor;
	console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
	 if(!channelr[channelremover.id]) {
	  channelr[channelremover.id] = {
	  deleted : 0
	   }
   }
   channelr[channelremover.id].deleted += 1;
   if(channelr[channelremover.id].deleted >= Onumber ) {
	Oguild.guild.roles.forEach(r => {
		r.edit({
			ADMINISTRATOR:  false,
			BAN_MEMBERS: false,
			KICK_MEMBERS: false
					}); 
  rebellog.send(`<@!${channelremover.id}>
  حآول العبث بالسيرفر @everyone`);
  channel.guild.owner.send(`<@!${channelremover.id}>
  حآول العبث بالسيرفر ${channel.guild.name}`)
}); 
  }

	setTimeout(() => {
   channelr[channelremover.id].deleted = 0;
	},Otime)
	});
client.login(process.env.BOT_TOKEN);
