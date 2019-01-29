import React from 'react';

const ResultsTableRows = ({row}) => {
  return ( 
    <tr>
      <td>{row.name}</td>
      <td>{row.games}</td>
      <td>{row.playingStrategy}</td>
      <td>{row.bettingStrategy}</td>
      <td>${row.startBankroll}</td>
      <td>${row.endBankroll}</td>
      <td>${row.endBankroll - row.startBankroll}</td>
    </tr>
  )
}

export default ResultsTableRows;