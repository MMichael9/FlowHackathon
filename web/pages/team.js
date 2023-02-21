// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Team.module.css";

export default function Team() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Flow Name Service - Purchase</title>
                <meta name="description" content="Flow Name Service" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <p>Team</p>
        </div>
    )
}