export interface XcrowDeposit {
  payer: string;
  strategy: string;
  token: {
    mintAddress: string;
    amount: number;
  };
}

export interface XcrowDepositResponse {
  transaction_id: string;
  vault_id: string;
  serialized_transaction: string;
  expires_in: string;
  asset: {
    token: string;
    amount: number;
    decimals: number;
    symbol: string;
    name: string;
    logo_uri: string;
  };
}

export interface XcrowWithdraw {
  payer: string;
  strategy: string;
  vaultId: string;
  token: {
    mintAddress: string;
    amount: number;
  };
}

export interface XcrowWithdrawResponse {
  transaction_id: string;
  vault_id: string;
  serialized_transaction: string;
}

export interface XcrowExecute {
  vaultId: string;
  transactionId: string;
  serializedTransaction: string;
}
