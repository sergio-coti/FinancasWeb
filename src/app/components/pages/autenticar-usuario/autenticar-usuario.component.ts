import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AuthHelper } from '../../../helpers/auth.helper';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //atributos
  mensagemErro: string = '';

  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
  ) {}

  //estrutura do formulário
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //função para acessar cada campo do formulário na página
  get f() {
    return this.form.controls;
  }

  //função executada no SUBMIT do formulário
  onSubmit() {
    this.httpClient.post(environment.apiFinancas + "/usuarios/autenticar", this.form.value)
      .subscribe({
        next: (data: any) => {
          //gravar os dados do usuário autenticado na local storage
          this.authHelper.signIn(data);
          //redirecionar para a página de consulta de contas
          location.href = '/pages/consultar-contas';
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      });
  }

}
