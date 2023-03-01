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
                <th>FPTS_PG</th>
            </thead>
            <tbody>
                <tr>
                    <td>Season Stats</td>
                    <td>{playerStats[0].fpts_pg}</td>
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