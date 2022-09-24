import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "Qfwq2ORMdcAP36BatfsQeTTASJXcJDR9";
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
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=Qfwq2ORMdcAP36BatfsQeTTASJXcJDR9&q=dragon ball z&limit=10`)
        .subscribe(response =>{
          console.log(response);
        });
  }
}
