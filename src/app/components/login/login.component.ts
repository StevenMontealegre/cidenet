import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  btnGoFormulario() {
    this.router.navigate(['formulario']);
  }
  btnGoFormularioSolicitud() {
    this.router.navigate(['solicitud']);
  }
}
