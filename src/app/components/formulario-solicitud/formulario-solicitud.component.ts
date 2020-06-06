import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/Producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.scss']
})
export class FormularioSolicitudComponent implements OnInit {
  nombreProducto = [];
  tipoPresentacion = [];
  orden: Producto[] = [];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.nombreProducto = ['Manzana', 'Naranja', 'Uva', 'Kola', 'Limonada'];
    this.tipoPresentacion = ['240', '350', '500', '600', '1000'];
    this.formValidations();

   }

  ngOnInit(): void {
  }

  private formValidations() {
    this.form = this.formBuilder.group({
      nombreProducto: ['', [
        Validators.required
      ]],
      tipoPresentacion: ['', [
        Validators.required
      ]],
      cantidad: ['', [
        Validators.required
      ]]
    });

  }

}
