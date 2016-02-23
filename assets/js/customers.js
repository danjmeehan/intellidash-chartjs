$(document).ready(function(){
	$.get('https://www.batchacademy.com/api/wdfne/dummy/intellidash', function(data){
		for(var i = 0; i < data.length; i++){
			
			var newRow = $('<tr/>');
			var newData = $('<td/>');
			
			$(newRow).append('<td>' + data[i].id, '<td>' + data[i].person.first_name + ' ' + data[i].person.last_name, '<td>' + data[i].person.email, 
			'<td>' + data[i].person.location.city,'<td>' + data[i].person.location.state,'<td>' + data[i].person.race,
			'<td>' + data[i].person.gender);
			$('tbody').append(newRow);
		}
		fixSidebar();
	});
});
