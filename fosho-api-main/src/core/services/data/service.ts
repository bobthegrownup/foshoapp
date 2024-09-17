import {
  IFindOneParams,
  IFindParams,
  IService,
} from '@core/services/data/types';
import { IRepository } from '@core/repositories/types';
import { DeepPartial } from 'typeorm';
import { PaginatedDto } from '@core/pagination/paginated.dto';
import { PaginatedData } from '@core/pagination/paginated-data';

export abstract class Service<Entity> implements IService<Entity> {
  protected repository: IRepository<Entity>;

  protected constructor(repository: IRepository<Entity>) {
    this.repository = repository;
  }

  create(params: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.create(params);
  }

  update(id: string, params: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.update(id, params);
  }

  async findAndCount({
    paginate,
    relations,
    select,
  }: {
    paginate: PaginatedDto;
    relations?: Record<string, any>;
    select?: DeepPartial<Entity>;
  }): Promise<PaginatedData<Entity>> {
    const { results, count } = await this.repository.findAndCount({
      skip: paginate.getSkip(),
      take: paginate.getTake(),
      where: paginate.getWhere() as any,
      order: paginate.getOrder() as any,
      relations,
      select,
    });

    return new PaginatedData({
      page: paginate.getPage(),
      limit: paginate.getLimit(),
      total: count,
      results,
    });
  }

  find(params: IFindParams<Entity>): Promise<Entity[]> {
    return this.repository.find(params);
  }

  findOne(params: IFindOneParams<Entity>): Promise<Entity | null> {
    return this.repository.findOne(params);
  }

  delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
