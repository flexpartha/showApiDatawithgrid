import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import {throwError } from 'rxjs';

const apiUrl ="https://jsonplaceholder.typicode.com/posts?userId=";
const apiUrl1 ="https://jsonplaceholder.typicode.com/posts?userId=2";

@Injectable({
  providedIn: 'root'
})

export class JSonApiService {

  pageNum:number = 1;
  constructor(private httpSrv:HttpClient) { }

  getJsonValue(value:any):Observable<any>{
    return this.httpSrv.get(apiUrl + value).pipe(
        // catchError(error =>{
        //    //console.error(error);
        //    let errorMsg: string;
        //    if(error.error instanceof ErrorEvent){
        //      errorMsg = `Error: ${error.error.message}`;
        //    }else {
        //       errorMsg = this.getServerErrorMessage(error);
        //       console.error(errorMsg);
        //     }
        //     return throwError(errorMsg);
        // })
      );
  }

  getNextPage(){
    this.pageNum +=1;
    //let finalApi = apiUrl + this.pageNum;
    return this.httpSrv.get(apiUrl + this.pageNum);
  }

  getPreviousPage(){
    this.pageNum -=1;
    let finalApi = apiUrl + this.pageNum;
    return this.httpSrv.get(finalApi).pipe();
  }

  getJsonValue2():Observable<any>{
    return this.httpSrv.get(apiUrl1);
  }

  private getServerErrorMessage(error:HttpErrorResponse):string{
    switch(error.status){
      case 404:{
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
          return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
