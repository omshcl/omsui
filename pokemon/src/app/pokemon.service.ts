import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemon() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/");
  }

}


