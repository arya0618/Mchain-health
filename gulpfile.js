
var gulp = require('gulp')
var exec = require('child_process').exec
spawn = require('child_process').spawn
var node;

/**
* $ gulp restart
* description: launch the server. If there's a server already running, kill it.
*/
gulp.task('server', function() {
 if (node) node.kill()
 node = spawn('node', ['app.js'], {stdio: 'inherit'})
 node.on('close', function (code) {
   if (code === 8) {
     gulp.log('Error detected, waiting for changes...');
   }
 });
})

gulp.task("killall",function(){
  exec('killall node', function () {
   console.log("killed all node port")
  });
})

