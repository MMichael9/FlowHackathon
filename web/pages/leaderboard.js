import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Leaderboards.module.css";
import { league1Data } from "./league1info.js"; 
import { league2Data } from "./league2info.js";
import { league3Data } from "./league3info.js";

export default function Leaderboard() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy - Leaderboards </title>
                <meta name="description" content="Fantasy_Leaderboards" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
                <div>
                <p>All Leaderboards</p>
                 <table className={styles.tables}>
                    <h1><a href="/league1">League 1</a></h1>
                    <thead className={styles.heads}>
                        <th></th>
                        <th>Team Name</th>
                        <th>Standings</th>
                        <th>Total Points</th>
                    </thead>
                    <tbody>
                     {league1Data.map((team, index) => (
                         <tr key={index}>
                            <td></td>
                            <td>{team.teamName}</td>
                            <td>{team.standings}</td>
                            <td>{team.totalPoints}</td>
                         </tr>
      ))}
                    </tbody>    
                 </table>
                 <table className={styles.tables}>
                    <h1><a href="/league2">League 2</a></h1>
                    <thead className={styles.heads}>
                        <th></th>
                        <th>Team Name</th>
                        <th>Standings</th>
                        <th>Total Points</th>
                    </thead>
                    <tbody>
                    {league2Data.map((team, index) => (
                         <tr key={index}>
                            <td></td>
                            <td>{team.teamName}</td>
                            <td>{team.standings}</td>
                            <td>{team.totalPoints}</td>
                         </tr>
      ))}
                    </tbody>    
                 </table>
                 <table className={styles.tables}>
                    <h1><a href="/league3">League 3</a></h1>
                    <thead className={styles.heads}>
                        <th></th>
                        <th>Team Name</th>
                        <th>Standings</th>
                        <th>Total Points</th>
                    </thead>
                    <tbody>
                    {league3Data.map((team, index) => (
                         <tr key={index}>
                            <td></td>
                            <td>{team.teamName}</td>
                            <td>{team.standings}</td>
                            <td>{team.totalPoints}</td>
                         </tr>
      ))}
                    </tbody>    
                 </table>
                 <table className={styles.tables}>
                    <h1>All Time Win Leaders</h1>
                    <thead className={styles.heads}>
                        <th></th>
                        <th>Team Name</th>
                        <th>Record</th>
                    </thead>
                    <tbody>
                            <td></td>
                            <td>Team A</td>
                            <td>100-0</td>
                    </tbody>    
                    <tbody>
                            <td></td>
                            <td>Team B</td>
                            <td>99-1</td>
                    </tbody> 
                 </table>
                </div>
            
        </div>
    )
 
}
