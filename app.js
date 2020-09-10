const formBookmarker = document.querySelector('.formContainer');


// Listen to Submit
formBookmarker.addEventListener('submit', addBookmark);


// Function to add a bookmark
function addBookmark(e) {
	// get form values
	const siteName = document.querySelector('#sitename').value;
	const siteUrl = document.querySelector('#url').value;

	if (!validateForm(siteName, siteUrl)) {
		return false;
	};

	const bookmark = {
		name: siteName,
		url: siteUrl
	}

	// const bookmark = new Array(siteName, siteUrl); 

	// Test to confirm if bookmark is null
	if (localStorage.getItem('bookmarks') === null){
		// initialize array
		const bookmarks = [];
		// Add to Array
		bookmarks.push(bookmark);
		//Store to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from local storage
		const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add to array
		bookmarks.push(bookmark);
		// Re-set to Local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	document.querySelector('.formContainer').reset();
	
	//Fetch Bookmarks
	fetchBookmarks();

	// Prevents form from submitting to Backend
	e.preventDefault();
}


function deleteBookmark(siteUrl) {
	// Get the bookmark from localStroage 
	const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through the bookmark
	for (var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == siteUrl) {
			//Remove the Bookmark from array
			bookmarks.splice(i, 1);

		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Fetch Bookmarks
	fetchBookmarks();
}

function fetchBookmarks() {
	// Get bookmarks from local storage
	const bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 

	// Get Output
	const bookmarkedSites = document.querySelector('#bookmarkedSites');

	bookmarkedSites.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
	 	const siteName = bookmarks[i].name;
		const siteUrl = bookmarks[i].url;

		bookmarkedSites.innerHTML +=  '<div class="bookmarkResult">'+
									  '<h3>'+siteName+
									  '<a href="'+siteUrl+'" target="_blank">Visit bookmark</a>' +
									  '<a onclick="deleteBookmark(\''+siteUrl+'\')" class="red" href="#">Delete bookmark</a>' +
									  '</h3>'+
									  '</div>';
	 } 
}

function validateForm(siteName, siteUrl) {
	if (!siteName || !siteUrl) {
		alert('Pls, fill in the Site Name & Site Url');
		return false;
	}


	const exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
	const regex = new RegExp(exp);

	if (!siteUrl.match(regex)) {
		alert('Please enter a vlid url');
		return false;
	}

	else {
		return true;
	}
}