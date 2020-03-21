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
var notVisitedNeighbours = []; //array for saving weights of neighbour points which are not checked on current path


//declaration of javascript object Point
//for testing add neighbours parameter into 
//constructon after name and insted [] at 
//neighbours put [...neighbours]
function Point(name, neighbours){ 
    this.name = name; //name of Point
    this.path = []; //previous points on shortest path  
    this.neighbours = [...neighbours]; //list of points that is connected to current point [index_of_neighbour_point_in_listOfPoints, distance(weight)_from_current_point]
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
            if(weight > 0){
                listOfPoints[i].neighbours.push([j,parseInt(weight)]);
                listOfPoints[j].neighbours.push([i,parseInt(weight)]);
            }
        }
    }
}

function dijkstra(sbPoint, checked, notVisitedNeighbours){
    
    let current = listOfPoints[sbPoint]; //defining current point
    current.totalWeight = (typeof(current.totalWeight) == 'undefined') ? 0 : current.totalWeight;
    checked[sbPoint] = 1;
    checked_backup = [...checked];

    //console.log(current.name + " - " + current.neighbours + " - " + current.totalWeight);

    //iterating through all neighbour points
    //and calculating distances(weights) for
    //that points and eventually paths if
    //certain conditions are satisfied
    for(let i = 0; i < current.neighbours.length; i++){
        neighbour = [...current.neighbours[i]];
        //console.log(neighbour[0], current.name)

        //skipping points which are 
        //visited on current path
        if(checked[neighbour[0]]) continue;
        
        //only for non visited neighbours on current path
        if(neighbour[1]>0){
            let next = listOfPoints[neighbour[0]]; //defining next point (one of neighbours)
            let nextPotentialNewWeight = current.totalWeight + neighbour[1]; //defining potential distance(weight) of next point (one of neighbours)
            checked[neighbour[0]] = 1;

            //console.log(next.name);
            //console.log(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= notVisitedNeighbours[i]);
            
            //only for neighbour points which doesn have
            //defined distance(weight) yet or which have
            //larger distance(weight) then current path
            if(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= nextPotentialNewWeight){
                next.totalWeight = nextPotentialNewWeight; //setting new distance(weight) for neighbour
                notVisitedNeighbours.push(neighbour[0]);
                
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

    checked = [...checked_backup];
    
    //recursively calling the function for
    //every non visited neighbour
    notVisitedNeighbours.forEach( neighbour => {
        if(!checked[neighbour]) 
            dijkstra(neighbour, [...checked], [...notVisitedNeighbours]);
    })
    
}

function main(){ 
    
    input(); //call of the input function
    neighboursInput(); //call of the neighboursInput function
    dijkstra(0, [], []); //call of the dijkstra function
    
    //output with the shortest path and it's distance(weight)
    console.log((listOfPoints[listOfPoints.length-1].path.toString()).replace(/,/g, "-") + " : " + listOfPoints[listOfPoints.length-1].totalWeight);

}

main(); //call of the main function