import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-correcao-modal',
  templateUrl: './correcao-modal.component.html',
  styleUrls: ['./correcao-modal.component.css']
})
export class CorrecaoModalComponent implements OnInit {

  @Input() lista: any;
  @Input() atividadeNome: any;
  public notas = new Array();

  constructor(
    public modalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.somaNotas();
  }

  public somaNotas() {
    for (const aluno of this.lista) {
      let nota = 0;
      aluno.forEach(element => {
        if (element.nota) {
          nota += element.nota;
        }
      });
      this.notas.push(nota);
    }
  }

}
