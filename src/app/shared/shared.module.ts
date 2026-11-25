import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FilterPipe } from './filter.pipe';
import { HighlightDirective } from './highlight.directive';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FilterPipe, HighlightDirective, HeaderComponent],
  exports: [FilterPipe, HighlightDirective, HeaderComponent]
})
export class SharedModule { }
