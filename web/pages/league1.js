import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Leaderboards.module.css";
import { league1Data } from "./league1info.js"; 


export default function League1() {
    return (
        <div className={styles.container}>t
            <Head>
                <title>Fantasy - League </title>
                <meta name="description" content="Fantasy_League1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
                <div>
                <p>Player of the week?</p>
                <p>Rarest Moment?</p>
                <p>League NFT Trophy?</p>
                <p>Best Valued Pickup?</p>
                 <table className={styles.tables}>
                    <thead className={styles.heads}>
                        <th>Standings</th>
                        <th>Team Name</th>
                        <th>Total Points</th>
                    </thead>
                    <tbody>
                     {league1Data.map((team, index) => (
                         <tr key={index}>
                            <td>{team.standings}</td>
                            <td>{team.teamName}</td>
                            <td>{team.totalPoints}</td>
                         </tr>
      ))}
                    </tbody>    
                 </table>
                 </div>
            
        </div>
    )
     
}