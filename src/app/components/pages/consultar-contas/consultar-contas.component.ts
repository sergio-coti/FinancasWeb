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
  selector: 'app-consultar-contas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultar-contas.component.html',
  styleUrl: './consultar-contas.component.css',
})
export class ConsultarContasComponent {
  mensagem: string = '';
  contas: any[] = [];

  constructor(private httpClient: HttpClient, private authHelper: AuthHelper) {}

  form = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
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
      .get(
        environment.apiFinancas +
          '/contas/' +
          this.form.value.dataMin +
          '/' +
          this.form.value.dataMax,
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.contas = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        },
      });
  }

  onDelete(id: string) {
    if (confirm('Deseja realmente excluir a conta selecionada?')) {
      //capturando o token do usuário autenticado
      var token = this.authHelper.getUser().token;

      //criando um cabeçalho da requisição enviando o token para a API
      let headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.httpClient
        .delete(environment.apiFinancas + '/contas/' + id, { headers })
        .subscribe({
          next: (data: any) => {
            this.mensagem = `Conta '${data.nome}', excluído com sucesso.`;
            this.onSubmit(); //recarregar a consulta
          },
          error: (e) => {
            console.log(e.error);
          },
        });
    }
  }
}
