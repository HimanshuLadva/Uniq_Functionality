import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-cutodo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './cutodo.component.html',
  styleUrls: ['./cutodo.component.scss'],
})
export class CutodoComponent {

  TodoArr: string[] = [
    "Call Meeting",
    "Grossary Buy",
    "Take a Tour",
    "Meet Sanjay",
    "Read Coding Book",
    "Write a essay",
    "Call Meeting",
    "Grossary Buy",
    "Take a Tour"
  ];
  constructor(public dialogRef: MatDialogRef<CutodoComponent>) {}

  AddTodoInList(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.TodoArr.push("Demo 123");
    }
  }
}
