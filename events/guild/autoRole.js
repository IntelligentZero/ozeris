autoRole = require("./../../schemas/autoRole")

module.exports = {
  name: "guildMemberAdd",
  async execute(guild, member, client) {
    if (!member.guild.permissionsOf(client.user.id).json.manageRoles) return;

    autoRoleData = await autoRole.findOne({
      GuildID: guild.id
    });
    
    member.addRole(autoRoleData.RoleID, "Kyno Autorole").catch(() => null)
  }
};