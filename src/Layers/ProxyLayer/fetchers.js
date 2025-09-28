const axios = require('axios');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function verifyUserExists(username) {
  try {
    await axios.get(`https://api.chess.com/pub/player/${username}/games/2025/09`);
    return true;
  } catch {
    return false;
  }
}

async function fetchUserArchives(username) {
  await sleep(25);
  const res = await axios.get(`https://api.chess.com/pub/player/${username}/games/archives`);
  return res.data.archives;
}

async function fetchArchiveGames(username, month, year) {
  await sleep(5);
  const res = await axios.get(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`);
  return res.data.games;
}

async function fetchAllUsersGames(usernames) {
  if (!Array.isArray(usernames) || usernames.length === 0) return [];

  const allGames = [];
  for (const username of usernames) {
    if (!(await verifyUserExists(username))) continue;

    const archives = await fetchUserArchives(username);
    for (const archiveUrl of archives) {
      const [year, month] = archiveUrl.split('/').slice(-2);
      const games = await fetchArchiveGames(username, month, year);
      allGames.push(...games);
    }
  }
  return allGames;
}

module.exports = { fetchAllUsersGames };


//test run 
//(async ()=>  console.log(await fetchAllUsersGames(['asdfasw4r3094uf0394uf0349uf', 'fffatty','ffattyy','ffatty','ffatty140','ffatty120','ffatty130','ffatty150','ffffattyyyy'])) )();


/*
items in the array are like this:


{
    "url": "https://www.chess.com/game/live/140932387438",
    "pgn": "[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2025.07.21\"]\n[Round \"-\"]\n[White \"ffffattyyyy\"]\n[Black \"Darknight21060\"]\n[Result \"0-1\"]\n[CurrentPosition \"r1b1k1nr/ppp3pp/2np4/4p1q1/3P2P1/2N5/PPP1PP2/R2QKB1R w KQkq - 0 9\"]\n[Timezone \"UTC\"]\n[ECO \"A00\"]\n[ECOUrl \"https://www.chess.com/openings/Van-Geet-Opening-Reversed-Nimzowitsch-Napoleon-Attack\"]\n[UTCDate \"2025.07.21\"]\n[UTCTime \"07:35:13\"]\n[WhiteElo \"633\"]\n[BlackElo \"824\"]\n[TimeControl \"600\"]\n[Termination \"Darknight21060 won by resignation\"]\n[StartTime \"07:35:13\"]\n[EndDate \"2025.07.21\"]\n[EndTime \"07:36:50\"]\n[Link \"https://www.chess.com/game/live/140932387438\"]\n\n1. d4 {[%clk 0:09:57.2]} 1... Nc6 {[%clk 0:09:57.5]} 2. Nf3 {[%clk 0:09:48.4]} 2... e5 {[%clk 0:09:53.3]} 3. Nc3 {[%clk 0:09:41.3]} 3... d6 {[%clk 0:09:49.8]} 4. Bg5 {[%clk 0:09:35.6]} 4... Be7 {[%clk 0:09:47.3]} 5. h4 {[%clk 0:09:28.3]} 5... f6 {[%clk 0:09:46.1]} 6. g4 {[%clk 0:09:03.5]} 6... fxg5 {[%clk 0:09:43.8]} 7. hxg5 {[%clk 0:09:01.5]} 7... Bxg5 {[%clk 0:09:39.7]} 8. Nxg5 {[%clk 0:08:56]} 8... Qxg5 {[%clk 0:09:37.3]} 0-1\n",
    "time_control": "600",
    "end_time": 1753083410,
    "tcn": "lB5Qgv0KbsZRcM90pF1ToETMFM0MvM7M",
    "fen": "r1b1k1nr/ppp3pp/2np4/4p1q1/3P2P1/2N5/PPP1PP2/R2QKB1R w KQkq - 0 9",
    "time_class": "rapid",
    "white": {
        "rating": 633,
        "result": "resigned",
        "@id": "https://api.chess.com/pub/player/ffffattyyyy",
        "username": "ffffattyyyy",
        "uuid": "090b33d8-6605-11f0-a6b9-c7fb2182c58c"
    },
    "black": {
        "rating": 824,
        "result": "win",
        "@id": "https://api.chess.com/pub/player/darknight21060",
        "username": "Darknight21060",
        "uuid": "a6147066-34a3-11ef-b208-83c070850c9b"
    },
    "eco": "https://www.chess.com/openings/Van-Geet-Opening-Reversed-Nimzowitsch-Napoleon-Attack"
}
*/



