export interface ClickhouseResponse {
  meta: Meta[];
  data: Array<Array<any>>;
  rows: number;
  rows_before_limit_at_least: number;
  statistics: Statistics;
}

export interface Meta {
  name: string;
  type: string;
}

export interface Statistics {
  elapsed: number;
  rows_read: number;
  bytes_read: number;
}
