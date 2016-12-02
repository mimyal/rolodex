// initially a copy of contact_view.js
import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Contact from 'app/models/contact';
import ContactView from 'app/views/contact_view';

// el: '#contact-cards'

var ContactListView = Backbone.View.extend({ // parent
  initialize: function(options) {
  this.template = _.template($('#tmpl-contact-card').html());
  console.log('What is this at the moment? ' + this);
  console.log('What is options.contacts at the moment? ' + options.contacts);
  // console.log('What is this.model at the moment? ' + this.model);
  this.modelList = [];
  this.cardList = [];

  options.contacts.forEach(function(rawData) {
    this.addContact(rawData);
  }, this);

  this.listenTo(options.contacts, 'saving', this.render);
  this.listenTo(options.contacts, 'saving', console.log('THIS?'));

//
    // this.listenTo(this.model, 'change', this.render);
  },
//
  render: function() {
    // this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // WANT TO SEE IF THIS WILL LISTEN TO CONTACT VIEW CHANGES
      this.listenTo(this.contacts, 'saving', this.createContact);

      // Add that HTML to our task list
      this.$el.append(card.$el);
    }, this);


    return this;
  },
  events: {
    'click .contact-card': 'setCurrentContact'

  },

  addContact: function(rawData) {
    // Create a Task from this raw data
    var contact = new Contact(rawData); // child

    // Add the new task model to our list
    this.modelList.push(contact);

    // Create a card for the new task
    var card = new ContactView({
      model: contact,
      template: this.template
    });

    // Add the card to our card list
    this.cardList.push(card);
  },

  createContact: function(rawData) {
    // event.preventDefault();
    console.log('Time to create a new contact');
    this.addContact(rawData);
    this.render();
  },

  setCurrentContact: function() {
    console.log('setCurrentContact');
    var currentName = function(e) {
      e = e || window.event; // e=e?
      return e.target.innerHTML; // || e.srcElement;
    };
    console.log('currentName: ' + currentName());
    console.log('this.modelList[i].attributes.name:' + this.modelList[1].attributes.name);
    console.log('NAME: ' + currentName());
    for (var i = 0; i < this.modelList.length; i++) {
      if (currentName() == this.modelList[i].attributes.name) {
        this.currentContact = this.modelList[i].attributes;
        console.log('currentContact: ' + this.currentContact);
      }
    }

    // this.currentContact = this.modelList[2].attributes;
    console.log('CC: ' + this.currentContact.name);
  }

});
//
export default ContactListView;
