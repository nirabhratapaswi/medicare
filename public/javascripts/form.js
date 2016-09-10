var xmlhttp = new XMLHttpRequest();
var values = {};
var data = {};
var sytms = "";
var checker = true;
var count = 0;

window.onload = function() {
  ;
}

xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState == 1) {
    console.log("Request Processing!!");
  }
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var response = JSON.parse(xmlhttp.responseText);
    if (response["data"][0].dname == undefined) {
      console.log("Response received: ", response["data"][0].dname);
      document.getElementById("show_result").innerHTML = "No disease found!!";
    }
    else {
      for (var i = 0; i < response["data"].length; i++) {
        console.log("Response received: ", response["data"][i].dname);
        //document.getElementById("show_result").innerHTML += response["data"][i].dname + "<br>";
        document.getElementById("diseases").innerHTML += "<h4>" + response["data"][i].dname + "</h4>";
      }
    }
  }
};


$('#add_sym').click(function(){
    if(checker) {
      var sel_opt = $('#symptom option:selected');
      if(sel_opt.text() != 'undefined'){
        sytms += sel_opt.text() + ":";
      }
      $('#selected_symptoms').append("<p>"+ sel_opt.text() + "</p>");
      sel_opt.remove();
    }
    if (sel_opt.text() == "") {
      sytms = sytms.substring(0, sytms.length - 1);
      checker = false;
    };
});

function sendAjax() {
  var mth = sytms.match(/:/g);
  console.log(mth);
  var txt = sytms.substring(0, sytms.length - 1);
  console.log(txt);
  var formElement = document.getElementById("medicare");
  var formData = new FormData(formElement);
  values['symptom'] = sytms;
  $.each($('#medicare').serializeArray(), function(i, field) {
    //values['symptom'] = field.value;
  });
  console.log(values);
  xmlhttp.open('POST', '//localhost:3010/medapi', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(values));
}
