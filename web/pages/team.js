// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import MyModal from "../components/PlayerModal"
import styles from "../styles/Team.module.css";
import { useAuth } from "../contexts/AuthContext";
import { getMomentMetadata, getMoments } from "../flow/scripts";
import {useEffect, useState} from "react";

export default function Team() {

    const { currentUser, logOut, logIn } = useAuth();
    const [Ids, setIds] = useState([]);
    const names = []

    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);
  
    const handleClick = (value) => {
      setModalValue(value);
      setShowModal(true);
    };
    

    // Function to fetch the domains owned by the currentUser
    async function fetchMoments() {
      try {
        const ids = await getMoments(currentUser.addr);

        for(let i=0; i<ids.length - 70; i++){
            let test = await getMomentMetadata(currentUser.addr, ids[i])
            names.push(test.FullName)
        }
        setIds(names);
        console.log(ids);
      } catch (error) {
        console.error(error.message);
      }
    }

    async function getStats(playerName) {
        console.log(playerName)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy - My Team</title>
                <meta name="description" content="Fantasy_MyTeam" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <div>
                <button onClick={fetchMoments}>Load Team</button>
                {showModal && <MyModal value={modalValue} onClose={() => setShowModal(false)} />}
                {Ids.map(id => (
                    <div key={id}>
                    <h2>{id}</h2>
                    <button>Add Player</button>
                    <button className={styles.stats} onClick={() => handleClick(id)}>Open Modal</button>
                    </div>
                ))}
            </div>
        </div>
    )
}