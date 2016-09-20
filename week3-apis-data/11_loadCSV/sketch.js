/**
 * Loading Tabular Data
 * by Daniel Shiffman.  
 * 
 * This example demonstrates how to use loadTable()
 * to retrieve data from a CSV file and make objects 
 * from that data.
 *
 * Here is what the CSV looks like:
 *
 x,y,diameter,name
 160,103,43.19838,Happy
 372,137,52.42526,Sad
 273,235,61.14072,Joyous
 121,179,44.758068,Melancholy
 */

// An Array of Bubble objects
var bubbles;
// A Table object
var table;

function setup() {
  noCanvas();
  loadTable("data.csv", "header", gotData);
}


function gotData(table) {

  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  bubbles = []; 

  // You can access iterate over all the rows in a table
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    // You can access the fields via their column name (or index)
    var x = row.get("x");
    var y = row.get("y");
    var d = row.get("diameter");
    var n = row.get("name");
    var div = createDiv(n);
    div.position(x,y);
    div.style('padding','20px');
    div.style('background-color','#CCC');
  }
}
