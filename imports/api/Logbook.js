import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Logbook, LabResults } from '/lib/collections';

if (Meteor.isServer) {
	
	Logbook.permit(['insert', 'update', 'remove']).ifLoggedIn();
	
	LabResults.permit(['insert', 'update', 'remove']).ifHasRole(['doctor', 'super-admin']);
	
  // This code only runs on the server
	Meteor.publish('logbook', function tasksPublication() {
		return Logbook.find({
			$or: [
				{ userId: this.userId }
			],
		});
	});
	
	Meteor.publish('labresults', function labPublication() {
		return LabResults.find({
			$or: [
				{ userId: this.userId }
			],
		});
	});
}

Meteor.methods({
  'logbook.insert'(prebreakfast, prelunch, predinner, prebed, midnight) {
    check(prebreakfast, String);
    check(prelunch, String);
    check(predinner, String);
    check(prebed, String);
    check(midnight, String);
	
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var curDate = day + '/' + month;
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Logbook.insert({
      userId: this.userId,
      date: curDate, // current time
	  prebreakfast,
	  prelunch,
	  predinner,
	  prebed,
	  midnight,
    });
  },
  'logbook.remove'(recordId) {
    check(recordId, String);
 
    Logbook.remove(recordId);
  },
  'logbook.checkBreakfast'(prebreakfast){
	  if(prebreakfast > 6){
		  return true;
	  }
  },
  'logbook.checkLunch'(prebreakfast){
	  if(prebreakfast > 6){
		  return true;
	  }
  },
  'logbook.checkDinner'(prebreakfast){
	  if(prebreakfast > 6){
		  return true;
	  }
  },
  'logbook.checkBed'(prebreakfast){
	  if(prebreakfast > 6){
		  return true;
	  }
  }
});