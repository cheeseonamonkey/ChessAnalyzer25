const { fetchAllUsersGames } = require("../../../src/Layers/ProxyLayer/Fetchers");
const { isUserWhite, isUserBlack, isUserWinner } = require("../../../src/Layers/AnalysisLayer/AnalysisUtils")
const { } = require('../../../src/Layers/AnalysisLayer/Engine/EvaluationEngine')


test('fetch all games of user', async ()=>{
    let games = await fetchAllUsersGames(['ffffattyyyy']);
    //console.log(games[0])
});


test('fetch all games of another user', async ()=>{
    let games = await fetchAllUsersGames(['ffatty120']);
    //console.log(games[0])
});
