import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from './interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


    private apiKey    : string = 'oino2ICoV7j08pRVxUUym3Dkv870QgeW';
    private servicioURL: string = 'https://api.giphy.com/v1/gifs';
    private _historial: string[] = [];

    public resultados: Gif[] = [];

      get historial(){
        //para cortar las ultimas 10 posiciones del arreglo
        
        return [...this._historial];
      }


      //constructor del servicio
      //así podemos mantener por medio del servicio de gifs la información persistente del historial en el localstorage
      constructor (private http:HttpClient){
        this._historial = JSON.parse( localStorage.getItem('historial')!) || []

      //así mantenemos persistente la respuesta a la hora de buscar gif
        this.resultados = JSON.parse( localStorage.getItem('resultados')!) || []
      
      }

      buscarGifs(valor: string= ''){

        valor = valor.trim().toLocaleLowerCase();

        //si NO tiene el valor, lo inserta, si existe no lo inserta
        if (!this._historial.includes(valor)){
          this._historial.unshift(valor);
          this._historial = this._historial.splice(0,10);
        }       

        localStorage.setItem('historial', JSON.stringify(this._historial)) //JSON.stringify convierte un objeto en string y así puedo guardar en l local storage la busqueda persistente
       

        const params = new HttpParams().set('api_key', this.apiKey)
                                       .set('limit', '10')
                                       .set('q', valor);

        //respuesta de gifs
        //peticion http get a apy de giphy
     //   this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=oino2ICoV7j08pRVxUUym3Dkv870QgeW&q=${ valor }&limit=10`)
         this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
        .subscribe( ( resp ) => {
          // console.log(resp.data);
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados)); //almacenar resultado en LocalStorage en la respuesta de gifs revisar consola a la hora de buscar
        });       
      }

} 
