import * as fcl from "@onflow/fcl";
// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/League.module.css";

import { useAuth } from "../contexts/AuthContext";
import { getLeagues, createLeagues } from "../flow/scripts";
import { createLeague } from "../flow/transactions"
import {useEffect, useState} from "react";

export default function League() {

    const { currentUser, logOut, logIn } = useAuth();

    const [leagues, setLeagues] = useState([]);

    // Function to fetch the domains owned by the currentUser
    async function fetchLeagues() {
        try {

          const test = await getLeagues();
          setLeagues(test)
          console.log(test)

        } catch (error) {
          console.error(error.message);
        }
      }

    async function makeLeague() {
      try {
        console.log('create league')

        let name = "League 3"

        const txId = await createLeague(name);
        await fcl.tx(txId).onceSealed();
        console.log(txId)
      } catch (error) {
        console.log(error.message)
      }
    }

    async function joinLeague(leagueId) {
      console.log(leagueId)
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy - My Leagues</title>
                <meta name="description" content="Fantasy_MyLeagues" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <button onClick={fetchLeagues}>Load Leagues</button>
            {leagues.map(league => (
                    <div key={league.leagueId} className={styles.leagueContainer}>
                      <h2>{league.leagueId}</h2>
                      <p>{league.leagueName}</p>
                      <button onClick={() => joinLeague(league.leagueId)}>Join League</button>
                    </div>
            ))}
            <div className={styles.createLeagueContainer}>
              <button onClick={makeLeague}>Create League</button>
            </div>
        </div>
    )
}