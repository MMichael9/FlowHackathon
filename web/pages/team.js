// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import MyModal from "../components/PlayerModal"
import styles from "../styles/Team.module.css";
import { useAuth } from "../contexts/AuthContext";
import { getMomentMetadata, getMoments } from "../flow/scripts";
import {useEffect, useState} from "react";
import jsonObj from "../static/players.json"

export default function Team() {

    const { currentUser, logOut, logIn } = useAuth();
    const [Ids, setIds] = useState([]);
    const names = []

    const [team, setTeam] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);
  
    const handleClick = (value) => {
      console.log(value);
      setModalValue(value);
      setShowModal(true);
    };

    const addToTeam = (value) => {
      if (team.indexOf(value) === -1) {
        if (team.length < 7) {
          setTeam([...team, value]); 
        } else {
          alert('You can add only up to 7 players to your team.'); 
        }
      } else {
        alert('This player is already in your team.'); 
      }
    };

    const removeFromTeam = (value) => {
      setTeam(team.filter((player) => player !== value));
    }
    

    // Function to fetch the domains owned by the currentUser
    async function fetchMoments() {
      try {
        //const ids = await getMoments(currentUser.addr);

        for(let i=0; i<jsonObj.length; i++){
            //let test = await getMomentMetadata(currentUser.addr, ids[i])
            let test = jsonObj[i].playerName

            //names.push(test.FullName)
            names.push(test)
        }
        console.log(names)
        setIds(names);
        //console.log(ids);
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
                    <p>{id}</p>
                    <button>Add Player</button>
                    <button onClick={() => addToTeam(id)}>Add Player Test</button>
                    <button className={styles.stats} onClick={() => handleClick(id)}>Open Modal</button>
                    </div>
                ))}
            </div>
            <div>
              <h2>Selected Players</h2>
              {team.map((player) => (
                      <div key={player}>
                        <p>{player}</p>
                        <button onClick={() => removeFromTeam(player)}>Remove</button>
                      </div>
                ))}
            </div>
            <div>
              <button>Submit</button>
            </div>
        </div>
    )
}