const { fetchAllUsersGames } = require("../src/1_ProxyLayer/fetchers");
const { isUserWhite, isUserBlack, isUserWinner, parsePgns } = require("../src/2_AnalysisLayer/analysisBasic")
const { } = require('../src/2_AnalysisLayer/evaluationEngine')


test('fetch all games of user', async ()=>{
    let games = await fetchAllUsersGames(['ffffattyyyy']);
    //console.log(games[0])
});

