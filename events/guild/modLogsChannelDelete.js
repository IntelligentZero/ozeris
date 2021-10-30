modLogs = require("./../../schemas/modLogs");

module.exports = {
  name: "channelDelete",

  async execute(channel, client) {
    if (!channel.guild) return;

    modLogsData = await modLogs.findOne({
      GuildID: channel.guild.id
    });

    if (modLogsData) {
      channelDeleteAuditLogs = await channel.guild.getAuditLog({ actionType: 12, limit: 1 });
      channelDeleteAuditLog = channelDeleteAuditLogs.entries[0];

      const { user } = channelDeleteAuditLog;

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
            title: "Channel Deleted",
            fields: [
              { name: "Name", value: channel.name, inline: true },
              { name: "Type", value: channelType, inline: true },
              {
                name: "Deleted by", value: "<@" + user.id + ">" || "Unknown", inline: true
              }
            ],
            footer: {
              text:
                "Channel ID: " + channel.id + " | Deletor ID: " + user.id || "Unknown"
            }
          }
        ]
      }).catch(() => null);
    } else {
      if (!modLogsData) return;
    }
  }
};