import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http : HttpClient
  ) { }

  getHeaders(){
    let headers : HttpHeaders = new HttpHeaders ({
      'content-type' : 'application/json'
    })

    return headers;
  }

  makeGetApiCall(endpoint: string, params?): Observable<any> {
    let headers: HttpHeaders = this.getHeaders();
    let url = `${environment.apiBaseUrl}${endpoint}`;
    return this.http.get(url, { headers, params });
  }

  // make a GET API request and returns Promise
  makeGetApiCallToPromise(endpoint: string): Promise<any> {
    return this.makeGetApiCall(endpoint).toPromise();
  }


  // make a POST API request and returns Observable
  makePostApiCall(endpoint: string, payload: any): Observable<any> {
    let headers: HttpHeaders = this.getHeaders();
    let url = `${environment.apiBaseUrl}${endpoint}`;
    return this.http.post(url, payload, { headers });
  }

  // make a POST API request and returns Observable
  makePostApiCallToPromise(endpoint: string, payload: any): Promise<any> {
    return this.makePostApiCall(endpoint, payload).toPromise();
  }

  getVehicleData(payload){
    let url = `getVehicleData?limit=${payload.limit}&page=${payload.page}`
    return this.makeGetApiCallToPromise(url)
  }

  saveUser(payload){
    return this.makePostApiCall('apiRegUserdata', payload)
  }

  getUser(email){
    let url = `getUser?email=${email}`
    return this.makeGetApiCallToPromise(url)
  }

  login(payload){
    // let url = `login?email=${payload.email}&password=${payload.password}`
    return this.makeGetApiCall('login', {email :payload.email, password :payload.password });
  }

  sendForgot(payload){
    return this.makePostApiCall('forgotPass', payload)
  }

  resetPass(payload){
    return this.makePostApiCall('passwordReset',payload)
  }
}
