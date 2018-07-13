import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { Search } from '../../models/search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  search: Search;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.search = new Search('', [0, 180], ['★', '★★', '★★★', '★★★★', '★★★★★'], '', '');
  }

  searchDone(): void {
    this.searchService.sendSearch(this.search);
    this.router.navigate(['/searchResults'], { queryParams: { name: this.search.name } });
  }

}
