import { LightningElement,wire,track } from 'lwc';
import filter from '@salesforce/apex/HandlerflightFilter.filterSearch';
import showData from '@salesforce/apex/HandlerflightFilter.data';

const mycolumns = [
    {label: 'FlightID',fieldName: 'Name'},
    {label: 'Flight Airlines',fieldName: 'Airlines__c'},
    {label: 'Source',fieldName: 'Source__c'},
    {label: 'Destination',fieldName: 'Destination__c'},
    {label: 'Flight Date',fieldName: 'Flight_Date__c', type: 'Date'},
   
];

export default class FlightFilter extends LightningElement {
    @track flightList = [];
    columns = mycolumns;
    source;
    destination;
    travDate;
    flightId;

    airlinesChange(event){
        this.source = event.target.value;
    }
    airlinesChanges(event){
        this.destination = event.target.value;
    }

    dateChange(event){
        this.travDate = event.target.value;
    }

    filterData(){
        filter({fsource:this.source,fdestination:this.destination, fdate: this.travDate})
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

// export default class FlightFilter extends LightningElement {}