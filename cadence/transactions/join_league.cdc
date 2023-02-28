import NetProfits from "../contracts/NetProfits.cdc"

// This transaction is how a Top Shot admin adds a created play to a set
// Parameters:
//
// setID: the ID of the set to which a created play is added
// playID: the ID of the play being added
transaction(leagueId: UInt32, teamName: String) {


    prepare(acct: AuthAccount) {

    }

    execute {
        
        // Borrow a reference to the League to be added to
        let leagueRef = NetProfits.borrowLeague(leagueId: leagueId)

        // Add the specified play ID
        leagueRef.joinLeague(name: teamName)
    }

    post {

        NetProfits.getMembersInLeague(leagueId: leagueId)!.contains(teamName): 
            "set does not contain playID"
    }
}