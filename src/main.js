const { parsePgns } = require("./Layers/AnalysisLayer/Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

//test run 
(async ()=>  {

    console.log("Fetching games...")
    const gs = await fetchAllUsersGames(['asdfasw4r3094uf0394uf0349uf', 'fffatty','ffattyy','ffatty','ffatty140','ffatty120','ffatty130','ffatty150','ffffattyyyy'])

    console.log(gs.length + ' games fetched.');

    const gsParsed = parsePgns(gs)

    console.log('Starting pipeline...');

    const mainPipeline = new Pipeline('Root',
        [
            async (data) => { 
                return data;
            },
            (data) => {
                parsePgns(data);
                return data;
            },
            //async (data) => { return data; }
        ]
    )

    let out = mainPipeline.invoke(gs)
    console.log(out)
    

  }
  )();