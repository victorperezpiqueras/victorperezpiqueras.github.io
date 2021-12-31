function loadExperience(experiencesArray, topYears) {
  experiencesArray = experiencesArray.slice().reverse();
  var maxTime = 0;
  for (let ex of experiencesArray) {
    if (!ex.endTime) ex.endTime = new Date();
    let diff = (ex.endTime - ex.startTime) / (1000 * 3600 * 24);
    maxTime += diff;
    ex.diffTime = diff;
  }

  var maxYears = topYears * 365;
  var prop = maxTime / maxYears;
  console.log(maxTime, maxYears, prop);

  //let colours = ["bg-info", "bg-secondary", "bg-primary"];
  let counter = 0;
  progressBarFlag;
  let flagSpaceWidth = 100 / topYears + "%";
  for (let x = Math.floor(topYears); x > 0; x--) {
    $(
      "<div><i id=flag" +
        x +
        ' class="bi bi-flag-fill flag-exp" style="color: rgb(177, 0, 0);"' +
        'data-toggle="tooltip" data-placement="bottom" title="' +
        x +
        ' years experience"></i></div>'
    ).prependTo("#progressBarFlag");
    $("<div style=width:" + flagSpaceWidth + "></div>").prependTo(
      "#progressBarFlag"
    );
  }

  for (let ex of experiencesArray) {
    let percentage = (ex.diffTime / maxTime) * (prop * 100); //instead of 100 to avoid full bar
    let counterId = "progressBar" + counter;
    let percentageString = percentage + "%";
    $("<div>", {
      id: counterId,
      class:
        "progress-bar progress-bar-striped progress-bar-animated " + ex.color,
      //colours[counter % colours.length],
      title: ex.name,
      style: ["width: " + percentageString],
    }).prependTo("#progressBar");
    //$(counterId).addClass(colours[counter % colours.length]);

    $("#" + counterId).css("width", percentageString);
    $("#" + counterId).text(ex.name);
    counter++;
  }
}
