/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */




(function ($, window, document, undefined) {
  
  'use strict';
//dsdsd

//check if user state == admin or user
//if false, do this..
//if true do that..


//INIT LOCAL STORAGE - IF NO DATA IS PRESENT
  if (localStorage.events == null) {
    //import data from data/events.json
    //input into localStorage.events
    //json file will always have data, which is why this method will always work!
    console.log("localStorage.events is empty");
    $.getJSON("assets/data/events.json").done( function(jData) {
      console.log(jData);
      //put the jData objects into localStorage
      jData = JSON.stringify(jData);
      localStorage.events = jData;
      console.log("localStorage.events successfully populated");
      //populate data in #event-listing

      initPopData(); //populate data in event-management table
    });
  } else if (localStorage.events) {
    //load everything from localstorage and populate the div with data..
    console.log("localStorage.events has data");
    initPopData();
  }

//C from CRUD - onClick #save-btn - save data from interface to localStorage
  $("#create-event-btn").on("click", function() {
    console.log("save-btn clicked");
    //get value of all items..
    var sId = new Date();
    sId = sId.valueOf();
    var sName = $("#wdw-event-create").find("input[name='event-name']").val();
    var sTopics = $("#wdw-event-create").find("input[name='event-topics']").val();
    var sLevel = $("#wdw-event-create").find("input[name='event-level']").val();
    var sSpeaker = $("#wdw-event-create").find("input[name='event-speaker']").val();
    var sSpeakerOrg = $("#wdw-event-create").find("input[name='event-speaker-org']").val();
    var dDate = new Date($("#wdw-event-create").find("input[name='event-date']").val());
    var sTime = $("#wdw-event-create").find("input[name='event-time']").val();
    var sInfo = $("#wdw-event-create").find("input[name='event-info']").val(); //info
    console.log(aTime);
    
    var aTopics = [];
    //get each topic and store it in an array
    var aTopics = sTopics.split(",");
    console.log(aTopics);
    
    for (i = 0; i < aTopics.length; i++) {
      if (aTopics[i].charAt(0) == " ") {
        console.log("first char: " + aTopics[i].charAt(0));
        aTopics[i] = aTopics[i].slice(1, aTopics[i].length);
        console.log("str now equals " + aTopics[i]);
      }
      
      if (aTopics[i].charAt(aTopics[i].length - 1) == " ") {
        console.log("last char: " + aTopics[i].charAt(0));
        aTopics[i] = aTopics[i].slice(0, aTopics[i].length-1);
        console.log("str now equals " + aTopics[i]);
      }
    }
    
    console.log(aTopics);
    
    //set time, if input make sense
    var aTime = sTime.split(":", 2); //split sTime into array with two vars
    aTime.forEach( function(i) {
      console.log("aTime Foreach");
      console.log(i.length);
      if (i.length > 2) {
        console.log(i);
        console.log("Invalid time");
        return;
      } else if (i.length <= 2) {
        var index = aTime.indexOf(i);
        if (index == 0) {
          console.log(i);
          dDate.setHours(i);
        } else if (index == 1) {
          console.log(i);
          dDate.setMinutes(i);
        }
      }
    });
    console.log(dDate);
    
    //create object to push into JSON..
    var jEventObj = {
      id: sId,
      name: sName,
      topic: aTopics,
      level: sLevel,
      speaker: sSpeaker,
      speaker_organization: sSpeakerOrg,
      date: { day: dDate.getDate(), month: dDate.getMonth() , year: dDate.getFullYear() },
      time_24h: { hour: dDate.getHours() , minute: dDate.getMinutes() },
      info: sInfo,
      past: false
    };
    console.log(jEventObj);
    
    //push jEventObj to localStorage
    var localTemp = JSON.parse(localStorage.events);
    localTemp.push(jEventObj);
    localStorage.setItem( "events" , JSON.stringify(localTemp) );
    
    //append newly added data to DOM..
    $("#event-listing").append('<tr data-event-id="' + jEventObj.id + '">\
									<td>' + jEventObj.name + '</td>\
									<td>' + jEventObj.topic + '</td>\
									<td>' + jEventObj.speaker + '</td>\
									<td>' + jEventObj.date.day + ' ' + jEventObj.date.month + ' ' + jEventObj.date.year + '</td>\
									<td>' + jEventObj.time_24h.hour + ':' + jEventObj.time_24h.minute + '</td>\
									<td>\
										<i class="fa fa-pencil" id="edit-event-icon" aria-hidden="true"></i>\
										<i class="fa fa-trash" id="delete-event-icon" aria-hidden="true"></i>\
									</td>\
								</tr>\
	');
  });

//U from CRUD - onClick .fa-edit - open editing interface
  $(document).on("click", "#edit-event-icon", function() {
    console.log(".fa-pencil icon clicked");
    //get tr id of .fa-pencil parent
    var sDataId = $(this).parent().parent().data("event-id");
    //give id a value
    $("#wdw-event-update").attr("data-event-id", sDataId);
    //access localStorage.event
    var localTemp = JSON.parse(localStorage.events);
    //find the localTemp.id == sDataId
    localTemp.forEach( function(j) {
      //find by unique id
      if (j.id == sDataId) {
        //set #wdw-event-update attr to equal sDataId
        //BEGIN struggle with satan's fart stench
        var dDate = j.date.year + "-" + j.date.month + "-" + j.date.day;
        var aDate = dDate.split("-");
        //date property variables
        var sMonth = "";
        var sDay = "";
        if (aDate[1].length == 1) {
          var temp = aDate[1].toString();
          var zero = "0"
          var str = zero.concat(temp);
          aDate[1] = str;
          console.log(aDate[1]);
        }
        if (aDate[2].length == 1) {
          var temp = aDate[2].toString();
          var zero = "0"
          var str = zero.concat(temp);
          aDate[2] = str;
          console.log(aDate[2]);
        }
        var dDate = j.date.year + "-" + aDate[1] + "-" + aDate[2];
        console.log(dDate);
        //END struggle with satan's fart stench. God is good.
        
        //import all input values from localTemp object to DOM
        $("#wdw-event-update").find("input[name='event-name']").val(j.name);
        $("#wdw-event-update").find("input[name='event-topics']").val(j.topic);
        $("#wdw-event-update").find("input[name='event-level']").val(j.level);
        $("#wdw-event-update").find("input[name='event-speaker']").val(j.speaker);
        $("#wdw-event-update").find("input[name='event-speaker-org']").val(j.speaker_organization);
        //SEE NEXT LINE FOR WORKING VERSION - NATIVE JS $("#wdw-event-edit").find("input[name='event-date']").val(dDate);
        document.getElementById("edit-event-date").value = dDate;
        $("#wdw-event-update").find("input[name='event-time']").val(j.time_24h.hour + ":" + j.time_24h.minute);
        $("#wdw-event-update").find("input[name='event-info']").val(j.info);
      }
    });
  });

//U from CRUD - onClick #update-event-btn - save data from editing interface
  $("#update-event-btn").on("click", function() {
    console.log("#update-event clicked");
    //get value of all items..
    var sId = $("#wdw-event-update").attr("data-event-id"); //get from DOM
    var sName = $("#wdw-event-update").find("input[name='event-name']").val();
    var sTopics = $("#wdw-event-update").find("input[name='event-topics']").val();
    var sLevel = $("#wdw-event-update").find("input[name='event-level']").val();
    var sSpeaker = $("#wdw-event-update").find("input[name='event-speaker']").val();
    var sSpeakerOrg = $("#wdw-event-update").find("input[name='event-speaker-org']").val();
    var dDate = new Date($("#wdw-event-update").find("input[name='event-date']").val());
    var sTime = $("#wdw-event-update").find("input[name='event-time']").val();
    var sInfo = $("#wdw-event-update").find("input[name='event-info']").val(); //info
    console.log(aTime);
    
    var aTopics = [];
    //get each topic and store it in an array
    var aTopics = sTopics.split(",");
    console.log(aTopics);
    
    for (i = 0; i < aTopics.length; i++) {
      if (aTopics[i].charAt(0) == " ") {
        console.log("first char: " + aTopics[i].charAt(0));
        aTopics[i] = aTopics[i].slice(1, aTopics[i].length);
        console.log("str now equals " + aTopics[i]);
      }
      
      if (aTopics[i].charAt(aTopics[i].length - 1) == " ") {
        console.log("last char: " + aTopics[i].charAt(0));
        aTopics[i] = aTopics[i].slice(0, aTopics[i].length-1);
        console.log("str now equals " + aTopics[i]);
      }
    }
    console.log(aTopics);
    
    //set time, if input make sense
    var aTime = sTime.split(":", 2); //split sTime into array with two vars
    aTime.forEach( function(i) {
      console.log("aTime Foreach");
      console.log(i.length);
      if (i.length > 2) {
        console.log(i);
        console.log("Invalid time");
        return;
      } else if (i.length <= 2) {
        var index = aTime.indexOf(i);
        if (index == 0) {
          console.log(i);
          dDate.setHours(i);
        } else if (index == 1) {
          console.log(i);
          dDate.setMinutes(i);
        }
      }
    });
    console.log(dDate);
    
    //create object to push into JSON..
    var jEventObj = {
      id: sId,
      name: sName,
      topic: aTopics,
      level: sLevel,
      speaker: sSpeaker,
      speaker_organization: sSpeakerOrg,
      date: { day: dDate.getDate(), month: dDate.getMonth() , year: dDate.getFullYear() },
      time_24h: { hour: dDate.getHours() , minute: dDate.getMinutes() },
      info: sInfo,
      past: false
    };
    console.log(jEventObj);
    
    //push jEventObj to localStorage
    var localTemp = JSON.parse(localStorage.events);
    //find the object in JSON
    localTemp.forEach(function(j) {
      //find object with matching id
      if (j.id == jEventObj.id) {
        //remove object with matching id
        localTemp.splice( localTemp.indexOf(j), 1 );
      }
    });
    //push jEventObj to localTemp
    localTemp.push(jEventObj);
    //rewrite localStorage
    localStorage.setItem( "events" , JSON.stringify(localTemp) );
    //remove data attr from window
    $("#wdw-event-update").attr("data-event-id", "");
    //delete old DOM representation
    $(document).find('[data-event-id='+jEventObj.id+']').remove();
    //append new DOM representation
    $("#event-listing tbody").prepend('<tr data-event-id="' + jEventObj.id + '">\
									<td>' + jEventObj.name + '</td>\
									<td>' + jEventObj.topic + '</td>\
									<td>' + jEventObj.speaker + '</td>\
									<td>' + jEventObj.date.day + ' ' + jEventObj.date.month + ' ' + jEventObj.date.year + '</td>\
									<td>' + jEventObj.time_24h.hour + ':' + jEventObj.time_24h.minute + '</td>\
									<td>\
										<i class="fa fa-pencil" id="edit-event-icon" aria-hidden="true"></i>\
										<i class="fa fa-trash" id="delete-event-icon" aria-hidden="true"></i>\
									</td>\
								</tr>\
	');
  });

//U from CRUD - onClick #cancel-update-event-btn - cancel
  $("#cancel-update-event-btn").on("click", function() {
    //set #wdw-event-update's data-event-id == "";
    $("#wdw-event-update").attr("data-event-id", "");
  });

//D from CRUD - onClick .fa-trash - delete from interface and localstorage
  $(document).on("click", "#delete-event-icon", function() {
    console.log(".fa-trash icon clicked");
    //get tr id of .fa-trash parent
    var sDataId = $(this).parent().parent().data("event-id");
    //access localStorage.event
    var localTemp = JSON.parse(localStorage.events);
    //find the localTemp.id == sDataId
    localTemp.forEach( function(j) {
      if (j.id == sDataId) {
        //remove item from localTemp
        
        localTemp.splice( localTemp.indexOf(j), 1 );
        console.log("ID " + j.id + "spliced from localTemp");
      }
    });
    console.log(localTemp);
    localStorage.events = JSON.stringify(localTemp);
    //delete tr by id
    $(document).find('[data-event-id='+sDataId+']').remove();
  });

//functions

//populate data to tables on pageload
  function initPopData() {
    //since localstorage will always have values,
    //append all of localstorage's content to the corresponding table
    var jEvents = JSON.parse(localStorage.events);
    jEvents.forEach( function(j) {
      $("#event-listing tbody").append('<tr data-event-id="' + j.id + '">\
										<td>' + j.name + '</td>\
										<td>' + j.topic + '</td>\
										<td>' + j.speaker + '</td>\
										<td>' + j.date.day + ' ' + j.date.month + ' ' + j.date.year + '</td>\
										<td>' + j.time_24h.hour + ':' + j.time_24h.minute + '</td>\
										<td>\
											<i class="fa fa-pencil" id="edit-event-icon" aria-hidden="true"></i>\
											<i class="fa fa-trash" id="delete-event-icon" aria-hidden="true"></i>\
										</td>\
									</tr>\
			');
    });
  }
  
  //Hide/Show - Wdw
  function hideWindowsAndShowOneWindow(sWindowId) {
    // $('.wdw').hide();
    $('.wdw').fadeOut(300); //fadeout 500
    // $('#' + sWindowId).show();
    $('#' + sWindowId).fadeIn(300); // fade in 500
  }
  
  
  
  //Storing events
  var aEvents = [];
  
  
  if (localStorage.sEvents) {
    // read the text from the local storage
    // convert that text into an object
    var sEventsFromLocalStorage = localStorage.sEvents;
    aEvents = JSON.parse(sEventsFromLocalStorage);
  }
  
  
  
  $(function () { //Performance in here --> load async first priority
    // FastShell
  });
  
  
  
  
  //Adds events to search  schedule calendar
  for (var i = 0; i < aEvents.length; i++) {  //templating
    //append
    $('#lblEvents').append(
      '<tr>' +
      '<th scope="row">'+'<h4>'+aEvents[i].id+'</h4>'+'</th>'+
      '<td>'+'<h4>'+aEvents[i].name+'</h4>'+'</td>'+
      //'<td class="eventPrice">'+eventPriceChange+'</td>'+
      '<td><i class="fa fa-trash" aria-hidden="true"></i></td>'+
      '</tr>');
  }
  
  
  //Add new Event
  $('#postbtn').on('click', function() {
    
    var sEventId = new Date().getTime();
    var sImageUrl = $('#inputpostimg').val();
    var spostevent = $('#inputpostevent').val();
    var sPostDesc = $('#inputpostdesc').val();
    var sPostLocation = $('#inputpostlocation').val();
    var sLink = "link";
    
    //console.log(sImageUrl + sposttitel + sPostDesc + sPostLocation);
    //Before .calendar-back
    $('#lblEvents').append(
      '<tr>' +
      '<td>'+spostevent+'</td>'+
      '<td>'+sPostLocation+'</td>'+
      '<td>'+sEventId+'</td>'+
      '<td>'+sLink+'</td>'+
      '<td><i class="fa fa-trash" aria-hidden="true"></i></td>'+
      '</tr>');
    
    hideWindowsAndShowOneWindow('wdw-calendar');
    
    
    var jEvent = {};
    jEvent.id = new Date().getTime();
    jEvent.imageUrl = sImageUrl;
    jEvent.postevent = spostevent;
    jEvent.PostDesc = sPostDesc;
    jEvent.sPostLocation = sPostLocation;
    aEvents.push(jEvent);
    //console.log(aEvents);
    //Save to Local storage
    var sFinalEvents = JSON.stringify(aEvents);
    //update the sEvents to local text
    localStorage.sEvents = sFinalEvents;
    
    
    //Read from localstorage and update on load the search calendar witho bbjects
  });
  
  
  $('#lblEvents div').each(function( index ) {
    console.log( index + ': ' + $(this).text());
    $(this).css;
  });
  
  
  
  
  
  
  /**********************************************************************/
  //Functions
  /**********************************************************************/
  
  
  /**********************************************************************/
  //on load
  /**********************************************************************/
  $(document).ready(function() {
    hideWindowsAndShowOneWindow('wdw-events');
  });
  
  
  function isLoggedIn() {
    //if(localStorage.userCreds){
    $('#linkRegister').fadeOut(500);
    $('#linkLogin').fadeOut(500);
    $('#linkLogout').fadeIn(500);
    //}
  }

//func logout
  
  
  /*
   //Define array of events to loop through -> append to the table
   function searchEvents() {
   // Declare variables
   var input, filter, table, tr, td, i;
   input = document.getElementById('topic-search');
   filter = input.value.toUpperCase();
   table = document.getElementById('myTable');
   tr = table.getElementsByTagName('tr');
   
   // Loop through all table rows, and hide those who don't match the search query
   for (i = 0; i < tr.length; i++) {
   
   td = tr[i].getElementsByTagName('td')[0];
   if (td) {
   if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
   tr[i].style.display = '';
   } else {
   tr[i].style.display = 'none';
   }
   }
   }
   }
   
   
   //Search Through Table ->
   $('#myInput').keyup(function() {
   searchEvents();
   });
   */
  
  /*
   function createPost() { //Takes object  Post
   /*
   $('#wdw-all-events').empty();
   var sPostTemplate =
   '<div class="grid_job"><figure class="effect-milo" id="figure1">\
   <img class="featured-company__image" src="${Post.img}" alt=""><figcaption>\
   <h2>${Post.title} <span> ${Post.location} </span>\
   </h2><p>${desc}</p><a href="#">View more</a></figcaption></figure></div>\
   ';
   
   $('#wd-all-events').append(sPostTemplate);
   
   
   }
   */
  
  
  function getPost() {
    var sImageUrl = $('#inputpostimg').val();
    var sposttitel = $('#inputposttitel').val();
    var sPostDesc = $('#inputpostdesc').val();
    var sPostLocation = $('#inputpostlocation').val();
    
    //console.log(sImageUrl + sposttitel + sPostDesc + sPostLocation);
    
    var Post = {
      'postimageurl':sImageUrl,
      'posttitel': sposttitel,
      'postdesc': sPostDesc,
      'postloc': sPostLocation
    };
    
    //Div append
    console.log(Post);
    
    
    //Converts to objects
  }
  
  
  $(document).ready(function() {
    loginAdmin();
  });
  
  function loginAdmin() {
    var userCredsAdmin = {
      'username': 'username',
      'password': 'password'
    };
    
    localStorage.setItem('credentials', JSON.stringify(userCredsAdmin));
  }
  
  
  
  /**********************************************************************/
  //Login on page
  //Authentication is missing - admin - member
  /**********************************************************************/
  $('#loginbtn').on('click', function() {
    var credentials = JSON.parse(localStorage.getItem('credentials'));
    var credentialsMember = JSON.parse(localStorage.getItem('credentialsMember'));
    
    var usernameInput = $('#inputusername').val();
    var password  = $('#inputpassword').val();
    //console.log(usernameInput + password);
    
    if(credentials.username === usernameInput && credentials.password === password || credentialsMember.username === usernameInput && credentialsMember.password === password ) {
      console.log('Welcome Mr.   ' + credentials.username);
      // localStorage.loggedInUser = JSON.stringify(credentials);
      isLoggedIn();
      $('.brand h1').text('Logged in as Admin ' + '# ' + credentials.username);
      
      hideWindowsAndShowOneWindow('wdw-register-member');
      
      console.log(credentialsMember.username + credentialsMember.password);
      // $('.brand h1').text('Logged in as Member' + ' # ' + credentialsMember.username);
    } else {
      console.log('failed login');
    }
    
    
  });
  
  
  /**********************************************************************/
  //Register user on page
  /**********************************************************************/
  $('#memberbtn').on('click', function() {
    
    var inputfname = $('#inputfnamereg').val();
    var inputlname = $('#inputlnamereg').val();
    var inputemail = $('#inputemailreg').val();
    var inputlocation = $('#inputlocationreg').val();
    var inputusername = $('#inputusernamereg').val();
    var inputpass = $('#inputpasswordreg').val();
    
    //console.log('New Registerd user =  ' + inputusername);
    
    var userCreds = {
      "fname" : inputfname,
      "lname": inputlname,
      "email":inputemail,
      "location":inputlocation,
      "username": inputusername,
      "password": inputpass,
      
    };
    
    localStorage.setItem('credentialsMember', JSON.stringify(userCreds));
    
    console.log('Local Storage store', userCreds);
    hideWindowsAndShowOneWindow('wdw-login');
    
  });
  
  /**********************************************************************/
  //Manage Partners
  /**********************************************************************/
  
  
  
  //Save Partners from JSON file if they don't exist into local storage and display them
  // list partners from local storage in the table
  function listPartnersFromLS(){
    //get partners form local storage
    var finalPartners = JSON.parse(localStorage.partners);
    //clear the table content
    $('#partners-table tbody').html("");
    //append each partner in the table
    finalPartners.forEach(function (item) {
      $('#partners-table tbody').append(
        "<tr>\
        <td>" + item.id + "</td>\
        <td>" + item.name + "</td>\
        <td>" + item.type + "</td>\
        <td>" + item.description + "</td>\
        <td>" + item.partnerpic_src + "</td>\
        <td><i class='fa fa-pencil' id='edit-partner-btn' data-partner-id = '"+ item.id +"'></i>\
        <i class='fa fa-trash' id='delete-partner-btn' data-partner-id = '" + item.id + "'></i></td>\
        </tr>");
    });
    
  }
  
  
  $(document).ready( function () {
    $('#wdw-edit-partner').hide();
    $('#wdw-add-partner').hide();
    $('#partners-table tbody').html("");
    // object for partners from local storage
    var oPartners = [];
    //getting the partners from local storage
    if(localStorage.getItem('partners') !== null ) {
      oPartners = JSON.parse(localStorage.partners);
      console.log("local storage: ", oPartners);
    }
    $.getJSON("assets/data/partners.json", function (json_data) {
      
      //if local storage is empty load partners from file
      if(localStorage.getItem("partners") == null || localStorage.getItem("partners") == "[]"){
        localStorage.partners = JSON.stringify(json_data);
      }
      
      //iterating over objects from json file for debugging purposes
      json_data.forEach(function (elem) {
        
        var obj = {};
        
        obj.id = elem.id;
        obj.name = elem.name;
        obj.description = elem.description;
        obj.partnerpic_src = elem.partnerpic_src;
        
        console.log( "Partner id.", obj.id, ", name: ", obj.name, ", description: ", obj.description, ", picture/logo: ", obj.partnerpic_src);
        
      });
      
      listPartnersFromLS();
      
    });
  });
  
  /**********************************************************************/
  //Edit Partner
  /**********************************************************************/
  
  var id;
  //listener to display the edit container and fill input fields with the clicked partner
  $("body").on("click", "#edit-partner-btn", function(){
    id = $(this).data('partner-id');
    //hide partners list and show edit partner container
    $("#wdw-list-partners").hide();
    $("#wdw-edit-partner").show();
    
    var oPartners = JSON.parse(localStorage.partners);
    
    oPartners.forEach(function (elem) {
      
      if(elem.id == id){
        //setting the input fields to be edited
        $("input[name='partner-name']").val(elem.name);
        $("input[name='partner-type']").val(elem.type);
        $("input[name='partner-descr']").val(elem.description);
        $("input[name='partner-pict']").val(elem.partnerpic_src);
        
      }
      
    });
  });
  
  //saving the edited partner
  $('#partner-save-btn').on('click', function () {
    
    var obj = {};
    
    obj.id = id;
    obj.name = $("input[name='partner-name']").val()
    obj.type = $("input[name='partner-type']").val();
    obj.description = $("input[name='partner-descr']").val();
    obj.partnerpic_src = $("input[name='partner-pict']").val();
    
    
    var oPartners = JSON.parse(localStorage.partners);
    
    oPartners.forEach(function (elem, index) {
      if(elem.id == id){
        //replacing only for the found id
        oPartners[index] = obj;
      }
    });
    //setting the value updated in localStorage
    localStorage.setItem("partners", JSON.stringify(oPartners));
    //display the partners list instead edit partner
    $("#wdw-edit-partner").hide();
    listPartnersFromLS();
    $("#wdw-list-partners").show();
  });
  
  $('#cancel-btn').on('click', function () {
    $("#wdw-edit-partner").hide();
    $("#wdw-list-partners").show();
  });
  /**********************************************************************/
  //Add Partner
  /**********************************************************************/
  
  $('#add-partner-btn').on('click', function () {
    $("#wdw-list-partners").hide();
    $("#wdw-add-partner").show();
  });
  
  $('#partner-add-now-btn').on('click', function () {
    
    var obj = {};
    
    /* obj.id = new Date().getTime();*/
    obj.name = $("input[name='partner-add-name']").val()
    obj.type = $("input[name='partner-add-type']").val();
    obj.description = $("input[name='partner-add-descr']").val();
    obj.partnerpic_src = $("input[name='partner-add-pict']").val();
    
    $("input[name='partner-add-name']").val("")
    $("input[name='partner-add-type']").val("");
    $("input[name='partner-add-descr']").val("");
    $("input[name='partner-add-pict']").val("");
    
    //save new partner in local storage
    var oPartners = JSON.parse(localStorage.partners);
    obj.id = oPartners.length + 1;
    oPartners.push(obj);
    localStorage.setItem('partners', JSON.stringify(oPartners));
    listPartnersFromLS();
    $("#wdw-add-partner").hide();
    $("#wdw-list-partners").show();
  });
  
  $('#cancel-btn2').on('click', function () {
    $("#wdw-add-partner").hide();
    $("#wdw-list-partners").show();
  })
  /**********************************************************************/
  //Delete Partners
  /**********************************************************************/
  //listener to delete one partner
  $("body").on("click","#delete-partner-btn",function(){
    id = $(this).data('partner-id');
    //get the partners from local storage
    var oPartners = JSON.parse(localStorage.partners);
    //iterate through partners object and delete the one with a specific id
    oPartners.forEach(function (elem, index) {
      
      //remove the partner with the id corresponding with the id of the one clicked
      if(elem.id == id){
        //sweet alert for confirmation
        swal({
            title: "Are you sure?",
            text: "Do you want to delete this partner!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
          },
          function(){
            oPartners.splice(index, 1);
            localStorage.setItem("partners", JSON.stringify(oPartners));
            listPartnersFromLS();
            swal("Deleted!", "The partner has been deleted.", "success");
          });
      }
      
    });
    
    
  });
  

/**********************************************************************/
//Home page Search 
/**********************************************************************/

function compare(inputVal, dataVal, jObj, jData) {
  var inputValLower = inputVal.toLowerCase();
  var dataValLower = dataVal.toLowerCase();

  console.log("The input value is: " + inputValLower);
  console.log("The JSON data to compare is: " + dataValLower);

  var bool = dataValLower.includes(inputValLower);
  console.log("The bool = " + bool);

    if (bool == true) {
      console.log("Match made");
      jData.push(jObj);
    } else {
      console.log("False");
    }
}

//on initialization, load from localStorage.events


 //#searchEvents on Click --> Search through localStorage.events
 //output results in the DOM
  $('#searchEvents').on('click', function () {
      //get input value of #search-engine
      var inputSearchField =  $('#search-engine').val();
      var aInput = inputSearchField.split(" ");
      var jResults = [];

      console.log(aInput);
      
      //get instance of localStorage
      var jTemp = JSON.parse(localStorage.events);
      
      //check each aInput for a match
      aInput.forEach(function(a) {

        var temp = a;

        jTemp.forEach(function(j){

          var name = j.name;
          var topic = j.topic;
          var level = j.level;
          var org = j.speaker_organization;
          var location = j.location;

          compare(temp, name, j, jResults);
          //compare(temp, topic, j, jResults); //this is an array
          compare(temp, level, j, jResults);
          compare(temp, org, j, jResults);
          //compare(temp, location, j, jResults); //this is a JSON object

        });
      });

      //remove duplicates
      console.log(jResults);

      var jResultsFinal = jResults.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
      });

      console.log(jResultsFinal);

      //clear default items from 
      $("#event-listing").empty();

      var baseNumber = jResultsFinal.length / 3;
      console.log("The base number is: " + baseNumber);

      //append to DOM
      jResultsFinal.forEach(function(j) {
        var aTopics = j.topic;

        console.log(jResultsFinal.length);
        console.log(j.name);

        //get an instance of an event and append it to the DOM..
        $("#event-listing").append('\
            <div class="event-thirds" data-event-id="' + j.id + '">\
              <div>\
                <h1>' + j.name + '</h1>\
                <h2>' + aTopics + '</h2>\
                <h5>' + j.date.day + '-' + j.date.month + '-' + j.date.year + '</h5>\
              </div>\
            </div>\
          ');


      });
  }); 

  /**********************************************************************/
  //Event Listeners
  /**********************************************************************/
  
  
  //Post
  $('#postbtn').on('click', function() {
    getPost();
    console.log('post event');
  });

//Nav - Login
  $('#link-login').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-login');
    console.log('Nav - login clicked');
  });

//Nav - Home
  $('#link-home').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-events');
    console.log('Nav - Home Clicked ');
  });


//Nav - Event
  $('#link-events').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-event-manager-container');
  });


//Nav - News
  $('#linkNews').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-news');
  });


//Nav - Partners
  $('#link-partners').on('click', function() {
    hideWindowsAndShowOneWindow('partners-container');
  });

//Nav - Calendar
  $('#linkCalendar').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-calendar');
    console.log('Nav - Calendar clicked');
  });

//Nav - All Events
  $('#linkAllEvents').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-all-events');
    console.log('Nav - all events click');
  });


//Page - Post an event
  $('#btnpostevent').on('click', function() {
    hideWindowsAndShowOneWindow('wdw-post-event');
    console.log('Postclicke');
  });

//Remove Event
  aEvents.indexOf(this);
  
  $('.fa-fa-trash').click(function() {
    console.log('Trashed clicked', aEvents, aEvents[i], aEvents.length);
    aEvents.splice(1,1);
  });


//Trash Delete search events
  $('.fa-fa-trash').click(function() {
    $(this).parent().hide();
    console.log('Trash delete clicked ');
  });



//Admin Index
  
  console.log('events' , aEvents);
  
})(jQuery, window, document);


//Nav - members 
$('#link-members').on('click', function() {
  hideWindowsAndShowOneWindow('members-container');
});