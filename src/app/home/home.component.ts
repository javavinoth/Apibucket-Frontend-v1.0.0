import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ApiService } from '../services/api.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  // data: ApiTableItem[] = [
  //   { apiName: 'Nitrogen', apiDescription: 'hi', apiUrl: 'H' },
  //   { apiName: 'Hydrogen', apiDescription: 'hi', apiUrl: 'H' },

  // ];

  dataSource: MatTableDataSource<ApiTableItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    console.log('******** HomeComponent *******')
    // this.dataSource.paginator = this.paginator;
    this.apiService.getApiList()
      .subscribe(response => {

        this.dataSource = new MatTableDataSource<ApiTableItem>(response);
      });

  }

  goCNN()
{
 
  window.location.href='https://youtube.com';
}

}
export interface ApiTableItem {
  id?: number;
  apiName: string;
  apiDescription: string;
  apiUrl: string;

}

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}