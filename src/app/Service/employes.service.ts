import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployesService {
  url = 'http://192.168.100.84:3004/employes';

  constructor(private http: HttpClient) {}

  addEmp(details: any) {
    return this.http.post(this.url, details).pipe(catchError(this.handleError));
  }

  getAllEmp() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  updateEmp(id: string, data: any) {
    return this.http
      .put(this.url + `/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteEmp(id: string) {
    return this.http
      .delete(this.url + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  //Error Handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.warn(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      (errorMessage = `Backend returned code ${error.status}, body was: `),
        error.error;
    }
    errorMessage = 'Something bad happened; please try again later.';
    // alert(error.error?.message);
    // this.toastr.error(error.error?.message);
    return throwError(() => new Error(errorMessage));
  }
}
