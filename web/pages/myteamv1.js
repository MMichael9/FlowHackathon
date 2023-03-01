import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Leaderboards.module.css";

import { useState, useEffect } from "react";

export default function myteam() {
  const [starters, setStarters] = useState([
    { id: "1", name: "Player 1", totalPoints: 100, avgPoints: 10.5 },
    { id: "2", name: "Player 2", totalPoints: 80, avgPoints: 8.5 },
    { id: "3", name: "Player 3", totalPoints: 200, avgPoints: 30.8 },
    { id: "4", name: "Player 4", totalPoints: 90, avgPoints: 9 },
    { id: "5", name: "Player 5", totalPoints: 1, avgPoints: 0.6 },
  ]);

  const [bench, setBench] = useState([
    { id: "6", name: "Player 6", totalPoints: 5, avgPoints: 5 },
    { id: "7", name: "Player 7", totalPoints: 0.5, avgPoints: 0.2 },
  ]);

  const handleSwap = (startersIndex, benchIndex) => {
    const newStarters = [...starters];
    const newBench = [...bench];
    const temp = newStarters[startersIndex];
    newStarters[startersIndex] = newBench[benchIndex];
    newBench[benchIndex] = temp;
    setStarters(newStarters);
    setBench(newBench);
  };

  function handleSubmit() {
    const confirmed = window.confirm("Are you sure you want to submit?");
    if (confirmed) {
      // User clicked "OK" in the confirmation box
      // Submit the form or perform any other action
    } else {
      // User clicked "Cancel" in the confirmation box
      // Do nothing or perform any other action
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fantasy - My Team </title>
        <meta name="description" content="My_Team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>
        <table className={styles.tables}>
          <thead className={styles.heads}>
            <th>ID</th>
            <th>Starters</th>
            <th>Total Weekly Points</th>
            <th>Average Weekly Points</th>
          </thead>
          <tbody>
            {starters.map((player, index) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td><a href={player.name}>{player.name}</a></td>
                <td>{player.totalPoints}</td>
                <td>{player.avgPoints}</td>
                <th>
                  {bench.map((benchPlayer, benchIndex) => (
                    <button
                      key={benchIndex}
                      onClick={() => handleSwap(index, benchIndex)}
                    >
                      Swap with {benchPlayer.id}
                    </button>
                  ))}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={styles.tables}>
          <thead className={styles.heads}>
            <th>ID</th>
            <th>Bench</th>
            <th>Total Weekly Points</th>
            <th>Average Weekly Points</th>
          </thead>
          <tbody>
            {bench.map((player, index) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td><a href={player.name}>{player.name}</a></td>
                <td>{player.totalPoints}</td>
                <td>{player.avgPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button styles={styles.submit} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
