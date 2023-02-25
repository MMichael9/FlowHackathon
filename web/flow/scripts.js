import * as fcl from "@onflow/fcl";

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