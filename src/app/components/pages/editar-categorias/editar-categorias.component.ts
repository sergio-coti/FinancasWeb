import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthHelper } from '../../../helpers/auth.helper';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-categorias.component.html',
  styleUrl: './editar-categorias.component.css'
})
export class EditarCategoriasComponent {

  //atributos
  mensagem: string = '';
  id: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper,
    private activatedRoute: ActivatedRoute
  ) {}

  //função executada ao abrir o componente
  ngOnInit() {
      //capturando o ID do cliente enviado na URL (rota)
      this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

      //obter o token do usuário autenticado
      var token = this.authHelper.getUser().token;

      //criando um cabeçalho da requisição enviando o token para a API
      let headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      //consultando a categoria na API através do ID
      this.httpClient.get(environment.apiFinancas + "/categorias/" + this.id, { headers })
        .subscribe({
          next: (data: any) => {
            //preenchendo o formulário
            this.form.patchValue(data);
          },
          error: (e) => {
            console.log(e.error);
          }
        })
  }

  //estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get f() {
    return this.form.controls;
  }

  //função para capturar o submit
  onSubmit() {

    //obter o token do usuário autenticado
    var token = this.authHelper.getUser().token;

    //criando um cabeçalho da requisição enviando o token para a API
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpClient.put(environment.apiFinancas + "/categorias/" + this.id, 
        this.form.value, { headers })
        .subscribe({
          next: (data: any) => {
            this.mensagem = `Categoria '${data.nome}', atualizado com sucesso.`;
          },
          error: (e) => {
            console.log(e.error);
          }
        });
  }

}
