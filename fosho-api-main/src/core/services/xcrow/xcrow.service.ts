import {
  XcrowDeposit,
  XcrowDepositResponse,
  XcrowExecute,
  XcrowWithdraw,
  XcrowWithdrawResponse,
} from '@core/services/xcrow/contracts';
import axios from 'axios';
import { Logger } from '@nestjs/common';
import * as process from 'node:process';

export class XcrowService {
  async deposit(dto: XcrowDeposit): Promise<XcrowDepositResponse> {
    try {
      const response = await axios.post(
        `${process.env.XCROW_BASE_URL}/transactions/deposit`,
        {
          payer: dto.payer,
          strategy: dto.strategy,
          network: process.env.XCROW_API_NETWORK,
          priority_fee_level: 'Medium',
          tokens: [
            {
              mint_address: dto.token.mintAddress,
              amount: dto.token.amount,
            },
          ],
        },
        {
          headers: {
            'x-application-id': process.env.XCROW_APPLICATION_ID,
            'x-api-key': process.env.XCROW_API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      Logger.error(error.message, error.stack, 'XcrowService.deposit');
      throw error;
    }
  }

  async withdraw(dto: XcrowWithdraw): Promise<XcrowWithdrawResponse> {
    try {
      const response = await axios.post(
        `${process.env.XCROW_BASE_URL}/transactions/withdraw`,
        {
          payer: dto.payer,
          strategy: dto.strategy,
          vault_id: dto.vaultId,
          network: process.env.XCROW_API_NETWORK,
          priority_fee_level: 'Medium',
          tokens: [
            {
              mint_address: dto.token.mintAddress,
              amount: dto.token.amount,
            },
          ],
        },
        {
          headers: {
            'x-application-id': process.env.XCROW_APPLICATION_ID,
            'x-api-key': process.env.XCROW_API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      Logger.error(error.message, error.stack, 'XcrowService.withdraw');
      throw error;
    }
  }

  async execute(dto: XcrowExecute): Promise<void> {
    try {
      await axios.post(
        `${process.env.XCROW_BASE_URL}/vault/${dto.vaultId}/transactions`,
        {
          transaction_id: dto.transactionId,
          serialized_transaction: dto.serializedTransaction,
        },
        {
          headers: {
            'x-application-id': process.env.XCROW_APPLICATION_ID,
            'x-api-key': process.env.XCROW_API_KEY,
          },
        },
      );
    } catch (error) {
      Logger.error(error.message, error.stack, 'XcrowService.execute');
      throw error;
    }
  }
}
