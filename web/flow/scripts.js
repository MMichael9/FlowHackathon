import * as fcl from "@onflow/fcl";

// export async function checkIsInitialized(addr) {
//     return fcl.query({
//       cadence: IS_INITIALIZED,
//       args: (arg, t) => [arg(addr, t.Address)],
//     });
//   }
  
//   const IS_INITIALIZED = `
//   import NetProfits from 0xNetProfits
  
//   pub fun main(account: Address): Bool {
//       let capability = getAccount(account).getCapability<&Domains.Collection{NonFungibleToken.CollectionPublic, Domains.CollectionPublic}>(Domains.DomainsPublicPath)
//       return capability.check()
//   }
//   `;


export async function getMoments(addr) {
    return fcl.query({
        cadence: GET_MOMENTS,
        args: (arg, t) => [arg(addr, t.Address)],
    })
}

const GET_MOMENTS = `
import TopShot from 0x0b2a3299cc857e29

pub fun main(account: Address): [UInt64] {

    let acct = getAccount(account)

    let collectionRef = acct.getCapability(/public/MomentCollection)
                            .borrow<&{TopShot.MomentCollectionPublic}>()!

    return collectionRef.getIDs()
}
`;

export async function getMomentMetadata(addr, tokenId) {
    return fcl.query({
        cadence: GET_MOMENT_METADATA,
        args: (arg,t,arg2,t2) => [arg(addr, t.Address), arg(tokenId, t.UInt64)]
    })
}

const GET_MOMENT_METADATA = `
import TopShot from 0x0b2a3299cc857e29

pub fun main(account: Address, id: UInt64): {String: String} {

    // get the public capability for the owner's moment collection and borrow a reference to it
    let collectionRef = getAccount(account).getCapability(/public/MomentCollection)
        .borrow<&{TopShot.MomentCollectionPublic}>()
        ?? panic("Could not get public moment collection reference")

    // Borrow a reference to the specified moment
    let token = collectionRef.borrowMoment(id: id)
        ?? panic("Could not borrow a reference to the specified moment")

    // Get the moment's metadata to access its play and Set IDs
    let data = token.data

    // Use the moment's play ID to get all the metadata associated with that play
    let metadata = TopShot.getPlayMetaData(playID: data.playID) ?? panic("Play doesn't exist")

    return metadata
}
`;

export async function getLeagues() {
    return fcl.query({
        cadence: GET_LEAGUES
    })
}

const GET_LEAGUES = `
import NetProfits from 0xNetProfits

pub fun main(): [NetProfits.LeagueData] {
    let leagues: [NetProfits.LeagueData] = []
    var id: UInt32 = 1
    while id < NetProfits.nextLeagueId {
        leagues.append(NetProfits.getLeagueData(id: id))
        id = id + 1
    }
    return leagues
}
`;


export async function getTeams(addr) {
    return fcl.query({
        cadence: GET_TEAMS,
        args: (arg, t) => [arg(addr, t.Address)],
    })
}

const GET_TEAMS = `
import NetProfits from 0xNetProfits

pub struct TeamMetadata {
    pub let id: UInt32
    pub let name: String
    pub let players: [String; 5] 

    init(id: UInt32, name: String, players: [String; 5]) {
        self.id = id
        self.name = name
        self.players = players
    }
}

// Get teams owned by an account
pub fun main(account: Address): [TeamMetadata] {
    // Get the public account object for account
    let tweetOwner = getAccount(account)

    // Find the public capability for their Collection
    let capability = tweetOwner.getCapability<&{NetProfits.CollectionPublic}>(NetProfits.TeamCollectionPublicPath)

    // borrow a reference from the capability
    let publicRef = capability.borrow()
            ?? panic("Could not borrow public reference")

    // get list of team IDs
    let teamIDs = publicRef.getIDs()

    let teams: [TeamMetadata] = []

    for teamID in teamIDs {
        let team = publicRef.borrowTeam(id: teamID) ?? panic("this tweet does not exist")
        let metadata = TeamMetadata(id: team.id, name: team.name, players: team.players)
        teams.append(metadata)
    }

    return teams
}`

export async function getTeamDataInLeague(leagueId) {
    return fcl.query({
        cadence: GET_TEAM_DATA_FOR_LEAGUE,
        args: (arg, t) => [arg(leagueId, t.UInt32)],
    })
}

const GET_TEAM_DATA_FOR_LEAGUE = `
import NetProfits from 0xNetProfits

// Get teams owned by an account
pub fun main(leagueId: UInt32): [NetProfits.TeamData] {
        // Borrow a reference to the League to be added to
        let leagueRef = NetProfits.borrowLeague(leagueId: leagueId)

        log(leagueRef)

        log(leagueRef.teamIdList)

        let teams: [NetProfits.TeamData] = []

        for teamId in leagueRef.teamIdList {
            log(teamId)
            let team = NetProfits.teamPublicData[teamId]!
            log(team)
            teams.append(team)
        }

        return teams
}`