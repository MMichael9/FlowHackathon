// Create new Tweet

import NetProfits from "../contracts/NetProfits.cdc"

// This transaction creates a new tweet with an argument
transaction (name: String, players: String) {
    // Let's check that the account has a collection
    prepare(acct: AuthAccount) {
        if acct.borrow<&NetProfits.Collection>(from: NetProfits.TeamCollectionStoragePath) != nil {
            log("Collection exists!")
        } else {
            // let's create the collection if it doesn't exist
            acct.save<@NetProfits.Collection>(<-NetProfits.createEmptyCollection(), to: NetProfits.TeamCollectionStoragePath)
            // publish a reference to the Collection in storage
            acct.link<&{NetProfits.CollectionPublic}>(NetProfits.TeamCollectionPublicPath, target: NetProfits.TeamCollectionStoragePath)
        }

        // borrow the collection
        let collection = acct.borrow<&NetProfits.Collection>(from: NetProfits.TeamCollectionStoragePath)

        // call the collection's saveTweet method and pass in a Tweet resource
        collection?.saveTeam(team: <-NetProfits.createTeam(name: name, players: players))
        log("Team created successfully, with message ".concat(name).concat(players))
    }
}