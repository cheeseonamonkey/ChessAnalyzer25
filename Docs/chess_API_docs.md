

## Player Profile

Endpoint:
`GET https://api.chess.com/pub/player/ffffattyyyy`

Player details.

```json
{
  "username": "ffffattyyyy",
  "player_id": 41,
  "title": "string",  
  "status": "basic | premium | closed | etc.",
  "name": "string",  
  "avatar": "URL",   
  "location": "string",  
  "joined": 1178556600,
  "followers": 17,
  "fide": 2500
}
```



## Monthly Game Archives

Endpoint:
`GET https://api.chess.com/pub/player/ffffattyyyy/games/archives`

List of monthly game archive URLs.

```json
{
  "archives": [
    "https://api.chess.com/pub/player/ffffattyyyy/games/2009/10",
    "https://api.chess.com/pub/player/ffffattyyyy/games/2009/9"
    ...
  ]
}
```



## Monthly Games

Endpoint:
`GET https://api.chess.com/pub/player/ffffattyyyy/games/2025/9`

Games played in the given month.

```json
{
  "white": {
    "username": "player1",
    "rating": 1492,
    "result": "win | lose | draw"
  },
  "black": {
    "username": "player2",
    "rating": 1942,
    "result": "resigned"
  },
  "accuracies": {
    "white": 92.3,
    "black": 88.1
  },
  "url": "game_url",
  "pgn": "PGN data",
  "fen": "final FEN"
}
```



## Player Stats

Endpoint:
`GET https://api.chess.com/pub/player/ffffattyyyy/stats`

Player stats for various modes.

```json
{"chess_rapid":{"last":{"rating":406,"date":1758927203,"rd":17},"best":{"rating":698,"date":1753191353,"game":"https://www.chess.com/game/live/140980363540"},"record":{"win":273,"loss":294,"draw":22}},"chess_bullet":{"last":{"rating":147,"date":1758616401,"rd":204},"record":{"win":0,"loss":2,"draw":0}},"chess_blitz":{"last":{"rating":215,"date":1758770122,"rd":92},"best":{"rating":337,"date":1753084506,"game":"https://www.chess.com/game/live/143455327002"},"record":{"win":6,"loss":8,"draw":0}},"fide":0,"tactics":{"highest":{"rating":1002,"date":1758518326},"lowest":{"rating":400,"date":1753083226}},"puzzle_rush":{"best":{"total_attempts":9,"score":6}}}
```
