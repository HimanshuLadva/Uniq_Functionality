import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { CommanService } from 'src/app/services/comman.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface ChargesType {
  value: string;
  id: number;
}

@Component({
  selector: 'app-suppbill',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './suppbill.component.html',
  styleUrls: ['./suppbill.component.scss'],
})
export class SuppbillComponent {
  userService = inject(CommanService);

  _regularCharges: ChargesType[] = [
    { value: 'Detention', id: 1 },
    { value: 'Loading', id: 2 },
    { value: 'LoLo', id: 3 },
    { value: 'Transport', id: 4 },
  ];
  currentRegularCharge: string = this._regularCharges[0]['value'];

  _otherCharges: ChargesType[] = [
    { value: 'commision', id: 1 },
    { value: 'weight bridge income', id: 2 },
    { value: 'othercharge', id: 3 },
    { value: 'extracharge', id: 4 },
  ];
  currentOtherCharge: string = '';

  dataSource: any[] = [];
  charges = ['Detention Income', 'Freight Income', 'Lolo Income'];
  otherCharges = [];
  prevRegularCharge: string = '';

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe(
        (users: any[]) => {
          console.log('yseeeeee', users);
          this.dataSource = users.filter((ele) => ele.id < 5);
          this.applyRegularCharges();
        }
      );
  }

  applyRegularCharges() {
    if (this.currentRegularCharge == 'Transport') {
      let tempArr: any[] = JSON.parse(JSON.stringify(this.dataSource));
      let newArr = [];

      for (let i = 0; i < this.dataSource.length; i++) {
        if (!this.otherCharges.includes(this.dataSource[i]['detail'])) {
          for (let j = 0; j < 3; j++) {
            const data = JSON.parse(JSON.stringify(tempArr[i]));
            data['detail'] = this.charges[j];
            newArr.push(data);
          }
        } else {
          const data = JSON.parse(JSON.stringify(tempArr[i]));
          newArr.push(data);
        }
      }

      this.dataSource = newArr;
    } else {
      if (this.prevRegularCharge == 'Transport') {
        this.dataSource = this.dataSource.filter((ele) => {
          if (ele['detail'] == 'Detention Income') {
            return true;
          }
          if (this.otherCharges.includes(ele['detail'])) {
            return true;
          }
          return false;
        });
      }

      this.dataSource = this.dataSource.map((ele) => {
        if (!this.otherCharges.includes(ele['detail']))
          ele['detail'] = this.currentRegularCharge + ' Income';
        return ele;
      });
    }
    this.prevRegularCharge = this.currentRegularCharge;
  }

  applyOtherCharger() {
    if (!this.otherCharges.includes(this.currentOtherCharge)) {
      const uniqueIDs = [];

      this.dataSource.forEach((ele) => {
        if (!uniqueIDs.includes(ele['id'])) {
          uniqueIDs.push(ele['id']);
        }
      });

      let tempArr = [];

      uniqueIDs.forEach((ele) => {
        const obj = JSON.parse(
          JSON.stringify(this.dataSource.find((ele1) => ele1['id'] == ele))
        );
        obj['detail'] = this.currentOtherCharge;
        tempArr.push(obj);
      });

      this.dataSource = this.dataSource.concat(tempArr);

      this.dataSource.sort((a, b) => {
        let id1 = a['id'];
        let id2 = b['id'];

        if (id1 > id2) return 1;
        if (id1 < id2) return -1;
        return 0;
      });
      this.otherCharges.push(this.currentOtherCharge);
    }
  }
}
