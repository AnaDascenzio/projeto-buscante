import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LivroComponent } from './livro/livro.component';
import { RodapeComponent } from './rodape/rodape.component';



@NgModule({
  declarations: [
    CabecalhoComponent,
    LivroComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
