/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { SignatureLike, verifyMessage } from "ethers"
import { ChannelCredentials } from '@concordium/web-sdk/nodejs';
import { AccountAddress, AccountTransactionSignature, verifyMessageSignature, ConcordiumGRPCWebClient } from "@concordium/web-sdk";
import { CallCredentials, credentials, Metadata } from '@grpc/grpc-js';

interface VerifyChainSignatureInputs<SignatureT> {
  message: string;
  signature: SignatureT;
  address: string;
}

interface VerifySignatureInputs<T> extends VerifyChainSignatureInputs<T> {
  chain: "polygon" | "concordium"
}

export function registerAccountAddress({ address }: { address: string }): { message: string, address: string } {
  //todo: save to db
  //todo: generate a message which can be signed by the user. This should contain a nonce and the address
  return { message: 'Message to be signed', address };
}

export async function verifySignatureHandler({ address, message, signature, chain }: VerifySignatureInputs<SignatureLike | AccountTransactionSignature>): Promise<boolean> {
  //todo: verify the message was signed by the address. It should match the message for the corresponsing address in the db

  switch (chain) {
    case "polygon": return verifySignaturePolygon({ address, message, signature: signature as SignatureLike });
    case "concordium": return await verifySignatureConcordium({ address, message, signature: signature as AccountTransactionSignature });
    default: {
      throw new Error("Unsupported chain");
    }
  }
}

function verifySignaturePolygon({ address, message, signature }: VerifyChainSignatureInputs<SignatureLike>): boolean {
  const recoveredAccountAddress = verifyMessage(message, signature);
  return recoveredAccountAddress === address;
}

async function verifySignatureConcordium({ address, message, signature }: VerifyChainSignatureInputs<AccountTransactionSignature>): Promise<boolean> {
  const metadata = new Metadata();
  metadata.add("authentication", "rpcadmin");
  const nodeCredentials: ChannelCredentials = credentials.createInsecure();
  const nodeClient = new ConcordiumGRPCWebClient("https://grpc.testnet.concordium.com", 20000, {
    timeout: 10000,
    credentials: nodeCredentials
  });
  const accountInfo = await nodeClient.getAccountInfo(AccountAddress.fromBase58(address));

  return await verifyMessageSignature(message, signature, accountInfo);
}