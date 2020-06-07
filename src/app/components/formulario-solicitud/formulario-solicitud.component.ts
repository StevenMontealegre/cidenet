import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/Producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router,
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

  agregarProductosAOrden() {
    console.log('entra');
    const nombre = this.form.get('nombreProducto').value;
    const presentacion = this.form.get('tipoPresentacion').value;
    const cantidad = this.form.get('cantidad').value;
    const producto = {nombre, presentacion, cantidad};
    this.orden.push(producto);
    console.log('Cantidad de productos en la orden:', this.orden.length);
    for (const product of this.orden) {
      console.log(product);
    }
  }

  enviarOrden() {
    console.log('entra swal');
    Swal.fire( 'Sistema de solicitudes ',
      '¡Su orden se ha procesado con éxito!', 'success');
    this.orden = null;
    this.form.patchValue({ nombreProducto: ''});
    this.form.patchValue({tipoPresentacion: ''});
    this.form.patchValue({cantidad: ''});
  }

  cancelarOrden() {
    this.router.navigate(['']);
  }

}
