pub contract NetProfits {

    //Events
    pub event ContractInitialized()
    pub event LeagueCreated(leagueId: UInt32)

    // Globals
    pub var nextLeagueId: UInt32

    access(self) var leagueDatas: {UInt32: LeagueData}
    access(self) var leagues: @{UInt32: League}

    pub resource League {
        pub let leagueId: UInt32

        init(name: String) {
            self.leagueId = NetProfits.nextLeagueId
            NetProfits.leagueDatas[self.leagueId] = LeagueData(name: name)
        }
    }

    pub struct LeagueData {
        pub let leagueId: UInt32
        pub let members: {Address: String}
        pub let name: String
        pub let entryFee: UFix64

        init(name: String) {
            self.leagueId = NetProfits.nextLeagueId
            self.members = {}
            self.name = name
            self.entryFee = 0.0
        }
    }

    pub resource Admin {

        pub fun createLeague( name: String): UInt32 {
            // Create the new League
            var newLeague <- create League(name: name)

            // Increment the leagueId
            NetProfits.nextLeagueId = NetProfits.nextLeagueId + UInt32(1)

            let newLeagueId = newLeague.leagueId

            emit LeagueCreated(leagueId: newLeagueId)

            // Store it in the leagues mapping field
            NetProfits.leagues[newLeagueId] <-! newLeague

            return newLeagueId
        }

        pub fun createNewAdmin(): @Admin {
            return <-create Admin()
        }
    }

    pub fun getLeagueName(leagueId: UInt32): String? {
        return NetProfits.leagueDatas[leagueId]?.name
    }

    init() {
        self.nextLeagueId = 1
        self.leagueDatas = {}
        self.leagues <- {}

        self.account.save<@Admin>(<- create Admin(), to: /storage/NetProfitsAdmin)

        emit ContractInitialized()
    }

}
 