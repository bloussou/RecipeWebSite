import { Component, OnInit, OnChanges } from '@angular/core';
import { SearchService } from '../search.service';
import { Recette } from '../recette';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-display',
  templateUrl: './search-display.component.html',
  styleUrls: ['./search-display.component.css']
})
export class SearchDisplayComponent implements OnInit {

  recipes: Recette[];

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSearchResults();
    this.recipes = new Array();
    this.route.queryParams.subscribe(param => {
      console.log(param);
      this.getSearchResults();
  });

  }

  getSearchResults() {
    this.searchService.getSearchResults()
        .subscribe(
          (val) => {
            console.log('DEL call successful value returned in body', val);
            this.recipes = val;
          },
          response => {
              console.log('DEL call in error', response);
          },
          () => {
              console.log('The DEL observable is now completed.');
          }
        );
  }

}
