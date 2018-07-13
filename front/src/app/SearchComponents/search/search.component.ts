import { Component, OnInit } from '@angular/core';
import { Search } from '../../models/search';
import { SearchService } from '../../Services/search.service';
import { NouisliderModule } from 'ng2-nouislider';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: Search;

  difficulties = ['★', '★★', '★★★', '★★★★', '★★★★★'];
  dishtypes = ['Entrée', 'Plat', 'Dessert', 'Apéro', 'Snack', 'Boisson'];
  countries = ['Allemagne', 'France', 'Italie', 'Israel', 'Chine', 'Japon', 'Mexique',
    'Chili', 'Brésil', 'Espagne', 'Portugal', 'Grece', 'Roumanie'];

  diffChecks: boolean[];

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.search = new Search('', [0, 180], ['★', '★★', '★★★', '★★★★', '★★★★★'], '', '');
    this.diffChecks = [true, true, true, true, true];
  }

  reactToInput(): void {
    console.log('lel');
  }

  searchDone(): void {
    this.searchService.sendSearch(this.search);
  }

  checkboxClick(checked: boolean, value: number): void {
    let str = '';
    if (checked) {
      for (let i = 0; i < value; i++) {
        str += '★';
      }
      this.search.difficulty[value - 1] = str;
    } else {
      this.search.difficulty[value - 1] = '';
    }
    console.log(str);
  }

}
