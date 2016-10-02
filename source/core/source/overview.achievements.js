/*
 * Addon OverviewAchievements Script
 * Author: DarkThanos, GreatApo
 */

// OverviewAchievements
var gca_overview_achievements = {
	// Pre Inject code
	preinject : function(){
		// if Achievements
		if(gca_section.submod == 'achievements'){
			// Check if style is active
			if(gca_options.bool("overview","achivements_layout"))
				// Add class tag
				document.documentElement.className += " gca_achivements_styling";
		}
	},

	// Inject Code
	inject : function(){
		// Improve Layout
		(gca_options.bool("overview","achivements_layout") && 
			this.layout.improve());
	},

	// Layout Improvements
	layout : {
		improve : function(){

			var total = 0;
			var competed = 0;
			var data;

			data = this.showCategoryPercent(0);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(1);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(2);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(10);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(3);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(8);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(9);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(12);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(16);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(21);
			competed += data[0];
			total += data[1];

			// Total Progress Percent
			var percent = 0;
			if(total>0) percent = Math.round((competed*100)/total);

			var bar = this.createProgressBar(percent);
			var totalPoints = document.getElementsByClassName('achievement_header_points')[0];
			totalPoints.parentNode.insertBefore(bar, totalPoints);

		},

		showCategoryPercent : function(category){
			// Check if category exist
			if(!document.getElementById(category+'_details') || !document.getElementById('CAT_'+category)){
				return [0,0];
			}

			// Total category achivements
			// var total = document.getElementById(category+'_details').getElementsByClassName('achievement_title_box').length;
			var total = document.getElementById(category+'_details').innerHTML.match(/achievement_medal_(full|inactive)\.gif/ig);
			if(total != null) total = total.length;
			else total = 0;
			// Completed category achivements
			// var competed = document.getElementById(category+'_details').getElementsByClassName('achievement_title').length;
			var competed = document.getElementById(category+'_details').innerHTML.match(/achievement_medal_full\.gif/ig);
			if(competed != null) competed = competed.length;
			else competed = 0;

			// Completed percent
			var percent = 0;
			if(total>0) percent = Math.round((competed*100)/total);

			var bar = this.createProgressBar(percent);
			document.getElementById('CAT_'+category).parentNode.insertBefore(bar, document.getElementById('CAT_'+category).nextSibling);

			return [competed, total];
		},

		createProgressBar : function(percent){
			var bar = document.createElement('div');
			bar.style.height = "3px";
			bar.style.position = "absolute";
			bar.style.left = "-2px";
			bar.style.right = "-2px";
			bar.style.border = "2px solid rgb(187, 168, 110)";
			bar.style.backgroundColor = "rgba(135,87,32,0.5)";

			var percentBar = document.createElement('div');
			percentBar.style.width = percent+"%";
			percentBar.style.height = "100%";
			percentBar.style.backgroundColor = "#E1BD33";
			bar.appendChild(percentBar);

			return bar;
		}
	}
};

(function(){
	// Pre Inject
	gca_overview_achievements.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_overview_achievements.inject();
	}
	if(document.readyState == "complete" || document.readyState == "loaded"){
		fireLoadEvent();
	}else{
		window.addEventListener('DOMContentLoaded', function(){
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function(){
			fireLoadEvent();
		}, true);
	}
})();
