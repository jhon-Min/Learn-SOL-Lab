// transcation lab
import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key for destination address`);
  process.exit(1);
}

console.log(`Supplied public key: ${suppliedToPubkey}`);

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
const toPubkey = new PublicKey(suppliedToPubkey);
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transcation = new Transaction();
const LAMPORTS_TO_SEND = solToLamports(0.1);
const sendSolInstructions = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transcation.add(sendSolInstructions);

const signature = await sendAndConfirmTransaction(connection, transcation, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);

function solToLamports(sol) {
  return sol * LAMPORTS_PER_SOL;
}
