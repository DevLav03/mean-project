import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.API}/auth/login`, data);
  }

  getProfile(): Observable<any> {
   const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });

    console.log( `Bearer ${token}`);

    return this.http.get(`${this.API}/auth/profile`, { headers });
  }

  getAllUserData(params: any): Observable<any> {

    const token = this.tokenService.getToken();
    let httpParams = new HttpParams();

      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    }); 

    return this.http.get(`${this.API}/users/userdata`,{ params: httpParams, headers } );
  }

  getOneUserData(userId: string): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.get(`${this.API}/users/userdata/${userId}`, { headers });
  }

  InsertUser(data: any): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.post(`${this.API}/users/userdata`, data, { headers });
  }


  UpdateUser(userId: string, data: any): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.put(`${this.API}/users/userdata/${userId}`, data, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
    return this.http.delete(`${this.API}/users/userdata/${userId}`, { headers });
  }
}
