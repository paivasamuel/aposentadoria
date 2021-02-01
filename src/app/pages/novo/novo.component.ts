import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Beneficio } from 'src/app/models/beneficio';
import { BeneficioService } from 'src/app/services/beneficio.service';

import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


//import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  beneficio = {} as Beneficio;
  beneficios: Beneficio[];
  movimentacoes: any[];
  uploadForm: FormGroup;  

  alerta: string;
  arquivo: boolean;

  movimentacao = null;



  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private beneficioService: BeneficioService) { }
  
  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      arquivo: ['']
    });

    this.arquivo = null;

    this.alerta = '';

    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      
      if(id !== null && id != undefined) {
        if(history.state.data !== undefined) {
            this.editBeneficio(history.state.data); 
        } else {
          this.router.navigate(['/'], {state: {data: {}}});
        }

       
      } 
    });

   
  }

 getSantizeUrl(url : string) { 
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); 
}

  saveBeneficio(form: NgForm) {
     this.alerta = 'Benefício salvo com sucesso.';
     var body = this;

    

    if (this.beneficio.id !== undefined) {
      this.beneficioService.updateBeneficio(this.beneficio).subscribe(() => {
          this.router.navigate(['/'+this.alerta], {state: {data: {}}});

        this.cleanForm(form);
      });
    } else {

      if(this.beneficio.categoria == null && this.beneficio.id == null) {
        this.alerta = 'Selecione uma categoria.';
          return false;
       } else if(this.arquivo == null) {
          this.alerta = 'Selecione um arquivo.';
          return false;
       } 
      
      this.beneficioService.saveBeneficio(this.beneficio, this.uploadForm).subscribe((x) => {
        console.log(x);
        this.retornar();
   
        this.cleanForm(form);
      });
    }
  }

  retornar() {
    console.log('entrou');
    this.router.navigate(['/'+this.alerta], {state: {data: {}}});
  }

  changeSelect(e) {
    this.beneficio.categoria = e.target.value;
  }

  changeSelectMovimentacao(e) {
    this.movimentacao = e.target.value;
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('arquivo').setValue(file);
      this.arquivo = true;
    }
  }

  addMov() {
    if(this.movimentacao =='' || this.movimentacao == null) {
      this.alerta = 'Selecione uma categoria.';
      return false;
    }

    this.beneficioService.saveMovimentacao(this.beneficio.id, this.movimentacao).subscribe(() => {
        this.getBeneficios(this.beneficio.id);
      });
  }


  getBeneficios(id) {
    this.beneficioService.getMovimentacoes(id).subscribe((movimentacoes: any[]) => {
      this.movimentacoes = movimentacoes;
    });
  }



  editBeneficio(beneficio: Beneficio) {
    this.beneficio = { ...beneficio };

    this.getBeneficios(beneficio.id);
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.beneficio = {} as Beneficio;
  }
}