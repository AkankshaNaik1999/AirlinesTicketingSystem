import { LightningElement, wire, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import showFlightData from '@salesforce/apex/HandlerFlight.showFlightData';
import flightDelete from '@salesforce/apex/HandlerFlight.flightDelete';
 
const actions = [
    { label: 'view', name: 'view'},
    { label: 'edit', name: 'edit'},
    { label: 'delete', name: 'delete'}
];
 
const flightColumns = [
    {label: 'Flight Id', fieldName: 'Name'},
    {label: 'Airline', fieldName: 'Airlines__c'},  
    {label: 'Source', fieldName: 'Source__c'},
    {label: 'Destination', fieldName: 'Destination__c'},
    {label: 'Flight Date', fieldName: 'Flight_Date__c'},
    {label: 'Economy Class Fare', fieldName: 'EconomyClassFare__c'},
    {label: 'Business Class Fare', fieldName: 'BusinessClssFare__c'},
    {label: 'Available Seats', fieldName: 'Total_available_seats__c'},
// {label: 'Reserved Seats', fieldName: 'Total_reserved_seats__c'},
  //  {label: 'Remaining Seats', fieldName: 'Remaining_seats__c'},
    {type:'action',typeAttributes:{rowActions:actions}}
];
 
export default class Flight extends NavigationMixin(LightningElement) {
    @track flightList = [];
    columns = flightColumns;
 
    @wire(showFlightData)
    wiredshowFlightData({error,data}){
        if(data){
            this.flightList = data;
        }
        else if(error){
            console.log(error);
        }
    }
 
 
    viewPage=(currentRecordId)=>{
        console.log('Within View : ',currentRecordId);
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: currentRecordId,
                objectApiName: 'Flights__c',
                actionName: 'view'
            }
        });
    }
 
    editPage=(currentRecordId)=>{
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: currentRecordId,
                objectApiName: 'Flights__c',
                actionName: 'edit'
            }
        });
    }
 
    deletePage = (currentRecordId) => {
        flightDelete({ deleteId: currentRecordId })
            .then((res) => {
                console.log(res);
                // Call the wire method to refresh the data
                return showFlightData();
            })
            .then((data) => {
                this.flightList = data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    newFlight(){
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes:{
                objectApiName: 'Flights__c',
                actionName: 'new'
            }
        });
    }
       
    handleRowAction(event){
        const action = event.detail.action;
        const row = event.detail.row;
        const rowId = row.Id;
        console.log('RowId : ', rowId);
    
        switch(action.name){
            case 'view':
                this.viewPage(rowId);
                break;
            case 'edit':
                this.editPage(rowId);
                break;
            case 'delete':
                this.deletePage(rowId);
                break;
            default:
                break;
        }
    }
    
        }