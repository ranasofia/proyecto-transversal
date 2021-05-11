import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-super-fast',
  templateUrl: './catalogo-super-fast.component.html',
  styleUrls: ['./catalogo-super-fast.component.css']
})
export class CatalogoSuperFastComponent implements OnInit {
  title = 'Card View Demo';

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
