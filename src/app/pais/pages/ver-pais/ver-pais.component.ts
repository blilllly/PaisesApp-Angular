import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country[];
  badges: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.getPaisPorId( id )),
        tap( console.log )
      )
      // .subscribe( pais => { console.log(this.pais = pais) });
      .subscribe( pais => {
        this.pais = pais;
        const {translations} = this.pais[0];
        const elementos = Object.values(translations);

        for (let index = 0; index < elementos.length; index++) {
          this.badges.push(elementos[index].common);
        }
      });

    // this.activateRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log( id );

    //     this.paisService.getPaisPorId( id )
    //       .subscribe( pais => {
    //         console.log( pais );
    //       })

    //   });

  }

}
