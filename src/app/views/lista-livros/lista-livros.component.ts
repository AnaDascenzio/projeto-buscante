import { Component, OnDestroy } from '@angular/core';
import { LivroService } from '../../service/livro.service';
import { Subscription, catchError, debounceTime, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro, LivrosResultado } from '../../models/interfaces';
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
  livrosResultado!: LivrosResultado;
  constructor(
    private service: LivroService
  ) { }

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado)=> valorDigitado.length >= 3 ),
    tap(()=> console.log('fluxo inicial')),
    switchMap((valorDigitado)=> this.service.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado),
    catchError(erro => {
      console.log(erro)
      return of()
    })
    )
 
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado)=> valorDigitado.length >= 3 ),
    tap(()=> console.log('fluxo inicial')),
    switchMap((valorDigitado)=> this.service.buscar(valorDigitado)),
    tap(()=> console.log('requisição ao servidor')),
    map(resultado => resultado.items ?? []),
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




