import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CutodoComponent } from '../cutodo/cutodo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoArr } from './todo-data';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, MatDialogModule, MatCheckboxModule
  ],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @ViewChildren('divElement') divElements!: QueryList<ElementRef>;

  TodoArr: any[] = [];
  Matrix:any[][];

  constructor(private dialog: MatDialog) {
    this.convertInto2DArray();
  }

  convertInto2DArray() {
    this.TodoArr = TodoArr.map(item => [
      {
        title: item.title,
        transform: item.transform,
      },
      ...item.tasks.map((task, i) => {
        let obj = {
          task: task.task,
          id: i + 1
        };
        return obj;
      })
    ]);

    console.log('todoArrrrrr', this.TodoArr);
 
    this.getDimensions();
  }

  getDivHeights() {
    let numRows = 0;
    let numCols = 0;
    this.divElements.forEach((divElement, index) => {
      const divHeight = divElement.nativeElement.offsetHeight;
      // console.log(`Height of div ${index + 1}: ${divHeight}px`);

      // if (FirstRowCount <= 4) {
        // this.TodoArr[index][0]['transform'] = `translate(${(256) * ((index))}px, 0)`;
        // this.Matrix[numRows][numCols][0]['transform'] = `translate(${(256) * ((index))}px, 0)`;
        this.Matrix[numRows][numCols][0]['height'] = divHeight;
        numCols++;

        if(numCols > this.numCols) {
           numCols = 0;
           numRows++;
        }
      // } 
    });

    let rows = this.Matrix.length;
    let cols = this.Matrix[0].length;

    // Traverse the matrix vertically
    let heightArr = [];
    for (let j = 0; j < cols; j++) {
      let height = 0;
      let width = (256 * j);
      for (let i = 0; i < rows; i++) {
        this.Matrix[i][j][0]['transform'] = `translate(${width}px, ${height}px)`;        
        height += (this.Matrix[i][j][0]['height'] + 16);
      }
      heightArr.push(height);
    }

    console.log('heightArrrr', heightArr);
    let totalHeight = heightArr.reduce((acc, curr) => acc + curr, 0);
    let averageHeight = totalHeight / heightArr.length;

    for (let j = 0; j < cols; j++) {
      let height = 0;
      let width = (256 * j);
      for (let i = 0; i < rows; i++) {

        this.Matrix[i][j][0]['transform'] = `translate(${width}px, ${height}px)`;
        height += (this.Matrix[i][j][0]['height'] + 16);
      }
    }

    console.log('Matrixxxx', this.Matrix);
  }
  
  FindMinumum(arr:any[]) {
    let min = arr[0];
    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
        minIndex = i;
      }
    }
    return minIndex;
  }

  numRows:number;
  numCols:number;
  getDimensions() {
    const screenWidth = window.innerWidth;
    const taskWidth = 300;
    const minTasksPerRow = 1;

    let tasksPerRow = Math.floor(screenWidth / taskWidth);
    tasksPerRow = Math.max(tasksPerRow, minTasksPerRow);

    this.numRows = Math.ceil(this.TodoArr.length / tasksPerRow);
    this.numCols = Math.min(this.TodoArr.length, tasksPerRow) - 1;

    this.Matrix = [];
    for (let i = 0; i < this.numRows; i++) {
      this.Matrix.push(this.TodoArr.slice(i * tasksPerRow, (i + 1) * tasksPerRow));
    }
    
    setTimeout(() => {
      this.getDivHeights();
    }, 1000);
    console.log('Matrixxxxxxxx', this.Matrix);
    // return { numRows, numCols };
  }

  addTodo(mode: string) {
    const dialogRef = this.dialog.open(CutodoComponent, {
      restoreFocus: false,
      autoFocus: true,
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe();
  }
}
