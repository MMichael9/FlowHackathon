import * as fcl from "@onflow/fcl";

export async function createTeam(name, players){

  console.log(players)

  return fcl.mutate({
    cadence: CREATE_TEAM,
    args: (arg,t) => [arg(name, t.String), arg(players, t.Array(t.String))],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 1000,
  })
}

const CREATE_TEAM = `
// Create Team Txn

import NetProfits from 0xNetProfits

// This transaction creates a new team
transaction (name: String, players: [String; 5]) {
    // check if account has a collection
    prepare(acct: AuthAccount) {
        if acct.borrow<&NetProfits.Collection>(from: NetProfits.TeamCollectionStoragePath) != nil {
            log("Collection exists!")
        } else {
            // create collection if empty
            acct.save<@NetProfits.Collection>(<-NetProfits.createEmptyCollection(), to: NetProfits.TeamCollectionStoragePath)
            // publish a reference to the Collection in storage
            acct.link<&{NetProfits.CollectionPublic}>(NetProfits.TeamCollectionPublicPath, target: NetProfits.TeamCollectionStoragePath)
        }

        // borrow the collection
        let collection = acct.borrow<&NetProfits.Collection>(from: NetProfits.TeamCollectionStoragePath)

        // call the collection's saveTeam method and pass in a Team resource
        collection?.saveTeam(team: <-NetProfits.createTeam(name: name, players: players))
        log(name.concat("Has been created succesfully!"))
    }
}
`

export async function createLeague(name) {
    return fcl.mutate({
      cadence: CREATE_LEAGUE,
      args: (arg, t) => [arg(name, t.String)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 1000,
    });
  }
  
const CREATE_LEAGUE = `
import NetProfits from 0xNetProfits

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
`;