module.exports = {
  name: "serverinfo",
  execute(args, client, msg) {
    descriptionContent = msg.member.guild.description || "No Description";
    if (descriptionContent.length > 1024) descriptionContent = "Too Long to Display"
    featuresContent = msg.member.guild.features.map(f => f.charAt(0).toUpperCase() + f.replaceAll(/_/g, " ").toLowerCase().slice(1)).join(", ") || "No Features";
    if (featuresContent.length > 1024) featuresContent = "Too Many to Display";
    emojisContent = msg.member.guild.emojis.map(e => "<" + (e.animated ? "a:" : ":") + e.name + ":" + e.id + ">").join(", ") || "No Emojis";
    if (emojisContent.length >= 1024) emojisContent = "Too Many to Display";
    verificationLevelContent = "";
    if (msg.member.guild.verificationLevel === 0) {
      verificationLevelContent = "None";
    } else {
      if (msg.member.guild.verificationLevel === 1) {
        verificationLevelContent = "Must have verified email on account";
      } else {
        if (msg.member.guild.verificationLevel === 2) {
          verificationLevelContent =
            "Must be registered on Discord for longer than 5 minutes";
        } else {
          if (msg.member.guild.verificationLevel === 3) {
            verificationLevelContent =
              "Must be a member of the server for longer than 10 minutes";
          } else {
            if (msg.member.guild.verificationLevel === 4) {
              verificationLevelContent = "Must have a verified phone number";
            }
          }
        }
      }
    }
    defaultNotificationsContent = "";
    if (msg.member.guild.defaultNotifications === 0) {
      defaultNotificationsContent = "All Messages";
    } else {
      if (msg.member.guild.defaultNotifications === 1) {
        defaultNotificationsContent = "Only Mentions";
      }
    }

    rolesContent = msg.member.guild.roles.filter(r => r.id != msg.member.guild.id).map(r => "<@&" + r.id + ">").join(", ") || "No Roles";
    if (rolesContent.length > 200) rolesContent = "Too Many to Display";
    avatarJpg = msg.member.guild.dynamicIconURL("jpg", 4096)
    avatarPng = msg.member.guild.dynamicIconURL("png", 4096)
    avatarWebp = msg.member.guild.dynamicIconURL("webp", 4096)

    client.createMessage(msg.channel.id, {
      embed: {
        author: {
          name: msg.member.guild.name,
          icon_url: msg.member.guild.iconURL
        },
        fields: [
          { name: "Owner", value: "<@" + msg.member.guild.ownerID + ">", inline: true },
          { name: "Description", value: descriptionContent, inline: true },
          { name: "Creation Date", value: "<t:" + Math.round(msg.member.guild.createdAt / 1000) + ">", inline: true },
          { name: "Features", value: featuresContent, inline: true },
          { name: "Emojis", value: emojisContent, inline: true },
          { name: "Verification Level", value: verificationLevelContent, inline: true },
          { name: "Default Notifications", value: defaultNotificationsContent, inline: true },
          { name: "Members Count", value: msg.member.guild.memberCount, inline: true },
          { name: "Roles", value: rolesContent, inline: true },
          { name: "Icon", value: "[JPG](" + avatarJpg + ") | [PNG](" + avatarPng + ") | [WEBP](" + avatarWebp + ")", inline: true },
          { name: "Boost Count", value: msg.member.guild.premiumSubscriptionCount, inline: true },
          { name: "Boost Tier", value: msg.member.guild.premiumTier, inline: true }
        ],
        thumbnail: {
          url: msg.member.guild.iconURL
        }
      }
    });
  }
};