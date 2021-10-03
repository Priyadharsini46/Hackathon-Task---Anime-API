let data, jsonData;
async function getData() {
  try {
    data = await fetch("https://api.jikan.moe/v3/search/anime?q=anime", {
      method: "GET",
    });
    jsonData = await data.json();
    display(jsonData.results);
  } catch (e) {
    console.log("err in getData func", e);
  }
}
getData();

async function searchTitle(searchVal) {
  try {
    searchVal = searchVal.value;
    if (searchVal.length > 0) {
      let foundData = [];
      for (var i = 0; i < jsonData.results.length; i++) {
        if (jsonData.results[i].title == searchVal) {
          foundData.push(jsonData.results[i]);
        }
      }
      if (foundData.length > 0) {
        display(foundData);
      } else {
        let cardList = document.getElementById("cardList");
        cardList.innerHTML = "<p class='text-center'>No result found</p>";
      }
    } else {
      display(jsonData.results);
    }
  } catch (e) {
    console.log("err in searchTitle func", e);
  }
}
async function display(foundData) {
  try {
    let cardList = document.getElementById("cardList");
    cardList.innerHTML = "";
    foundData.forEach((singleData) => {
      var title = singleData.title || "Null";
      var startDate = singleData.start_date;
      if (startDate) {
        startDate = startDate.split("T")[0];
      } else {
        startDate = "Null";
      }
      var endDate = singleData.end_date;
      if (endDate) {
        endDate = endDate.split("T")[0];
      } else {
        endDate = "Null";
      }
      var type = singleData.type || "Null";
      var rated = singleData.rated || "Null";
      cardList.innerHTML += ` <div class="card flex-row mb-3">
			<img class="card-img-left example-card-img-responsive" src="${singleData.image_url}" />
			<div class="card-body">
				<h3 class="card-title h3 h3-sm">${title}</h3>
				<div class="content">
				<p class="card-text"><span>Start Date: </span>${startDate}</p>
				<p class="card-text"><span>End Date: </span>${endDate}</p>
				<p class="card-text"><span>Type: </span>${type}</p>
				<p class="card-text"><span>IMDB Rating: </span>${rated}</p>
				</div>
			</div>
		</div>`;
    });
  } catch (e) {
    console.log("err in display func", e);
  }
}

document.addEventListener("keyup", logKey);
function logKey(e) {
  var keyCode = e.which;
  var keyVal = e.key;

  if (keyCode == "187" || keyCode == "13") {
    searchTitle(searchVal);
  } else {
    getVal(keyVal);
  }
}
