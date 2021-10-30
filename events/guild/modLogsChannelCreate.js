modLogs = require("./../../schemas/modLogs");

module.exports = {
  name: "channelCreate",

  async execute(channel, client) {
    if (!channel.guild) return;

    modLogsData = await modLogs.findOne({
      GuildID: channel.guild.id
    });

    if (modLogsData) {
      channelCreateAuditLogs = await channel.guild.getAuditLog({ actionType: 10, limit: 1 });
      channelCreateAuditLog = channelCreateAuditLogs.entries[0];

      const { user } = channelCreateAuditLog;

      channelType = "";
      if (channel.type === 0) {
        channelType = "Text"
      } else {
        if (channel.type === 2) {
          channelType = "Voice"
        } else {
          if (channel.type === 5) {
            channelType = "Announcement"
          } else {
            if (channel.type === 11) {
              channelType = "Thread"
            } else {
              if (channel.type === 13) {
                channelType = "Stage"
              }
            }
          }
        }
      }

      client.executeWebhook(modLogsData.WebhookID, modLogsData.WebhookToken, {
        embeds: [
          {
            title: "Channel Created",
            description: "<#" + channel.id + ">",
            fields: [
              { name: "Name", value: channel.name, inline: true },
              { name: "Type", value: channelType, inline: true },
              { name: "Created by", value: "<@" + user.id + ">" || "Unknown", inline: true }
            ],
            footer: {
              text:
                "Channel ID: " + channel.id + " | Creator ID: " + user.id || "Unknown"
            }
          }
        ]
      }).catch(() => null);
    } else {
      if (!modLogsData) return;
    }
  }
};