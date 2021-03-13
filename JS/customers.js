/* 
    Name: Reily Stanford and Enrique Tejeda
    Date: 3/12/2021
    File: index.js
*/

let TableDiv=document.getElementById("TableDiv");
let TableData=[];
let TheMap;


async function loadData () {
    TableDiv.innerHTML ="Please wait";
    //TableData=await getStaticDataPromise();
    TableData=await getJsonDataPromise();

    TableData.push({
        "first_name" : "Riki" ,
        "last_name" : "Tejeda" ,
        "address" : "134 Courtright Rd" ,
        "city" : "Martin" ,
        "state" : "Tennessee" ,
        "state_code" : "TN" ,
        "zip" : "38237" ,
        "total_spent" : "4" ,
        "total_orders" : "3" ,
        "lat" : 36.354164 ,
        "lng" : -88.883229
    });

    TableData.push({
        "first_name" : "Reily" ,
        "last_name" : "Stanford" ,
        "address" : "4600 Obama Blvd" ,
        "city" : "Los Angeles" ,
        "state" : "California" ,
        "state_code" : "CA" ,
        "zip" : "90016" ,
        "total_spent" : "93.76" ,
        "total_orders" : "3" ,
        "lat" : 34.02151053903943 ,
        "lng" : -118.34516077094078
    });

    RenderTable ();

    $('#table').DataTable();
    addAllCustomersToMap();

    
}

function RenderTable () {
    let c="";

    c="<table id='table' border=1> \r\n ";
    c+=`<thead>
    <tr>
    <th>Last Name</th>
    <th>First name</th>
    <th>Address</th>
    <th>City</th>
    <th>State</th>
    <th>Zip</th>
    <th>Total Spent</th>
    <th>Total Orders</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th></th>

    </tr>
    </thead>
    <tbody>
    `;

    let id=0 ;
    for(let r of TableData){
        c+=`<tr class="tRows">
        <td> ${r.last_name } </td>
        <td> ${r.first_name} </td>
        <td> ${r.address} </td>
        <td> ${r.city} </td>
        <td> ${r.state} </td>
        <td> ${r.zip} </td>
        <td> ${r.total_spent} </td>
        <td> ${r.total_orders} </td>
        <td> ${r.lat} </td>
        <td> ${r.lng} </td>
        <td> <button id="btn${id}" onclick="go(${id})">Go</button>
        </tr>
        `;

        id ++;
    }

    

    c+="</tbody></table> \r\n ";


    TableDiv.innerHTML=c;

}


function getStaticDataPromise(){
    return new Promise((resolve,reject)=>{

        setTimeout(()=>{
            return resolve(getStaticData());
        }, 1000);
    });
}

function getStaticData () {

    return [{
        "first_name" : "Alfred" ,
        "last_name" : "Norman" ,
        "address" : "1612 Jackson St" ,
        "city" : "Scranton" ,
        "state" : "Pennsylvania" ,
        "state_code" : "PA" ,
        "zip" : "'18504" ,
        "total_spent" : "12.99" ,
        "total-orders" : "1" ,
        "lat" : "41.4154871" ,
        "lng" : "-75.686066"
    },
    {
        "first_name" : "Maureen" ,
        "last_name" : "Morris" ,
        "address" : "2700 REGENCY OAKS BLVD APT P413" ,
        "city" : "CLEARWATER" ,
        "state" : "Florida" ,
        "state_code" : "FL" ,
        "zip" : "33759-1535" ,
        "total_spent" : "12.99" ,
        "total-orders" : "1" ,
        "lat" : "27.9950521" ,
        "lng" : "-82.7212496"
    },
    {
        "first_name" : "Dallas" ,
        "last_name" : "Burns" ,
        "address" : "1650 Indian falls rd" ,
        "city" : "Corfu" ,
        "state" : "New York" ,
        "state_code" : "NY" ,
        "zip" : "'14036" ,
        "total_spent" : "12.99" ,
        "total-orders" : "1" ,
        "lat" : "43.0194547" ,
        "lng" : "-78.3686152"
    },
    {
        "first_name" : "Walter" ,
        "last_name" : "Mcdonald" ,
        "address" : "87 Riddle Hill Road" ,
        "city" : "Falmouth" ,
        "state" : "Massachusetts" ,
        "state_code" : "MA" ,
        "zip" : "'02540" ,
        "total_spent" : "12.99" ,
        "total-orders" : "1" ,
        "lat" : "41.5567256" ,
        "lng" : "-70.6378515"
    },


    ];
}

function getJsonDataPromise() {
    return new Promise((resolve, reject) => {
        //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch("http://cs1.utm.edu/~bbradley/customers/customers3.json")
            .then(response => response.json())
            .then(data => resolve(data));
    });
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: {lat: 36.3433965, lng: -98.8503379},
    });
    TheMap = map;
    
    loadData(); // Does this on script LOAD
}

function addAllCustomersToMap() {
    for(let r of TableData) {
        addCustomerToMap(r);
    }
}

function addCustomerToMap(customer) {
    if(!customer.lat) {
        console.log('No latLang for: ', customer.name);
        return;
    }
    const infoTagString = customer.last_name + ", " + customer.first_name + "<br>" + customer.city + ", " + customer.state;
    customer.mapMarker = addPinToMap({ lat: customer.lat, lng: customer.lng }, infoTagString);
}

function addPinToMap(latLng, text) {
    var marker = new google.maps.Marker({
        map: TheMap,
        position: latLng,
    });
    //Got help for infobox here https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    const infoBox = new google.maps.InfoWindow({
        content: text,
    });
    marker.addListener("click", ()=> {
        infoBox.open(TheMap, marker);
    });
    return marker;
}

function go(id) {
    TheMap.panTo({lat:TableData[id].lat, lng: TableData[id].lng});
    TheMap.setZoom(10);

    //Adding information to side panel upon clicking go
    document.getElementById("infoPanel").innerHTML= `
        Name: ${TableData[id].first_name} ${TableData[id].last_name}<br>
        Address: ${TableData[id].address}<br> 
        City: ${TableData[id].city}<br>
        State: ${TableData[id].state}<br>
        Zipcode: ${TableData[id].zip}<br>
        Total Spent: ${TableData[id].total_spent}<br>
        Total Orders: ${TableData[id].total_orders}<br>
        Latitude: ${TableData[id].lat}<br>
        Longitude: ${TableData[id].lng}<br>`;
}