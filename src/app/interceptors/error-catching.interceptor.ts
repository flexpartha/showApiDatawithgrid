import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { HandleErrorService } from "../errorHandling/handle-error.service";
import { tap } from "rxjs/operators";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  cacheMap = new Map<string, HttpResponse<unknown>>();

  constructor(private error: HandleErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isRequestCachable(request)) {
      // our request need to be cache
      // check req url is exist or not
      const url = request.url.toLowerCase();
      if (this.cacheMap.has(url)) {
        // if exists
        const res = this.cacheMap.get(url) as HttpResponse<unknown>;
        return of(res);
      } else {
        //if response not exists
        return next.handle(request).pipe(
          tap(
            (event) => {
              if (event instanceof HttpResponse) {
                //set the response to the key
                this.cacheMap.set(url, event);
              }
            },
            (err: HttpErrorResponse) => {
              // Display Error message via toaster
              this.error.handleError(err);
            }
          )
        );
      }
    } else {
      return next.handle(request);
    }

    // return new Observable((observer)=>{
    //   next.handle(request).subscribe(
    //     //success
    //     (res:HttpResponse<any>) =>{
    //       if(res instanceof HttpResponse){
    //         // continueing the Http Cycle
    //         console.log("RESPONSE:::--",res);
    //         observer.next(res);
    //       }
    //     },
    //     (err: HttpErrorResponse) => {
    //       // Display Error message via toaster
    //       this.error.handleError(err);
    //     }
    //   );
    // });
  }

  private isRequestCachable(request: HttpRequest<unknown>): boolean {
    if (request.method === "GET") {
      return true;
    }
    return false;
  }
}
