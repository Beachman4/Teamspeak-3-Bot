# Teamspeak-3-Bot

To get this program to work, run npm install and then create a new folder called config and create default.json inside that folder.

The layout is such,
```json
{
  "info": {
    "server": (This is your teamspeak server address),
    "username":  (This is your server query username),
    "password": (This is your server query password)
  }
}
```

Then run node src/teamspeak.js and it will automatically detect vpn connections.
