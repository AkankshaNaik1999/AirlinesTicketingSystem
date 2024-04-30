//import { LightningElement } from 'lwc';

//export default class Passenger extends LightningElement {}
import { LightningElement, wire, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import showData from '@salesforce/apex/HandlerPassenger.displayPassenger';
import delData from '@salesforce/apex/HandlerPassenger.deletePassengers';
 
const actions = [
    { label: 'View', name: 'View'},
    { label: 'Edit', name: 'Edit'},
    { label: 'Delete', name: 'Delete'}
];
 
const mycolumns = [
    {label: 'Passenger Name', fieldName: 'Name'},
    {label: 'Contact', fieldName: 'Contact__c'},  
    {label: 'Email', fieldName: 'Email__c'},
    {label: 'Address', fieldName: 'Address__c'},
    {label:'ID Proof Type',fieldName: 'ID_Proof_Type__c'},
    {type:'action',typeAttributes:{ rowActions:actions} }
];
 
export default class Booking extends NavigationMixin(LightningElement) {
    @track passengerList = [];
    columns = mycolumns;
 
    @wire(showData)
    myShowProduct({error,data}){
        if(data){
            this.passengerList = data;
        }
        if(error){
            console.log(error);
        }
    }
 
 
    viewPage=(currRecordID) => {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: currRecordID,
                objectApiName: 'Passenger__c',
                actionName: 'view'              
            }
        });
    }
 
    editPage=(currRecordID) => {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: currRecordID,
                objectApiName: 'Passenger__c',
                actionName: 'edit'
            }
        });
    }
 
    deletePage=(currRecordID) => {
        delData({mId:currRecordID})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        window.location.reload(true);
    }
 
    addPassenger(){
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
                objectApiName: 'Passenger__c',
                actionName: 'new',
            }
        });
    }
       
    handleRowAction = (e) => {
        const action = e.detail.action;
        const row = e.detail.row;
        //const component = e.target.component;
        const rowID = JSON.stringify(row.Id).slice(1,19);
             switch(action.name){
            case 'View':
                this.viewPage(rowID);
                break;
            case 'Edit':
                this.editPage(rowID);
                break;
            case 'Delete':
                this.deletePage(rowID);
                break;
            default:
                break;
        }
    }
 
   
}