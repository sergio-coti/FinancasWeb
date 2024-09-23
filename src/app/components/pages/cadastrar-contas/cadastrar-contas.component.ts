import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthHelper } from '../../../helpers/auth.helper';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cadastrar-contas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar-contas.component.html',
  styleUrl: './cadastrar-contas.component.css',
})
export class CadastrarContasComponent {
  //atributos
  mensagem: string = '';

  //construtor para injeções de dependência
  constructor(private httpClient: HttpClient, private authHelper: AuthHelper) {}

  //estrutura de formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    data: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    //capturando o token do usuário autenticado
    var token = this.authHelper.getUser().token;

    //criando um cabeçalho da requisição enviando o token para a API
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpClient
      .post(environment.apiFinancas + '/contas', this.form.value, { headers })
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Conta '${data.nome}', cadastrado com sucesso.`;
          this.form.reset();
        },
        error: (e) => {
          console.log(e.error);
        },
      });
  }
}
