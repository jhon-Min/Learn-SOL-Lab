import { Keypair } from '@solana/web3.js';

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);

// BPSJvE9LPWqXVr2kmkNd2psiYH5hdn6gWLhEFvcF99yu // current key

// CLqikF4fbPgJc5YdkurzCHR82hd2z3CCrdecJFYY8jMN // new key
