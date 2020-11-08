import {Statistics} from './ClickhouseResponse';

export interface LastQueryStats {
  rows: number;
  rows_before_limit_at_least: number;
  statistics: Statistics;
}
