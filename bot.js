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
  
client.on("message", message =>{
if(!antic[message.author.id]) {
antic[message.author.id] = {
actions: 0
}}
})
client.on('channelDelete', alpha => {
alpha.guild.fetchAuditLogs().then( ac => {
var anti = ac.entries.first();
if(anti.action == "CHANNEL_DELETE") {
if(!antic[anti.executor.id]) {
antic[anti.executor.id] = {
actions: 0
};
} else { 
antic[anti.executor.id].actions+=1
if (antic[anti.executor.id].actions == 1) {
alpha.guild.members.get(anti.executor.id).ban("Griefing")
console.log("banned griefer 1")
antic[anti.executor.id].actions = 0
}
}
    }
    });
    fs.writeFile("./antic.json", JSON.stringify(antic) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.login(process.env.BOT_TOKEN);
