$(document).ready(function(e) {

  var g
  var count=1;

  $('#add-todo').button({icons: {primary: "ui-icon-circle-plus"  }});
  
  //add a dialog box 
  $('#new-todo').dialog({ modal : true, autoOpen : false });
  
  
  $('#add-todo').button({
    icons:{primary: "ui-icon-circle-plus" }}).click(function() {
    $('#new-todo').dialog('open'); 
  });
  
  
  
  $('#new-todo').dialog({ modal: true, autoOpen:false,
  buttons: {
    "Add task": function() {
    var taskName= $('#task').val();
    if(taskName===""){return false;}  //to check the taskName cannot contain empty String
    
    var taskHTML = '<li><span class="done">%</span>'
        taskHTML += '<span class="edit">+</span>'
        taskHTML += '<span class="delete">x</span>'
        taskHTML += '<span class="task"></span></li>'
        
    var $newTask = $(taskHTML);
    
    $newTask.find('.task').text(count+ " "+taskName)
        count++

    
    $newTask.hide();
    $('#todo-list').prepend($newTask);
    $newTask.show('clip', 250).effect('highlight', 1100);
    $(this).dialog('close');
    },
    
    "Cancel": function() { $(this).dialog('close'); }
  }
  });
  
  
  
  //2-5 mark as complete
  $('#todo-list').on('click', '.done', function() {
var $taskItem = $(this).parent('li');
$taskItem.slideUp(250, function() {
var $this = $(this);
$this.detach();
$('#completed-list').prepend($this);
    $this.slideDown();
   });
    });
    
    
    //sortable 2-6 support drag and drop
    $('.sortlist').sortable({connectWith: '.sortlist',
    cursor: 'pointer',
    placeholder: 'ui-state-highlight',
    cancel: '.delete, .done'});
    
    



//remove or delete task item (2-7)
    //$(' .sortlist ').on('click', '.delete', function(){
     //$(this).parent('li').effect('fade', function(){ $(this).remove(); });
    //}
    //);


    
//     2-8 confirming deletion
//      add a dialog box 
   $('#confirm-delete').dialog({ modal : true, autoOpen : false }); 
   
   
   //activate #confirm-delete dialog box when clicking on the cross button.
    $(' .sortlist ').on('click', '.delete', function() {
    $('#confirm-delete').dialog('open'); 
    g = $(this)
  });
  
  

    $('#confirm-delete').dialog({ 
    modal: true, autoOpen:false,
    buttons: {
    
    "Confirm": function() {
     $(this).dialog('close')
     g.parent('li').effect('puff', function(){ g.parent('li').remove() })

    },
    
    "Cancel": function() { $(this).dialog('close'); }
  }
  });
  
  
  
  //-----------------------
  //2-9
  //edit-todo
  $('#edit-todo').dialog({ modal: true, autoOpen: false});
  
  
    $('.sortlist').on('click', '.edit', function () {
    $('#edit-todo').dialog('open')
    g = $(this)
  })
  
  
  $(' #edit-todo').dialog({
    modal: true, autoOpen: false,
    buttons:{
       Confirm: function(){
         var ed= $('#ed').val()
         var name= $('#u').val()
         if (ed=== ""){return false;}
         
         $(this).dialog('close')
         var num= g.parent('li').find('.task').text().charAt(0)
         var previousText = g.parent('li').find('.task').text(num+". "+ed+"  "+name)
       },
       
       Cancel: function(){
       $(this).dialog('close');
       }
    }
  })
  
  

 

  

}); // end ready