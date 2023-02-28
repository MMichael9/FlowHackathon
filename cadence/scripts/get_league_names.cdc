import NetProfits from "../contracts/NetProfits.cdc"

// returns all league names
pub fun main(): [String] {
    return NetProfits.getAllLeagueNames()
}