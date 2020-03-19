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

function dijkstra(sbPoint){
    let current = listOfPoints[sbPoint];
    //console.log(current.name + " - " + current.neighbours + " - " + current.totalWeight);
    tempNeigh = [...current.neighbours];

    if((sbPoint == listOfPoints.length-1)){
        checked = tempNeigh;
        return;
    }

    for (let i = 0; i < current.neighbours.length; i++){
        if(checked[i]) tempNeigh[i] = 0;
        if(tempNeigh[i] != 0){
            let next = listOfPoints[i];
            current.totalWeight = (typeof(current.totalWeight) == 'undefined') ? 0 : current.totalWeight;
            tempNeigh[i] += current.totalWeight;
            //console.log(next.name);
            //console.log(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= tempNeigh[i]);
            if(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= tempNeigh[i]){
                next.totalWeight = tempNeigh[i];
                if(sbPoint === 0)
                    next.path.push(current.name);
                else
                    next.path = [...current.path];
                next.path.push(next.name);
                //console.log(current.neighbours[i]);
            }
        } 
    }
    
    checked[sbPoint] = 1;
    for (let i = 0; i < current.neighbours.length; i++) {
        if(tempNeigh[i]){
            sync.push([...tempNeigh]);
            sync.push([...checked]);
            //console.log(sync + " PRE")
            dijkstra(i);
            //console.log(sync + " POSLE")
            checked = [...sync[sync.length-1]];
            sync.pop();
            tempNeigh = [...sync[sync.length-1]];
            sync.pop();
        }
    }
    
}

function main(){ 
    input();
    neighboursInput();
    dijkstra(0);
    console.log((listOfPoints[listOfPoints.length-1].path.toString()).replace(/,/g, "-") + " : " + listOfPoints[listOfPoints.length-1].totalWeight);
}

main();