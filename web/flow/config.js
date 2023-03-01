import { config } from "@onflow/fcl";

config({
  // The name of our dApp to show when connecting to a wallet
  "app.detail.title": "Fantasy TopShot",
  "app.detail.icon": "https://placekitten.com/g/200/200",

  // RPC URL for the Flow Testnet
  "accessNode.api": "https://rest-testnet.onflow.org",
  // "accessNode.api": "https://rest-mainnet.onflow.org",
  // "accessNode.api": "http://localhost:8888",

  // A URL to discover the various wallets compatible with this network
  // FCL automatically adds support for all wallets which support Testnet

  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  //"discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  // "discovery.wallet": "http://localhost:8701/fcl/authn",


  //"discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  //"discovery.authn.include": ["0xead892083b3e2c6c"],

  // "0xTopShot": "0x0b2a3299cc857e29",
  "0xNetProfits": "0x39b08d733644d9cd"
});