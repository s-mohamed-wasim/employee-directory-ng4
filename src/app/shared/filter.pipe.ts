import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filters a list of objects by a search term across the given fields.
 * NOTE: impure pipe - runs on every change detection cycle.
 */
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string, fields: string[]): any[] {
    if (!items || !term) {
      return items;
    }
    const lower = term.toLowerCase();
    return items.filter(item =>
      fields.some(f => String(item[f] || '').toLowerCase().indexOf(lower) > -1)
    );
  }
}
