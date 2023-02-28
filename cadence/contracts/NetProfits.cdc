pub contract NetProfits {

    // Declare a Path constant so we don't need to harcode in tx
    pub let TeamCollectionStoragePath: StoragePath
    pub let TeamCollectionPublicPath: PublicPath

    //Events
    pub event ContractInitialized()
    pub event LeagueCreated(leagueId: UInt32)

    // Globals
    pub var nextLeagueId: UInt32
    pub var nextTeamId: UInt32

    access(self) let leagueIdByName: {String: UInt32}
    access(self) var leagues: @{UInt32: League}

    init() {
        // assign the storage path to /storage/TeamCollection
        self.TeamCollectionStoragePath = /storage/TeamCollection
        self.TeamCollectionPublicPath = /public/TeamCollection

        self.nextLeagueId = 1
        self.nextTeamId = 1
        self.leagues <- {}
        self.leagueIdByName = {}

        self.account.save<@Admin>(<- create Admin(), to: /storage/NetProfitsAdmin)

        // save the empty collection to the storage path
        self.account.save(<-self.createEmptyCollection(), to: self.TeamCollectionStoragePath)
        // publish a reference to the Collection in storage
        self.account.link<&{CollectionPublic}>(self.TeamCollectionPublicPath, target: self.TeamCollectionStoragePath)

        emit ContractInitialized()
    }

    // Declare the Team resource type - nothing changed here!
    pub resource Team {
        // The unique ID that differentiates each Team
        pub let id: UInt32
        pub let name: String
        pub var players: String

        // Initialize both fields in the init function
        init(name: String, players: String) {
          self.id = NetProfits.nextTeamId
          self.name = name
          self.players = players

          NetProfits.nextTeamId = self.id + 1 as UInt32
        }

        access(contract) fun modifyTeam(players: String) {
            self.players = players
        }


    }

    // Function to create a new Team
    pub fun createTeam(name: String, players: String): @Team {
        return <-create Team(name: name, players: players)
    }

    pub resource interface CollectionPublic {
        pub fun getIDs(): [UInt32]
        pub fun borrowTeam(id: UInt32): &Team? 
    }

    // NEW! 
    // Declare a Collection resource that contains Teams.
    // it does so via `saveTeam()`, 
    // and stores them in `self.teams`
    pub resource Collection: CollectionPublic {
        // an object containing the teams
        pub var teams: @{UInt32: Team}

        // a method to save a team in the collection
        pub fun saveTeam(team: @Team) {
            // add the new team to the dictionary with 
            // a force assignment (check glossary!)
            // If there were to be a value at that key, 
            // it would fail/revert. 
            self.teams[team.id] <-! team
        }

        // get all the id's of the team in the collection
        pub fun getIDs(): [UInt32] {
            return self.teams.keys
        }

        pub fun borrowTeam(id: UInt32): &Team? {
            if self.teams[id] != nil {
                let ref = (&self.teams[id] as &NetProfits.Team?)!
                return ref
            }
            return nil
        }

        pub fun modifyTeam(id: UInt32, players: String): Bool {
            if let team = &self.teams[id] as &NetProfits.Team? {
                team.modifyTeam(players: players)
            } else {
                panic("team does not exist")
            }
            return true
        }

        init() {
            self.teams <- {}
        }

        destroy() {
            // when the Colletion resource is destroyed, 
            // we need to explicitly destroy the teams too.
            destroy self.teams
        }
    }

    // create a new collection
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    pub struct LeagueData {
        pub let leagueId: UInt32
        pub let leagueName: String
        pub let createdTime: UFix64
        pub var members: [String]
        pub var active: Bool

        init(leagueId: UInt32) {
            if let league = &NetProfits.leagues[leagueId] as &NetProfits.League? {
                self.leagueId = leagueId
                self.leagueName = league.leagueName
                self.createdTime = league.createdTime
                self.members = league.members
                self.active = league.active
            } else {
               panic("league does not exist")
            }
        }
    }

    // League
    //
    //
    //
    pub resource League {
        pub let leagueId: UInt32
        pub let leagueName: String
        pub let createdTime: UFix64
        pub var members: [String]
        pub var membersMap: {UInt32: [String]}
        pub var active: Bool

        init(name: String) {
            pre {
                !NetProfits.leagueIdByName.containsKey(name): "A League with that name already exists"
            }

            self.leagueId = NetProfits.nextLeagueId
            self.leagueName = name
            self.createdTime = getCurrentBlock().timestamp
            self.members = []
            self.membersMap = {}
            self.active = true

            NetProfits.leagueIdByName[name] = self.leagueId
        }

        pub fun joinLeague(name:String, ) {
            // check if name is already in league and if league is active
            // if no add them to member array, otherwise dont
            self.members.append(name)
        }
    }

    pub fun borrowLeague(leagueId: UInt32): &League {
        pre {
            NetProfits.leagues[leagueId] != nil: "League does not exist"
        }
        
        return (&NetProfits.leagues[leagueId] as &League?)!
    }

    pub fun getLeagueData(id: UInt32): NetProfits.LeagueData {
        pre {
            NetProfits.leagues[id] != nil: "League does not exist"
        }

        return NetProfits.LeagueData(leagueId: id)
    }

    pub fun getLeagueDataByName(name: String): NetProfits.LeagueData {
        pre {
            NetProfits.leagueIdByName[name] != nil: "Cannot borrow league, no such name"
        }

        let id = NetProfits.leagueIdByName[name]!

        return NetProfits.LeagueData(leagueId: id)
    }

    pub fun getAllLeagueNames(): [String] {
        return NetProfits.leagueIdByName.keys
    }

    pub fun getMembersInLeague(leagueId: UInt32): [String]? {
        return NetProfits.leagues[leagueId]?.members
    }

    pub resource Admin {

        pub fun createLeague(name: String): UInt32 {
            // Create the new League
            var newLeague <- create League(name: name)

            // Increment the leagueId
            NetProfits.nextLeagueId = NetProfits.nextLeagueId + 1 as UInt32

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
}