import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Beneficio } from 'src/app/models/beneficio';
import { BeneficioService } from 'src/app/services/beneficio.service';

import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';


//import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beneficio = {} as Beneficio;
  beneficios: Beneficio[];
  alerta: string;


  constructor(private route: ActivatedRoute, private router: Router, private beneficioService: BeneficioService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var msg = params.get('msg');
      this.alerta = '';

      if(msg !== null) {
        this.alerta = msg;
      }
    });

    this.getBeneficios();
  }


  getBeneficios() {
    this.beneficioService.getBeneficios().subscribe((beneficios: Beneficio[]) => {
      this.beneficios = beneficios;
    });
  }

  editBeneficio(beneficio) {
    this.router.navigate(['/novo/'+beneficio.id], {state: {data: beneficio}});
  }


  deleteBeneficio(beneficio: Beneficio) {
    this.alerta = '';
    this.beneficioService.deleteBeneficio(beneficio).subscribe(() => {
      this.getBeneficios();
    });
  }


}