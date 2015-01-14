# jquery-pace
jQuery Paced function library

Usage Example:
```js

$("#txtName").keydown(function(){
  var t = this; 
  //make sure you store [this] in a generated variable, 
  //as it is no longer available inside the pace function
  var function_id = 'txtName_click';
  $.pace(function_id,function(){
    ...
    // Execute your save function here.
  }, 500);
});
//this will make sure that your script executes 500ms after the typing is complete.
```
