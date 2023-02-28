import NetProfits from "../contracts/NetProfits.cdc"

// This script returns all the names for Set.
// These can be related to Set structs via AllDay.getSetByName() .
pub fun main(): [String] {
    return NetProfits.getAllLeagueNames()
}