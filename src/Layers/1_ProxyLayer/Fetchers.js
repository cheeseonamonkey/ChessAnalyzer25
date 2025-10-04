const axios = require('axios');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function verifyUserExists(username) {
  try {
    await axios.get(`https://api.chess.com/pub/player/${username}/games/archives`);
    return true;
  } catch {
    console.info(`    Username not found: ${username}`);
    return false;
  }
}

async function fetchUserArchives(username) {
  await sleep(30);
  const res = await axios.get(`https://api.chess.com/pub/player/${username}/games/archives`);
  return res.data.archives;
}

async function fetchArchiveGames(username, month, year) {
  await sleep(6);
  const res = await axios.get(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`);
  return res.data.games;
}

async function fetchAllUsersGames(usernames) {
  if (!Array.isArray(usernames) || usernames.length === 0) return [];
  
  const allGames = [];
  const now = new Date();
  
  for (const username of usernames) {
    if (!(await verifyUserExists(username))) continue;
    
    console.info(`  Fetching games for: ${username}...`);
    const userGameCount = allGames.length;
    
    const archives = await fetchUserArchives(username);
    for (const archiveUrl of archives) {
      const [year, month] = archiveUrl.split('/').slice(-2);
      
      // Skip future months
      const archiveDate = new Date(year, month - 1);
      if (archiveDate > now) continue;
      
      const games = await fetchArchiveGames(username, month, year);
      allGames.push(...games);
    }
    
    const gamesForThisUser = allGames.length - userGameCount;
    console.info(`    ${gamesForThisUser} games found for ${username} (total: ${allGames.length})`);
  }
  
  // Extract PGNs
  return allGames.map(g => g.pgn.replaceAll("\n", '    '));
}

module.exports = { fetchAllUsersGames };