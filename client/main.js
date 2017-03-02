import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Logbook } from '../imports/api/Logbook.js';

import { ICR } from '../imports/api/Users.js';
import { ISF } from '../imports/api/Users.js';

// Import some stratup functions
import '../imports/startup/routes.js';

// Import the main page
import './main.html';

// Import template logics
import '../imports/ui/logbook.logic.js';
import '../imports/ui/calculator.logic.js';

// Global Template Logic
Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('logbook');
});

Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-atTextInput'].replaces('atTextInput');

// User Management
var loginFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
		BlazeLayout.render('content', {main: 'dashboard'});
    }
    if (state === "signUp") {
		BlazeLayout.render('content', {main: 'dashboard'});
    }
  }
};

var postLogout = function(){
    BlazeLayout.render('content', {main: 'index'});
};

AccountsTemplates.configure({
    onSubmitHook: loginFunc,
	onLogoutHook: postLogout
});


