import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class TableComponent {
  // displayedColumns: string[] = ['id', 'name', 'detail', 'email'];
  @Input() dataSource: any[] = [];
  columnNames: any[] = [];

  ngOnInit() {
    console.log('displaydataa', this.dataSource);
    this.columnNames = Object.keys(this.dataSource[0]);
    this.columnNames = this.columnNames.filter((ele: string) => !ele.endsWith('Id'));
    console.log('displaydataa', this.columnNames);
  }
}
