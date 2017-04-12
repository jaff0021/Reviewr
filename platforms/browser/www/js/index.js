//global declarations
var rating = 3;
var stars = null;
let imageFile;
let reviewList = new Array();

document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady(){
    console.log("Ready");
    let saveButton = document.getElementById("saveBtn");
    saveButton.addEventListener("click", saveReview);
    let cancelButton = document.getElementById("cancelBtn");
    cancelButton.addEventListener("click", cancelModal);
    let pictureButton = document.getElementById("pictureBtn");
    pictureButton.addEventListener("click", takePicture);
    
    displayReviews();
    setStars();
}

function cancelModal(){
    console.log("testing cancel button");
    var endEvent = new CustomEvent('touchend', {bubbles:true, cancelable:true});
    var a = document.querySelector("a#xButton");
    a.dispatchEvent(endEvent);
}

function saveReview(){
    console.log("testing save button");
    let itemNameToBeSaved = document.getElementById("itemName").value;
    let ratingToBeSaved;
    
    let timeStamp = new Date().getTime() / 1000;
    
    let review = {id: timeStamp,
                  name:itemNameToBeSaved,
                  rating:dateToBeSaved,
                  img:imageFile,
                 };
    
    reviewList.push(review);
    saveToLocalStorage();
    rating = 3;
    displayReviews();
}

function takePicture(){
    console.log("testing picture button");
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        pictureSourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300
    }
    navigator.camera.getPicture( onSuccess, onFail, options ); 
}

function deleteReview(){
    
}

function saveToLocalStorage(){
    localStorage.setItem("reviewr-jaff0021", JSON.stringify(reviewList));
}

function retrieveFromLocalStorage(){
    if(!localStorage.getItem("reviewr-jaff0021")){
        console.log("No data found");
    }
    else{
        reviewList = JSON.parse(localStorage.getItem("reviewr-jaff0021"));
        console.log("This is the data retrived from local storage");
        console.log(reviewList);
    }
}

function displayReviews(){
    retrieveFromLocalStorage();
    
    let list = document.getElementById("review-list");
    list.innerHTML = "";
    
    let length = people.length;
    
    for(let i = 0; i < length; i++){
        
        let li = document.createElement("li");
        li.className = "table-view-cell";
        li.setAttribute("dataId", reviewList[i].id);
        
        let a = document.createElement("a");
        a.href = "#deleteReview"
        let spanName = document.createElement("span");
        spanName.className = "name";
        spanName.textContent = review[i].name;
        let spanRating = document.createElement("span");
        spanName.className = "rating";
        spanName.textContent = review[i].rating;
        
        
    }
}

function openReview(){
    
}

function setStars(){
    stars = document.querySelectorAll('.star');
    addListeners();
    setRating(); //based on global rating variable value
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function addListeners(){
  [].forEach.call(stars, function(star, index){
    star.addEventListener('click', (function(idx){
      console.log('adding listener', index);
      return function(){
        rating = idx + 1;  
        console.log('Rating is now', rating)
        setRating();
      }
    })(index));
  });
  
}

function setRating(){
  [].forEach.call(stars, function(star, index){
    if(rating > index){
      star.classList.add('rated');
      console.log('added rated on', index );
    }else{
      star.classList.remove('rated');
      console.log('removed rated on', index );
    }
  });
}




//navigator.camera.cleanup( successCallback, errorCallback );