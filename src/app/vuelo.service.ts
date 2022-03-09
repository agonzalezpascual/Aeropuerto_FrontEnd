import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Vuelo } from './vuelo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VueloService {
private ApiServer = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  public getVuelos(): Observable<Vuelo[]>{
  return this.http.get<Vuelo[]>(`${this.ApiServer}/vuelo/get`);
  }

  public getVuelo(vueloId: string): Observable<Vuelo>{
    return this.http.get<Vuelo>(`${this.ApiServer}/vuelo/get/${vueloId}`);
    }

  public addEmployee(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(`${this.ApiServer}/vuelo`, vuelo);
  }

  public updateEmployee(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.put<Vuelo>(`${this.ApiServer}/vuelo/update/${vuelo.idVuelo}`, vuelo);
  }

  public deleteEmployee(vueloId: string): Observable<void> {
    return this.http.delete<void>(`${this.ApiServer}/vuelo/delete/${vueloId}`);
  }
}
