import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AuthHelper } from '../../../helpers/auth.helper';

@Component({
  selector: 'app-cadastrar-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-categorias.component.html',
  styleUrl: './cadastrar-categorias.component.css'
})
export class CadastrarCategoriasComponent {

  //atributos
  mensagem: string = '';

  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
  ) {}

  //estrutura de formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //função para acessar cada campo do formulário
  get f() {
    return this.form.controls;
  }

  //função para processar o SUBMIT do formulário
  onSubmit() {

    //capturando o token do usuário autenticado
    var token = this.authHelper.getUser().token;

    //criando um cabeçalho da requisição enviando o token para a API
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.httpClient.post(environment.apiFinancas + "/categorias", this.form.value, { headers })
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Categoria '${data.nome}', cadastrado com sucesso.`;
          this.form.reset();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

}
