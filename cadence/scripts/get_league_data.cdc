import NetProfits from "../contracts/NetProfits.cdc"

pub fun main(): [NetProfits.LeagueData] {
    let sets: [NetProfits.LeagueData] = []
    var id: UInt32 = 1
    
    while id < NetProfits.nextLeagueId {
        sets.append(NetProfits.getLeagueData(id: id))
        id = id + 1
    }
    return sets
}