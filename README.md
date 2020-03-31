# CITS Bot

### Local Development with Docker

1. Install docker https://www.docker.com/products/docker-desktop
2. Configure the bot by following steps 3, 4, and 5 from Local Development with Virtual Env
3. Use `run.sh` to build and run the bot

### Local Development with Virtual Env

1. Install python3.8 and pip for your operating system

2. Set up a virtual environment

    1. Create a venv `python -m venv venv`
    2. Activate the venv 
        1. Mac/Linux: `source venv/bin/activate`
        2. Windows: `venv\Scripts\activate.bat`
    3. Install pip dependencies `pip install -r requirements.txt`

3. Create a bot account for testing

    1. Log in to https://discordapp.com/developers/applications
    2. Click "New Application" and give it a name
    3. Click on "Bot" in the list on the left
    4. Click "Add Bot" and then "Yes, do it!"
    5. Click on "OAuth2" in the list on the left
    6. Tick "bot" in scopes
    7. Tick "Administrator" in bot permissions
    8. Go to the generated link in scopes to add the bot to your test server
    
4. Set up environment variables

    1. Create a new file called `.env` in the root of this repo (next to config.json)
    2. Populate your `.env` file with values from your bot application. You can find your values for `DISCORD_ID` and `DISCORD_SECRET` under General Information and `DISCORD_TOKEN` under Bot. **Do not share these values with anyone.**
        ```bash
        CONFIG=config.json
        DISCORD_ID=____YOUR_CLIENT_ID_HERE____
        DISCORD_SECRET=____YOUR_CLIENT_SECRET_HERE____
        DISCORD_TOKEN=____YOUR_BOT_TOKEN_HERE____
        ```
5. Configure the bot

    1. The example `config.json` file provided contains IDs for channels, servers, and roles. You will need to change these values to ones from your test server.
    2. So get IDs go to your discord settings and enable developer mode. The toggle can be found at the bottom of the "Appearance" section under Advanced.
    3. You can now right click on channels, users, roles, etc. to copy their ID which you can put in your `config.json` file

6. Run the bot

    1. Start the bot with `python src/bot.py`
    2. The bot should now be online in your server
    3. To test it out, run a command e.g. `!cowsay hello world`
