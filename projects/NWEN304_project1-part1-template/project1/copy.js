$(document).ready(function (e) {
  var g
  var count=1;

  $('#new-todo').dialog({ modal: true, autoOpen: false })
  $('#edit-todo').dialog({ modal: true, autoOpen: false })
  $('#confirm-deletion').dialog({ modal: true, autoOpen: false })
  $('#add-todo')
    .button({
      icons: { primary: 'ui-icon-circle-plus' }
    })
    .click(function () {
      $('#new-todo').dialog('open')
    })

  $('#new-todo').dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      'Add task': function () {
        var taskName = $('#task').val()
        if (taskName === '') {
          return false
        }
        var taskHTML = '<li><span class="done">%</span>'
        taskHTML += '<span class="edit">+</span>'
        taskHTML += '<span class="delete">x</span>'
        taskHTML += '<span class="task"></span></li>'

        var $newTask = $(taskHTML)
        
        $newTask.find('.task').text(count+ " "+taskName)
        count++
        $newTask.hide()
        $('#todo-list').prepend($newTask)
        $newTask.show('clip', 250).effect('highlight', 1000)
        $(this).dialog('close')
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    }
  })

  $('#edit-todo').dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Confirm: function () {
        var task = $('#edittask').val()
        var name = $('#editname').val()
        if (task === '') {
          return false
        }
        $(this).dialog('close')
        // g.parent('li').find('.task').text()
        var num = g.parent('li').find('.task').text().charAt(0)
        var oldtext = g.parent('li').find('.task').text(num+" "+task+" "+name)
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    }
  })

  $('#todo-list').on('click', '.done', function () {
    var $taskItem = $(this).parent('li')
    $taskItem.slideUp(250, function () {
      var $this = $(this)
      $this.detach()
      $('#completed-list').prepend($this)
      $this.slideDown()
    })
  })

  $('#confirm-delete').dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Confirm: function () {
        $(this).dialog('close')
        g.parent('li').effect('puff', function () {
          g.parent('li').remove()
        })
      },
      Cancel: function () {
        $(this).dialog('close')
      }
    }
  })

  


  $('.sortlist').sortable({
    connectWith: '.sortlist',
    cursor: 'pointer',
    placeholder: 'ui-state-highlight',
    cancel: '.delete,.done'
  })
  $('.sortlist').on('click', '.delete', function () {
    $('#confirm-delete').dialog('open')
    g = $(this)

    // $(this).parent('li').effect('puff', function () {
    //   $(this).remove()
    // })
  })

  $('.sortlist').on('click', '.edit', function () {
    $('#edit-todo').dialog('open')
    g = $(this)
  })
}) // end ready