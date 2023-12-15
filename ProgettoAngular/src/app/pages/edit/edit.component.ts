
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibeer } from '../../Modules/ibeer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogSystemService } from '../../services/log-system.service';
import { take } from 'rxjs';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  beerForm: FormGroup;
  beerId!: number;
  beer!: Ibeer;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private logService: LogSystemService,
  ) {
    this.beerForm = this.formBuilder.group({
    id: [''],
    nome: [''],
    slogan: [''],
    prezzo: [''],
    urlImmagine: [''],
    descrizione: [''],
  });}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.beerId = +idString;
        this.getBeerDetails();
      } else {
        console.error('ID della birra non presente nei parametri');
      }
    });
  }

  getBeerDetails(): void {
    this.beerService.getBeerById(this.beerId).subscribe({
      next: (beer: Ibeer) => {
        this.beer = beer;
        this.populateForm();
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli della birra:', error);
      }
    });
  }

  populateForm(): void {

    this.beerForm.patchValue({
      id: this.beer.id,
      nome: this.beer.nome,
      slogan: this.beer.slogan,
      urlImmagine: this.beer.urlImmagine,
      prezzo: this.beer.prezzo,
      descrizione: this.beer.descrizione
    });
  }

  onSave(): void {
    const updatedData: Partial<Ibeer> = this.beerForm.value;

    const updatedBeer: Ibeer = { ...this.beer, ...updatedData };


    this.beerService.updateBeer(this.beerId, updatedBeer).subscribe({
      next: (updatedBeer: Ibeer) => {
        console.log('Birra aggiornata con successo:', updatedBeer);

        this.router.navigate(['/details/', this.beerId]);
      },
      error: (error) => {
        console.error('Errore durante l\'aggiornamento della birra:', error);
      }
    });
  }

}
