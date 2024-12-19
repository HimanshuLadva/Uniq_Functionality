import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-process',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './all-process.component.html',
  styleUrls: ['./all-process.component.scss'],
})
export class AllProcessComponent { 

  dataArr = [
  { "UniqId": 7847, "ProcessId": 7847, "ProcessName": "STAGE-1", "ProductId": 6135, "Prod_type": "Raw Material" },
  { "UniqId": 7848, "ProcessId": 7847, "ProcessName": "STAGE-1", "ProductId": 6136, "Prod_type": "Raw Material" },
  { "UniqId": 7849, "ProcessId": 7847, "ProcessName": "STAGE-1", "ProductId": 6137, "Prod_type": "Raw Material" },
  { "UniqId": 7850, "ProcessId": 7847, "ProcessName": "STAGE-1", "ProductId": 6138, "Prod_type": "Product" },
  { "UniqId": 7851, "ProcessId": 7851, "ProcessName": "STAGE-2", "ProductId": 6138, "Prod_type": "Raw Material" },
  { "UniqId": 7852, "ProcessId": 7851, "ProcessName": "STAGE-2", "ProductId": 6139, "Prod_type": "Raw Material" },
  { "UniqId": 7853, "ProcessId": 7851, "ProcessName": "STAGE-2", "ProductId": 6140, "Prod_type": "Raw Material" },
  { "UniqId": 7854, "ProcessId": 7851, "ProcessName": "STAGE-2", "ProductId": 6142, "Prod_type": "Product" },
  { "UniqId": 7855, "ProcessId": 7855, "ProcessName": "STAGE-3", "ProductId": 6142, "Prod_type": "Raw Material" },
  { "UniqId": 7856, "ProcessId": 7855, "ProcessName": "STAGE-3", "ProductId": 6143, "Prod_type": "Raw Material" },
  { "UniqId": 7857, "ProcessId": 7855, "ProcessName": "STAGE-3", "ProductId": 6144, "Prod_type": "Raw Material" },
  { "UniqId": 7858, "ProcessId": 7855, "ProcessName": "STAGE-3", "ProductId": 6146, "Prod_type": "Product" }
]

ProductId = 6146
ProcessId = 0;
processData = [];
resultData = [];

 ngOnInit() {
   this.ProcessId = this.dataArr.find(ele => ele.ProductId == this.ProductId).ProcessId;
   this.processData = this.dataArr.filter(ele => ele.ProcessId == this.ProcessId);
   this.dataArr = this.dataArr.filter((ele) => ele.ProcessId != this.ProcessId);
   this.resultData = [...this.processData];

   this.LoadData();
 }

 LoadData() { 

  for(let index = 0; index < this.resultData.length; index++) {
      let ele = this.resultData[index]
      if (ele.Prod_type == "Raw Material") {
        this.ProcessId = this.dataArr.find(a => (a.ProductId == ele.ProductId) && (a.Prod_type == "Product"))?.ProcessId;
        if (this.ProcessId != null) {
          this.processData = this.dataArr.filter((b) => b.ProcessId == this.ProcessId);
          this.dataArr = this.dataArr.filter((c) => c.ProcessId != this.ProcessId);
          this.resultData = [...this.resultData, ...this.processData];
        }
      }
  }
 }

}
