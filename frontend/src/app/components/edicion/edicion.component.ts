import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.scss']
})
export class EdicionComponent implements OnInit {
  form: FormGroup;
  urlBuscar = 'http://localhost:8002/buscar/';
  urlBorrar = 'http://localhost:8002/borrar/';
  urlEditar = 'http://localhost:8002/editar/';
  campoRequerido = 'Campo requerido';
  btnControles = true;
  stEnableInfoUsuario = false;
  paises = [];
  tipoIdentificacion = [];
  areas = [];
  pais = 'Selecciona';
  tipoId = 'Selecciona';
  area = 'Selecciona';

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.formValidations();
    this.paises = ['COLOMBIA', 'ESTADOS UNIDOS'];
    this.areas = ['ADMINISTRACIÓN', 'COMPRAS', 'DISEÑO', 'FINANCIERA', 'INFRAESTRUCTURA', 'MERCADEO',
      'OPERACIÓN', 'SERVICIOS VARIOS', 'TALENTO HUMANO', 'SOPORTE'];
    this.tipoIdentificacion = ['CÉDULA CIUDADANIA', 'CÉDULA EXTRANJERIA', 'PASAPORTE', 'PERMISO ESPECIAL'];
  }

  ngOnInit(): void {
  }

  goToConsulta() {
    this.router.navigate(['']);
  }

  private formValidations() {
    this.form = this.formBuilder.group({
      cedula: ['', [
        Validators.required
      ]],

      primerApellido: [''],
      segundoApellido: [''],
      primerNombre: [''],
      segundoNombre: [''],
      pais: [''],
      tipoIdentificacion: [''],
      numeroIdentificacion: [''],
      fechaIngreso: [''],
      area: [''],
    });
  }

  getColaborador() {
    if (this.form.valid) {
      this.btnControles = false;
      const dni = this.form.get('cedula').value;
      console.log(dni);
      this.http.get(`${this.urlBuscar}${dni}`)
        .subscribe((usuario: Usuario) => {
          console.log(usuario);
          if (usuario === null) {
            Swal.fire({
              title: '¡Colaborador no encontrado!',
              icon: 'warning',
            });
          } else {
            this.stEnableInfoUsuario = true;
            this.pais = usuario.pais;
            this.tipoId = usuario.tipoIdentificacion;
            this.area = usuario.area;
            this.form.patchValue({
              primerApellido: usuario.primerApellido,
              segundoApellido: usuario.segundoApellido,
              primerNombre: usuario.primerNombre,
              segundoNombre: usuario.segundoNombre,
              numeroIdentificacion: usuario.numeroIdentificacion,
              fechaIngreso: usuario.fechaIngreso,
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

  deleteColaborador() {
    const cedula = this.form.get('cedula').value;
    Swal.fire({
      title: 'Confirmar eliminación.',
      text: `¿Está seguro que desea eliminar el colaborador con cédula: ${cedula}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(cedula);
        this.http.delete(`${this.urlBorrar}${cedula}`)
          .subscribe((respuesta: boolean) => {
            if (respuesta) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Usuario eliminado con éxito!',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
        this.goToConsulta();
      }
    });

  }

  editarColaborador() {
    const cedula = this.form.get('cedula').value;
    this.http.get(`${this.urlBuscar}${cedula}`)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((usuario: Usuario) => {
        console.log(usuario);
        const primerApellido = this.form.get('primerApellido').value;
        const segundoApellido = this.form.get('segundoApellido').value;
        const primerNombre = this.form.get('primerNombre').value;
        const segundoNombre = this.form.get('segundoNombre').value;

        const pais = this.form.get('pais').value === '' ? usuario.pais : this.form.get('pais').value;
        const tipoIdentificacion = this.form.get('tipoIdentificacion').value === '' ? usuario.tipoIdentificacion :
          this.form.get('tipoIdentificacion').value;
        const area = this.form.get('area').value === '' ? usuario.area : this.form.get('area').value;

        const numeroIdentificacion = this.form.get('numeroIdentificacion').value;
        const fechaIngreso = this.form.get('fechaIngreso').value;
        const estado = 'Activo';
        const correo = usuario.correo;

        const col: Usuario = {
          primerApellido, segundoApellido, primerNombre, segundoNombre, pais, tipoIdentificacion, numeroIdentificacion,
          fechaIngreso, area, estado, correo
        };
        console.log(col);
        this.http.put(`${this.urlEditar}${cedula}`, col)
          .subscribe((data: any) => {
            console.log(data);
            if (data) {
              console.log('entra subscribe');
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Usuario editado con éxito!',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
        this.goToConsulta();

      });



    // Swal.fire({
    //   title: 'Confirmar edición.',
    //   text: '¿Está seguro que desea realizar las modificaciones?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'SI',
    //   cancelButtonText: 'NO'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     console.log('entra confirmación swal');
    //     console.log(this.urlEditar, usuario);
    //     this.http.put(`${this.urlEditar}${cedula}`, usuario)
    //       .subscribe((data: any) => {
    //         console.log(data);
    //         if (data) {
    //           console.log('subscribe');
    //           Swal.fire({
    //             position: 'center',
    //             icon: 'success',
    //             title: '¡Usuario editado con éxito!',
    //             showConfirmButton: false,
    //             timer: 2000
    //           });
    //         }
    //       });
    //     this.goToConsulta();
    //   }
    // });
  }
}
