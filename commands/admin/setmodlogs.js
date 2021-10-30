const { ownerID } = require("./../../config.json");
const modLogs = require("../../schemas/modLogs");

module.exports = {
  name: "setmodlogs",

  async execute(args, client, msg) {
    channel = msg.channel.guild.channels.get(msg.channelMentions[0]) || msg.channel.guild.channels.get(args[0]);

    if (!ownerID.includes(msg.author.id) && !msg.member.guild.permissionsOf(msg.member).json.manageGuild) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- You are Missing Permission\n+ Required Permission: MANAGE_SERVER```"
      }
    });
    if (!msg.member.guild.permissionsOf(client.user.id).json.manageWebhooks) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- I am Missing Permission\n+ Required Permission: MANAGE_WEBHOOKS```"
      }
    });
    if (!args[0]) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- Channel Require\n+ Provide a channel to set as modlogs```"
      }
    });
    if (!channel) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- Invalid Channel\n+ Provide a valid channel to set as modlogs```"
      }
    });

    modLogsData = await modLogs.findOne({
      GuildID: msg.member.guild.id
    });

    if (modLogsData) {
      await modLogs.findOneAndDelete({
        GuildID: msg.member.guild.id
      });

      channel.createWebhook({
        name: client.user.username + " Logging",
        avatar: "data:image/jpeg;base64,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"
      }).then(w => {
        newData = modLogs({
          GuildID: msg.member.guild.id,
          ChannelID: channel.id,
          WebhookID: w.id,
          WebhookToken: w.token
        });
        newData.save();
      });

      client.createMessage(msg.channel.id, {
        embed: {
          title: "Sucesfully",
          description: "<#" + channel.id + ">" + " has been set as modlogs channel",
          footer: {
            text: "Channel ID: " + channel.id
          }
        }
      });
    } else if (!modLogsData) {
      channel.createWebhook({
        name: client.user.username + " Logging",
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKK7DwN8OtU8fjUBpdzaQvZBCwuGYbt27GMA/3TVbxT8P8AxL4OYNq+nOkBOFuIzviJ/wB4dD7HBoA5iiiigAoor0r4ffDa81totQubeNzJhrO0myFlGeZZMciIc+7Hgdc0AcrpHgzWdbuLS3s7ZnnuvnSPBysX/PR/7qehPXtWTqVl/Z2p3NkJ4rjyJDH5sOSj4OMrkA4/CvrLW7PRfAfgu7MzGS6uyFnlUBZrtycbBgdwCoUYAHTGMjza28D2/h7RrzxV4rhEMtxvZLYtzBFtO2NTjCueFzgbRwOTwAeGlWXGQRkZGe9JV7WNSbVtUmvDEkKOcRwxgBYkAwqDHYAAVRoAKKKKACiiigAooooA99/Zn/13iT/dt/8A2pXvd5ZW2o2ctpeQRz28ylJI5FyrA9iK8E/Zn/13iT/dt/8A2pX0FQB8dfFXwL/wg3iowW246bdqZrVm5KjPKE+qn9CK4Wvpb9pC0jfwjpV2QPNivvLU+zIxP/oIrjPhD8I38Qyxa/r0BXSUO6CBhg3JHc/7H8/pQBV+GHwtm1p7fWNXts2rndaWkgIFxj+N/SMf+PdBX0esdj4b06S4lYZJUSSbfmkPRVUD8lUfQVpxQRQjEcaoAAAFGMAdB9KSW2hmlilliV3iJMZYZ2kjGR74oA4ee226oniPxOm+6hfGlaXCfMaIHvtH35SM5IyABweM14x8WfHN5falc6XJLCxDENBCQUt+gwxH35OOeSq8AcjI6v4wfE+20zUbjSfD2xtWMP2e61BTkwJnJjQ9m55I6cdxx88kkkknJNABRRRQAUUUUAFFFFABRRRQB77+zP8A67xJ/u2//tSvoKvn39mf/XeJP923/wDalfQVAGB4p8Jaf4uhsLbVAXtbS6FyYR0lIVgFPt82fwrdjjSGNY40VEQBVVRgADsBTqKACvEvjD8XP7H83w54enH28grdXSN/qP8AZUj+Lrn0+vRPi58Yl0kT+HvDc4a/OUubtDkQeqqf7/qe316fN7OzuXdizMckk5JNAAzM7FmJLE5JPekoooAKKKKACiiigAooooAKKKKAPff2Z/8AXeJP923/APalfQVfPv7M/wDrvEn+7b/+1K+gs4FABXFarf6j4uupdG8P3DWunRsY7/Vk65HWKD1fsW6L7npl61480rV/EUHh1NSNppsshgnvkbHnyf8APFH/AIQcEF/wHJyPQ7S0t7G0itbSFIbeJQkcca4VQOwFAHzr8VfguNGtDrfhiKWS0iQfarUsXdMDmQE8kdyO3Xp08Qr7+IBGCMg187fGD4PmyM/iTw3b5tuXu7OMf6v1dB/d9R26jjoAeFUUUUAFFFFABRRRQAUUUUAFFFFAHvn7NBAl8SEnAC2//tSt3xz8QX1yWfRNBnK6ahKXd7GcGc944z/d9WHXoPWvEPBmq6hB9u0a0vDa22pKouSnDyImTsU9s7jn2/XuYoo4IliiQJGgwqjoBQBzXjVVj0O3VAFVZ1AA4AG1q9G+D/xg83yPDXiW4/ecJZ3sh+96I59fQ9+hrzvxx/yBof8AruP/AEFq8/6GgD7/AKQgEYIyDXgvwf8AjB5vkeGvEtx+84SzvZD970Rz6+h/A173QB86/GD4P/YjP4k8N2/+jcvd2cY/1fq6D+76jt16dPCq+/iARgjINfO/xg+D/wBiM/iTw3b/AOjcvd2cY/1fq6D+76jt1HHQA8JooooAKKKKACiiigAooooAkgnktp0miYrIhDKR2NejaN4mtNSiVJnWC56FGOAx9j/SvNaKAPQPHH/IGh/67j/0Fq8/p5lkZAjSMUHIUnimUAAODxXvnwr+NkVtbRaH4suGCIAtvfvk4HZZP6N+frXgdFAH3xaXlrf263FpcRXELjKyROGUj2Iqvq2s6Zotm91ql9b2kCjlpnCg+wz1PsK+GLXUL2yJNpdzwE9fKkK5/KmXF3cXcnmXM8sz/wB6Ryx/M0AdF8QL/wAO6l4uu7rwxayW+nuckMMKz92Vf4VPp/LoOXoooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q=="
      }).then(w => {
        newData = modLogs({
          GuildID: msg.member.guild.id,
          ChannelID: channel.id,
          WebhookID: w.id,
          WebhookToken: w.token
        });
        newData.save();
      });

      client.createMessage(msg.channel.id, {
        embed: {
          title: "Sucesfully",
          description: "<#" + channel.id + ">" + " has been set as modlogs channel",
          footer: {
            text: "Channel ID: " + channel.id
          }
        }
      });
    }
  }
};