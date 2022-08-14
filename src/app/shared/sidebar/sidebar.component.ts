import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(){
    return this.gifsService.historial;
  }


  constructor(private gifsService: GifsService){ }

  //buscar en sidebar la búsqueda, llamamos al servicio
  buscar( termino: string){    
    this.gifsService.buscarGifs(termino)
  }
}
