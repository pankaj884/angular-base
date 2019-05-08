import {Injectable, Injector} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';


import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {tap} from 'rxjs/internal/operators';
import {throwError as observableThrowError, Observable} from 'rxjs/index';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
  constructor(public toastrService: ToastrService, private router: Router, private inj: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthService);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 400 : {
            this.toastrService.error(err.error.message);
            break;

          }
          case 404 : {
            this.toastrService.error(err.error.message);
            break;
          }

          case 401 : {
            auth.clearCredentials();
            this.toastrService.error(err.error.message);
            this.router.navigateByUrl('');
            break;
          }

          case 500 : {
            this.toastrService.error(err.error.message);
            break;
          }

          default: {
            this.toastrService.error(err.error.message);
          }
        }
        return observableThrowError(err);
      }
    }));
  }
}
