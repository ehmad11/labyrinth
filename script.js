var boxWidth = 70;
var obstacle = "black";
var path = "white";
var path_correct = "#e8e3e3";
var goal = "red";
var goalPosition = -1;
var mazeSize = 10;
solution_path =  new Array;

$(document).ready(function() {
	generateMaze(mazeSize);
	$('#ui').slideDown()
});

function generateMaze(size) {
	goalPosition = -1;
	if( solution_path.length > 0)
		solution_path.length = 0;
				
	$(".maze").css("display", "none");
	mazeSize = size;
	var mazeHTML = "";
	var no = 0;
	for( i = 0; i < (size * size); i++)
	{
		no++;
		if( (no - 1)  % size == 0)
			mazeHTML += '<div class="clear">&nbsp;</div>';
		mazeHTML += '<div class="box" id="b' + no + '">' + no + '</div>';		
	}
	$(".maze").html(mazeHTML);
	$(".maze").fadeIn();
	$(".box").css("width", boxWidth + "px");
	$(".maze").css("width",  (( boxWidth  * size) + 40 ) + "px" );
	doReady();
}


function doReady(){	
	if( solution_path.length > 0)
		solution_path.length = 0;		
		
	$('#goMaze').click(function() {
		mazeSize = parseInt( $('#mazeSize').val() );
		generateMaze(mazeSize);
	});
	$('#solveMaze').click(function() {		
		if( solution_path.length > 0)	
		{		
			$.each(solution_path, function(key, value) { 	  	  
			  $("#b" + value).css("background-color", path);	  		  
			  solution_path.length = 0;
			});
		}
		findPath($('#startPoint').val());     
		$.each(solution_path, function(key, value) { 	  	  
		  $("#b" + value).css("background-color", path_correct);	  
		});	
	});
		
	
	$(".box").mousedown(function(event) {		
		if(event.which == 3)
		{
			if( goalPosition > 0 )
				$("#b" + goalPosition).css("background-color", path);
			goalPosition = $(this).html();			
			$(this).css("background-color", goal);
		}
		else
		{
			if ( $(this).css("background-color") == obstacle)
				$(this).css("background-color", path);
			else						
				$(this).css("background-color", obstacle);	
		}
	});
	$(document).bind("contextmenu",function(e){ return false; }); 	
}


function findPath(p)
{

	if(goalPosition < 1 )
	{
		alert("No goal set!");
		return false;
	}

	p = parseInt(p);	
	if(jQuery.inArray(p,solution_path) > -1) 
		return false;	

	var totalSize = mazeSize * mazeSize;
	if(p < 1 || p >  totalSize)
		return false;
				
	if( $("#b" + p).css("background-color") ==  goal)
		return true;
	
	if ( $("#b" + p).css("background-color") == obstacle)
		return false;
			
	solution_path.push(p);			
	
	if( findPath(p + mazeSize) ) // up child
		return true;

		
	if( p % mazeSize == 0)
	{
		if(findPath(p - mazeSize) )
			{			
				if( findPath(p + 1) )    
					return true;		
			}	
	}
	else
	{	
		if( findPath(p + 1) ) 
			return true;	
	}
	
		
	if( findPath(p - mazeSize) ) // down
		return true;	
				

				
	/*
	if( findPath(p -1)   ) //left
		return true;
	*/
		
		
		
		
	if(  (p-1) % mazeSize == 0)
	{
		if(findPath(p - mazeSize) )
			{			
				if( findPath(p - 1) )    
					return true;		
			}	
	}
	else
	{	
		if( findPath(p - 1) ) 
			return true;	
	}

	
		
		
		
		
	
	solution_path.pop();
	return false;	
}