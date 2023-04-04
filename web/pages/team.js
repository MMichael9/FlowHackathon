import * as fcl from "@onflow/fcl";
// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import MyModal from "../components/PlayerModal"
import styles from "../styles/Team.module.css";
import { useAuth } from "../contexts/AuthContext";
import { getMomentMetadata, getMoments } from "../flow/scripts";
import { createTeam } from "../flow/transactions"
import {useEffect, useState} from "react";
import jsonObj from "../static/players.json"
import axios from "axios";

export default function Team() {

    const { currentUser, logOut, logIn } = useAuth();
    const [Ids, setIds] = useState([]);
    const names = []
    const imgs = []

    //const [playerImages, setImages] = useState([])

    const [team, setTeam] = useState([])

    const [teamName, setTeamName] = useState(null)

    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);
  
    const handleClick = (value) => {
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

    async function submitTeam() {

      if (teamName == null || teamName.length < 3) {
        alert("Please Enter a Team Name")
        return;
      }

      if (team.length < 5) {
        alert("Please Pick 5 Players")
        return;
      }

      try {
        console.log(team)

        const json = {players: team}

        const res = await axios.post('http://127.0.0.1:8000/submitTeam/', json);
        console.log(res)

      } catch (error) {
        alert("ERROR! YOUR TEAM COSTS TOO MUCH MONEY")
        console.error(error.message)
      }

      // try {
      //   const txId = await createTeam(teamName, team);
      //   await fcl.tx(txId).onceSealed();
      //   console.log(txId)
      //   alert('Transaction Id: ' + txId + '\n\nTeam Succesfully Created! Go to the View Team tab!')
      // } catch (error) {
      //   alert("ERROR!")
      //   console.error(error.message)
      // }
    }
    

    // Function to fetch the domains owned by the currentUser
    async function fetchMoments() {
      try {
        //const ids = await getMoments(currentUser.addr);

        for(let i=0; i<jsonObj.length; i++){
            //let test = await getMomentMetadata(currentUser.addr, ids[i])
            let test = jsonObj[i].playerName

            // get image
            // const response = await axios.get(`https://assets.nbatopshot.com/media/${jsonObj[i].nftId}/transparent?width=200&?height=200`, { responseType: 'arraybuffer' });
            // const imageData = Buffer.from(response.data, 'binary').toString('base64');
            // console.log(imageData);
            
            //names.push(test.FullName)
            names.push(test)
            //imgs.push(imageData)
        }
        console.log(names)

        //setImages(imgs)
        setIds(names)
      } catch (error) {
        console.error(error.message);
      }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy - My Team</title>
                <meta name="description" content="Fantasy_MyTeam" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <button onClick={fetchMoments}>Load Collection</button>
            {showModal && <MyModal value={modalValue} onClose={() => setShowModal(false)} />}
            <div className={styles.playerList}>
                {Ids.map(id => (
                    <div key={id} className={styles.playerListChild}>
                    <p>{id}</p>
                    <button className={styles.stats} onClick={() => addToTeam(id)}>Add</button>
                    <button className={styles.stats} onClick={() => handleClick(id)}>View Stats</button>
                    </div>
                ))}
            </div>
            <p><b>Selected Players</b></p>
            <div className={styles.playerList}>
              {team.map((player) => (
                      <div key={player} className={styles.playerListChild}>
                        <p>{player}</p>
                        <button onClick={() => removeFromTeam(player)}>Remove</button>
                      </div>
                ))}
            </div>
            <div className={styles.submitTeam}>
              <label for="my-input">Team Name:</label>
              <input type="text" id="my-input" name="my-input" onChange={(e) => setTeamName(e.target.value)} />
              <button onClick={submitTeam}>Submit</button>
            </div>
        </div>
    )
}