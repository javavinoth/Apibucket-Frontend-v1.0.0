import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiTableItem } from '../home/home.component';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = environment.apiUrl;
  private url: string = "http://13.127.244.113:8080/api/retrive";
  // private url: string = "http://localhost:8080/api/retrive";

  constructor(private http: HttpClient) { }


  getApiList(): Observable<ApiTableItem[]> {


    return this.http.get<ApiTableItem[]>(this.url);
  }
}
