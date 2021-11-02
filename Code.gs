function create_event() {
    var calendar = CalendarApp.getCalendarById(''); // Place target Calendar ID
    var formId = ''; // Place Google Form ID
    var data = get_data();
    
    var title = data[0];
    var startTime = data[1];
    var endTime = data[2];
    var options = data[3];
    
    calendar.createEvent(title, startTime, endTime, options)
  }
  function get_data() {
    var form = FormApp.getActiveForm();
    var responses = form.getResponses();
    var response = responses[responses.length -1];
    var email = response.getRespondentEmail();
    
    var items = response.getItemResponses();
    
    for (var i = 0; i < items.length; i++) {
      Logger.log(items[i].getResponse());
    }
    
    // These item array index is all depends on design of your form result
    
    var name = items[0].getResponse();
    var description = items[1].getResponse();
    var startTime = formatDateTime(items[2].getResponse());
    var endTime = formatDateTime(items[3].getResponse());
    var leaveType = items[4].getResponse();
    
    var title = name + " " + leaveType;
     
    var options = {
      sendInvites: false,
      description: description,
      guests: email
    };
    return [title, startTime, endTime, options];
  }

  function formatDateTime(dateTime) {
    // Test with this date
    //var dateTime = "2019-08-14 09:00";
    var date = dateTime.split(" ")[0].split("-");
    var time = dateTime.split(" ")[1].split(":");
    
    var year = parseInt(date[0], 10);
    var month = parseInt(date[1], 10) -1 ;
    var day = parseInt(date[2], 10);
    
    var hour = parseInt(time[0], 10);
    var minute = parseInt(time[1], 10);
    var second = 0;
    var millisecond = 9;
    
    var new_date = new Date(year, month, day, hour, minute, second, millisecond);
    return new_date;
  }
  