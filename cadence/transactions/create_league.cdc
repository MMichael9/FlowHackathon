import NetProfits from "../contracts/NetProfits.cdc"

// This transaction is for the admin to create a new set resource
// and store it in the top shot smart contract
// Parameters:
//
// setName: the name of a new Set to be created
transaction(leagueName: String) {
    
    // Local variable for the topshot Admin object
    let adminRef: &NetProfits.Admin
    let currLeagueId: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&NetProfits.Admin>(from: /storage/NetProfitsAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currLeagueId = NetProfits.nextLeagueId;
    }

    execute {
        
        // Create a set with the specified name
        self.adminRef.createLeague(name: leagueName)
        log(NetProfits.nextLeagueId)
        log(NetProfits.getAllLeagueNames())
    }

    post {
    }
}