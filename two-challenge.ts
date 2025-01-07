import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import 'dotenv/config';

const destinationAddress = process.argv[2] || null;

if (!destinationAddress) {
  console.log(`please provide a public key for destination address `);
  process.exit(1);
}

console.log(`destination public key: ${destinationAddress}`);

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
const toPubkey = new PublicKey(destinationAddress);
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transcation = new Transaction();
const sendLamports = solToLamports(0.01);

function solToLamports(sol) {
  return sol * LAMPORTS_PER_SOL;
}

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: sendLamports,
});

transcation.add(sendSolInstruction);
const startTime = Date.now();

try {
  const signature = await sendAndConfirmTransaction(connection, transcation, [
    senderKeypair,
  ]);
  const endTime = Date.now();

  console.log(`Transaction signature is ${signature}!`);
  console.log(`Transfer took ${(endTime - startTime) / 1000} seconds`);
  console.log(`💸 Finished! Sent ${sendLamports} to the address ${toPubkey} `);
} catch (error) {
  console.error('Error during transfer:', error);
}
