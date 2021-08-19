export class LoginUsuario {
    nombreUsuario: string; //igual de escrito que el nombre en la Api
    password: string;
    constructor(nombreUsuario: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
