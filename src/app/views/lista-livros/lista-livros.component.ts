import { Component, OnDestroy } from '@angular/core';
import { LivroService } from '../../service/livro.service';
import { Subscription } from 'rxjs';
import { Item, Livro } from '../../models/interfaces';
import { LivroVolumeInfo } from '../../models/livroVolumeInfo';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[] = [];

  campoBusca: string = '';
  subscription!: Subscription;
  livro!: Livro;

  constructor(
    private service: LivroService
  ) { }
 

  buscarLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe(
     {
      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items)
      },
      error: erro => console.error(erro),
    }
    )
  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}




