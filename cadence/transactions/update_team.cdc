import NetProfits from "../contracts/NetProfits.cdc"

transaction(id: UInt32, players: [String; 5]) {

    let collection: &NetProfits.Collection?

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
        self.collection = acct.borrow<&NetProfits.Collection>(from: NetProfits.TeamCollectionStoragePath)

        self.collection?.modifyTeam(id: id, players: players)
    }


    execute {
        self.collection?.modifyTeam(id: id, players: players)
    }

    post {
    }
}