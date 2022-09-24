import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "Qfwq2ORMdcAP36BatfsQeTTASJXcJDR9";

  public resultado: Gif[] = [];

  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }
  constructor(private http: HttpClient){}

  public buscarGifs(query: string = ""){
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=Qfwq2ORMdcAP36BatfsQeTTASJXcJDR9&q=${query}&limit=10`)
        .subscribe((response: any) =>{
          console.log(response.data);
          this.resultado = response.data;
        });
  }
}
