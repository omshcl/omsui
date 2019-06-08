import { Injectable } from '@angular/core';
import { catchError, map, tap} from 'rxjs/operators';

import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}
  urls;

  getPokemon() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/");
  }

  getImages() {
  
    return this.http.get("https://pokeapi.co/api/v2/pokemon/")
    .pipe(map(poke => {
      let results = poke.results;
      let urls =  results.map(element => {
        let url = element.url;
        var imageData;
        this.http.get(url).subscribe(img => this.urls = img );
      });
      console.log("res1")
      console.log(this.urls)
      console.log("res2")
      
      return ;
    }));
   
   }

  getImage(url) {
    return this.http.get(url)
    .pipe(map(data => data.sprites.back_default));

  }

}


