import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-userdeptwise',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
     <button (click)='LoadData([2])'>Load Data</button>
     <div *ngFor="let user of users">{{user.UserName}}</div>
  `,
  styleUrls: ['./userdeptwise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserdeptwiseComponent {
   users: any[] = [
      {
         UserName: 'Admin',
         DepartmentName: 'Admin',
         DepartmentId: 1
      },
      {
         UserName: 'Associate',
         DepartmentName: 'Associate',
         DepartmentId: 2
      },
      {
         UserName: 'Computer',
         DepartmentName: 'Computer',
         DepartmentId: 3
      },
      {
         UserName: 'Electrical',
         DepartmentName: 'Electrical',
         DepartmentId: 4
      },
      {
         UserName: 'Mechanical',
         DepartmentName: 'Mechanical',
         DepartmentId: 5
      },
      {
         UserName: 'Computer-Lab',
         DepartmentName: 'Computer-Lab',
         DepartmentId: 6
      },
      {
         UserName: 'Electrical-Lab',
         DepartmentName: 'Electrical-Lab',
         DepartmentId: 7
      },
      {
         UserName: 'Mechanical-Lab',
         DepartmentName: 'Mechanical-Lab',
         DepartmentId: 8
      },
   ];

   deparments:any[] = [
      {
       Id: 1,
       DepartmentName: 'Admin',
       ParentDepartmentId: 0
      },
      {
        Id: 2,
        DepartmentName: 'Associate',
       ParentDepartmentId: 1
      },
      {
        Id: 3,
        DepartmentName: 'Computer',
       ParentDepartmentId: 2
      },
      {
        Id: 4,
        DepartmentName: 'Electrical',
       ParentDepartmentId: 2
      },
      {
        Id: 5,
        DepartmentName: 'Mechanical',
       ParentDepartmentId: 2
      },
      {
        Id: 6,
        DepartmentName: 'Computer-Lab',
       ParentDepartmentId: 3
      },
      {
       Id: 7,
        DepartmentName: 'Electrical-Lab',
       ParentDepartmentId: 4
      },
      {
        Id: 8,
        DepartmentName: 'Mechanical-Lab',
       ParentDepartmentId: 5
      },
   ]

   subDepts:any[] = [];
  LoadData(FindDepartmentId: number[]) {
    //  Associate
    // debugger;
    let data: any[] = this.deparments.filter(ele => FindDepartmentId.findIndex(ele1 => ele1 == ele.ParentDepartmentId) != -1).map(ele => ele['Id']);
    
    if(data.length == 0) {
      this.users = this.users.filter(ele => this.subDepts.findIndex(ele1 => ele1 == ele['DepartmentId']) != -1);
       return;
    }

    this.subDepts = this.subDepts.concat(data);
    this.LoadData(data);
   }
}
