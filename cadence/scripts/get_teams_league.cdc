import NetProfits from "../contracts/NetProfits.cdc"

pub fun main() {
    log(NetProfits.getMembersInLeague(leagueId: 1))
}