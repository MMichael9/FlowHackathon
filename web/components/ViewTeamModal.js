import * as fcl from "@onflow/fcl";
import React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import styles from '../styles/ViewTeamModal.module.css'
import { useAuth } from "../contexts/AuthContext";

function ViewTeamModal(props) {

    const { currentUser, logOut, logIn } = useAuth();

    const [teamData, setTeamData] = useState([])
    const [teamName, setTeamName] = useState(null)

    const [totalFantasyPoints, setTotalFantasyPoints] = useState(0)


    useEffect(() => {
      async function fetchTeamData() {
        try {
            const team = props.value

            var statsArr = []

            var test = 0

            console.log(totalFantasyPoints);

            for(let i=0;i<team.players.length;i++) {
                let player = team.players[i]

                const response = await axios.get(`http://localhost:8000/playerName/${player}`);

                const statsReq = await axios.get(`http://localhost:8000/getLiveStats/${response.data.id}`);

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
  
      fetchTeamData();
  }, [props.value]);


  return (
    <div className={styles.container}>
        {teamName ? (
            <div className={styles.teamList}>
            Stats For: {teamName}
            <table className={styles.tables}>
                <thead className={styles.heads}>
                <tr>
                    <td>Player Name</td>
                    <td>Fantasy Points Today</td>
                </tr>
                </thead>
                <tbody>
                {teamData.map(({player, stats}) => (
                    <tr key={player}>
                        <td>{player}</td>
                        <td>{stats.fp}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : (
            <p>Loading team stats...</p>
        )}
        <button className={styles.closeButton}onClick={props.onClose}>Close</button>
    </div>
  );
}

export default ViewTeamModal;
 