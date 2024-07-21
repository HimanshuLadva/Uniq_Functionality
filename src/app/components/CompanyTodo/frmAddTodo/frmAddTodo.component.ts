import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from "@angular/core";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { EditableDivComponent } from '../editablediv/editablediv';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-frm-add-todo',
  standalone: true,
  imports: [
    CommonModule,MatIconModule,MatCheckboxModule,EditableDivComponent,MatButtonModule,MatDialogModule,FormsModule
  ],
  templateUrl: './frmAddTodo.component.html',
  styleUrls: ['./frmAddTodo.component.scss'],
})
export class FrmAddTodoComponent {
  Todos: any[] = [];
  Header: any = "";
  HeaderPlaceHolder: string = "Title";
  TodoValue: string = "";

  constructor(public dialogRef: MatDialogRef<FrmAddTodoComponent>, @Inject(MAT_DIALOG_DATA) public data: any[] = []) {
  }

  ngOnInit() {
    if (this.data.length != 0) {
      this.Header = this.data[0].Header;
      let data: any[] = JSON.parse(JSON.stringify(this.data));
      data.forEach(ele => {
        ele['isFocused'] = false;
        ele['isHovered'] = false;
      })
      this.Todos = data.filter(ele => ele['IsCompleted'] == false);
      this.CompletedTodos = data.filter(ele => ele['IsCompleted'] == true);
    }

  }

  ngOnDestroy() {
  }

  onFocus(item: any, isFocused: Event): void {
    console.log('itemssssss', item, isFocused);
    item.isFocused = true;
  }

  onBlur(itme:any, event:Event) {
     itme.isFocused = false;
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault();
      setTimeout(() => {
        document.getElementById('AddTodo').focus();
      }, 0);
      this.AddTodoInList(event, this.TodoValue);
    }
  }

  MovoTodo() {
    document.getElementById('AddTodo').focus();
    this.TodoValue = "";
  }

  AddTodoInList(event: KeyboardEvent, Todo: any) {
    if (event.key == 'Enter') {

      event.preventDefault();
      console.log('eventttttttttttt', event, Todo);
      this.Todos.push({
        id: 0,
        FieldValue: this.TodoValue,
        isFocused: false
      })

      Todo = "";
      this.TodoValue = "";
      setTimeout(() => {
        document.getElementById('Todolist').focus();
      }, 0);
    }
  }

  RemoveTodoFromList(Id: number) {
    this.Todos = this.Todos.filter(ele => ele['Id'] != Id);
  }

  CompletedTodos: any[] = [];
  ToggleCheckBox(item: any) {
    console.log('itemmmmmmmmmmmmmmmm', item);
    item.IsCompleted = parseInt(item.IsCompleted);
    item.IsCompleted = item.IsCompleted == 0 ? 1 : 0;
    item.isFocused = !item.isFocused;
    item.isHovered = !item.isHovered;

    if (item.IsCompleted == 1) {
      this.Todos = this.Todos.filter(ele => ele['Id'] != item['Id']);
      this.CompletedTodos.push(item);
    } else {
      this.CompletedTodos = this.CompletedTodos.filter(ele => ele['Id'] != item['Id']);
      this.Todos.push(item);
    }
  }

  OnClose(IsSave: boolean = false) {
    this.dialogRef.close(IsSave);
  }
  Reset() {

  }
 }
