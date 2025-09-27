Sure! Here's a **concise** and **well-formatted Markdown version** of the **Chess.com Player API** reference you've shared:

---

# ♟️ Chess.com Public API Overview

## 🔹 Player Profile

**Endpoint:**
`GET https://api.chess.com/pub/player/{username}`

**Returns:** Player details.

**Sample Response:**

```json
{
  "@id": "URL",
  "url": "URL",
  "username": "string",
  "player_id": 41,
  "title": "string",               // optional (e.g., GM, IM)
  "status": "basic | premium | closed | mod | staff | etc.",
  "name": "string",                // optional
  "avatar": "URL",                // optional
  "location": "string",           // optional
  "country": "URL",
  "joined": 1178556600,
  "last_online": 1500661803,
  "followers": 17,
  "is_streamer": true,
  "twitch_url": "https://twitch.tv/...",
  "fide": 2500
}
```

📘 [Example Profile](https://api.chess.com/pub/player/erik)

---

## 📅 Monthly Game Archives (List)

**Endpoint:**
`GET https://api.chess.com/pub/player/{username}/games/archives`

**Returns:** List of available archive URLs by month.

```json
{
  "archives": [
    "https://api.chess.com/pub/player/erik/games/2009/10",
    ...
  ]
}
```

📘 [Example](https://api.chess.com/pub/player/erik/games/archives)

---

## ♟️ Monthly Games

**Endpoint:**
`GET https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}`

**Returns:** All finished games (Live & Daily) in a given month.

**Game Object Sample:**

```json
{
  "white": {
    "username": "player1",
    "rating": 1492,
    "result": "win | lose | draw | etc.",
    "@id": "profile_url"
  },
  "black": {
    "username": "player2",
    "rating": 1942,
    "result": "resigned",
    "@id": "profile_url"
  },
  "accuracies": {
    "white": 92.3,
    "black": 88.1
  },
  "url": "game_url",
  "pgn": "PGN data",
  "fen": "final FEN",
  "start_time": 1254438881,
  "end_time": 1254670734,
  "time_control": "600+5",
  "rules": "chess",
  "eco": "E20",
  "tournament": "URL",
  "match": "URL"
}
```

---

## 📊 Player Stats

**Endpoint:**
`GET https://api.chess.com/pub/player/{username}/stats`

**Returns:** Stats for different game modes and activities.

**Sample Stats Object:**

```json
{
  "chess_blitz": {
    "last": {
      "rating": 1450,
      "date": 1610000000
    },
    "best": {
      "rating": 1530,
      "date": 1600000000
    },
    "record": {
      "win": 120,
      "loss": 80,
      "draw": 20
    }
  },
  "tactics": {
    "highest": { "rating": 2100, "date": 1620000000 },
    "lowest": { "rating": 1500, "date": 1590000000 }
  },
  "lessons": {
    "highest": { "rating": 1800, "date": 1630000000 },
    "lowest": { "rating": 1300, "date": 1580000000 }
  },
  "puzzle_rush": {
    "daily": { "score": 28, "total_attempts": 5 },
    "best": { "score": 34, "total_attempts": 20 }
  }
}
```

---
Here’s a clean and concise fix for the **"Game Metadata"** section you asked about — now properly formatted and consistent with the rest of your Markdown reference:

---

## ⏱ Game Metadata

### 🎯 Game Result Codes

| Code           | Description           |
| -------------- | --------------------- |
| `win`          | Win                   |
| `checkmated`   | Checkmated            |
| `agreed`       | Draw agreed           |
| `repetition`   | Draw by repetition    |
| `timeout`      | Timeout               |
| `resigned`     | Resigned              |
| `stalemate`    | Stalemate             |
| `lose`         | Loss                  |
| `insufficient` | Insufficient material |
| `50move`       | Draw by 50-move rule  |
| `abandoned`    | Abandoned             |

### 📄 Common Fields in Game Objects

| Field           | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `rules`         | Game ruleset: `"chess"`, `"chess960"`, `"kingofthehill"`, etc. |
| `time_class`    | Time format: `"daily"`, `"rapid"`, `"blitz"`, `"bullet"`       |
| `time_control`  | PGN-style time control, e.g. `600+5` (10 minutes + 5 sec)      |
| `last_activity` | Unix timestamp of last move or action                          |
| `pgn`           | Full PGN (Portable Game Notation) string of the game           |
