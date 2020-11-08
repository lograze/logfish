import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClickhouseResponse, Meta } from '../_models/ClickhouseResponse';
import { Filter, FilterOp } from '../_models/Filter';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {LastQueryStats} from '../_models/LastQueryStats';

@Injectable({
  providedIn: 'root'
})
export class ClickhouseService {

  private static staticParams = 'add_http_cors_header=1&log_queries=1&output_format_json_quote_64bit_integers=1&readonly=1&result_overflow_mode=throw';

  private host = 'http://127.0.0.1';
  private port = '8123';

  private database = new BehaviorSubject<string>('default');
  private table = new BehaviorSubject<string | null>(null);
  private tableStructure = new BehaviorSubject<Meta[] | null>(null);
  private filters = new BehaviorSubject<Map<string, Filter>>(new Map<string, Filter>());
  private lastQueryStats = new BehaviorSubject<LastQueryStats | null>(null);

  table$ = this.table.asObservable();
  tableStructure$ = this.tableStructure.asObservable();
  filters$ = this.filters.asObservable();
  lastQueryStats$ = this.lastQueryStats.asObservable();

  static resolveFilterOp(filter: Filter): string {
    switch (filter.op) {
      case FilterOp.EQ:
        return '=';
      case FilterOp.NE:
        return '!=';
      case FilterOp.LT:
        return '<';
      case FilterOp.LE:
        return '<=';
      case FilterOp.GE:
        return '>=';
      case FilterOp.GT:
        return '>';
    }
  }

  static isStringType(filter: Filter): boolean {
    return filter.type.indexOf('String') >= 0;
  }

  constructor(private http: HttpClient) { }

  fetchDatabases(): Observable<Array<string>>  {
    return this.query('show databases').pipe(map((rs, _) => {
      return rs.data
        .filter((v, idx, arr) => !v[0].startsWith('_'))
        .map((v, idx, arr) => v[0]);
    }));
  }

  fetchTables(): Observable<Array<string>> {
    return this.query('show tables').pipe(map((rs, _) => {
      return rs.data.map((v, idx, arr) => v[0]);
    }));
  }

  fetchData(): Observable<ClickhouseResponse> {
    if (this.table.getValue() == null) {
      return EMPTY;
    }

    const whereParts = ['1=1'];
    this.filters.getValue().forEach((f, k, m) => {
      const op = ClickhouseService.resolveFilterOp(f);
      const v = ClickhouseService.isStringType(f) ? `'${f.value}'` : f.value;
      whereParts.push(`${f.field} ${op} ${v}`);
    });

    const sql = `select * from ${this.database.getValue()}.${this.table.getValue()} where ${whereParts.join(' AND ')}`;
    return this.query(sql).pipe(tap(rs => {
      this.tableStructure.next(rs.meta);
      this.lastQueryStats.next({
        rows: rs.rows,
        rows_before_limit_at_least: rs.rows_before_limit_at_least,
        statistics: rs.statistics
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
    const uri    = `${this.host}:${this.port}/?${params}`;

    sql += '\nLIMIT 1000 FORMAT JSONCompact';

    return this.http.post<ClickhouseResponse>(uri, sql);
  }

}
