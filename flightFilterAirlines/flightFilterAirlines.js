import { LightningElement,wire,track } from 'lwc';
import filter from '@salesforce/apex/HandlerFlightAirlines.filterSearch';
import showData from '@salesforce/apex/HandlerFlightAirlines.data';

const mycolumns = [
    {label: 'FlightID',fieldName: 'Name'},
    {label: 'Flight Airlines',fieldName: 'Airlines__c'},
    {label: 'Source',fieldName: 'Source__c'},
    {label: 'Destination',fieldName: 'Destination__c'},
    {label: 'Flight Date',fieldName: 'Flight_Date__c', type: 'Date'},
   
];

export default class FlightFilterAirlines extends LightningElement {
    @track flightList = [];
    columns = mycolumns;
    airlines;
    travDate;
    flightId;

    airlinesChange(event){
        this.airlines = event.target.value;
    }

    dateChange(event){
        this.travDate = event.target.value;
    }

    filterData(){
        filter({fairlines:this.airlines, fdate: this.travDate})
        .then((res) => {
            this.flightList = res;
            this.flightId = res[0];
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    @wire(showData)
    myShowProduct({error,data}){
        if(data){
            this.flightList = data;
        }
        if(error){
            console.log(error);
        }
    }
}