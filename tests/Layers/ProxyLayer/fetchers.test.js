const { fetchAllUsersGames } = require("../../../src/Layers/ProxyLayer/fetchers");
const { isUserWhite, isUserBlack, isUserWinner, parsePgns } = require("../../../src/Layers/AnalysisLayer/analysisBasic")
const { } = require('../../../src/Layers/AnalysisLayer/evaluationEngine')


test('fetch all games of user', async ()=>{
    let games = await fetchAllUsersGames(['ffffattyyyy']);
    //console.log(games[0])
});

