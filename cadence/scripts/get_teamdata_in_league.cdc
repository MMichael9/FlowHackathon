import NetProfits from "../contracts/NetProfits.cdc"

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
}