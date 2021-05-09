const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

client.on('ready', () => { 
  console.log('Client is online!'); 
  });


client.on("messageReactionAdd", async(reaction,user) =>{
    if (reaction.message.partial) await reaction.message.fetch();
        
        try{
         if(reaction.emoji.name === "linker"){ 
             const URL = await reaction.message.channel.createInvite({
              maxAge: 43200,
              maxUses: 1,
              unique: false,
              reason: user.username
        });
        user.send(`発行が完了しました。\n${URL}\n`)
        .catch(()=>{
          reaction.message.channel.send("DMが開放されていません");
          URL.delete();
        });
          }
        }catch(err){
          reaction.message.channel.send(err);
          console.log(err);
        }finally{
          reaction.users.remove(user.id).catch(()=>{console.error('リアクションを削除できませんでした');});
        }
  });

  client.login(process.env.token);