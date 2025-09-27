# Layers:

Independent modular layers with a strong separation of concerns:
1. **Chess.com API** *(external API - source raw data)*
2. **Proxy Layer** *(Chess.com API fetching, watching rate limits, caching)*
3. **Analysis/Processing Layer** *(derive metrics - parse data & PGNs, identify insights, calculate statistics, etc.)*
4. **REST API Layer** *(exposed API endpoints to serve processed data, stats, etc.)*
5. **UI Layer** *(front-end)*
Layers are *backwards-dependant*; data moves sequentially in one direction. 

### 1. Chess.com API (external)
 - Chess.com public API, archiving all chess games
 - External
 - Single origin of all data

### 2. Proxy Layer
Fetching and organize data from Chess.com.
 - Aggressive disk-caching for past months *(data will never change)*
 - Politely respect Chess.com rate-limits

### 3. Analysis Layer
All calculations & processing - turning raw game data into useful metrics.

This layer itself has sub-layers:
 1. Pre-processing
 2. Position metrics *(metrics on a single chess position)*
 3. Game metrics *(metrics on all positions throughout a game)*
 4. User metrics *(metrics on all games throughout a user)*

#### Position metrics:
 - Metric derived from a single position *(FEN)*
#### Game metrics:
 - Metric derived from many positions
#### User metrics:
 - Metric derived from many games



Win/loss/draw rates vs. specific metrics:
    - ECO
    - White / black
    - Sharpness
    - Turn castled
    - Castle type
    - etc.

### 4. REST API Layer
Clean API endpoints. 

### 5. UI Layer
Front-end / UI.



# Remarks
- For comparitive & context purposes, always show values with average/noise values from random users, preferably even grouped by ELO.
- Layered *(vs pipeline)* pattern here because: While both do sequential steps of data transformation, *layers* can utilize dependencies of previous steps - *pipeline* steps are interchangeable and can be in different orders.

### Project-specific dev terminologies:
- **Metric**: Any calculated data, derived in the analysis layer *(i.e. an integer: the material score of a chess position)*. You can derive a metric from a position, a game, one or more series, etc.
- **Series**: A set of sequential metrics *(i.e. an array: a list of all positions' material scores over the course of a game)*; a type of metric itself.
- **Baseline**: Reference metrics for context/comparison *(random user data)*


### Credits & Thanks
- Sunfish _(I heavily modified their chess engine into evaluation functions & converted it to JS)_


