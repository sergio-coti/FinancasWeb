import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthHelper {

    //atributos
    key: string = 'financasapp-auth';

    //método para gravar os dados do usuário
    //autenticado na local storage
    signIn(data: any) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    //método para consultar os dados do usuário
    //autenticado na local storage
    getUser() {
        let data = localStorage.getItem(this.key);
        if(data != null) {
            return JSON.parse(data);
        }

        return null;
    }

    //método para apagar os dados que estão
    //gravados na local storage
    signOut() {
        localStorage.removeItem(this.key);
    }
}