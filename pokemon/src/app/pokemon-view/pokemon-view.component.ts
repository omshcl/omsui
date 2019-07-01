import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {

  constructor(private pokemonService :PokemonService ) { }
  
  pokemons;
  images;

  ngOnInit() {
     this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getPokemon().subscribe(pokemons => this.pokemons = pokemons);
    this.pokemonService.getImages().subscribe(images => console.log(images ));
  }

}
