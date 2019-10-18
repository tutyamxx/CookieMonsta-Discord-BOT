<p align="center">
  <img src="https://i.imgur.com/5WDYzyG.png" widht="420" height="290"><br/>
</p>
<br/><br/>


# CookieMonsta Discord BOT

* This was my private **Discord BOT** and has been written using [**Discord.JS library**](https://discord.js.org/#/)
* To see what the BOT can do, go here: https://github.com/tutyamxx/CookieMonsta-BOT
* **BOT is ONLINE AGAIN!**, if you want to run it or host it, make sure you read the files, you might need some **API keys** here and there (you can find what you need in *botconfig.json*).
* Max servers that the BOT has been present in: ***170***
* Thanks to my friend [CoachAprax](https://www.youtube.com/user/freeAEgraphics) for the banners and some images.

## Now, a few things you need first:

* **Linux** or **Mac OS X**
* *If you have Windows, sorry. Might work, but 100% I had trouble running it on Windows.*
* [**Discord**](https://discordapp.com/) installed.


# Step 1 - Tools needed to be installed first in order to run the BOT properly

## For Linux:

```
apt-get install ffmpeg
sudo apt-get install build-essential

sudo apt-get install imagemagick libmagickcore-dev libmagickwand-dev libmagic-dev
sudo apt-get install imagemagick
```

## For Mac:
```
brew install graphicsmagick
brew upgrade graphicsmagick
```

## Step 2 - You need [NPM (Node Package Manager)](https://www.npmjs.com/) and [Node.JS](https://nodejs.org/en/). After that, install these -- IN THE SAME ORDER AS DISPLAYED -- on the bot folder (copy and paste one command at a time, in your terminal):

```
sudo npm install -g node-gyp@^5.0.3
npm install --package-lock-only tar@4.4.10 fs-minipass@1.2.6 minipass@2.6.0
npm install --save better-sqlite3

npm install --save discord.js
npm install --save jimp
npm i gm
npm i needle
npm i get-json
npm i ignore-case
npm i flip-text
npm i moji-translate
sudo npm install long
npm install moment
npm install --save word-wrap

npm install node-opus
```

## To avoid node-gyp rebuild all over again after installing node-opus, copy and paste this command in terminal
```
npm cache clean -f
npm install -g n
n stable
npm install npm -g
npm config set unsafe-perm true
```

## BOT Uses these images gathered by me, in 2 albums. Links are below:

* https://imgur.com/a/gCLpzLJ
* https://imgur.com/a/mMQYaDq 

## If you want to run the BOT script forever, install this:

```npm install forever -g```

## Usage:
* ``forever start CookieMonstaBOT.js``
* ``forever stopall``
* ``forever list``
