import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthHelper } from '../../../helpers/auth.helper';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-categorias',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-categorias.component.html',
  styleUrl: './consultar-categorias.component.css',
})
export class ConsultarCategoriasComponent {

  //atributos
  categorias: any[] = [];
  mensagem: string = '';

  //método construtor para entrada de argumentos
  constructor(private httpClient: HttpClient, private authHelper: AuthHelper) {}

  //função executada no momento em que a página é carregada
  ngOnInit() {
    //obter o token do usuário autenticado
    var token = this.authHelper.getUser().token;

    //criando um cabeçalho da requisição enviando o token para a API
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    //fazendo a requisição para realização da consulta de categorias
    this.httpClient
      .get(environment.apiFinancas + '/categorias', { headers })
      .subscribe({
        next: (data) => {
          //armazenar a listagem de categorias obtidas
          this.categorias = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        },
      });
  }

  //função executada ao clicar no botão do exclusão
  onDelete(id: string) {
    if (confirm('Deseja realmente excluir a categoria selecionada?')) {
      //obter o token do usuário autenticado
      var token = this.authHelper.getUser().token;

      //criando um cabeçalho da requisição enviando o token para a API
      let headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      //enviando uma requisição para o serviço DELETE da API
      this.httpClient.delete(environment.apiFinancas + "/categorias/" + id, { headers })
        .subscribe({
          next: (data: any) => {
            this.mensagem = `Conta '${data.nome}', excluído com sucesso.`;
            this.ngOnInit(); //recarregando a consulta de categorias
          },
          error: (e) => {
            console.log(e.error);
          }
        })
    }
  }
}
