const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const search = require('youtube-search')
const config = require('./config.json');

const opts = {
    maxResults: 1,
    key: process.env.YOUTUBE_API,
    type: 'video'
};

var queue = [];

bot.on('ready', async () => 
{
    console.log('Beep. Boop. Activated. REEEEEEEEEEEEE!');
    bot.user.setStatus('dnd').catch(console.error);
    bot.user.setActivity('Valorant', {type: 'PLAYING'}).catch(console.error);
    console.log('**Youtube API:** ' + process.env.YOUTUBE_API)
    console.log('**Discord Token:** ' + process.env.DISCORD_TOKEN)
});

bot.on('message', async msg => 
{
    async function play(url)
    {
        const connection = await msg.member.voice.channel.join();

        const audio = connection.play(ytdl(url, {filter: 'audio'}),{volume: (1 * (config.SONGVOLUMEINT/100))});

        audio.on('finish', () =>{
            queue.shift();
            if(queue[0]){
                play(queue[0] + '')
            } else {
                connection.disconnect();
            }
        });
    }

    if(msg.author.bot) return;
    let args = msg.content.substring(config.PREFIX.length).split(" ");
    
    //If there isn't a argument, send a message
    if(msg.content === config.PREFIX && !args[0]) return msg.channel.send('Use "help" as a argument to see the list of commands.')
    if(msg.content.includes(config.PREFIX))
    {
        switch(args[0].toLowerCase())
        {
            //Commands list
            case 'help':
                if(!args[1]) 
                {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Commands')
                    
                    .addField('---------------------------------------------------', '**Bot settings and information**')
                    .addField(config.PREFIX + '**help**','Get commands for the ScreamBot.')
                    .addField(config.PREFIX + '**info**','Get information about the ScreamBot.')
                    .addField(config.PREFIX + '**songvolume [percentage]**', 'Change the volume of the songs.')
                    .addField(config.PREFIX + '**changeprefix [prefix]**', 'Change the prefix for the bots commands.')
                
                    .addField('---------------------------------------------------', '**Media and games**')
                    .addField(config.PREFIX + '**play [arg: link][url/keywords]**', 'Search on Youtube and add to query.')
                    .addField(config.PREFIX + '**stop**', 'Stop the music stream.')
                    .addField(config.PREFIX + '**skip**', 'Skip the current song.')
                    .addField(config.PREFIX + '**clear**', 'Clear the queue.')
                    .addField(config.PREFIX + '**watch2gether**', 'Get the link for the Watch2gether room.')
                    .addField(config.PREFIX + '**rollrandomnuber [min] [max]**', 'Roll a random number.')
                
                    .addField('---------------------------------------------------', '**Soundeffects**')
                    .addField(config.PREFIX + '**scream**','A suprise for your ears.')
                    .addField(config.PREFIX + '**bruh**', 'Deliver a big bruh.')
                    .addField(config.PREFIX + '**yeet**', 'Yeet you enemies away.')
                    .addField(config.PREFIX + '**exercise**', 'Think of it as training guardian.')
                    .addField(config.PREFIX + '**diamonds**', 'We are rich!')

                    msg.channel.send(embed)
                }
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
            //Information about the Bot + settings
            case 'info':
                msg.channel.send('I am in version ' + config.VERSION + ' and ' + config.AUTHOR + ' is my daddy.')
                break;
            case 'changeconfig.PREFIX':
                if(!args[1] || args[1] === 'undefined')
                {
                    msg.channel.send('Please type your config.PREFIX as a second argument.')
                } else
                {
                    config.PREFIX = args[1];
                    msg.channel.send('Your config.PREFIX has been set.')
                }
                break;
            case 'songvolume':
                if(!args[1] || args[1] === 'undefined')
                {
                    msg.channel.send('Please choose a volume percentage.')
                } else
                {
                    config.SONGVOLUMESTRING = args[1];
                    config.SONGVOLUMEINT = parseInt(config.SONGVOLUMESTRING, 10)
                    msg.channel.send('The Song Volume has been adjusted.')
                }
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
            //Retarded Sounds
            case 'scream':
                if(msg.member.voice.channel)
                {
                    const connection = await msg.member.voice.channel.join();
                    msg.channel.send('*Hello* ' + msg.member.user.username + '. *Prepare your ears.*');
                    const audio = connection.play(ytdl('https://www.youtube.com/watch?v=6bCfmg-VcmI', {filter: 'audioonly'}),{volume: 0.2});
                    audio.on('finish', () =>{
                        connection.disconnect();
                    });
                } else
                {
                    msg.reply('*I want to but I cannot.* You need to be in a voice channel for the bot to join.');
                }
                break;
            
            case 'bruh':
                if(msg.member.voice.channel)
                {
                    const connection = await msg.member.voice.channel.join();
                    msg.channel.send('*Hello* ' + msg.member.user.username + '. *Here is your delivery.*');
                    const audio = connection.play(ytdl('https://www.youtube.com/watch?v=2ZIpFytCSVc', {filter: 'audioonly'}),{volume: 10.0});
                    audio.on('finish', () =>{
                        connection.disconnect();
                    });
                } else
                {
                    msg.reply('*I want to but I cannot.* You need to be in a voice channel for the bot to join.');
                }
                break;

            case 'exercise':
                if(msg.member.voice.channel)
                {   
                    const connection = await msg.member.voice.channel.join();
                    msg.channel.send('*Think of it as training*, ' + msg.member.user.username);
                    const audio = connection.play(ytdl('https://www.youtube.com/watch?v=jPg2MIFUMDg', {filter: 'audioonly'}),{volume: 0.2});
                    audio.on('finish', () =>{
                        connection.disconnect();
                    });
                } else
                {
                    msg.reply('*I want to but I cannot.* You need to be in a voice channel for the bot to join.');
                }
                break;

            case 'yeet':
                if(msg.member.voice.channel)
                {   
                    const connection = await msg.member.voice.channel.join();
                    msg.channel.send('*Hello* ' + msg.member.user.username + '. *Here is your delivery.*');
                    const audio = connection.play(ytdl('https://www.youtube.com/watch?v=D8KxdXEBkhw', {filter: 'audioonly'}),{volume: 6.0});
                    audio.on('finish', () =>{
                        connection.disconnect();
                    });
                } else
                {
                    msg.reply('*I want to but I cannot.* You need to be in a voice channel for the bot to join.');
                }
                break;

            case 'diamonds':
                if(msg.member.voice.channel)
                {   
                    const connection = await msg.member.voice.channel.join();
                    msg.channel.send('*Hello* ' + msg.member.user.username + '. *Here is your delivery.*');
                    const audio = connection.play(ytdl('https://youtu.be/iYf7WBStTZ8', {filter: 'audioonly',}),{volume: 0.7});
                    audio.on('finish', () =>{
                            connection.disconnect();
                    });
                } else
                {
                    msg.reply('*I want to but I cannot.* You need to be in a voice channel for the bot to join.');                }
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //Games
            case 'rollrandomnumber':
                if(!args[1] || !args[2] || args[1] === 'undefined' || args[2] === 'undefined')
                {
                    msg.channel.send('Please type in your lowest and then your highest numbers as arguments.')
                } else
                {
                    smallestN = Math.ceil(args[1]);
                    biggestN = Math.floor(args[2]);
                    let outcome = Math.floor(Math.random() * (biggestN - smallestN + 1)) + smallestN;
                    msg.channel.send('Your number is: ' + outcome)
                }
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            //Youtube commands
            case 'play': 
                if(args[1] === 'link')
                {
                    if(!queue[0])
                    {
                        play(args[2])

                        const playing = new Discord.MessageEmbed()
                        .setTitle('Playing Music')
                        .addField('Request by ' + msg.member.user.username, '*Oooh. Music.*',)
                        .addField(args[2],'---------------------------------------------------------------');
                        msg.channel.send(playing)
                        if(args[2])
                        {
                            queue.push(args[2]);
                        }
                    } else
                    {
                        const playing = new Discord.MessageEmbed()
                        .setTitle('Added to queue')
                        .addField('Request by ' + msg.member.user.username, '*Oooh. Music.*',)
                        .addField(args[2],'---------------------------------------------------------------');
                        msg.channel.send(playing)
                        if(args[2])
                        {
                            queue.push(args[2]);
                        } else
                        {
                            return
                        }
                    }
                    console.log(queue)
                } else
                {   if(!msg.member.voice.channel || (!args[1] && !queue[0]))
                    {
                        msg.reply('*I want to but I cannot.* You need to be in a voice channel or type keywords or a link in.');

                    } else if((!args[1] && queue[0]) || (args[1] && !queue[0]))
                    {
                        let searchString = args.slice(1) + ''
                        let results = await search(searchString, opts).catch(err => console.log(err));
                        let youtubeResults = results.results
                        let link = youtubeResults.map(result => {
                            return result.link
                        })
                        let title = youtubeResults.map(result => {
                            return result.title
                        })
                        finalLink = '' + link
                        finalTitle = '' + title

                        const playing = new Discord.MessageEmbed()
                        .setTitle('Playing Music')
                        .addField(finalTitle, '*Oooh. Music.*')
                        .addField(finalLink,'---------------------------------------------------------------');
                        msg.channel.send(playing)
                        if(args[1])
                        {
                            queue.push(finalLink);
                        }
                        console.log(queue)
                        if((!queue[0]) && !args[1])
                        {
                            msg.channel.send('The queue is empty.')
                        } else
                        {
                            play(queue[0] + '')
                        }

                    } else if(args[1] && queue[0])
                    {
                        let searchString = args.slice(1) + ''
                        let results = await search(searchString, opts).catch(err => console.log(err));
                        let youtubeResults = results.results
                        let link = youtubeResults.map(result => {
                            return result.link
                        })
                        let title = youtubeResults.map(result => {
                            return result.title
                        })
                        finalLink = '' + link
                        finalTitle = '' + title

                        const playing = new Discord.MessageEmbed()
                        .setTitle('Added to queue')
                        .addField(finalTitle, '*Oooh. Music.*')
                        .addField(finalLink,'---------------------------------------------------------------');
                        msg.channel.send(playing)

                        if(args[1])
                        {
                            queue.push(finalLink);
                        }

                        console.log(queue)
                    }
                }
                break;

            case 'stop':
                msg.member.voice.channel.leave();
                msg.channel.send('*Stopped. For now.*');
                break;  

            case 'skip':
                if(args[1] === 'link')
                {
                    queue.shift();
                    if((!queue[0]) && !args[2])
                    {
                        msg.channel.send('The queue is empty.')
                    } else
                    {
                        play(queue[0] + '')
                    }

                } else
                {   
                    queue.shift();
                    let searchString = queue[0] + ''
                    let results = await search(searchString, opts).catch(err => console.log(err));
                    let youtubeResults = results.results
                    let link = youtubeResults.map(result => {
                        return result.link
                    })
                    let title = youtubeResults.map(result => {
                        return result.title
                    })
                    finalLink = '' + link
                    finalTitle = '' + title

                    const playing = new Discord.MessageEmbed()
                    .setTitle('Playing')
                    .addField(finalTitle, '*Oooh. Music.*')
                    .addField(finalLink,'---------------------------------------------------------------');
                    msg.channel.send(playing)

                    console.log(queue)
                    if((!queue[0]) && !args[1])
                    {
                        msg.channel.send('The queue is empty.')
                    } else
                    {
                        play(queue[0] + '')
                    }

                }
                break;
            case 'clear':
                queue.length = 0;
                msg.channel.send('Your queue is now empty.');
                console.log(queue);
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //Tell the bot to piss of
            case 'leave':
                const connection = await msg.member.voice.channel.leave();
                msg.channel.send('*I will return*');
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            //Get the watch2gether link
            case 'watch2gether':
                msg.channel.send('*Here it is.* https://www.watch2gether.com/rooms/realslavs-h4lsnkczr58k60vs5u?lang=de');
                break;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
})

bot.login(process.env.DISCORD_TOKEN);
