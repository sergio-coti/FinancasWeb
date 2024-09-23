import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthHelper } from '../../../helpers/auth.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //atributos
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //contrutor para injeção de dependência
  constructor(
    private authHelper: AuthHelper
  ){}

  //função executada quando um componente é carregado
  ngOnInit() {
    //pegar os dados do usuário autenticado
    const usuario = this.authHelper.getUser();
    if(usuario != null) {
      this.isAuthenticated = true;
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;
    }
  }

  //função para realizar o logout do usuário
  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados gravados do usuário autenticado
      this.authHelper.signOut();
      //redirecionar para a página de autenticação
      location.href = '/pages/autenticar-usuario';
    }
  }

}
