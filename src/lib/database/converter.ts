import {
  Criteria,
  Direction,
  Filter,
  Filters,
  FilterType,
  Operator,
  Order,
  Pagination,
} from "@/lib/types/criteria";
import {
  and,
  AnyTable,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  ne,
  notInArray,
  notLike,
  or,
} from "drizzle-orm";

interface TransformerFunction<T, K> {
  (value: T, table: AnyTable<any>): K;
}
export class DrizzleCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, any>> =
    new Map([]);
  private table: AnyTable<any>;

  constructor(table: AnyTable<any>) {
    this.table = table;
    this.filterTransformers = new Map<
      Operator,
      TransformerFunction<Filter, any>
    >([
      [Operator.EQUAL, this.equal],
      [Operator.NOT_EQUAL, this.notEqual],
      [Operator.GT, this.greaterThan],
      [Operator.LT, this.lessThan],
      [Operator.GTE, this.greaterThanOrEqual],
      [Operator.LTE, this.lessThanOrEqual],
      [Operator.CONTAINS, this.like],
      [Operator.NOT_CONTAINS, this.notLike],
      [Operator.IN, this.in],
      [Operator.NOT_IN, this.notIn],
    ]);
  }

  public criteria(criteria: Criteria) {
    const where = this.filter(criteria.getFilters(), this.table);
    const orderBy = criteria.hasOrder()
      ? this.order(criteria.getOrder()!)
      : //@ts-ignore
        desc(this.table["createdAt"]);
    const pagination = criteria.hasPagination()
      ? this.pagination(criteria.getPagination()!)
      : {
          limit: 10,
          offset: 0,
        };
    return {
      where,
      orderBy,
      ...pagination,
    };
  }

  private filter(filters: Filters, table: AnyTable<any>): any {
    const filter = filters.filters.map((filter: any) => {
      if (filter.type) return this.filter(filter, table);
      const transformer = this.filterTransformers.get(filter.operator);
      if (transformer) {
        return transformer(filter, table);
      }
      throw Error(`Unexpected operator value ${filter.operator}`);
    });
    if (filters.type === FilterType.AND) return and(...filter);
    if (filters.type === FilterType.OR) return or(...filter);
  }

  private order(order: Order) {
    if (order.order === Direction.DESC) {
      //@ts-ignore
      return desc(this.table[order.field]);
    } else {
      //@ts-ignore
      return asc(this.table[order.field]);
    }
  }

  private pagination(pagination: Pagination) {
    return {
      offset: pagination.offset || 0,
      limit: pagination.limit || 10,
    };
  }

  private equal(filter: Filter, table: AnyTable<any>) {
    //@ts-ignore
    return eq(table[filter.field], filter.value);
  }

  private notEqual(filter: Filter, table: AnyTable<any>) {
    //@ts-ignore
    return ne(table[filter.field], filter.value);
  }

  private greaterThan(filter: Filter, table: AnyTable<any>) {
    //@ts-ignore
    return gt(table[filter.field], filter.value);
  }

  private greaterThanOrEqual(filter: Filter, table: AnyTable<any>) {
    //@ts-ignore
    return gte(table[filter.field], filter.value);
  }

  private lessThan(filter: Filter, table: AnyTable<any>) {
    //@ts-ignore
    return lt(table[filter.field], filter.value);
  }

  private lessThanOrEqual(filter: Filter, table: AnyTable<any>) {
    //@ts-ignore
    return lte(table[filter.field], filter.value);
  }

  private like(filter: Filter, table: AnyTable<any>) {
    // @ts-ignore
    return like(table[filter.field], filter.value);
  }

  private notLike(filter: Filter, table: AnyTable<any>) {
    // @ts-ignore
    return notLike(table[filter.field], filter.value);
  }

  private in(filter: Filter, table: AnyTable<any>) {
    // @ts-ignore
    return inArray(table[filter.field], filter.value);
  }

  private notIn(filter: Filter, table: AnyTable<any>) {
    // @ts-ignore
    return notInArray(table[filter.field], filter.value);
  }
}

