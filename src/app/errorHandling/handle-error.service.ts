import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private toaster:ToastrService) { }

  public handleError(err:HttpErrorResponse){
    let errorMessage:string;
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occured: ${err.error.message}`
    }
    else{
      switch(err.status){
        case 400 :
          errorMessage = `${err.status}: Bad Request.`;
          break;
        case 401 :
          errorMessage = `${err.status}: You are unothorized to doing this action.`;
          break;
        case 403 : 
        errorMessage = `${err.status}: You do not have permission to access the requested resources.`;
          break;
        case 404 : 
        errorMessage = `${err.status}: The requested resources does not exist.`;
          break;
        case 412 : 
        errorMessage = `${err.status}: Precondition failed.`;
          break;
        case 500 : 
        errorMessage = `${err.status}: Internal Server error.`;
          break;
        case 503 : 
        errorMessage = `${err.status}: The requested service is not available.`;
          break;
        default:
          errorMessage =`Something went Wrong`
      }
    }
    this.toaster.error(errorMessage);
    console.log(errorMessage);
  }
}
