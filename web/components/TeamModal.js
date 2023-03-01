import * as fcl from "@onflow/fcl";
import React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import styles from '../styles/TeamModal.module.css'
import { useAuth } from "../contexts/AuthContext";

function TeamModal(props) {

    const { currentUser, logOut, logIn } = useAuth();

    const [teamData, setTeamData] = useState([])
    const [teamName, setTeamName] = useState(null)

    useEffect(() => {
      async function fetchTeams() {
        try {
          const team = props.value

          var statsArr = []

          for(let i=0;i<team.players.length;i++) {
            let player = team.players[i]

            const response = await axios.get(`http://localhost:8000/playerName/${player}`);

            const statsReq = await axios.get(`http://localhost:8000/getPlayerWeekly/${response.data.id}`);

            statsArr.push({player: team.players[i], stats: statsReq.data})
          }
          console.log(statsArr);
          console.log(props.value.name)

          setTeamName(props.value.name)
          setTeamData(statsArr)
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchTeams();
  }, [props.value]);


  return (
    <div className={styles.container}>
      {teamName ? (
        <div className={styles.teamList}>
          Weekly Stats For: {teamName}
          <table className={styles.tables}>
            <thead className={styles.heads}>
              <tr>
                <td>Player Name</td>
                <td>Fantasy Points per Game</td>
                <td>Total Weekly Fantasy Points</td>
              </tr>
            </thead>
            <tbody>
            {teamData.map(({player, stats}) => (
                <tr key={player}>
                    <td>{player}</td>
                    <td>{stats.fpts_per}</td> 
                    <td>{stats.fp}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading team stats...</p>
      )}
        <button onClick={props.onClose}>Close</button>
    </div>
  );
}

export default TeamModal;