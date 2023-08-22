import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HandleErrorService } from '../errorHandling/handle-error.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private error:HandleErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //return next.handle(request);

    return new Observable((observer)=>{
      next.handle(request).subscribe(
        //success
        (res:HttpResponse<any>) =>{
          if(res instanceof HttpResponse){
            // continueing the Http Cycle
            console.log("RESPONSE:::--",res);
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          // Display Error message via toaster
          this.error.handleError(err);
        }
      );
    });
  }
}
