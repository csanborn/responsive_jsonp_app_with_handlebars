'use strict';

function myAppInit(data){
	// jsonp callback calls this function
	
	myApp.init(data);
}

var myApp = {

	init: function(data){
		this.data = data.posts;
		this.dataLength = this.data.length;
		this.initialLoad = this.dataLength < 10 ? this.dataLength : 10;
		this.loaded = 0; // keeps track of how many posts have been written to the page
		
		this.appendData();

		this.addDocumentListener();
	},

	appendData: function(){
		var self = this,
			source = document.querySelector('#post-template').innerHTML,
		    template = Handlebars.compile(source),
		    frag = document.createDocumentFragment(),
		    article,
		    loadMore;


		for(var i = 0; i < self.initialLoad && self.loaded < self.dataLength; i++, self.loaded++){
		 	article = document.createElement('article');
		 	article.innerHTML = template(self.data[self.loaded]);
		 	frag.appendChild(article);
		}


		if(self.loaded < self.dataLength){
			// add a 'See More Articles' button

		 	loadMore = document.createElement('div');
		 	loadMore.classList.add('load-more');
		 	loadMore.textContent = 'See More Articles';
			frag.appendChild(loadMore);
		}

		document.querySelector('body').appendChild(frag);

	},

	addDocumentListener: function(){
		var	self = this, target, parent;

		document.addEventListener('click', function(e){
			target = e.target;
			parent = target.parentNode;

			if(target.classList.contains('toggle')){
				self.addToggleHandler(target, parent);
			}

			if(target.classList.contains('load-more')){
				self.addLoadMoreHandler(target, parent);
			}
			
		});
	},

	addToggleHandler: function(target, parent){
		// handler for toggle button to expand/collapse full article

		var	expandedClass = 'expanded';

		if(parent.classList.contains(expandedClass)){
			parent.classList.remove(expandedClass);
		} else {
			parent.classList.add(expandedClass);
		}
	},

	addLoadMoreHandler: function(target, parent){
		// handler to load more articles
		// remove 'Load more' button and fetch new articles

		parent.removeChild(target);
		this.appendData();
	}	
}

Handlebars.registerHelper('parseDate', function(date) {
// convert this 2016-02-24T15:00:56+00:00 to this February 24, 2016

	var formattedDate = date.split("-"),
		year = formattedDate[0],
		month = formattedDate[1],
		day = formattedDate[2].slice(0,2),
		months = {
			"01": "January",
			"02": "February",
			"03": "March",
			"04": "April",
			"05": "May",
			"06": "June",
			"07": "July",
			"08": "August",
			"09": "September",
			"10": "October",
			"11": "November",
			"12": "December",
		};

	return `${months[month]} ${day}, ${year}`;
});