import { Component, ChangeDetectorRef, NgModule, } from "@angular/core";
import { FrmAddTodoComponent } from "../frmAddTodo/frmAddTodo.component";
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { CDATA } from "src/app/data/cdata";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, NgModel } from "@angular/forms";

@Component({
  selector: 'app-frm-todo-list',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, FrmAddTodoComponent,MatIconModule,MatCheckboxModule,FormsModule
  ],
  templateUrl: './frmTodoList.component.html',
  styleUrls: ['./frmTodoList.component.scss'],
})
export class FrmTodoListComponent {
  TodoArr: any[] = [];
  IsDeleteBtnReq = false;
  private saveSubject = new Subject<any>();

  constructor(private dialog: MatDialog) {
    this.LoadData();
   }

  AddTodoList(item: any = null) {
    console.log('AddTodoList', item);
    const dialogRef = this.dialog.open(FrmAddTodoComponent, {
      autoFocus: true,
      disableClose: true,
      restoreFocus: true,
      width: '550px',
      data: item
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res == true) {
        this.TodoArr = [];
        this.LoadData();
      }
    });
  }

  ngOnInit() {
    window.addEventListener('resize', this.getDimensions.bind(this));
  }

  OnDelete(item: any) { }

  LoadData() {
    let arr: any[] = CDATA;
    for (let item of arr) {
      if (Array.isArray(item.tasks)) {
        item.tasks.sort((a, b) => {
          if (a['IsCompleted'] > b['IsCompleted']) {
            return 1;
          }
          if (a['IsCompleted'] < b['IsCompleted']) {
            return -1;
          }
          return 0;
        })
      }
      let obj = {
        // title: item.tasks[0]['Header'],
        tasks: item.tasks
      }

      obj.tasks[0].title = item.tasks[0]['Header'];

      this.TodoArr.push(obj);
    }
    this.convertInto2DArray();
  }

  convertInto2DArray() {
    this.TodoArr = this.TodoArr.map(item => [
      // {
      //   title: item.title,
      //   transform: item.transform,
      // },
      ...item.tasks.map((task, i) => {
        task.transform = item.transform;
        return task;
      })
    ]);

    this.getDimensions();
  }

  numRows: number;
  numCols: number;
  margin: string;
  Matrix:any[] = [];
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
      // this.Matrix[numRows][numCols][0]['height'] = divHeight;
      this.Matrix[numRows][numCols].forEach(ele => ele['height'] = divHeight);
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

        this.Matrix[i][j].forEach(ele => ele['transform'] = `translate(${width}px, ${height}px)`);
        // this.Matrix[i][j][0]['transform'] = `translate(${width}px, ${height}px)`;

        height += (this.Matrix[i][j][0]['height'] + 16);
      }
    }
    console.log('Matrixxxx', this.Matrix);
  }


  editTodoList(parentIndex: number, childIndex: number,cindex:number, IsCompleted: boolean) {
    debugger
    let current = this.Matrix[parentIndex][childIndex][cindex];
    current.IsCompleted = IsCompleted;

    this.Matrix[parentIndex][childIndex].sort((a, b) => {
      if (a['IsCompleted'] > b['IsCompleted']) {
        return 1;
      }
      if (a['IsCompleted'] < b['IsCompleted']) {
        return -1;
      }
      return 0;
    })

    console.log('this.dTTTTTTTTTTTT', this.TodoArr);
    this.saveSubject.next(current);
  }
}
