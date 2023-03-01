import Link from "next/link";
//import { useAuth } from "../contexts/AuthContext";
import "../flow/config";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  // Use the AuthContext to get values for the currentUser
  // and helper functions for logIn and logOut
  //const { currentUser, logOut, logIn } = useAuth();

  return (
    <div className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/joinleague">Join Leagues</Link>
      <Link href="/team">Select Team</Link>
      <Link href="/leaderboard">Leaderboard</Link>
      <Link href="/myteamv1">My Team</Link>
      <Link href="/league1">League</Link>
    </div>
  );
}