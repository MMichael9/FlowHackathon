import * as fcl from "@onflow/fcl";
// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/League.module.css";
import TeamSelectModal from "../components/TeamSelectModal"

import { useAuth } from "../contexts/AuthContext";
import { getLeagues, createLeagues } from "../flow/scripts";
import { createLeague } from "../flow/transactions"
import {useEffect, useState} from "react";

export default function League() {

    const { currentUser, logOut, logIn } = useAuth();
    const [leagueName, setLeagueName] = useState(null)
    const [leagues, setLeagues] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);

    const handleClick = (value) => {
      console.log(value);
      setModalValue(value);
      setShowModal(true);
    };

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
        console.log('creating league: ', leagueName)

        const txId = await createLeague(leagueName);
        await fcl.tx(txId).onceSealed();

        console.log(txId)
        alert('Transaction Id: ' + txId + '\n\nLeague Succesfully Created! Teams Can Now Join!')
      } catch (error) {
        alert("ERROR! You might not be the admin!")
        console.error(error.message)
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
            <button onClick={fetchLeagues}>Load Leagues</button>
            {showModal && <TeamSelectModal value={modalValue} onClose={() => setShowModal(false)} />}
            <div className={styles.leagueList}>
              {leagues.map(league => (
                      <div key={league.leagueId} className={styles.leagueListChild}>
                        <p>League Id: {league.leagueId}</p>
                        <p>Name: {league.leagueName}</p>
                        <p># of Participants {league.teamIdList.length}</p>
                        <button onClick={() => handleClick(league.leagueId)}>Join League</button>
                      </div>
              ))}
            </div>
            <div className={styles.createLeagueContainer}>
              <input type="text" id="my-input" name="my-input" onChange={(e) => setLeagueName(e.target.value)} />
              <button onClick={makeLeague}>Create League</button>
            </div>
        </div>
    )
}
