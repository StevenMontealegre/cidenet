import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
@Injectable()
export class ConsultaComponent implements OnInit {

  form: FormGroup;
  configUrl = 'http://localhost:8002/listar';
  urlFiltrar = 'http://localhost:8002/filtrar';
  colaboradores = [];
  source = [];
  p = 'page';
  paises = [];
  tipoIdentificacion = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    this.getColaboradores();
    this.formValidations();
    this.paises = ['COLOMBIA', 'ESTADOS UNIDOS'];
    this.tipoIdentificacion = ['CÉDULA CIUDADANIA', 'CÉDULA EXTRANJERIA', 'PASAPORTE', 'PERMISO ESPECIAL'];
  }

  ngOnInit(): void {
  }

  getColaboradores() {
    this.http.get(this.configUrl)
      .subscribe((colaboradores: []) => {
        this.colaboradores = colaboradores;
      },
        err => console.log(err)
      );
  }

  private formValidations() {
    this.form = this.formBuilder.group({
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      pais: [''],
      tipoIdentificacion: [''],
      numeroIdentificacion: [''],
      estado: ['']
    });
  }

  getFilter() {
    const filter = {
      primerApellido: this.form.get('primerApellido').value,
      segundoApellido: this.form.get('segundoApellido').value,
      primerNombre: this.form.get('primerNombre').value,
      segundoNombre: this.form.get('segundoNombre').value,
      pais: this.form.get('pais').value,
      tipoIdentificacion: this.form.get('tipoIdentificacion').value,
      numeroIdentificacion:  this.form.get('numeroIdentificacion').value,
    };

    console.log(filter);
    this.http.post(this.urlFiltrar, filter)
    .subscribe((respuesta: any) => {
      console.log(respuesta);
      if (respuesta != null) {
        this.colaboradores = respuesta;
      }

    });
  }

  goToRegistro() {
    this.router.navigate(['/nuevo']);
  }

  goToEdicion() {
    this.router.navigate(['/edicion']);
  }
}
