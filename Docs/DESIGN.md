Essentially it is a big data transformation pipeline.


The pipeline passes a single, mutable reference object though 5 broad layers with strong separations of concern:

1. **Source Layer** *(external Chess.com API)*
2. **Proxy Layer** *(fetching, rate limits, caching)*
3. **Analysis/Processing Layer** *(preprocess data, derive all metrics)*
   1. Pre-processing 
   2. Position metrics
   3. Game metrics
   4. User metrics 
5. **REST API Layer** *(final exposed API endpoints)*
6. **UI Layer**


The pipeline is *backwards-dependant*, meaning:
- data moves in only one direction
- latter layers utilize former layers
- earlier pipeline steps may not be easily ordered/changed
- testing may require running previous steps *(or mock data)*



### Credits & Thanks
- Sunfish _(I heavily modified their chess engine into evaluation functions & converted it to JS)_


