import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "Qfwq2ORMdcAP36BatfsQeTTASJXcJDR9";
  private url: string = 'https://api.giphy.com/v1/gifs';
  public resultado: Gif[] = [];

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }
  constructor(private http: HttpClient){

    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  public buscarGifs(query: string = ""){
    query = query.trim().toLowerCase();

    if(this._historial.includes(query))
    {
      this._historial.splice(this._historial.indexOf(query),1);
      
    }
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);
    localStorage.setItem('historial',JSON.stringify(this._historial));
    const params = new HttpParams().
    set('api_key',this.apiKey)
    .set('q',query)
    .set('limit','20');

    this.http.get<SearchGIFResponse>(`${this.url}/search`, {params} )
        .subscribe((response) =>{
          this.resultado = response.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultado));
        });
    
  }
}
