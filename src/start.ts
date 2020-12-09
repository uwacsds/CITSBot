import { discordCommandHandler } from './domain/command-handler';
import { discordBot } from './discord-service/discord-bot';
import { validateConfig } from './domain/config';
import { academicCalendarService } from './academic-calendar/academic-calendar-service';
import { academicWeeksParser } from './academic-calendar/weeks-parser';
import { academicDeadlinesParser } from './academic-calendar/deadlines-parser';
import { discordChannelLogger } from './utils/logging';

const env = {
  CONFIG: validateConfig(JSON.parse(process.env.CONFIG ?? '{}')),
  DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
};

const start = async () => {
  const logger = discordChannelLogger(env.CONFIG.logChannel);
  const calendar = academicCalendarService(logger, academicWeeksParser(), academicDeadlinesParser());
  const commandHandler = discordCommandHandler(env.CONFIG, logger, calendar);
  const bot = discordBot(logger, commandHandler, env.CONFIG.guild);
  logger.initialise(bot);
  await bot.start(env.DISCORD_TOKEN);
  logger.log('notice', 'Bot has started', { title: 'Hello, World' });
};

start();
