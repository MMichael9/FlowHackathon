import React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import styles from '../styles/PlayerModal.module.css'

function MyModal(props) {
    
    const [playerStats, setPlayerStats] = useState(null);

    useEffect(() => {
        async function fetchPlayerStats() {
          try {
            var statsArray = []
            const response = await axios.get(`http://localhost:8000/playerName/${props.value}`);

            const statsReq = await axios.get(`http://localhost:8000/getSeasonStats/${response.data.id}`);
            statsArray.push(statsReq.data)

            const LastFive = await axios.get(`http://localhost:8000/getLastFiveGames/${response.data.id}`);
            statsArray.push(LastFive.data)

            const LastTen = await axios.get(`http://localhost:8000/getLastTenGames/${response.data.id}`);
            statsArray.push(LastTen.data)


            console.log(statsArray)
            setPlayerStats(statsArray);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchPlayerStats();
    }, [props.value]);


  return (
    <div>
      <h2>Modal</h2>
      <p>{props.value}</p>
      {playerStats ? (
        <div>
          <table className={styles.tables}>
            <thead className={styles.heads}>
                <th></th>
                <th>GP</th>
                <th>PTS</th>
                <th>PPG</th>
                <th>FGM</th>
                <th>FGA</th>
                <th>FG3M</th>
                <th>FTM</th>
                <th>FTA</th>
                <th>AST</th>
                <th>REB</th>
                <th>BLK</th>
                <th>STL</th>
                <th>TOV</th>
                <th>FPTS</th>
                <th>FPTS_PG</th>
            </thead>
            <tbody>
                <tr>
                    <td>Season Stats</td>
                    <td>{playerStats[0].gp}</td>
                    <td>{playerStats[0].pts}</td>
                    <td>{playerStats[0].ppg}</td>
                    <td>{playerStats[0].totfgm}</td>
                    <td>{playerStats[0].totfga}</td>
                    <td>{playerStats[0].fg3m}</td>
                    <td>{playerStats[0].ftm}</td>
                    <td>{playerStats[0].fta}</td>
                    <td>{playerStats[0].ast}</td>
                    <td>{playerStats[0].reb}</td>
                    <td>{playerStats[0].blk}</td>
                    <td>{playerStats[0].stl}</td>
                    <td>{playerStats[0].tov}</td>
                    <td>{playerStats[0].fpts}</td>
                    <td>{playerStats[0].fpts_pg}</td>
                </tr>
                <tr>
                    <td>Last 5 Games</td>
                    <td>5</td>
                    <td>{playerStats[1].pts5}</td>
                    <td>x</td>
                    <td>{playerStats[1].fgm5}</td>
                    <td>{playerStats[1].fga5}</td>
                    <td>{playerStats[1].threesmade5}</td>
                    <td>{playerStats[1].ftm5}</td>
                    <td>{playerStats[1].fta5}</td>
                    <td>{playerStats[1].ast5}</td>
                    <td>{playerStats[1].reb5}</td>
                    <td>{playerStats[1].blk5}</td>
                    <td>{playerStats[1].stl5}</td>
                    <td>{playerStats[1].tov5}</td>
                    <td>{playerStats[1].fp5}</td>
                    <td>{playerStats[1].fpts_per5}</td>
                </tr>
                <tr>
                    <td>Last 10 Games</td>
                    <td>10</td>
                    <td>{playerStats[2].pts10}</td>
                    <td>x</td>
                    <td>{playerStats[2].fgm10}</td>
                    <td>{playerStats[2].fga10}</td>
                    <td>{playerStats[2].threesmade10}</td>
                    <td>{playerStats[2].ftm10}</td>
                    <td>{playerStats[2].fta10}</td>
                    <td>{playerStats[2].ast10}</td>
                    <td>{playerStats[2].reb10}</td>
                    <td>{playerStats[2].blk10}</td>
                    <td>{playerStats[2].stl10}</td>
                    <td>{playerStats[2].tov10}</td>
                    <td>{playerStats[2].fp10}</td>
                    <td>{playerStats[2].fpts_per10}</td>
                </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading player stats...</p>
      )}
      <button onClick={props.onClose}>Close</button>
    </div>
  );
}

export default MyModal;