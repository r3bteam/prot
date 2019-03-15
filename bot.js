const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('<:look:533628235922276352> <a:idk:535523806685691905> pong');
  }
});
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
const xo = ['KICK_MEMBERS', 'BAN_MEMBERS','ADMINISTRATOR','MANAGE_CHANNELS','MANAGE_GUILD','MANAGE_ROLES ','VIEW_AUDIT_LOG','MANAGE_MESSAGES'];

client.on('channelDelete', (u) => {
    u.guild.fetchAuditLogs().then( s => { 
        var ss = s.entries.first();
        if (ss.action == "CHANNEL_DELETE") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1 
      };
data[ss.executor.id].time = 0
u.guild.roles.forEach(r => {
    for(let x = 0; x < xo.length; x++){
    if(r.hasPermission(xo[x])){
        console.log(r.name);
    r.edit({permissions:[xo[x]]})
}}; 
                data[ss.executor.id].time = 0
            });
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {
                data[ss.executor.id].time = 0
            }
        },60000)
    };
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.login(process.env.BOT_TOKEN);
