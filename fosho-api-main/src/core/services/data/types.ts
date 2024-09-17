import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { DeepPartial } from 'typeorm';
import { PaginatedDto } from '@core/pagination/paginated.dto';
import { PaginatedData } from '@core/pagination/paginated-data';

export interface IFindOneParams<Entity> {
  where?: DeepPartial<Entity> | Array<DeepPartial<Entity>>;
  relations?: Record<string, any>;
}

export interface IFindParams<Entity> {
  skip?: number;
  take?: number;
  order?: FindOptionsOrder<Entity>;
  where?: DeepPartial<Entity> | Array<DeepPartial<Entity>>;
  orderBy?: Record<string, any>;
  relations?: Record<string, any>;
  withDeleted?: boolean;
  select?: DeepPartial<Entity>;
}

export interface IService<Entity> {
  findAndCount({
    paginate,
    relations,
    select,
  }: {
    paginate: PaginatedDto;
    relations?: Record<string, any>;
    select?: DeepPartial<Entity>;
  }): Promise<PaginatedData<Entity>>;
  find(params: IFindParams<Entity>): Promise<Entity[]>;
  findOne(params: IFindOneParams<Entity>): Promise<Entity | null>;
  create(params: DeepPartial<Entity>): Promise<Entity>;
  update(id: string, params: DeepPartial<Entity>): Promise<Entity>;
  delete(id: string): Promise<void>;
}
