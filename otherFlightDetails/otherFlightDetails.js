import { LightningElement, wire,api,track } from 'lwc';
import showData from '@salesforce/apex/HandlerFlightAirlines.flightFilter';

const mycolumns = [
   {label: 'FlightID ', fieldName: 'FlightID__c'},
    {label: 'Flight Airlines', fieldName: 'Flight_Airlines__c'},
 {label: 'Class', fieldName: 'Class__c'},   
   {label: 'Source', fieldName: 'Source__c'},
    {label: 'Destination', fieldName: 'Destination__c'},
    {label: 'Flight Date', fieldName: 'Flight_Date__c'},
  
];

export default class OtherFlightDetails extends LightningElement {
    @track flightList = [];
    columns = mycolumns;
    @api fdate;
    @api fairlines;

  //  @wire(showData,{flairlines:'$fairlines',fldate:'$fdate'})
  @wire(showData,{fldate:'$fdate'})
    myShowProduct({error,data}){
        if(data){
            this.flightList = data;
        }
        if(error){
            console.log(error);
        }
    }
}