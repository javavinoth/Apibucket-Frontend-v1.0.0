import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO: Replace this with your own data model type
export interface ApiTableItem {
  id: number;
  apiName: string;
  apiDescription: string;
  apiUrl: string;
}

export interface ApiTableList {
  items: ApiTableItem[];
  total_count: number;
}

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: ApiTableItem[] = [
//   { id: 1, apiName: 'login', apiDescription: 'To users login', apiUrl: 'https://www.udemy.com/' },
//   { id: 2, apiName: 'signup', apiDescription: 'To users signup', apiUrl: 'https://www.youtube.com' }

// ];

/**
 * Data source for the ApiTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

@Component({
  selector: 'app-table-list',
  styleUrls: ['api-table.component.scss'],
  templateUrl: 'api-table.component.html'

})

export class ApiTableComponent implements OnInit {
  displayedColumns: string[] = ['apiName', 'apiDescription'];
  dataSource: MatTableDataSource<ApiTableItem>;

  data: ApiTableItem[] = [];
  exampleDatabase: ExampleHttpDao | null;
  constructor(private paginator: MatPaginator, private sort: MatSort, private http: HttpClient) {

  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  ngOnInit() {

    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ApiTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ApiTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ApiTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'apiName': return compare(a.apiName, b.apiName, isAsc);
        case 'apiDescription': return compare(+a.apiDescription, +b.apiDescription, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export class ExampleHttpDao {
  constructor(private http: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<ApiTableList> {
    // const url = 'http://35.154.133.131:8080/api/retrive';
    const url = 'http://localhost:8080/api/retrive';

    return this.http.get<ApiTableList>(url);
  }
}
