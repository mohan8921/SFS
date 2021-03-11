import { LightningElement,track } from 'lwc';
import fetchData from '@salesforce/apex/JSONParser.parseJSONResponse';

const columns = [{label:'Creditor',fieldName:'creditorName', type:'string'},
                 {label:'First Name',fieldName:'firstName',type:'string'},
                 {label:'Last Name',fieldName:'lastName',type:'string'},
                 {label:'Min Pay %',fieldName:'minPaymentPercentage',type:'percent'},
                 {label:'Balance',fieldName:'balance',type:'currency'}];

export default class CreditorData extends LightningElement {
    @track columns;
    @track data;
    @track selectedRowCount;
    @track totalRowCount;
    @track total;
    @track test;

    connectedCallback(){
        this.columns = columns;
        this.getJSONData();
    }

    addorremoverow(event){
        if(event.target.name == 'AddDebt'){
        this.data.push({
            "id": 11,
            "creditorName": "CBNA",
            "firstName": "Suman",
            "lastName": "Tester79",
            "minPaymentPercentage": 3.50,
            "balance": 235.00
          });
          ;
        }
        else if(event.target.name == 'RemoveDebt'){
            this.data.pop();
        }
        this.data = [...this.data];
        this.totalRowCount = this.data.length;
    }

    getSelectedRow(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedRowCount = event.detail.selectedRows.length;
        var myTotal = 0;
        for (let i = 0; i < selectedRows.length; i++){
            myTotal += selectedRows[i].balance;
       }
       this.total = myTotal;
    }

   getJSONData(){
        fetchData()
        .then(result =>{
            if(result !== null){
                this.data = result;

            }
            this.totalRowCount = this.data.length;
        })
    }

}