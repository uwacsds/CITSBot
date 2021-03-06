import { DiscordUser, DiscordMessage } from '../../discord-service/types';
import { daysBetween } from '../../utils/date';
import { LoggingService } from '../../utils/logging';
import { BotActionType } from '../action-types';
import { ModuleType, WelcomerModule } from '../module-types';
import { welcomerEmitter } from './metrics';

export interface WelcomerConfig {
  channel: string;
  newMemberDm: {
    delay: number;
    roleThreshold: number;
    instantAccountAge: number;
    message: string;
  };
}

export const welcomerModule = (config: WelcomerConfig, { log }: LoggingService, now = () => new Date()): WelcomerModule => {
  const emit = welcomerEmitter();
  return {
    type: ModuleType.Welcomer,
    onMemberJoin: async (user: DiscordUser) => {
      log('info', 'Sending a welcome message', { title: 'Welcomer', image: user.avatar, data: { user } });
      const isNewUser = daysBetween(user.createdAt, now()) < config.newMemberDm.instantAccountAge;
      emit.userJoin();
      return [
        {
          type: BotActionType.EmbeddedMessage,
          channelId: config.channel,
          embed: {
            title: 'Hello, world!',
            description: `Hey, ${user.username}`,
            colour: '#0864a5',
            thumbnail: user.avatar,
            fields: [{ name: 'Hot tip', value: 'Check out the rules at #overview' }],
            footer: { iconUrl: user.avatar, text: `Joined • ${new Date().toDateString()}` },
          },
        },
        {
          type: BotActionType.DirectMessage,
          userId: user.id,
          messageContent: config.newMemberDm.message.replace('{name}', user.username ?? ''),
          delay: isNewUser ? 0 : config.newMemberDm.delay,
          condition: async ({ fetchMember }) => {
            const member = await fetchMember(user.id);
            const roleCountBelowThreshold = member.roles.cache.size < config.newMemberDm.roleThreshold;
            if (roleCountBelowThreshold) emit.dmSent(isNewUser);
            return roleCountBelowThreshold;
          },
        },
      ];
    },
    onMessage: async (message: DiscordMessage) => {
      if (message.channel.id !== config.channel) return [];
      log('info', 'Waving at welcome message', { title: 'Welcomer', data: { message } });
      return [
        {
          type: BotActionType.AddReaction,
          channelId: message.channel.id,
          messageId: message.id,
          emoji: '👋',
        },
      ];
    },
  };
};
