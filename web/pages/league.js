// Imports
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/League.module.css";

export default function League() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Fantasy - My Leagues</title>
                <meta name="description" content="Fantasy_MyLeagues" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <p>Leagues</p>
        </div>
    )
}