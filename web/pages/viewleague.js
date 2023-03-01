import * as fcl from "@onflow/fcl";
// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/ViewLeague.module.css";

import TeamModal from "../components/TeamModal"
import { useAuth } from "../contexts/AuthContext";
import { getLeagues, getTeamDataInLeague} from "../flow/scripts";
import {useEffect, useState} from "react";

export default function ViewLeagues() {

    const { currentUser, logOut, logIn } = useAuth();

    const [leagueData, setLeagueData] = useState([]);
    const leagueArr = []

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
              const leagueArr = []
              const test = await getLeagues();
              //onsole.log(test)

              for(let i=0; i<test.length; i++) {
                //console.log(test[i].leagueId)

                const leagueData = await getTeamDataInLeague(test[i].leagueId);
                //console.log(leagueData)
                leagueArr.push({id: test[i].leagueId, name: test[i].leagueName, teams: leagueData})
              }
              console.log(leagueArr);
              setLeagueData(leagueArr);
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
            <button className={styles.leagueDataButton} onClick={fetchLeagues}>View League Data</button>
            {showModal && <TeamModal value={modalValue} onClose={() => setShowModal(false)} />}
            <div className={styles.leagueDataDisplay}>
                {leagueData.map((obj) => (
                    <div key={obj.id}>
                    <h2>{obj.name}</h2>
                    <table className={styles.tables}>
                        <thead className={styles.heads}>
                            <tr>
                                <td>Team Id</td>
                                <td>Team Name</td>
                            </tr>
                        </thead>
                        <tbody>
                        {obj.teams.map((team) => (
                            <tr>
                                <td>{team.id}</td>
                                <td onClick={() => handleClick(team)}><a href="#" style={{ textDecoration: 'underline' }}>{team.name}</a></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                ))}
            </div>
        </div>
    )
}