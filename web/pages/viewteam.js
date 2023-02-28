import * as fcl from "@onflow/fcl";
// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/ViewTeam.module.css";

import { useAuth } from "../contexts/AuthContext";
import { getTeams } from "../flow/scripts";
import { createLeague } from "../flow/transactions"
import {useEffect, useState} from "react";

export default function League() {

    const { currentUser, logOut, logIn } = useAuth();

    const [teams, setTeams] = useState([]);

    // Function to fetch the domains owned by the currentUser
    async function fetchTeams() {
        try {

          const test = await getTeams(currentUser.addr);
          setTeams(test)
          console.log(test)

        } catch (error) {
          console.error(error.message);
        }
      }

    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy - My Leagues</title>
                <meta name="description" content="Fantasy_MyLeagues" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <div className={styles.teamView}>
                <button onClick={fetchTeams}>Get Teams</button>
                {teams.map(team => (
                    <div key={team.id}>
                        <p>Team Id: {team.id}</p>
                        <p>Team Name: {team.name}</p>
                        {team.players.map((player) => (
                        <div key={player}>
                            <p>{player}</p>
                        </div>
                        ))}
                    </div>
            ))}
            </div>
        </div>
    )
}