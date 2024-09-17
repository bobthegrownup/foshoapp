export const DepositResponse = {
  type: 'object',
  properties: {
    transactionId: { type: 'string' },
    serializedTransaction: { type: 'string' },
  },
};

export const WithdrawResponse = {
  type: 'object',
  properties: {
    transactionId: { type: 'string' },
    serializedTransaction: { type: 'string' },
  },
};
