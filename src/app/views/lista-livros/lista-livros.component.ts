import { Component, OnDestroy } from '@angular/core';
import { LivroService } from '../../service/livro.service';
import { Subscription, catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro } from '../../models/interfaces';
import { LivroVolumeInfo } from '../../models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{


  campoBusca:  FormControl = new FormControl();
  mensagemErro = '';

  constructor(
    private service: LivroService
  ) { }
 
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado)=> valorDigitado.length >= 3 ),
    tap(()=> console.log('fluxo inicial')),
    switchMap((valorDigitado)=> this.service.buscar(valorDigitado)),
    tap(()=> console.log('requisição ao servidor')),
    map(items =>  this.livrosResultadoParaLivros(items)),
    catchError(erro =>{
      console.log(erro)
      return throwError(()=> new Error(
        this.mensagemErro = 'Ops, ocorreu um erro...'
        ))
    })
  )


  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

}




