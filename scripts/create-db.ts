const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const dotenv = require('dotenv');

const main = async () => {
  const ipfsOptions = { repo: process.env.REACT_APP_IPFS_DIR }
  const ipfs = await IPFS.create(ipfsOptions)
  const orbitdb = await OrbitDB.createInstance(ipfs)

  const options = {
    // Setup write access
    accessController: {
      write: ['*'],
    }
  }

  const db = await orbitdb.docs('bread-calculator-database', options);
  console.log(db.address.toString());
}

main();