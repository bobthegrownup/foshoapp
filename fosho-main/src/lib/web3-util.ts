"use server";

import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const getSolBalance = async (publicKey : string) => {
    if (!process.env.RPC_URL) return 0;
    const rpcUrl: string = process.env.RPC_URL;
    const connection = new Connection(rpcUrl, "confirmed");
    try {
      const balance = await connection.getBalance(new PublicKey(publicKey));
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.log("Something went wrong", error); //new
      return 0;
    }
  }