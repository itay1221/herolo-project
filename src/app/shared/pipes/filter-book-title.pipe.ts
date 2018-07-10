import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBookTitle'
})
export class FilterBookTitlePipe implements PipeTransform {

    transform(value: string): string {
        return this.changeFirstLetterToUpperCase(this.filterNonEnglishLetters(value));
    }

    private filterNonEnglishLetters(text : string) : string{
        return text.replace(/[^\w\s]/gi, '');
    }

    private changeFirstLetterToUpperCase(text : string) : string{
        return text.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
