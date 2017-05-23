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



		//Hide/Show - Wdw 
		function hideWindowsAndShowOneWindow(sWindowId) {
			$('.wdw').hide(); //fadeout 500 
			$('#' + sWindowId).show(); // fade in 500 
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



//on load
$(document).ready(function() {
   hideWindowsAndShowOneWindow('wdw-home'); 
});


function isLoggedIn() {
	//if(localStorage.userCreds){
	$('#linkRegister').fadeOut(500);
	$('#linkLogin').fadeOut(500);
	$('#linkLogout').fadeIn(500);
	 //}
}

//func logout 



//Define array of events to loop through -> append to the table
function searchEvents() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById('myInput');
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
  //Event Listeners 
  /**********************************************************************/

  //Post
  $('#postbtn').on('click', function() {
	  getPost(); 
	console.log('post event');
  });

//Nav - Login 
$('#linkLogin').on('click', function() {
   hideWindowsAndShowOneWindow('wdw-login');
    console.log('Nav - login clicked');
});

//Nav - Home 
$('#linkHome').on('click', function() {
	hideWindowsAndShowOneWindow('wdw-home');
	console.log('Nav - Home Clicked ');
});


//Nav - Event
$('#linkEvents').on('click', function() {
	hideWindowsAndShowOneWindow('wdw-events');
	console.log('Nav - Link Event');
});


//Nav - News 
$('#linkNews').on('click', function() {
	hideWindowsAndShowOneWindow('wdw-news');
	console.log('Nav - News clicked');
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
