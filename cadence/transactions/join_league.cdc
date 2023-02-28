import NetProfits from "../contracts/NetProfits.cdc"

// transaction to join a league
// Parameters:
//
// leagueId: the ID of the league to join
// teamId: the ID of the team being added
transaction(leagueId: UInt32, teamId: UInt32) {


    prepare(acct: AuthAccount) {

    }

    execute {
        
        // Borrow a reference to the League to be added to
        let leagueRef = NetProfits.borrowLeague(leagueId: leagueId)

        // Add to the league
        leagueRef.joinLeague(name: teamName)
    }

    post {
    }
}