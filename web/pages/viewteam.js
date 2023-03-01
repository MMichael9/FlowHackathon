import * as fcl from "@onflow/fcl";
// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/ViewTeam.module.css";

import ViewTeamModal from "../components/ViewTeamModal"
import { useAuth } from "../contexts/AuthContext";
import { getTeams } from "../flow/scripts";
import {useEffect, useState} from "react";

export default function ViewTeam() {

    const { currentUser, logOut, logIn } = useAuth();

    const [teams, setTeams] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);

    const handleClick = (value) => {
      console.log(value);
      setModalValue(value);
      setShowModal(true);
    };


    // Function to fetch the teams owned by the currentUser
    async function fetchTeams() {
        try {

          const test = await getTeams(currentUser.addr);
          console.log(test.reverse())
          setTeams(test.reverse())
          console.log(test)

        } catch (error) {
          console.error(error.message);
          console.error("Create Team First!!")
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
                <button className={styles.teamButton} onClick={fetchTeams}>Get Teams</button>
                {showModal && <ViewTeamModal value={modalValue} onClose={() => setShowModal(false)} />}
                {teams.map(team => (
                    <div>
                        <p>Team Name: {team.name}</p>
                        <table className={styles.tables}>
                            <thead className={styles.heads}>
                                <tr>
                                    <td>Player Name</td>
                                    <td><button onClick={() => handleClick(team)}>Get Stats</button></td>
                                </tr>
                            </thead>
                            <tbody>
                                {team.players.map((player =>
                                <tr>
                                    <td>{player}</td>
                                </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}