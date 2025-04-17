import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../../services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.listarClientes().subscribe((dados: Cliente[]) => {
      this.clientes = dados;
    });    
  }
}
