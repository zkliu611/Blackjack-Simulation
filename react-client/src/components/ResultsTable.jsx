import React from 'react';
import ResultsTableRows from './ResultsTableRows.jsx';

const ResultsTable = ({data}) => {
  if (data) {
    return (
      <div className="playerInput">
        <table >
          <tr>
            <th>Model Name</th>
            <th># of Games</th>
            <th>Playing Strategy</th>
            <th>Betting Strategy</th>
            <th>Starting Bankroll $</th> 
            <th>Ending Bankroll $</th>
            <th>Net Gain/Loss</th>
          </tr>
          {data.map((data) => <ResultsTableRows row={data}/>)}
          {/* {videos.map((video) => <VideoListEntry key={video.etag}/>)} */}
        </table>
      </div>
    )
  } else {
    return (
      <div>loading data...</div>
    )
  }
}

export default ResultsTable;