export interface Filter {
  field: string;
  value: string;
  type: string;
  op: FilterOp;
}

export enum FilterOp {
  EQ, NE, LT, LE, GE, GT
}
