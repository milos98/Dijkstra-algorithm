//A-B-E-F-H     : 13
//A-B-C-D-F-H   : 13
/*var listOfPoints = [new Point("A", [0,3,4,7,0,0,0,0]),
                    new Point("B", [3,0,1,0,5,0,0,0]),
                    new Point("C", [4,1,0,2,6,0,0,0]),
                    new Point("D", [7,0,2,0,0,3,6,0]),
                    new Point("E", [0,5,6,0,0,1,0,8]),
                    new Point("F", [0,0,0,3,1,0,3,4]),
                    new Point("G", [0,0,0,6,0,3,0,2]),
                    new Point("H", [0,0,0,0,8,4,2,0])];*/

//A-C-B-D-E     : 7
/*var listOfPoints = [new Point("A", [0,4,1,0,0]),
                    new Point("B", [4,0,2,1,0]),
                    new Point("C", [1,2,0,5,0]),
                    new Point("D", [0,1,5,0,3]),
                    new Point("E", [0,0,0,3,0])];*/

var listOfPoints = []; //list of objects(Points)
var checked = []; //array for saving which points are checked on current path
var tempNeigh = []; //array for saving weights of neighbour points which are not checked on current path
var sync = []; //array for syncing state of variables checked and tempNeigh


//declaration of javascript object Point
//for testing add neighbours parameter into 
//constructon after name and insted [] at 
//neighbours put [...neighbours]
function Point(name){ 
    this.name = name; //name of Point
    this.path = []; //previous points on shortest path  
    this.neighbours = []; //list of points that is connected to current point
    this.totalWeight; //Distance(weight) of the shortest path
}

function input(){
    //user input for number of points
    let numberOfPoints = prompt("How many points for input?");

    //user input for name of every point and 
    while(numberOfPoints-- > 0){
        let name = prompt("Name of point:");
        listOfPoints.push(new Point(name));
        checked.push(0);
    }
}

function neighboursInput(){

    //inicializating list of neighbours
    listOfPoints.forEach(point => {
        for (let i = 0; i < listOfPoints.length; i++) point.neighbours.push(0);
    });

    //loop for iterating through points
    for(let i = 0; i < listOfPoints.length; i++){
        
        //loop iterating through possible neighbour points
        //e.g you will be only asked for distance(weight) of A-B, 
        //not B-A too - it will be automatically inserted
        for(let j = (i + 1); j < listOfPoints.length; j++){
            let weight = -1;

            //user iput for distance between i-tn and j-th point
            //accepting all except negative numbers
            //number - distance
            //everything else - no connection between points
            while(weight < 0){
                weight = prompt("Weight " + listOfPoints[i].name + "-" + listOfPoints[j].name + " " + i + "-" + j);
            }
            if(weight > 0)
                listOfPoints[i].neighbours[j] = listOfPoints[j].neighbours[i] = parseInt(weight);
        }
    }
}

function dijkstra(sbPoint){
    
    let current = listOfPoints[sbPoint]; //defining current point
    
    //console.log(current.name + " - " + current.neighbours + " - " + current.totalWeight);
    
    tempNeigh = [...current.neighbours];

    //if the current point is the last(finish) point
    //the break from recursion
    if((sbPoint == listOfPoints.length-1)) return;

    //iterating through all neighbour points
    //and calculating distances(weights) for
    //that points and eventually paths if
    //certain conditions are satisfied
    for (let i = 0; i < current.neighbours.length; i++){
        
        //setting 0 in array with weights non visited 
        //neighbours on current path for every point 
        //that is visited
        if(checked[i]) 
            tempNeigh[i] = 0;
        
        //only for non visited neighbours on current path
        if(tempNeigh[i] != 0){
            let next = listOfPoints[i]; //defining next point (one of neighbours)
            current.totalWeight = (typeof(current.totalWeight) == 'undefined') ? 0 : current.totalWeight;
            tempNeigh[i] += current.totalWeight; //adding distance(weight) of the current point to the distance(weight) of the next point
            
            //console.log(next.name);
            //console.log(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= tempNeigh[i]);
            
            //only for neighbour points which doesn have
            //defined distance(weight) yet or which have
            //larger distance(weight) then current path
            if(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= tempNeigh[i]){
                next.totalWeight = tempNeigh[i]; //setting new distance(weight) for neighbour
                
                //adding the first point
                //to the path
                if(sbPoint === 0)
                    next.path.push(current.name);
                
                //adding every other point 
                //to the path
                else
                    next.path = [...current.path];
                
                next.path.push(next.name); //adding next point to the path
                
                //console.log(current.neighbours[i]);
            }
        } 
    }
    
    checked[sbPoint] = 1;
    
    //recursively going through all points
    //and trying every possible combination
    //of points in order to find shortest path
    //between 'strart' and 'finish' point
    for (let i = 0; i < current.neighbours.length; i++) {
        
        //checking the point if it is
        //non visited neighbour on the 
        //current path or not
        if(tempNeigh[i]){
            
            //adding arrays checked&tempNeigh to sync array
            //to avoid losing progress on the way
            sync.push([...tempNeigh]);
            sync.push([...checked]);

            //console.log(sync + " PRE")

            dijkstra(i);//recursive call of the function

            //console.log(sync + " POSLE")

            //restoring the last known state of arrays
            //checked&tempNeigh and removing it from
            //sync array 
            checked = [...sync[sync.length-1]];
            sync.pop();
            tempNeigh = [...sync[sync.length-1]];
            sync.pop();
        }
    }
    
}

function main(){ 
    
    input(); //call of the input function
    neighboursInput(); //call of the neighboursInput function
    dijkstra(0); //call of the dijkstra function
    
    //output with the shortest path and it's distance(weight)
    console.log((listOfPoints[listOfPoints.length-1].path.toString()).replace(/,/g, "-") + " : " + listOfPoints[listOfPoints.length-1].totalWeight);

}

main(); //call of the main function