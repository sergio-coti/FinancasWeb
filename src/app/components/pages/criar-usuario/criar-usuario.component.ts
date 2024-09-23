import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  mensagemSenhaConfirmacao: string = '';

  //método construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient
  ){}

  //estrutura do formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
    senhaConfirmacao: new FormControl('', [Validators.required])
  });

  //variável para acessar os campos do formulário
  get f() {
    return this.form.controls;
  }

  //função para capturar o submit do formulário
  onSubmit() {

    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    this.mensagemSenhaConfirmacao = '';

    //verificando se as senhas são diferentes
    if(this.form.value.senha != this.form.value.senhaConfirmacao) {
      this.mensagemSenhaConfirmacao = 'Senhas não conferem. Por favor, verifique.';
    } 
    else {

      //enviando a requisição POST para o serviço
      //de cadastro de usuário da API
      this.httpClient.post(environment.apiFinancas + "/usuarios/criar", this.form.value)
        .subscribe({ //aguardando o retorno da API
          next: (data: any) => { //capturando retorno de sucesso
            this.mensagemSucesso = `Parabéns, ${data.nome}. Sua conta foi criada com sucesso!`;
            this.form.reset(); //limpar o formulário
          },
          error: (e) => { //capturando retorno de erro
            this.mensagemErro = e.error.message;
          }
        })
    }
  }
}
