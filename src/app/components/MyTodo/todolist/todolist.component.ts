import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoArr } from './todo-data';
import { CutodoComponent } from '../cutodo/cutodo.component';

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
  TodoArr: any[] = [];
  Matrix: any[][];

  constructor(private dialog: MatDialog) {
    this.convertInto2DArray();
  }

  ngOnInit() {
    window.addEventListener('resize', this.getDimensions.bind(this));
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

    console.log('tasksssss', TodoArr);

    this.getDimensions();
  }

  getDivHeights() {
    let numRows = 0;
    let numCols = 0;
    const divElements = document.querySelectorAll('div#divElement');
    divElements.forEach((divElement, index) => {
      const divHeight = divElement.clientHeight;
      console.log('divHeight', divHeight);

      if (this.Matrix[numRows][numCols] == null) {
        return;
      }
      this.Matrix[numRows][numCols][0]['height'] = divHeight;
      numCols++;

      if (numCols > this.numCols) {
        numCols = 0;
        numRows++;
      }
    });

    let rows = this.Matrix.length;
    let cols = this.Matrix[0].length;

    // Traverse the matrix vertically
    for (let j = 0; j < cols; j++) {
      let height = 0;
      let width = (256 * j);
      for (let i = 0; i < rows; i++) {
        if (this.Matrix[i][j] == null) {
          break;
        }

        this.Matrix[i][j][0]['transform'] = `translate(${width}px, ${height}px)`;

        height += (this.Matrix[i][j][0]['height'] + 16);
      }
    }
    console.log('Matrixxxx', this.Matrix);
  }

  numRows: number;
  numCols: number;
  margin: string;
  getDimensions() {
    const screenWidth = window.innerWidth;
    const taskWidth = 260;
    const minTasksPerRow = 1;

    console.log('screenWidth', screenWidth);

    let tasksPerRow = Math.floor(screenWidth / taskWidth);
    tasksPerRow = Math.max(tasksPerRow, minTasksPerRow);

    this.numRows = Math.ceil(this.TodoArr.length / tasksPerRow);
    this.numCols = Math.min(this.TodoArr.length, tasksPerRow) - 1;

    console.log('screenWidth', this.numRows, this.numCols);

    let margin = (screenWidth - (256 * (this.numCols + 1))) / 2;
    this.margin = `0px ${margin}px`;

    this.Matrix = [];
    for (let i = 0; i < this.numRows; i++) {
      this.Matrix.push(this.TodoArr.slice(i * tasksPerRow, (i + 1) * tasksPerRow));
    }

    setTimeout(() => {
      this.getDivHeights();
    }, 1000);
  }

  FindMinumum(arr: any[]) {
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
