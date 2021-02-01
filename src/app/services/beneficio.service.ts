import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Beneficio } from '../models/beneficio';

import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  url = 'http://msombra.com.br/samuel'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  /*httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  }*/
  httpOptions = {
    headers: new HttpHeaders({  })
  }

  // Obtem todos os beneficioros
  getBeneficios(): Observable<Beneficio[]> {
    return this.httpClient.get<Beneficio[]>(this.url + '/lista.php')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  getMovimentacoes(id): Observable<Beneficio[]> {
    return this.httpClient.get<Beneficio[]>(this.url + '/movimentacoes.php?id='+id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um beneficioro pelo id
  getBeneficioById(id: number): Observable<Beneficio> {
    return this.httpClient.get<Beneficio>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   saveMovimentacao(id, novo): Observable<Beneficio> {
        const formData = new FormData();

        formData.append('novo', novo);

        return this.httpClient.post<Beneficio>(this.url + '/inserir_movimentacao.php?id='+id, formData, this.httpOptions)
          .pipe(
            retry(0),
            catchError(this.handleError)
          )
      }


  // salva um beneficior

      saveBeneficio(beneficio: Beneficio, uploadForm : FormGroup): Observable<Beneficio> {
        const formData = new FormData();

        formData.append('id', String(beneficio.id));
        formData.append('nome', beneficio.nome);
        formData.append('cpf', beneficio.cpf);
        formData.append('matricula', String(beneficio.matricula));
        formData.append('orgao', beneficio.orgao);
        formData.append('categoria', beneficio.categoria);

        formData.append('arquivo_upload', uploadForm.get('arquivo').value);

        return this.httpClient.post<Beneficio>(this.url + '/inserir.php', formData, this.httpOptions)
          .pipe(
            retry(0),
            catchError(this.handleError)
          )
      }

    

  // autualiza um beneficio
  updateBeneficio(beneficio: Beneficio): Observable<Beneficio> {
    return this.httpClient.put<Beneficio>(this.url + '/update.php?id=' + beneficio.id, JSON.stringify(beneficio), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // deleta um beneficio
  deleteBeneficio(beneficio: Beneficio) {
    return this.httpClient.delete<Beneficio>(this.url + '/delete.php?id=' + beneficio.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}