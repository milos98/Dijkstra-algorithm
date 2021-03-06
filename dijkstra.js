//A-B-E-F-H     : 13
//A-B-C-D-F-H   : 13
//A-C-D-F-H     : 13
/*var listOfPoints = [new Point("A", [[1,3],[2,4],[3,7]]),
                    new Point("B", [[0,3],[2,1],[4,5]]),
                    new Point("C", [[0,4],[1,1],[3,2],[4,6]]),
                    new Point("D", [[0,7],[2,2],[5,3],[6,6]]),
                    new Point("E", [[1,5],[2,6],[5,1],[7,8]]),
                    new Point("F", [[3,3],[4,1],[6,3],[7,4]]),
                    new Point("G", [[3,6],[5,3],[7,2]]),
                    new Point("H", [[4,8],[5,4],[6,2]])];*/

//A-C-B-D-E     : 7
/*var listOfPoints = [new Point("A", [[1,4],[2,1]]),
                    new Point("B", [[0,4],[2,2],[3,1]]),
                    new Point("C", [[0,1],[1,2],[3,5]]),
                    new Point("D", [[1,1],[2,5],[4,3]]),
                    new Point("E", [[3,3]])];*/

var listOfPoints = []; //list of objects(Points)
var checked = []; //array for saving which points are checked on current path
var notVisitedNeighbours = []; //array for saving weights of neighbour points which are not checked on current path


//declaration of javascript object Point
//for testing add neighbours parameter into 
//constructon after name and insted [] at 
//neighbours put [...neighbours]
function Point(name){ 
    this.name = name; //name of Point
    this.path = []; //previous points on shortest path  
    this.neighbours = []; //list of points that is connected to current point [index_of_neighbour_point_in_listOfPoints, distance(weight)_from_current_point]
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
    checked_backup = [...checked]; //saving current value of array, bc in next loop changing its values

    //console.log(current.name + " - " + current.neighbours + " - " + current.totalWeight);

    //iterating through all neighbour points
    //and calculating distances(weights) for
    //that points and eventually paths if
    //certain conditions are satisfied
    for(let i = 0; i < current.neighbours.length; i++){
        let indexOfNeighbour = current.neighbours[i][0];
        let distanceOfNeighbour = current.neighbours[i][1];
        //console.log(indexOfNeighbour, current.name)

        //skipping neighbours which are 
        //visited on current path
        if(!checked[indexOfNeighbour] && distanceOfNeighbour>0){
            let next = listOfPoints[indexOfNeighbour]; //defining next point (one of neighbours)
            let nextPotentialNewWeight = current.totalWeight + distanceOfNeighbour; //defining potential distance(weight) of next point (one of neighbours)
            checked[indexOfNeighbour] = 1;

            //console.log(next.name);
            //console.log(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= notVisitedNeighbours[i]);
            
            //only for neighbour points which doesn have
            //defined distance(weight) yet or which have
            //larger distance(weight) then current path
            if(typeof(next.totalWeight) == 'undefined' || next.totalWeight >= nextPotentialNewWeight){
                next.totalWeight = nextPotentialNewWeight; //setting new distance(weight) for neighbour
                notVisitedNeighbours.push(indexOfNeighbour);
                
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

    checked = [...checked_backup]; //recovering value of array before loop
    
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