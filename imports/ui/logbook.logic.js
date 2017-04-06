import { Template } from 'meteor/templating';
import { Logbook, LabResults, UserInfo } from '/lib/collections';
import SimpleSchema from 'simpl-schema';

Template.logbook.onCreated(function(){
  this.correction = new ReactiveVar(0);
  this.subscribe("logbook");
  this.subscribe("labresults");
  this.subscribe("userinfo");
});

Template.logbook.helpers({
  currentUser() {
	  return UserInfo.findOne();
  },
  curYear() {
	 var today = new Date();
	 return today.getFullYear();
  },
  tasks() {
      return Logbook.find({});
  },
  labresults() {
	  return LabResults.find({});
  },
  correction() {
	  return Template.instance().correction.get();
  },
  isf() {
	  return UserInfo.find().map(function(post) { return post.isf; });
  },
  icr() {
	  return UserInfo.find().map(function(post) { return post.icr; });
  },
});

window.Logbook = Logbook;
window.UserInfo = UserInfo;
window.LabResults = LabResults;

var grin = emojione.toImage(':grin:');
var cry = emojione.toImage(':cry:');

Template.logbook.events({
  'submit .new-record'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const prebreakfast = target.prebreakfast.value;
    const prelunch = target.prelunch.value;
    const predinner = target.predinner.value;
    const prebed = target.prebed.value;
    const midnight = target.midnight.value;
 
    // Insert a record into the collection
    Meteor.call('logbook.insert', prebreakfast, prelunch, predinner, prebed, midnight);
	
	Meteor.call('logbook.checkBreakfast',prebreakfast, function(error, result){
		if(result){
			swal({
				title: 'High Glucose Detected!',
				text: 'It seems that you\'re glucose reading is a bit high.\n Would you like a recommended correction dose?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes!',
				cancelButtonText: 'No',
			}).then(function() {
				Meteor.call('calculator.calcCorrection', prebreakfast, function(error, result) {
					if(error){
						swal('Oops...', 'Something went wrong!', 'error');
						console.log(error.reason);
					}else{
						swal(
							'Here you go',
							'Please give '+result+'u ' + grin,
							'success'
						);
					}
				});
			}, function(dismiss) {
				// dismiss can be 'cancel', 'overlay', 'close', 'timer'
				if (dismiss === 'cancel') {
					swal(
						'Aww',
						'You didn\'t want a correction. ' + cry,
						'error'
					);
				}
			});
		}
	});
	
	Meteor.call('logbook.checkBreakfast',prelunch, function(error, result){
		if(result){
			swal({
				title: 'High Glucose Detected!',
				text: 'It seems that you\'re glucose reading is a bit high.\n Would you like a recommended correction dose?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes!',
				cancelButtonText: 'No',
			}).then(function() {
				Meteor.call('calculator.calcCorrection', prelunch, function(error, result) {
					if(error){
						swal('Oops...', 'Something went wrong!', 'error');
						console.log(error.reason);
					}else{
						swal(
							'Here you go',
							'Please give '+result+'u  '+ grin,
							'success'
						);
					}
				});
			}, function(dismiss) {
				// dismiss can be 'cancel', 'overlay', 'close', 'timer'
				if (dismiss === 'cancel') {
					swal(
						'Aww',
						'You didn\'t want a correction. ' + cry,
						'error'
					);
				}
			});
		}
	});
	
	Meteor.call('logbook.checkBreakfast',predinner, function(error, result){
		if(result){
			swal({
				title: 'High Glucose Detected!',
				text: 'It seems that you\'re glucose reading is a bit high.\n Would you like a recommended correction dose?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes!',
				cancelButtonText: 'No',
			}).then(function() {
				Meteor.call('calculator.calcCorrection', predinner, function(error, result) {
					if(error){
						swal('Oops...', 'Something went wrong!', 'error');
						console.log(error.reason);
					}else{
						swal(
							'Here you go',
							'Please give '+result+'u ' + grin,
							'success'
						);
					}
				});
			}, function(dismiss) {
				// dismiss can be 'cancel', 'overlay', 'close', 'timer'
				if (dismiss === 'cancel') {
					swal(
						'Aww',
						'You didn\'t want a correction. ' + cry,
						'error'
					);
				}
			});
		}
	});
	
	Meteor.call('logbook.checkBreakfast',prebed, function(error, result){
		if(result){
			swal({
				title: 'High Glucose Detected!',
				text: 'It seems that you\'re glucose reading is a bit high.\n Would you like a recommended correction dose?',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes!',
				cancelButtonText: 'No',
			}).then(function() {
				Meteor.call('calculator.calcCorrection', prebed, function(error, result) {
					if(error){
						swal('Oops...', 'Something went wrong!', 'error');
						console.log(error.reason);
					}else{
						swal(
							'Here you go',
							'Please give '+result+'u ' + grin,
							'success'
						);
					}
				});
			}, function(dismiss) {
				// dismiss can be 'cancel', 'overlay', 'close', 'timer'
				if (dismiss === 'cancel') {
					swal(
						'Aww',
						'You didn\'t want a correction. ' + cry,
						'error'
					);
				}
			});
		}
	});
	
    // Clear form
    target.prebreakfast.value = '';
    target.prelunch.value = '';
    target.predinner.value = '';
    target.prebed.value = '';
    target.midnight.value = '';
  },
  'submit .new-labrecord'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const prebreakfast = target.hba1c.value;
    const prelunch = target.fast.value;
    const predinner = target.bmi.value;
    const prebed = target.malbumin.value;
    const midnight = target.lipid.value;
	const crea = target.crea.value;
 
    // Insert a record into the collection
    Meteor.call('labresult.insert', prebreakfast, prelunch, predinner, prebed, midnight, crea, function(error, result) {
		if(error){
			swal('Oops...', 'Something went wrong!', 'error');
			console.log(error.reason);
		}else{
			swal(
				'Success!',
				'New lab result inserted. ' + grin,
				'success'
			);
		}
	});
  },
  'click .delete'() {
    Meteor.call('logbook.remove', this._id, function(error, result) {
		if(error){
			swal('Oops...', 'Something went wrong!', 'error');
			console.log(error.reason);
		}else{
			swal(
				'Success!',
				'Diary entry deleted. ' + grin,
				'success'
			);
		}
	});
  },
  'click .deleteLab'() {
	  Meteor.call('labresult.remove', this._id, function(error, result) {
		if(error){
			swal('Oops...', 'Something went wrong!', 'error');
			console.log(error.reason);
		}else{
			swal(
				'Success!',
				'Lab result deleted. ' + grin,
				'success'
			);
		}
	});
  },
  'click .refreshRatio'() {
	  Meteor.call('calculator.calcICR');
	  Meteor.call('calculator.calcISF');
  },
  'submit .calcCorrection'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
	const reading = target.reading.value;
 
	if(reading > 6){
		// Insert a record into the collection
		Meteor.call('calculator.calcCorrection', reading, function(error, result) {
			if(error){
				swal('Oops...', 'Something went wrong!', 'error');
				console.log(error.reason);
			}else{
				swal(
					'Success!',
					'Please give '+result+'u ' + grin,
					'success'
				);
			}
		});
	}else{
		swal(
			'Success!',
			'You don\'t need to give any correction.\n Your reading is already good. ' + grin,
			'success'
		);
	}
 
    // Clear form
	target.reading.value = '';
  },
});
