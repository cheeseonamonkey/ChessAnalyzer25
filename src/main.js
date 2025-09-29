const { getTurnCastled, getCastleType, getWinner, getWinnerColor } = require("./Layers/AnalysisLayer/Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/AnalysisLayer/Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

//test run 
(async ()=>  {


    console.log('Starting pipeline...');

    const mainPipeline = new Pipeline('Root',
        [
            async (_) => {
                console.log("Fetching games...")
                const games = await fetchAllUsersGames(['asdfasw4r3094uf0394uf0349uf', 'fffatty','ffattyy','ffatty','ffatty140','ffatty120','ffatty130','ffatty150','ffffattyyyy'])
                console.log(games.length + ' games fetched.');
                return games;
            },
            (data) => {
                console.log("Parsing PGNs...")
                const parsed = parsePgns(data);
                return parsed;
            },
            (data) => {
                console.log("Getting GameMetrics1...")
                data.forEach(game => {

                    // objective: 
                    game.metrics['Winner'] = getWinner(game)
                    game.metrics['WinnerColor'] = getWinnerColor(game)
    
                    // white:
                    game.metrics.White['CastleTurn'] = getTurnCastled(game, 'white')
                    game.metrics.White['CastleType'] = getCastleType(game, 'white')
    
                    // black:
                    game.metrics.Black['CastleTurn'] = getTurnCastled(game, 'black')
                    game.metrics.Black['CastleType'] = getCastleType(game, 'black')
                });
                return data;
            },
            (data) => {
                
                return data;
            },
            //(data) => { return data; }
        ]
    )

    let out = await mainPipeline.invoke([])
    console.log(out)
    

  }
  )();