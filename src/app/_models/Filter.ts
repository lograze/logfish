export interface Filter {
  field: string;
  value: any;
  type: string;
  op: FilterOp;
}

export enum FilterOp {
  EQ, NE, LT, LE, GE, GT, LIKE, NOT_LIKE
}

export function stringToFilterOp(raw: string): FilterOp {
  switch (raw) {
    case '=':
      return FilterOp.EQ;
    case '!=':
      return FilterOp.NE;
    case '>':
      return FilterOp.GT;
    case '>=':
      return FilterOp.GE;
    case '<':
      return FilterOp.LT;
    case '<=':
      return FilterOp.LE;
    case 'LIKE':
      return FilterOp.LIKE;
    case 'NOT LIKE':
      return FilterOp.NOT_LIKE;
    default:
      throw new Error(`cant convert ${raw} into FilterOp`);
  }
}

export function filterOpToString(op: FilterOp): string {
  switch (op) {
    case FilterOp.EQ:
      return '=';
    case FilterOp.NE:
      return '!=';
    case FilterOp.GT:
      return '>';
    case FilterOp.GE:
      return '>=';
    case FilterOp.LT:
      return '<';
    case FilterOp.LE:
      return '<=';
    case FilterOp.LIKE:
      return 'LIKE';
    case FilterOp.NOT_LIKE:
      return 'NOT LIKE';
    default:
      throw new Error(`cant convert ${op} into string`);
  }
}
