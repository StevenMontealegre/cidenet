import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  paises = [];
  tipoIdentificacion = [];
  areas = [];
  usuarios: Usuario[] = [];
  form: FormGroup;
  fechaHoy = '';
  urlSave = 'http://localhost:8002/guardar';
  urlConsulta = 'http://localhost:8002/buscar/';
  urlCorreo = 'http://localhost:8002/findByCorreo/';
  campoRequerido = 'Campo requerido';
  correo: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.paises = ['COLOMBIA', 'ESTADOS UNIDOS'];
    this.areas = ['ADMINISTRACIÓN', 'COMPRAS', 'DISEÑO', 'FINANCIERA', 'INFRAESTRUCTURA', 'MERCADEO',
      'OPERACIÓN', 'SERVICIOS VARIOS', 'TALENTO HUMANO', 'SOPORTE'];
    this.tipoIdentificacion = ['CÉDULA CIUDADANIA', 'CÉDULA EXTRANJERIA', 'PASAPORTE', 'PERMISO ESPECIAL'];
    this.formValidations();
  }

  ngOnInit(): void {
    this.fechaHoy = this.fechaActual();
    console.log(this.fechaActual());
    console.log(this.fechaHoy);
  }

  btnGoLogin() {
    this.router.navigate(['login']);
  }

  fechaActual() {
    const fecha = new Date();
    const today = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`;
    return today;
  }

  private formValidations() {
    this.form = this.formBuilder.group({
      primerApellido: ['', [
        Validators.required
      ]],
      segundoApellido: [''],
      primerNombre: ['', [
        Validators.required
      ]],
      segundoNombre: [''],
      pais: ['', [
        Validators.required
      ]],
      tipoIdentificacion: ['', [
        Validators.required
      ]],
      numeroIdentificacion: ['', [
        Validators.required
      ]],
      fechaIngreso: ['', [
        Validators.required
      ]],
      area: ['', [
        Validators.required
      ]],
    });
  }

  crearUsuario() {

    const primerApellido = this.form.get('primerApellido').value;
    const segundoApellido = this.form.get('segundoApellido').value;
    const primerNombre = this.form.get('primerNombre').value;
    const segundoNombre = this.form.get('segundoNombre').value;
    const pais = this.form.get('pais').value;
    const tipoIdentificacion = this.form.get('tipoIdentificacion').value;
    const numeroIdentificacion = this.form.get('numeroIdentificacion').value;
    const fechaIngreso = this.form.get('fechaIngreso').value;
    const estado = 'Activo';
    const area = this.form.get('area').value;
    let correo = '';
    if (this.form.valid) {
      if (pais === 'COLOMBIA') {
        const mail = `${primerNombre}.${primerApellido}@cidenet.com.co`;
        this.http.get(`${this.urlCorreo}${mail}`)
          .subscribe((valor: number) => {
            const id = valor;
            if (id !== 0) {
              correo = `${primerNombre}.${primerApellido}.${id}@cidenet.com.co`;
              const usuario: Usuario = {
                primerApellido, segundoApellido, primerNombre, segundoNombre, pais, tipoIdentificacion, numeroIdentificacion,
                fechaIngreso, estado, correo, area
              };
              this.saveColaborador(usuario);
            } else {
              correo = mail;
              const usuario: Usuario = {
                primerApellido, segundoApellido, primerNombre, segundoNombre, pais, tipoIdentificacion, numeroIdentificacion,
                fechaIngreso, estado, correo, area
              };
              this.saveColaborador(usuario);
            }
          },
            (err: any) => {
              console.log(err);
            });
      } else {
        const mail = `${primerNombre}.${primerApellido}@cidenet.com.us`;
        this.http.get(`${this.urlCorreo}${mail}`)
          .subscribe((valor: number) => {
            const id = valor;
            if (id !== 0) {
              correo = `${primerNombre}.${primerApellido}.${id}@cidenet.com.us`;
              const usuario: Usuario = {
                primerApellido, segundoApellido, primerNombre, segundoNombre, pais, tipoIdentificacion, numeroIdentificacion,
                fechaIngreso, estado, correo, area
              };
              this.saveColaborador(usuario);
            } else {
              correo = mail;
              const usuario: Usuario = {
                primerApellido, segundoApellido, primerNombre, segundoNombre, pais, tipoIdentificacion, numeroIdentificacion,
                fechaIngreso, estado, correo, area
              };
              this.saveColaborador(usuario);
            }
          },
            (err: any) => {
              console.log(err);
            });
      }
    } else {
      Swal.fire({
        title: '¡Campos no válidos!',
        text: 'Por favor diligencie los campos requeridos.',
        icon: 'error',
      });
    }

  }

  goToRegistro() {
    this.router.navigate(['']);
  }

  saveColaborador(usuario: Usuario) {
    if (this.form.valid) {
      this.http.post(this.urlSave, usuario)
        .subscribe((serverResponse) => {
          if (serverResponse !== null) {
            Swal.fire({
              title: '¡Registro exitoso!',
              icon: 'success',
            });
            this.goToRegistro();
          } else {
            Swal.fire({
              title: '¡El colaborador ya se encuentra registrado!',
              icon: 'warning',
            });
          }
        },
          (err: any) => {
            console.log(err);
          });
    } else {
      Swal.fire({
        title: '¡Campos no válidos!',
        text: 'Por favor diligencie los campos requeridos.',
        icon: 'error',
      });
    }
  }
}
