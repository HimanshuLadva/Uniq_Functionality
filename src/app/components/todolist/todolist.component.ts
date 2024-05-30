import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CutodoComponent } from '../cutodo/cutodo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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

  TodoArr = [
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
        { task: "Read Coding Book" },
        { task: "Write an essay" },
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
        { task: "Take a Tour" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Read Coding Book" },
        { task: "Write an essay" },
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
        { task: "Read Coding Book" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
        { task: "Read Coding Book" },
        { task: "Write an essay" },
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
      ],
    },
    {
      title: "Today List",
      tasks: [
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
        { task: "Meet Sanjay" },
        { task: "Read Coding Book" },
        { task: "Write an essay" },
        { task: "Call Meeting" },
        { task: "Grossary Buy" },
        { task: "Take a Tour" },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

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
