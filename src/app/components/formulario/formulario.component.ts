import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  perfiles = [];

  constructor(
    private router: Router,
  ) {
    this.perfiles = ['Cliente', 'Operador Fábrica', 'Administrador Sistema'];
  }

  ngOnInit(): void {
  }

  btnGoLogin() {
    this.router.navigate(['login']);
  }
}
