// global map
const globalConnectingMap = new Map();

// confirmed paths
const confirmedPaths = [];

// station class
class Station {
    constructor(stationName, connectingNodeMap) {
        this.stationName = stationName;
        this.connectingNodeMap = connectingNodeMap;
        globalConnectingMap.set(stationName, this.connectingNodeMap);
    }
}

// dfs
function depthFirstTraversal(source, destination, visited) {

    const visitedClone = [...visited];

    if (source === destination) {
        visitedClone.push(source);
        console.log(visitedClone)
        confirmedPaths.push([...visitedClone]);
        return;
    }

    visitedClone.push(source);

    if (globalConnectingMap.get(source)) {
        for (const station of globalConnectingMap.get(source).keys()) {
            if (!visitedClone.includes(station)) {
                this.depthFirstTraversal(station, destination, visitedClone);
            }
        }
    }
}


// create stations
const DELHI = new Station('DELHI', new Map([
    ["JAIPUR", ["T1"]],
    ["BHUBANESWAR", ["T3"]]
]));

const JAIPUR = new Station('JAIPUR', new Map([
    ["GANDHINAGAR", ["T6"]],
    ["BHOPAL", ["T1"]],
    ["LUCKNOW", ["T2"]]
]));

const BHUBANESWAR = new Station('BHUBANESWAR', new Map([
    ["KOLKATA", ["T3", "T9"]],
    ["HYDERABAD", ["T4"]]
]));

const BHOPAL = new Station('BHOPAL', new Map([
    ["MUMBAI", ["T1"]]
]));

const MUMBAI = new Station('MUMBAI', new Map([
    ["GANDHINAGAR", ["T1"]]
]));

const GANDHINAGAR = new Station('GANDHINAGAR', new Map([
    ["JAIPUR", ["T7"]]
]));

const HYDERABAD = new Station('HYDERABAD', new Map([
    ["CHENNAI", ["T4"]],
    ["BANGALORE", ["T5"]],
    ["BHUBANESWAR", ["T8"]]
]));

const CHENNAI = new Station('CHENNAI', new Map([
    ["KOLKATA", ["T4", "T9"]]
]));

const KOLKATA = new Station('KOLKATA', new Map([
    ["BANGALORE", ["T3"]]
]));


// inputs from user
const sourceStation = "DELHI";
const destinationStation = "BANGALORE";

// search trains
(function printInfo() {

    depthFirstTraversal(sourceStation, destinationStation, []);

    // print confirmed paths
    console.log('globalConnectingMap', globalConnectingMap);

    // display route from source to destination along with the train(s)
    if (confirmedPaths.length === 0) {
        document.write("<h1>No Connecting Paths Found!</h1> ");
    } else {
        document.write("<h2>Possible Paths:</h2> ");
        for (let k = 0; k < confirmedPaths.length; k++) {
            let currentPath = "";
            for (let i = 0; i < confirmedPaths[k].length - 1; i++) {

                let trainList = globalConnectingMap.get(confirmedPaths[k][i]).get(confirmedPaths[k][i + 1]);
                console.log(trainList);
                let trains = "";
                for (train of trainList) {
                    if (trains === "") {
                        trains = train;
                    }
                    else {
                        trains = trains + " / " + train;
                    }
                }
                if (currentPath === "") {
                    currentPath = confirmedPaths[k][i] + "<b> > (" + trains + ") ></b> " + confirmedPaths[k][i + 1];
                }
                else {
                    currentPath = currentPath.replace(confirmedPaths[k][i], confirmedPaths[k][i] + "<b> > (" + trains + ") ></b> " + confirmedPaths[k][i + 1]);
                }
            }
            document.write("<br>" + (k + 1) + ". " + currentPath + "<br>");
        }
    }
})();