// const { remote } = require('electron');
const remote = require('electron').remote;
const app = remote.app;
console.log(app.getPath('userData'));

// // let currWindow = remote.BrowserWindow.getFocusedWindow();
// let currWindow = remote.getCurrentWindow();

// globalThis.minimizeCurrentWindow = function(){
//   currWindow.minimize();
// }

// globalThis.maximizeCurrentWindow = function(){
//     currWindow.maximize();
// }

// globalThis.unMaximizeCurrentWindow = function(){
//     currWindow.unmaximize();
// }

// globalThis.closeCurrentWindow = function(){
//   currWindow.close();
// }


console.log("PRELOADDDDD");
var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
// var db = new sqlite3.Database(__dirname + '/app.db');
var db = new sqlite3.Database(app.getPath('userData') + '/app.db');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();