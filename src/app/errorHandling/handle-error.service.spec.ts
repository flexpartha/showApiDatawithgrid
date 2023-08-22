import { TestBed } from '@angular/core/testing';

import { HandleErrorService } from './handle-error.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

describe('HandleErrorService', () => {
  let service: HandleErrorService;
  let toastrServiceMock: Partial<ToastrService>;

  beforeEach(() => {
    toastrServiceMock = {
      error: jasmine.createSpy('error')
    }
    TestBed.configureTestingModule({
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    });
    service = TestBed.inject(HandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle ErrorEvent', () =>{
    const errorEvent = new ErrorEvent('Error', {message: 'Test error message'});
    const httpErrorResponse = new HttpErrorResponse({error:errorEvent});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('An error occured: Test error message')
  });

  it('should handle 400 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 400});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('400: Bad Request.');
  });

  it('should handle 401 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 401});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('401: You are unothorized to doing this action.');
  });

  it('should handle 403 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 403});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('403: You do not have permission to access the requested resources.');
  });

  it('should handle 404 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 404});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('404: The requested resources does not exist.');
  });

  it('should handle 412 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 412});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('412: Precondition failed.');
  });

  it('should handle 500 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 500});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('500: Internal Server error.');
  });

  it('should handle 503 Error', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 503});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('503: The requested service is not available.');
  });

  it('should handle unknown error status', () =>{
    const httpErrorResponse = new HttpErrorResponse({status: 999});
    service.handleError(httpErrorResponse);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Something went Wrong');
  });
});
