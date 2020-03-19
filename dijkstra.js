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

function neighboursInput(){
    for(let i = 0; i < listOfPoints.length; i++){
        listOfPoints[i].neighbours[i] = 0;
        for(let j = (i + 1); j < listOfPoints.length; j++){
            listOfPoints[i].path[j] = 0;
            let weight = 0;
            while(weight < 1)
                weight = prompt("Weight " + listOfPoints[i].name + "-" + listOfPoints[j].name + " " + i + "-" + j);
            if(weight > 0)
                listOfPoints[i].neighbours[j] = listOfPoints[j].neighbours[i] = weight;
            else
                listOfPoints[i].neighbours[j] = listOfPoints[j].neighbours[i] = 0;
            
        }
    }
}

function dijkstra(sbPoint){}

function main(){ 
    input();
    neighboursInput();
    dijkstra(0);
    console.log((listOfPoints[listOfPoints.length-1].path.toString()).replace(/,/g, "-") + " : " + listOfPoints[listOfPoints.length-1].totalWeight);
}

main();