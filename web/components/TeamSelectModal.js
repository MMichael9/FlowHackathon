import * as fcl from "@onflow/fcl";
import React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import styles from '../styles/TeamSelectModal.module.css'
import { getTeams } from "../flow/scripts";
import { joinLeague } from "../flow/transactions"
import { useAuth } from "../contexts/AuthContext";

function TeamSelectModal(props) {

    const { currentUser, logOut, logIn } = useAuth();
    const [teams, setTeams] = useState(null);

    async function chooseTeam(leagueId, teamId) {
      console.log(leagueId, teamId)
      try {
        console.log('joining league: ', leagueId)

        const txId = await joinLeague(leagueId, teamId);
        await fcl.tx(txId).onceSealed();

        console.log(txId)
        alert('Transaction Id: ' + txId + '\n\nLeague Succesfully Joined! Good Luck!')
      } catch (error) {
        alert("ERROR! Issue Joining League. Try Again Later...")
        console.error(error.message)
      }
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
      <h2>Choose Team! (If None Appear, Go Create a Team!!)</h2>
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