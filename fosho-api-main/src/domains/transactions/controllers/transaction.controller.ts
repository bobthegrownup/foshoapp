import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { DepositUseCase } from '@domains/transactions/usecases/deposit.usecase';
import { DepositDto } from '@domains/transactions/dto/deposit.dto';
import { WithdrawDto } from '@domains/transactions/dto/withdraw.dto';
import { WithdrawUseCase } from '@domains/transactions/usecases/withdraw.usecase';
import {
  DepositResponse,
  WithdrawResponse,
} from '@domains/transactions/controllers/transactions.swagger';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionController {
  constructor(
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
  ) {}

  @Post('deposit')
  @ApiResponse({
    status: 200,
    description: 'Deposit',
    schema: DepositResponse,
  })
  async deposit(@Body() depositDto: DepositDto) {
    return this.depositUseCase.execute(depositDto);
  }

  @Post('/:id/withdraw')
  @ApiResponse({
    status: 200,
    description: 'Deposit',
    schema: WithdrawResponse,
  })
  async withdraw(@Param('id') id: string, @Body() withdrawDto: WithdrawDto) {
    return this.withdrawUseCase.execute(id, withdrawDto);
  }
}
