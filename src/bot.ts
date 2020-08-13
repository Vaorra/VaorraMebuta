import {Client, MessageEmbed, TextChannel} from 'discord.js';
import {config} from 'dotenv';

config();

const {DISCORD_TOKEN} = process.env;

const client = new Client({
    presence: {
        status: 'online',
        activity: {
            name: 'm.help',
            type: 'LISTENING'
        }
    },
    partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER']
});

client.once('ready', () => {
    console.log(`Loogged in as ${client.user.tag}.`);
    console.log(`Connected to ${client.guilds.cache.size} guilds.`);
});

client.on('guildMemberAdd', (member) => {

    member.roles.set(['447468515457368085']);

    const welcomeMessage = new MessageEmbed()
        .setTitle('Welcome to Vaorra!')
        .setDescription(`Welcome ${member.user} on the Vaorra Discord! :smile:\nMake sure to read ${client.guilds.cache.get('320151654496469003').channels.cache.get('451109685089533952')} and ${client.guilds.cache.get('320151654496469003').channels.cache.get('396307762235047937')} before you take your next step!`)
        .setThumbnail(member.user.displayAvatarURL());

    member.send(welcomeMessage).catch(console.error);
    const channel = client.channels.cache.get('320151654496469003') as TextChannel;
    channel.send(welcomeMessage).catch(console.error);
});

client.on('messageReactionAdd', async (reaction, user) => {

    // cache reaction
    if(reaction.partial){
        try{
            await reaction.fetch();
        } catch (e) {
            console.log(e.toString());
            return;
        }
    }

    // check if reaction is on server rules message
    if(reaction.message.id === '447507008321748992'){

        // remove reaction on message
        reaction.users.remove(user.id);

        // get member from user
        const memberWhoReacted = reaction.message.guild.member(user.id);

        // check if member is guest
        if (memberWhoReacted.roles.cache.has('447468515457368085')){

            // check if rules are accepted
            if(reaction.emoji.name === '✅'){
                // add member role
                memberWhoReacted.roles.add('320261132327714816');
                // remove guest role
                memberWhoReacted.roles.remove('447468515457368085');

                const activatedMessage = new MessageEmbed()
                    .setDescription(`${user} your account is now activated! hf!:ok_hand:`)
                    .setColor('GREEN')
                    .setThumbnail(user.displayAvatarURL());

                memberWhoReacted.send(activatedMessage).catch(console.error);
            }

        }

    }

});

client.login(DISCORD_TOKEN);
