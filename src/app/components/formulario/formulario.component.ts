import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  perfiles = [];
  usuarios: Usuario[] = [];
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.perfiles = ['Cliente', 'Operador Fábrica', 'Administrador Sistema'];
    this.formValidations();
  }

  ngOnInit(): void {
  }

  btnGoLogin() {
    this.router.navigate(['login']);
  }

  private formValidations() {
    this.form = this.formBuilder.group({
      cedula: ['', [
        Validators.required
      ]],
      perfil: ['', [
        Validators.required
      ]],
      priNombre: ['', [
        Validators.required
      ]],
      segNombre: [''],
      priApellido: ['', [
        Validators.required
      ]],
      segApellido: [''],
      telefono: [''],
      email: ['', [
        Validators.required
      ]],
    });
  }

  crearUsuario() {
    console.log(this.form.get('cedula').value);
    const cedula = this.form.get('cedula').value;
    const perfil = this.form.get('perfil').value;
    const primerNombre = this.form.get('priNombre').value;
    const segundoNombre = this.form.get('segNombre').value;
    const primerApellido = this.form.get('priApellido').value;
    const segundoApellido = this.form.get('segApellido').value;
    const telefono = this.form.get('telefono').value;
    const email = this.form.get('email').value;

    const usuario: Usuario = { cedula, perfil, primerNombre, segundoNombre, primerApellido, segundoApellido,
    telefono, email};
    this.usuarios.push(usuario);

    console.log('Usuarios en el sistema:', this.usuarios.length);
    // tslint:disable-next-line: no-shadowed-variable
    for (const usuario of this.usuarios) {
      console.log(usuario);
    }

  }
}
