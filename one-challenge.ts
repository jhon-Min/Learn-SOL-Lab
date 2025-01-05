import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';

const suppliedPublicKey = 'BPSJvE9LPWqXVr2kmkNd2psiYH5hdn6gWLhEFvcF99yu';

const connection = new Connection(clusterApiUrl('mainnet-beta'));
const publicKey = new PublicKey(suppliedPublicKey);

connection
  .getAccountInfo(publicKey)
  .then((accountInfo) => {
    if (accountInfo) {
      const balanceSol = accountInfo.lamports / LAMPORTS_PER_SOL;
      console.log(`Your account ${publicKey} balance is ${balanceSol} SOL`);
    } else {
      console.log('❌ Account not found.');
    }
  })
  .catch((error) => {
    console.error('Error fetching account info:', error.message);
  });

const famousWallets = ['toly.sol', 'shaq.sol', 'mccann.sol'];

(async () => {
  for (const wallet of famousWallets) {
    console.log(`Resolving wallet: ${wallet}`);
    try {
      // Resolve domain name to a public key
      const pKey = await connection.getAddressLookupTable(publicKey);
      if (pKey) {
        console.log(`Public Key: ${pKey}`);
      } else {
        console.log(`❌ Failed to resolve: ${wallet}`);
      }
    } catch (error) {
      console.error(`Error resolving ${wallet}: ${error.message}`);
    }
  }
})();
