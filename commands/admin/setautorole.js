const { ownerID } = require("./../../config.json");
const autoRole = require("./../../schemas/autoRole");

module.exports = {
  name: "setautorole",
  async execute(args, client, msg) {
    role = msg.channel.guild.roles.get(msg.roleMentions[0]) || msg.channel.guild.roles.get(args[0]);

    if (!ownerID.includes(msg.author.id) && !msg.member.guild.permissionsOf(msg.member).json.manageRoles) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- You are Missing Permission\n+ Required Permission: MANAGE_ROLES```"
      }
    });
    if (!msg.member.guild.permissionsOf(client.user.id).json.manageRoles) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- I am Missing Permission\n+ Required Permission: MANAGE_ROLES```"
      }
    });
    if (!args[0]) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- Role Required\n+ Provide a role to set as autorole```"
      }
    });
    if (!role) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- This isn't a role\n+ Provide a valid role```"
      }
    });
    if (role.managed) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- This role is managed by an integration\n+ Provide a role which is not managed by an integration```"
      }
    });

    autoRoleData = await autoRole.findOne({
      GuildID: msg.member.guild.id
    });

    if (autoRoleData)
      await autoRole.findOneAndDelete({
        GuildID: msg.member.guild.id
      });

    newData = new autoRole({
      GuildID: msg.member.guild.id,
      RoleID: role.id
    });
    newData.save();

    client.createMessage(msg.channel.id, {
      embed: {
        title: "Sucesfully",
        description: "<@&" + role.id + ">" + " has been set as autorole",
        footer: {
          text: "Role ID: " + role.id
        }
      }
    });
  }
};