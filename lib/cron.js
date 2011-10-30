//
// hook.io-cron hook - adds and removes jobs that emit Hook events on customizable time intervals
//
var Hook = require('hook.io').Hook,
    Scheduler = require('./scheduler'),
    util = require('util');

var CronHook = exports.CronHook = function(options){
  var self = this;
  self.scheduler = Scheduler.create()
  Hook.call(self, options);
  console.log("Options", options, self.scheduler);
  //self.on('*::jobs::add', self.addJob);
  //self.on('jobs::add'   , self.addJob);
  self.on('hook::ready' , function(){
    console.log("hello",this.jobs);
    for(var i = 0; i < this.jobs.length; i++){
      self.addJob(this.jobs[i]);
    }
    //self.scheduler.startAll();
  });
};

// CronHook inherits from Hook
util.inherits(CronHook, Hook);

CronHook.prototype.addJob = function(job){
  var self = this;
  console.log("Adding job", job);
  self.scheduler.addAndRunJob(job.name, '*/2 * * * * *', function(){
    self.emit(job.event, job.data);
  });
};

