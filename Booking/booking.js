import { LightningElement, wire, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import showBookingData from '@salesforce/apex/HandlerBooking.showBookingData';
import bookingDelete from '@salesforce/apex/HandlerBooking.bookingDelete';
 
const bookingActions = [
    { label: 'view', name: 'view'},
    { label: 'edit', name: 'edit'},
    { label: 'delete', name: 'delete'}
];
 
const bookingColumns = [
    {label: 'BookingId', fieldName: 'Name'},
    {label: 'Booking status', fieldName: 'Booking_status__c'},
   {label: 'Source', fieldName: 'Source__c'},
    {label: 'Destination', fieldName: 'Destination__c'},
    {label: 'Booking Date', fieldName: 'BookingDate__c'},
    {label: 'Amount', fieldName: 'Amount__c'},
    {type:'action',typeAttributes:{ rowActions:bookingActions} }
];
 
export default class Booking extends NavigationMixin(LightningElement) {
    @track bookingList = [];
    columns = bookingColumns;
 
    @wire(showBookingData)
    wiredshowBookingData({error,data}){
        if(data){
            this.bookingList = data;
        }
        else if(error){
            console.log(error);
        }
    }
 
 
    viewPage=(currentRecordId) => {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: currentRecordId,
                objectApiName: 'Booking__c',
                actionName: 'view',
                
            }
        });
    }
 
    editPage=(currentRecordId) => {
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes:{
                recordId: currentRecordId,
                objectApiName: 'Booking__c',
                actionName: 'edit',
                
            }
        });
    }
 
    deletePage=(currentRecordId) => {
        bookingDelete({deleteId:currentRecordId})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        window.location.reload(true);
    }
 
    newBooking(){
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
                objectApiName: 'Booking__c',
                actionName: 'new',
            
            }
        });
    }
       
    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        const rowId = JSON.stringify(row.Id).slice(1,19);
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