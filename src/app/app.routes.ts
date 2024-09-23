import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';
import { CadastrarCategoriasComponent } from './components/pages/cadastrar-categorias/cadastrar-categorias.component';
import { ConsultarCategoriasComponent } from './components/pages/consultar-categorias/consultar-categorias.component';
import { CadastrarContasComponent } from './components/pages/cadastrar-contas/cadastrar-contas.component';
import { ConsultarContasComponent } from './components/pages/consultar-contas/consultar-contas.component';
import { EditarCategoriasComponent } from './components/pages/editar-categorias/editar-categorias.component';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'pages/cadastrar-categorias',
        component: CadastrarCategoriasComponent
    },
    {
        path: 'pages/consultar-categorias',
        component: ConsultarCategoriasComponent
    },
    {
        path: 'pages/cadastrar-contas',
        component: CadastrarContasComponent
    },
    {
        path: 'pages/consultar-contas',
        component: ConsultarContasComponent
    },
    {
        path: 'pages/editar-categorias/:id',
        component: EditarCategoriasComponent
    },
    {
        path: '', //rota raiz do projeto
        pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];
