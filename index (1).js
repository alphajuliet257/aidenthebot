const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,]});
const TOKEN = process.env['TOKEN']
msg = ""
preword = ""
msgArray = []
FltrdMsgs = []
ctrl = ''
toearlyflag = 'false'
helpArray = ["Here's a list of commands (so far): ",
             "ping! -> replies with 'pong!'",
             "rat? -> pulls up a website to check if a .jar is a rat",
             "ah? -> brings up a website to track auction house history",
             "bz? -> brings up a website to track bazaar prices (and flips)",
             "amogus -> self explanatory (try it out)",
             "sus -> self explanatory (try it out)",
             "shrek -> self explanatory (try it out)",
             "rng? -> enters random number generator mode for testing how good your RNG is (yes it's random, but who cares, just try it)",
             "suggest? 'your feature suggestion' -> allows you to suggest features for the bot",
             "?help -> brings up this menu"
            ]
ASCII1 = `
    
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡟⠁⣰⣿⣿⣿⡿⠿⠻⠿⣿⣿⣿⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠏⠀⣴⣿⣿⣿⠉⠀⠀⠀⠀⠀⠈⢻⣿⣿⣇⠀⠀⠀
⠀⠀⠀⠀⢀⣠⣼⣿⣿⡏⠀⢠⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⡀⠀⠀
⠀⠀⠀⣰⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀
⠀⠀⢰⣿⣿⡿⣿⣿⣿⡇⠀⠘⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⢀⣸⣿⣿⣿⠁⠀⠀
⠀⠀⣿⣿⣿⠁⣿⣿⣿⡇⠀⠀⠻⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⠃⠀⠀⠀
⠀⢰⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀
⠀⢸⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠛⠉⢉⣿⣿⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣇⠀⣿⣿⣿⠀⠀⠀⠀⠀⢀⣤⣤⣤⡀⠀⠀⢸⣿⣿⣿⣷⣦⠀⠀⠀
⠀⠀⢻⣿⣿⣶⣿⣿⣿⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⡀⠀⠉⠉⠻⣿⣿⡇⠀⠀
⠀⠀⠀⠛⠿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠈⠹⣿⣿⣇⣀⠀⣠⣾⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣦⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠛⠋⠉⠉⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁
`

ASCII2 = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠿⠶⠶⣦⣴⡿⠿⢷⣶⠾⠶⣦⣴⡾⠶⠶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢰⣿⠁⠀⣦⠀⠈⣿⡇⠀⠀⡇⠀⠀⣿⠁⠀⣴⡄⠀⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠸⣿⠀⠀⠻⢶⣶⣿⡇⠀⠀⡇⠀⠀⣿⡀⠀⠙⠷⣶⡾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣴⣾⣿⣷⣤⡀⠀⠙⣿⡇⠀⠀⡇⠀⠀⣿⣿⣦⣀⠀⠈⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣾⠟⠁⢸⣿⠀⠀⣿⠀⠀⢸⡇⠀⢸⡇⠀⠀⣿⠀⠀⣽⡇⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⣿⠃⠀⠀⠘⢿⣦⣀⡀⣀⣠⣿⣷⣄⣀⢀⣀⣴⣿⣧⣀⣈⣀⣠⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢠⣿⠃⠀⠀⠀⠀⣀⣹⣿⣿⣿⣿⣥⣬⣿⣿⣿⣿⣉⡀⠈⠙⠛⠛⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣾⡇⠀⣠⣶⡾⠿⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠛⠻⣷⣄⠀⠀⢻⡇⢀⣴⣶⣶⣄⣠⣴⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣿⠀⣰⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣷⡄⢸⣷⣾⡟⠁⠉⠛⠛⠉⠉⠹⣿⣷⣶⣦⣄⠀⠀⠀⠀⠀
⢸⡿⢠⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⢸⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠈⠛⠉⠙⣿⣷⣿⣷⡄⠀
⢸⡇⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⢸⣿⣿⠀⠀⠀⢰⣿⠄⠀⢰⣶⠀⠀⢀⣀⠀⠀⢻⣿⠀
⢸⡇⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡟⢸⣿⡿⠶⣦⣄⣾⣿⡄⠀⣸⣿⠀⠀⢸⣿⡄⠀⢸⣿⡇
⢸⡇⠀⢿⣷⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠁⢸⣿⣧⣄⠀⢉⣻⣿⡇⠀⣽⣿⠀⠀⢸⣿⡇⠀⢸⣿⠇
⣿⡇⠀⢸⣿⢻⣿⠿⠿⠿⣿⣶⣶⣶⣦⣤⣤⣤⣤⣴⣶⣶⡿⣿⡇⠀⠀⣿⣿⣿⣿⣿⣿⣿⣃⣀⣿⣿⠀⠀⣼⣿⡇⣀⣾⡿⠀
⣿⡇⠀⠀⠻⣦⣨⡀⠒⠚⠹⠿⠷⠚⠙⠋⠉⠿⠹⠿⠶⢛⣶⡟⠀⢀⣾⣿⢿⣿⠙⣿⡿⠿⠿⢿⣿⡿⠿⠿⠿⠛⠛⠛⠋⠀⠀
⣿⡇⠀⠀⠀⠀⠉⠉⠛⠒⠒⠦⠄⠤⠤⠤⠤⠤⠶⠖⠚⠉⠁⠀⠀⠀⠻⣿⣿⣿⣲⠏⠀⠀⠀⢀⣹⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡟⠻⣿⣦⣤⣶⡾⠟⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣧⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⡏⠈⠳⢦⡤⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠤⢤⡤⠤⠤⢤⣶⠦⣺⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`

ASCII3 = `
    ⢋⣴⠒⡝⣿⣿⣿⣿⣿⡿⢋⣥⣶⣿⣿⣿⣿⣿⣿⣶⣦⣍⠻⣿⣿⣿⣿⣿⣷⣿
⢾⣿⣀⣿⡘⢿⣿⡿⠋⠄⠻⠛⠛⠛⠻⠿⣿⣿⣿⣿⣿⣿⣷⣌⠻⣿⣿⣿⣿⣿
⠄⠄⠈⠙⢿⣦⣉⡁⠄⠄⣴⣶⣿⣿⢷⡶⣾⣿⣿⣿⣿⡛⠛⠻⠃⠙⢿⣿⣿⣿
⠄⠄⠄⠄⠄⠈⠉⣀⣀⣴⡟⢩⠁⠩⣝⢂⢨⣿⣿⣿⣿⢟⡛⣳⣶⣤⡘⠿⢋⣡
⠄⠄⠄⠄⠄⠄⠘⣿⣿⣿⣿⣾⣿⣶⣿⣿⣿⣿⣿⣿⣿⣆⣈⣱⣮⣿⣷⡾⠟⠋
⠄⠄⠄⠄⠄⠄⠄⠈⠿⠛⠛⣻⣿⠉⠛⠋⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠸⣿
⠄⠄⠄⠄⢀⡠⠄⢒⣤⣟⠿⣿⣿⣿⣷⣤⣤⣀⣀⣉⣉⣠⣽⣿⣟⠻⣿⣿⡆⢻
⠄⣀⠄⠄⠄⠄⠈⠋⠉⣿⣿⣶⣿⣟⣛⡿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣼⣿⡇⣸
⣿⠃⠄⠄⠄⠄⠄⠄⠠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣾⣿⣿⣿⣿⣿⣿⠁⢿
⡋⠄⠄⠄⠄⠄⠄⢰⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄
⠋⠄⠄⠄⠄⠄⠄⠄⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠂⠠
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣿⡿⠄⢈
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠛⠛⠿⠿⠿⢿⣿⡿⠟⢋⣴⣿⢿⡋⠄⠄
⣠⣴⠶⠖⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣠⣴⣾⣿⡿⢫⠞⠄⠄⠄
⣿⣿⣿⣿⣾⣆⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣤⣶⣿⣿⣿⢿⣧⣶⠏⠄`

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

client.on('ready', () => {
  console.log(`${client.user.tag} logged in`)
  console.log(`TIME: ${client.readyAt}`)
})

client.on('messageCreate', (message) => {
  console.log('USER: ',message.author.tag," SAID: '", message.content, "' TIME: ", message.createdAt,"                                                        ")
})

client.on('messageCreate', (message) => {
  if (message.content === "ping!")  {
    message.reply("pong!")
  }
})

client.on('messageCreate', (message) => {
  if (message.content === "<@1035282164486508544>" && message.author.id != '1035282164486508544')  {
    message.reply("You tagged the wrong Aiden, I think you meant to tag <@696097629544644722> (yes, I purposefully meant to do this lol :joy:)")
  } else if (message.content === "rat?")  {
    message.reply("Check here to verify if a download is a RAT: https://isthisarat.com/")
  } else if (message.content === "ah?")  {
    message.reply("Check here for AH history: https://sky.coflnet.com/")
  } else if (message.content === "bz?")  {
    message.reply("Check here for BZ prices (and good flips): https://www.skyblock.bz/")
  }
})

client.on('messageCreate', (message) => {
  if (message.content == "prg?")  {
    deldmsgs = 0
    message.channel.messages.fetch()
    .then(messages => messages.filter(m => m.author.id === '1035282164486508544'))
    .then(messages => messages.forEach(msg => {
      if (deldmsgs >= 100) return
      msg.delete()
      deldmsgs++
    }))
    message.channel.send("Purged bot messages :white_check_mark:")
  
  }
  
})

client.on('messageCreate', (message) => {
  msg = message.content
  if (msg.toLowerCase().includes("amogus") && message.author.id != "1035282164486508544") {
    message.channel.send(ASCII1)
  } else if (msg.toLowerCase().includes("sus") && message.author.id != "1035282164486508544") {
    message.channel.send(ASCII2)
  } else if (msg.toLowerCase().includes("shrek") && message.author.id != "1035282164486508544")  {
    message.reply(ASCII3)
  }
})

client.on('messageCreate', (message) => {
  if (message.content === "rng?")  {
    message.reply("Type 'rngres?' to input what you are checking (eg: rngres? chance I drop necron's handle on my next run) OR 'rngres unspecified' if for no particular reason")
  } else if (message.author.id != "1035282164486508544")  {
      let msg = message.content
      let msgArray = msg.split(" ")
      let preword = msgArray[0]
      if (preword === "rngres?" && message.content === message.content)  {
        rngres = message.content.replace('rngres?','')
        message.reply("Now using 'rngch?' Input the odds of the occurrence excluding the 1/ part (eg: rngch? 800 [for the odds 1/800])")
      } else if (preword === "rngch?" && message.content === message.content)  {
          rngch = message.content.replace('rngch?','')
          chances = Math.floor(Math.random() * (parseInt(rngch) + 1))
          perc = ( parseInt(chances) / parseInt(rngch) ) * 100
          message.reply(`Your chances are ${chances}/${rngch} (${perc}%) for ${rngres}` )  }
        }
})

client.on('messageCreate', (message) => {  
  if (message.content === "ctrl-bot")
    ctrl = 'true'
    if (message.author.id === '696097629544644722' && ctrl === 'true')  {
      let msg = message.content
      message.delete()
      message.channel.send(msg)
    
    } else if (message.content === "exit-bot" && message.author.id === '1035282164486508544')  {
    ctrl = 'false'
  }
})

client.on('messageCreate', (message) =>  {
  if (message.content === "Welcome <@1035282164486508544>")  {
    message.channel.send("Hello, I am <@696097629544644722>'s bot, here to help the community")
  }
})
  
client.on('messageCreate', (message)  => {
  if (message.author.id != "1035282164486508544")  {
    let msg = message.content
    let msgArray = msg.split(" ")
    let preword = msgArray[0]
    if (preword === "suggest?" && message.content === message.content)  {
      suggestion = message.content.replace("suggest?","")
      if (toearlyflag === 'false')  {
        message.channel.send(`Sent your suggestion: '${suggestion}' to <@696097629544644722> :white_check_mark:`)
        delay(5000).then(() =>  toearlyflag = 'true')
        return toearlyflag
      }  else if (toearlyflag === 'true') {
        message.channel.send("No suggestion sent, wait 1hr before sending a new suggestion")
      }
    }
  }
})

client.on("messageCreate", (message) => {
  if (message.content === "?help" && message.author.id != "1035282164486508544") {
    for (let i = 0; i < helpArray.length; i++)
      message.channel.send(helpArray[i])
    
  }
})  

if (toearlyflag = 'true')  {
  delay(3600000).then(() =>  toearlyflag = 'false')
}

client.login(TOKEN);

const express = require('express')
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
