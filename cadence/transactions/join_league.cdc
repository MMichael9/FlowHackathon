import NetProfits from  "../contracts/NetProfits.cdc"

transaction(leagueId: UInt32, teamId: UInt32) {


    prepare(acct: AuthAccount) {

    }

    execute {
        
        // Borrow a reference to the League to be added to
        let leagueRef = NetProfits.borrowLeague(leagueId: leagueId)

        // Add the specified play ID
        let success = leagueRef.joinLeague(teamId: teamId)
        log(success)
    }

    post {
    }
}