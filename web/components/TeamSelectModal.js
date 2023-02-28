import React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import styles from '../styles/TeamSelectModal.module.css'
import { getTeams } from "../flow/scripts";
import { useAuth } from "../contexts/AuthContext";

function TeamSelectModal(props) {

    const { currentUser, logOut, logIn } = useAuth();
    const [teams, setTeams] = useState(null);

    async function chooseTeam(leagueId, teamId) {
      console.log(leagueId, teamId)
    }

    useEffect(() => {
        async function fetchTeams() {
          try {
            const test = await getTeams(currentUser.addr);
            setTeams(test);

            console.log(test)
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchTeams();
    }, [props.value]);


  return (
    <div className={styles.container}>
      <h2>Choose Team!</h2>
      <p>League Id: {props.value}</p>
      {teams ? (
        <div className={styles.teamList}>
          {teams.map((team) => (
            <button styles={styles.teamButton} key={team.id} onClick={() => chooseTeam(props.value, team.id)}>{team.name}</button>
          ))}
        </div>
      ) : (
        <p>Loading teams...</p>
      )}
      <button onClick={props.onClose}>Close</button>
    </div>
  );
}

export default TeamSelectModal;