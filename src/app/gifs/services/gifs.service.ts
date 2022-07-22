import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '5azn4xWMfo4ajE193FUk8Porozn3Fx7b';
  private servicioURL: string ='http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  get historial(){
    // this._historial= this._historial.splice(0,10);
    return [...this._historial];
  }

  public resultados: any[] = [];

  buscarGifs(query: string){
    
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      }
      
    const params = new HttpParams().set('api_key',this.apiKey)
                                   .set('limit','10')
                                   .set('q',query);

    localStorage.setItem('historial',JSON.stringify( this._historial));
    this.http.get(`${this.servicioURL}/search`, {params})
    .subscribe( (resp: any) =>{
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        });
    
  }

 

  constructor(private http: HttpClient) { 
      
    this._historial =JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }
}
