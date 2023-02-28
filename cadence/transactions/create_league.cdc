import NetProfits from "../contracts/NetProfits.cdc"

// Create a new league resource
//
// leagueName: name of new league to be created
transaction(leagueName: String) {
    
    // variable for the NetProfits Admin
    let adminRef: &NetProfits.Admin
    let currLeagueId: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&NetProfits.Admin>(from: /storage/NetProfitsAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currLeagueId = NetProfits.nextLeagueId;
    }

    execute {
        
        // Create League Resource
        self.adminRef.createLeague(name: leagueName)
        log(NetProfits.nextLeagueId)
        log(NetProfits.getAllLeagueNames())
    }

    post {
    }
}