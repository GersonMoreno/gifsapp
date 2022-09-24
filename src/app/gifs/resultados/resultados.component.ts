import { Component, OnInit } from '@angular/core';
import { Gif } from '../interfaces/gifs.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent implements OnInit {

  get resultado(): Gif[]{
    return this.gifsService.resultado;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

}
