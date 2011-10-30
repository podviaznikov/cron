var CronJob = require('./cron.job').CronJob;

function Scheduler(){
  console.log("Init scheduler",this.jobs);
  this.jobs = {};
  console.log("Init scheduler2",this.jobs);
  //default interval is one second
  this.conf = {minInterval: 1000};
}
Scheduler.prototype.addJob = function(id, cronMask, task){
  console.log("Added job");
  var job = new CronJob(id, cronMask, task);
  this.jobs[id] = job;
  return job;
};
Scheduler.prototype.addAndRunJob = function(id, cronMask, task){
  console.log("Added job");
  var job = this.addJob(id, cronMask, task);
  job.start();
  return job;
};
Scheduler.prototype.startAll = function(){
  console.log("JOBS", this.jobs)
//  this.jobs.forEach(function(job){
//    console.log("JOB>>", job);
//    job.start();
//  });
};
Scheduler.prototype.stopAll = function(){
  var ids = Object.keys(this.jobs);
  for(var i = 0; i < ids.length; i++){
    var jobId = ids[i];
    this.stop(jobId);
  }
};
Scheduler.prototype.stop = function(id){
  var job = this.jobs[id];
  if(job){
    job.stop();
  }
};
Scheduler.prototype.releaseAll = function(){
  var ids = Object.keys(this.jobs);
  for(var i = 0; i < ids.length; i++){
    var jobId = ids[i];
    this.release(jobId);
  }
};
Scheduler.prototype.release = function(id){
  var job = this.jobs[id];
  if(job){
      job.stop();
      delete this.jobs[id];
  }
};
Scheduler.prototype.count = function(){
  return Object.keys(this.jobs).length;
};
exports.create = function(){
  return new Scheduler();
};

