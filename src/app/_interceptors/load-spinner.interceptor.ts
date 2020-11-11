import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadSpinnerService} from '../_services/load-spinner.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class LoadSpinnerInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadSpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true);
    return next.handle(request)
      .pipe(catchError((err) => {
        this.loadingService.setLoading(false);
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false);
        }
        return evt;
      }));
  }

}
