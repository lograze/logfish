import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClickhouseResponse, Meta } from '../_models/ClickhouseResponse';
import { Filter, FilterOp, filterOpToString, TimerangeFilter } from '../_models/Filter';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LastQueryStats} from '../_models/LastQueryStats';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClickhouseService {

  private static staticParams = 'add_http_cors_header=1&log_queries=1&output_format_json_quote_64bit_integers=1&readonly=1&result_overflow_mode=throw';

  private user = '';
  private password = '';

  private sqlLimit = 300;

  private database = new BehaviorSubject<string>('default');
  private table = new BehaviorSubject<string | null>(null);

  private tableStructure = new BehaviorSubject<Meta[] | null>(null);
  private filters = new BehaviorSubject<Map<string, Filter>>(new Map<string, Filter>());
  private lastQueryStats = new BehaviorSubject<LastQueryStats | null>(null);

  table$ = this.table.asObservable();
  tableStructure$ = this.tableStructure.asObservable();
  filters$ = this.filters.asObservable();
  lastQueryStats$ = this.lastQueryStats.asObservable();

  static isStringType(filter: Filter): boolean {
    return filter.type.indexOf('String') >= 0;
  }

  static isDateType(filter: Filter): boolean {
    return filter.type.indexOf('Date') >= 0;
  }

  constructor(private http: HttpClient) { }

  fetchDatabases(): Observable<Array<string>>  {
    return this.query('SHOW DATABASES').pipe(map((rs, _) => {
      return rs.data
        .filter((v, idx, arr) => !v[0].startsWith('_'))
        .map((v, idx, arr) => v[0]);
    }));
  }

  fetchTables(): Observable<Array<string>> {
    return this.query('SHOW TABLES').pipe(map((rs, _) => {
      return rs.data.map((v, idx, arr) => v[0]);
    }));
  }

  fetchData(): Observable<ClickhouseResponse> {
    if (this.table.getValue() == null) {
      return EMPTY;
    }

    const whereParts = ['1=1'];
    this.filters.getValue().forEach((f, k, m) => {
      const op = filterOpToString(f.op);
      const v = ClickhouseService.isStringType(f) || ClickhouseService.isDateType(f) ? `'${f.value}'` : f.value;

      if (f.field === 'timestamp') {
        const range = { from: f.value[0], until: f.value[1] } as TimerangeFilter;
        whereParts.push(`${f.field} ${op} FROM_UNIXTIME(${+range.from / 1000}) AND FROM_UNIXTIME(${+range.until / 1000})`);
      } else {
        whereParts.push(`${f.field} ${op} ${v}`);
      }
    });

    const sql = `SELECT * FROM ${this.database.getValue()}.${this.table.getValue()} WHERE ${whereParts.join(' AND ')}`;
    return this.query(sql).pipe(tap(rs => {
      this.tableStructure.next(rs.meta);
      this.lastQueryStats.next({
        rows: rs.rows,
        rows_before_limit_at_least: rs.rows_before_limit_at_least,
        statistics: rs.statistics,
        limit_cut: rs.rows === this.sqlLimit
      } as LastQueryStats);
    }));
  }

  updateDatabase(db: string): void {
    this.database.next(db);
  }

  updateTable(table: string): void {
    this.table.next(table);
    this.filters.next(new Map<string, Filter>());
  }

  updateFilters(key: string, value: string, op: FilterOp): void {
    const filters = this.filters.getValue();
    const type = this.tableStructure.getValue().filter((v, idx, arr) => v.name === key)[0].type;

    filters.set(key, {
      field: key,
      value,
      type,
      op
    } as Filter);

    this.filters.next(filters);
  }

  removeFilter(k: string): void {
    const filters = this.filters.getValue();
    filters.delete(k);
    this.filters.next(filters);
  }

  private query(sql: string): Observable<ClickhouseResponse> {
    const params = ClickhouseService.staticParams + `&database=${this.database.getValue()}`;

    // if (this.user && this.password) {
    //   params += `&user=${encodeURIComponent(this.user)}&password=${encodeURIComponent(this.password)}`;
    // }

    const uri = `${environment.clickhouseHost}/?${params}`;

    if (sql.toLowerCase().indexOf('select') >= 0) {
      sql += `\nLIMIT ${this.sqlLimit}`;
    }

    sql += '\nFORMAT JSONCompact';

    return this.http.post<ClickhouseResponse>(uri, sql);
  }

  hasTimestampField(): boolean {
    return this.tableStructure.getValue() != null && this.tableStructure.getValue()
      .filter((v) => v.name.toLowerCase() === 'timestamp').length > 0;
  }

}
