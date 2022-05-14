import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(noteFilterData: any, searchString: string) {
    if (!searchString) {
      return noteFilterData;
    }
    return noteFilterData.filter((x: any) => x.title.toLocaleLowerCase().includes(searchString)
      || x.description.toLocaleLowerCase().includes(searchString)
    );
  }
}
