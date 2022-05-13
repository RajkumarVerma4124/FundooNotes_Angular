import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchString: string) {
    if (!searchString) {
      return value;
    }
    const searchNoteRes = [];
    for (let note of value) {
      if (note.title.toLocaleLowerCase().includes(searchString) || note.description.toLocaleLowerCase().includes(searchString)) {
        searchNoteRes.push(note);
      }
    }
    return searchNoteRes;
  }
}
