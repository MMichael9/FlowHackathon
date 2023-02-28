import NetProfits from "../contracts/NetProfits.cdc"

pub struct TeamMetadata {
    pub let id: UInt32
    pub let name: String
    pub let players: String 

    init(id: UInt32, name: String, players: String) {
        self.id = id
        self.name = name
        self.players = players
    }
}

// Get tweets owned by an account
pub fun main(account: Address): [TeamMetadata] {
    // Get the public account object for account
    let tweetOwner = getAccount(account)

    // Find the public capability for their Collection
    let capability = tweetOwner.getCapability<&{NetProfits.CollectionPublic}>(NetProfits.TeamCollectionPublicPath)

    // borrow a reference from the capability
    let publicRef = capability.borrow()
            ?? panic("Could not borrow public reference")

    // get list of tweet IDs
    let tweetIDs = publicRef.getIDs()

    let tweets: [TeamMetadata] = []

    for tweetID in tweetIDs {
        let tweet = publicRef.borrowTeam(id: tweetID) ?? panic("this tweet does not exist")
        let metadata = TeamMetadata(id: tweet.id, name: tweet.name, players: tweet.players)
        tweets.append(metadata)
    }

    return tweets
}