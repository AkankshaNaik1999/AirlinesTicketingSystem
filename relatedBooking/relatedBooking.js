import { LightningElement ,track,api,wire} from 'lwc';

import showData from '@salesforce/apex/HandlerFlightAirlines.displayData';

const mycolumns=[
    {label:'BookingNumber', fieldName:'Name'},
   // {label:'Bookings Name',fieldName:'Name'},
    {label:'Source',fieldName:'Source__c'},
    {label:'Destination',fieldName:'Destination__c'},
    {label:'Booking Datec',fieldName:'BookingDate__c'},
    {label:'Booking_status__c',fieldName:'Booking_status__c'},
    
];

export default class relatedBooking extends LightningElement {
    @track bookingList = [];
    columns = mycolumns;
    @api flight;

    @wire(showData,{flight: '$flight'})
    myShowProduct({error,data}){
        if(data){
            console.log(data);
            this.bookingList = data;
        }
        if(error){
            console.log(error);
        }
    }}