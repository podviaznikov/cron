//
// hook.io-cron hook - adds and removes jobs that emit Hook events on customizable time intervals 
//
var Hook = require('hook.io').Hook,
    http = require('http'),
    util = require('util');

var CronHook = exports.CronHook = function(options){
  var self = this;
  Hook.call(self, options);
  self.INTERVAL = 2000;
  self.on('*::jobs::add' , self.addJob);
  self.on('jobs::add'    , self.addJob);
  self.on('hook::ready'  , self._poll());
};

// CronHook inherits from Hook
util.inherits(CronHook, Hook);

CronHook.prototype.addJob = function(job){
  var self = this;
  var jobs = self.jobs || [];
  job.name = job.name || 'default job name';
  jobs.push(job);
  self.jobs = jobs;
};

CronHook.prototype.removeJob = function(options, hook){
  //
  // TODO:
  //
};

CronHook.prototype._poll = function(){
  var self = this;
  setInterval(function(){
    //self.log(self.name, 'firing poll interval');
    self._checkJobs();
  }, self.INTERVAL)
};

CronHook.prototype._checkJobs = function(){
  var self = this;
  var jobs = self.jobs;
  //
  // Iterate through all your jobs and execute them
  //
  //
  // TODO: implement more complex cron logic, instead of just firing them on every interval
  //
  if(jobs){
    jobs.forEach(function(job){
      self.emit(job.event, job.data);
    });
  }
};
