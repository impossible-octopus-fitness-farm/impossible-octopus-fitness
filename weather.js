function getData(data) {
  // Get data from API and add the current weather to html file.
  var node = document.createTextNode(data.current_weather);
  document.getElementById('weather').appendChild(node);
}

var script = document.createElement('script');
script.src = 'https://holberton-weather-api.herokuapp.com/weather.js?jsonp_callback=getData'
document.body.appendChild(script);





  // Grab the template script
  var theTemplateScript = document.getElementById("user-template");
  var content = theTemplateScript.innerHTML;
  var theTemplate = Handlebars.compile(content);

  function fetchJSON(xhttp) {
    contextString = xhttp.responseText;
    var contextObject = JSON.parse(contextString);

    console.log(contextObject.statuses[0])
    console.log(contextObject.statuses);
    console.log(contextObject.last_page);

    if(contextObject.last_page == true) {
      var moreButton = document.getElementById('extra_statuses_button');
      moreButton.style.display = "none";
    }

    // Loop through each item in the JSON array and create new div for a post.
    for (var i = 0; i < contextObject.statuses.length; i++) {
      var theCompiledHtml = theTemplate(contextObject.statuses[i]);
      var div = document.createElement("div");
      var element = document.getElementById("content-placeholder");
      element.appendChild(div).innerHTML = theCompiledHtml;
    }
  }

  function locationGet(url, fetchJSON) {
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          fetchJSON(xhttp);
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
  }

  // Set variable to count how many pages to load;
  var i = 1;

  var load_statuses = document.getElementById("extra_statuses_button");

  load_statuses.addEventListener("click", function() {
    this.style.background = '#9C9898';
    this.disabled = true;
    this.style.cursor = 'not-allowed';
    locationGet('/statuses-' + i + '.json', fetchJSON);
    revertColor();
    i++;
  });

  function revertColor () {
    setTimeout(function() {
      load_statuses.style.background = '#FF7679';
      load_statuses.disabled = false;
      load_statuses.style.cursor = 'pointer';
    }, 2000);
  }
