import { Component, inject } from '@angular/core';
import { CommanService } from 'src/app/services/comman.service';
import { CASHACCOUNT, GSTDATA, NEWCASHACCOUNT } from './data-GST';
import { ColumnDefinition } from 'src/app/models/data-types';
import { TableComponent } from '../table/table.component';

@Component({
    selector: 'app-gstutilization',
    templateUrl: './gstutilization.component.html',
    styleUrls: ['./gstutilization.component.scss'],
    standalone: true,
    imports: [TableComponent]
})
export class GstutilizationComponent {
    commanService = inject(CommanService);
    displayData: any[] = [];
    dummyData: any[] = [];
    cashAccounts: any[] = [];
    dT: any[] = [];
    dutiesAndTaxesAccounts: any[] = [];

    extractPercentage(accountName) {
        const percentageString = accountName.split(' ')[2];
        return parseFloat(percentageString);
    }

    deepCopy(value: any) {
        return JSON.parse(JSON.stringify(value));
    }

    ngOnInit() {
        this.dutiesAndTaxesAccounts = this.deepCopy(GSTDATA[1]);
        this.cashAccounts = this.deepCopy(NEWCASHACCOUNT);

        // for sorting array 
        for (let key in this.dutiesAndTaxesAccounts) {
            this.dutiesAndTaxesAccounts[key].sort((a, b) => {
                const percentageA = this.extractPercentage(a.AccountName);
                const percentageB = this.extractPercentage(b.AccountName);
                return percentageA - percentageB;
            });
        }

        // for (let key in allAccounts) {
        //     let data: any[] = allAccounts[key];

        //     allAccounts[key] = data.map(ele => {
        //         let obj = {
        //             AcClBl: ele['AcClBl'],
        //             AccountName: ele['AccountName'],
        //             AccountId: ele['AccountId'],
        //             AcClCrDb: ele['AcClCrDb'],
        //             GIType: ele['GIType'],
        //             IsClear: false
        //         }

        //         if (ele['AccSubType'] == "Input" && ele['AcClCrDb'] == 'Cr') {
        //             obj['AcClBl'] = (-1 * obj['AcClBl']);
        //         }
        //         if (ele['AccSubType'] == "Output" && ele['AcClCrDb'] == 'Db') {
        //             obj['AcClBl'] = (-1 * obj['AcClBl']);
        //         }
        //         return obj;
        //     })
        // }
        this.PrintHavalaV1(this.dutiesAndTaxesAccounts);
    }

    PercentageArr: any[] = [];
    PrintHavalaV1(accounts: any) {
        // let accTypes = ['IGST#Input', 'IGST#Output', 'CGST#Input', 'CGST#Output', 'SGST#Input', 'SGST#Output'];
        let accTypes = ['IGST', 'CGST', 'SGST'];
        // let accTypes = ['CGST'];
        
        // step -1
        accTypes.forEach((ele) => {
            let ip: any[] = accounts[ele + '#Input'];
            let op: any[] = accounts[ele + '#Output'];

            let ipObj = ip.find(ele => ele['AcClBl'] != 0);
            if (ipObj != null) {
                for (let i = 0; i < ip.length; i++) {
                    let currIn = ip[i];
                    let currOut = op[i];

                    if (currIn['AcClBl'] != 0) {
                        if (currOut['AcClBl'] != 0) {
                            if (currIn['AcClBl'] < currOut['AcClBl']) {
                                this.displayData.push({
                                    AccountId: currIn['AccountId'],
                                    AccountName: currIn['AccountName'],
                                    OppAccountId: currOut['AccountId'],
                                    OppAccountName: currOut['AccountName'],
                                    Amount: currIn['AcClBl']
                                })

                                currOut['AcClBl'] = (currOut['AcClBl'] - currIn['AcClBl']);
                                currIn['AcClBl'] = 0;
                                currIn['IsClear'] = true;
                            }
                            else if ((currIn['AcClBl'] > currOut['AcClBl']) && currOut['AcClBl'] != 0) {
                                this.displayData.push({
                                    AccountId: currIn['AccountId'],
                                    AccountName: currIn['AccountName'],
                                    OppAccountId: currOut['AccountId'],
                                    OppAccountName: currOut['AccountName'],
                                    Amount: currOut['AcClBl']
                                });

                                currIn['AcClBl'] = (currIn['AcClBl'] - currOut['AcClBl']);
                                currOut['AcClBl'] = 0;
                                currOut['IsClear'] = true;
                                if (op.some(ele => ele['AcClBl'] != 0) && currIn['AcClBl'] != 0) {
                                    this.pendingInputSettlement(currIn, op);
                                }
                            }
                        } else {
                            if (op.some(ele => ele['AcClBl'] != 0))
                                this.pendingInputSettlement(currIn, op);
                        }
                    }
                }
            }

            op = op.filter(ele => ele['AcClBl'] != 0);
            if (ip.some(ele => ele['AcClBl'] != 0) && op.length != 0) {
                let ipObj = ip.find(ele => ele['AcClBl'] != 0);
                this.pendingInputSettlement(ipObj, op);
            }

            // op = op.filter(ele => ele['AcClBl'] != 0);
            // ip = ip.filter(ele => ele['AcClBl'] != 0);
            // let outObj1 = op.find(ele => ele['AcClBl'] != 0);
            // let ipObj1 = ip.find(ele => ele['AcClBl'] != 0);
            // if (ipObj1 != null && outObj1 != null) {
            //     for (let i = 0; i < op.length; i++) {
            //         let currOut = op[i];

            //         if (currOut['AcClBl'] != 0 && currOut['AcClBl'] < ipObj['AcClBl']) {
            //             this.displayData.push({
            //                 AccountId: ipObj['AccountId'],
            //                 AccountName: ipObj['AccountName'],
            //                 OppAccountId: currOut['AccountId'],
            //                 OppAccountName: currOut['AccountName'],
            //                 Amount: currOut['AcClBl']
            //             })

            //             ipObj['AcClBl'] = (ipObj['AcClBl'] - currOut['AcClBl']);
            //             currOut['AcClBl'] = 0;
            //         }
            //         else if (currOut['AcClBl'] != 0 && currOut['AcClBl'] > ipObj['AcClBl']) {
            //             this.displayData.push({
            //                 AccountId: ipObj['AccountId'],
            //                 AccountName: ipObj['AccountName'],
            //                 OppAccountId: currOut['AccountId'],
            //                 OppAccountName: currOut['AccountName'],
            //                 Amount: ipObj['AcClBl']
            //             })

            //             currOut['AcClBl'] = (currOut['AcClBl'] - ipObj['AcClBl']);
            //             ipObj['AcClBl'] = 0;
            //         }
            //     }
            // }
        });

        // cashledger
        accTypes.forEach(ele => {
            // go to cashledger;
            let op: any[] = accounts[ele + "#Output"];

            op.forEach((ele, i) => {
                if (ele['AcClBl'] != 0) {
                    let cashAccount = this.cashAccounts.find(cacc => cacc['GIType'] == ele['GIType']);
                    if (cashAccount != null) {
                        this.displayData.push({
                            AccountId: cashAccount['AccountId'],
                            AccountName: cashAccount['AccountName'],
                            OppAccountId: op[i]['AccountId'],
                            OppAccountName: op[i]['AccountName'],
                            Amount: op[i]['AcClBl']
                        });
                        op[i]['AcClBl'] = 0;
                        op[i]['IsClear'] = true;
                    }
                }
            })
        });

        let inObj = {
            TypeId: 5.1,
            CGST: 0,
            IGST: 0,
            SGST: 0,
        };
        let outObj = {
            TypeId: 5.2,
            CGST: 0,
            IGST: 0,
            SGST: 0,
        };
        accTypes.forEach(ele => {
            let ip: any[] = accounts[ele + '#Input'].filter(ele => ele['IsClear'] == false);
            let op: any[] = accounts[ele + '#Output'].filter(ele => ele['IsClear'] == false);

            if (ip.length == 1) {
                inObj[ele] = ip[0]['AcClBl'];
            }
            if (op.length == 1) {
                outObj[ele] = op[0]['AcClBl'];
            }
        })

        this.PercentageArr.push(inObj);
        this.PercentageArr.push(outObj);

        console.log('PercentageArr', this.PercentageArr);

        let unGroupedData: any[] = [];

        // convert grouped data to ungrouped data
        for (let key in this.dutiesAndTaxesAccounts) {
            let Type = key.split("#")[1];

            if (Type == 'Output') {
                this.dutiesAndTaxesAccounts[key].forEach(ele => {
                    ele['OppAccountName'] = ele['AccountName'];
                    ele['OppAccountId'] = ele['AccountId'];
                });
            }
            unGroupedData = unGroupedData.concat(this.dutiesAndTaxesAccounts[key]);
        }
        
        // call old printhavala

        // this.dT = this.deepCopy(this.displayData);
        // this.dT.push({});
    }

    pendingInputSettlement(currIn: any, op: any[]) {
        if (currIn['AcClBl'] == 0 || op.length == 0) return;

        op = op.filter(ele => ele['AcClBl'] != 0);
        for (let i = 0; i < op.length; i++) {
            let currOut = op[i];

            if (currIn['AcClBl'] < currOut['AcClBl']) {
                this.displayData.push({
                    AccountId: currIn['AccountId'],
                    AccountName: currIn['AccountName'],
                    OppAccountId: currOut['AccountId'],
                    OppAccountName: currOut['AccountName'],
                    Amount: currIn['AcClBl']
                })

                currOut['AcClBl'] = (currOut['AcClBl'] - currIn['AcClBl']);
                currIn['AcClBl'] = 0;
                currIn['IsClear'] = true;
                break;
            }
            else if ((currIn['AcClBl'] > currOut['AcClBl']) && currOut['AcClBl'] != 0) {
                this.displayData.push({
                    AccountId: currIn['AccountId'],
                    AccountName: currIn['AccountName'],
                    OppAccountId: currOut['AccountId'],
                    OppAccountName: currOut['AccountName'],
                    Amount: currOut['AcClBl']
                });

                currIn['AcClBl'] = (currIn['AcClBl'] - currOut['AcClBl']);
                currOut['AcClBl'] = 0;
                currOut['IsClear'] = true;
                break;
            }
        }
        this.pendingInputSettlement(currIn, op);
    }

}
