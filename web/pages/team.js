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

    const [team, setTeam] = useState([])
    const [teamName, setTeamName] = useState(null)

    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState(null);
  
    const handleClick = (value) => {
      console.log(value)
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

    

    function handleSubmit() {
      const confirmed = window.confirm("Are you sure you want to submit?");
      console.log(team)
      console.log(teamName)
      if (team.length != 7) {
        alert('You Need To Select 7 Players')
      }
      if (teamName == null) {
        alert('Enter A Team Name')
      }
    }
  
    

    // Function to fetch the domains owned by the currentUser
    async function fetchMoments() {
      try {
        const ids = await getMoments(currentUser.addr);

        for(let i=0; i<ids.length; i++){
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
            <label for="my-input">Team Name:</label>
            <input type="text" id="my-input" name="my-input" onChange={(e) => setTeamName(e.target.value)} />
              <table className={styles.tables}>
                <thead className={styles.heads}>
                  <th>Players</th>
                </thead>
                <tbody>
                  <button onClick={fetchMoments}>Load Team</button>
                  {showModal && <MyModal value={modalValue} onClose={() => setShowModal(false)} />}
                  {Ids.map(id => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>
                          <button onClick={() => addToTeam(id)}>Add Player</button>
                          <button className={styles.stats} onClick={() => handleClick(id)}>Open Modal</button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
              <table className={styles.tables}>
                <thead className={styles.heads}>
                  <th>Selected Players</th>
                </thead>
                <tbody>
                  {team.map((player) => (
                    <tr key={player}>
                      <td>{player}</td>
                      <td>
                        <button onClick={() => removeFromTeam(player)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
