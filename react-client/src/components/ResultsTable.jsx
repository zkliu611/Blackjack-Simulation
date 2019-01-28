import React from 'react';

const ResultsTable = () => {
  return (
    <div className="playerInput">
      <table >
        <tr>
          <th>Model Name</th>
          <th># of Games</th>
          <th>Starting $</th> 
          <th>Ending $</th>
          <th>Net Gain/Loss</th>
        </tr>
        <tr>
          <td>Rolling it</td>
          <td>5000</td>
          <td>$1000</td>
          <td>$3000</td>
          <td>$2000</td>
        </tr>
      </table>
    </div>
  )
}

export default ResultsTable;