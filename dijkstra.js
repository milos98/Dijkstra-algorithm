var listOfPoints = [];
var checked = [];
var tempNeigh;
var sync = [];

function Point(name, neighbours){
    this.name = name;
    this.path = [];
    this.neighbours = [...neighbours];
    this.totalWeight;
}

function input(){
    let numberOfPoints = prompt("How many points for input?");

    while(numberOfPoints-- > 0){
        let name = prompt("Name of point:");
        listOfPoints.push(new Point(name));
        checked.push(0);
    }
}

function neighboursInput(){}

function dijkstra(sbPoint){}

function main(){ 
    input();
    neighboursInput();
    dijkstra(0);
    console.log((listOfPoints[listOfPoints.length-1].path.toString()).replace(/,/g, "-") + " : " + listOfPoints[listOfPoints.length-1].totalWeight);
}

main();