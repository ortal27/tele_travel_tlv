let wishlist = []
let destination = []
console.log("Des", destination);
let pDes = []

addDestination();

function createWhishObject(name, id) {
    return {
        name: name,
        id: id
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function myFunc0(){
    document.getElementById("destination").style.display = "none";
    document.querySelector(".origin").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.querySelector(".myList").style.display = "block";
    document.querySelector("#toDo").style.display = "block";
    document.querySelector(".newCover").style.display = "none";
    document.getElementById("forms").style.display = "none";
    document.querySelector(".share").style.display = "none";
}

function myFunc1(){
    document.getElementById("about").style.display = "block";
    document.getElementById("destination").style.display = "none";
    document.getElementById("forms").style.display = "none";
    document.querySelector(".origin").style.display = "block";
    document.querySelector(".newCover").style.display = "none";
    document.querySelector("#toDo").style.display = "none";
    document.querySelector(".share").style.display = "none";

}

function myFunc2(){    
    document.getElementById("destination").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("forms").style.display = "none";
    document.querySelector(".origin").style.display = "none";
    document.querySelector(".myList").style.display = "none";
    document.querySelector("#toDo").style.display = "none";
    document.querySelector(".newCover").style.display = "block";
    document.querySelector(".share").style.display = "none";
    slideShow();
}

function slideShow(){
    var httpReequest =  new XMLHttpRequest();   
    httpReequest.onreadystatechange = function(){
        if(httpReequest.readyState === XMLHttpRequest.DONE){
            if(httpReequest.status === 200){
                var newImgs = document.querySelector('.newCover');
                newImgs.innerHTML = httpReequest.responseText; 
                makeSlideShow();
            }
            else{
                alert('There was a problem with the request.');
            }
        }
    }
    httpReequest.open('GET', 'newDes.html');
    httpReequest.send();
} 

var slideIndex = 0;
function makeSlideShow(){

    var i;   
    var slides = document.getElementsByClassName("newDeals");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length){
        slideIndex = 1
    } 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(makeSlideShow, 4000);
}


function myFunc3(){
    document.getElementById("forms").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("destination").style.display = "none";
    document.querySelector("#toDo").style.display = "none";
    document.querySelector(".newCover").style.display = "none";
    document.querySelector(".origin").style.display = "block";
    document.querySelector(".share").style.display = "block";


}

function areaDes(string){
    var i;
    for(i = 0; i < destination.length; i++){
        var id = destination[i].id;
        document.getElementById(id).style.display = "block";
        
    }
    for(i = 0; i < destination.length; i++){
        if(destination[i].area !== string){
            var id = destination[i].id;
            document.getElementById(id).style.display = "none";
        }
    }
}

function request(verb, url, cb){
    var httpReequest = new XMLHttpRequest();
    httpReequest.onreadystatechange = function(){
        if(httpReequest.readyState === XMLHttpRequest.DONE){
            if(httpReequest.status === 200){
                cb(JSON.parse(httpReequest.response));
            }
            else{
                alert('There was a problem with the request.');
            }
        }
    }
    httpReequest.open(verb, url);
    httpReequest.send();
}

function addDestination(){
    var cb = function(response){
        var i;
        for(i = 0; i<response.length; i++){
            destination.push(response[i]);
            drawDestinations(response[i]);
        }  
    }
    request('GET', 'destinations.json', cb);
}

function drawDestinations(obj){
    var insertDes = document.getElementById("destination");
    var innerDiv = document.createElement("div");
    var h2 = document.createElement("h2");
    var a = document.createElement("a");
    var img = document.createElement("img");
    var likeButton = document.createElement("button");
    var aboutButton = document.createElement("button");
    var i = document.createElement("i");
    var href = document.createAttribute("href");
    var imgSrc = document.createAttribute("src");
    var span = document.createElement("span");
    var id = obj.id;
    var p = document.createElement("p");

    innerDiv.setAttribute("class", "articale1");
    innerDiv.setAttribute("id", id);
    h2.innerHTML = obj.nameDes;
    href.value = "https://www.facebook.com/TeleTravelTLV/photos/a.628695460985079/667301670457791/?type=3&theater";
    a.setAttributeNode(href);
    a.setAttribute("target", "_blank");
    imgSrc.value = obj.img;
    img.setAttributeNode(imgSrc);
    a.appendChild(img);
    span.setAttribute("class", "toolTip");
    span.innerHTML = "לחץ כדי להוסיף לרשימת המשאלות";
    likeButton.appendChild(span);
    likeButton.setAttribute("class", "aboutLike");
    likeButton.setAttribute("onclick", `like("${obj.nameDes}", "${id}")`);
    i.setAttribute("class", "fas fa-heart");
    likeButton.appendChild(i);
    aboutButton.innerHTML ="על היעד..";
    aboutButton.setAttribute("onclick", `makeDestination("${id}")`);
    aboutButton.setAttribute("class", "onButton");
    p.setAttribute("class", "aboutDes");

    insertDes.appendChild(innerDiv);
    innerDiv.appendChild(h2);
    innerDiv.appendChild(a);
    innerDiv.appendChild(likeButton);
    innerDiv.appendChild(aboutButton);
    innerDiv.appendChild(p);
}

function makeDestination(idNum){
    var i;
    var isContent = false;
    for(i = 0; i < pDes.length; i++){
        if(pDes[i] === idNum){
            isContent = true;
        }
    }
    var textDes = document.getElementById(idNum).getElementsByClassName("aboutDes")[0];

        var i;
        for(i = 0; i<destination.length; i++){
            if(destination[i].id === idNum){
                textDes.innerHTML = destination[i].text;
            }
        }
    if(!isContent){
        pDes.push(idNum);
        var changeHtml = document.getElementById(idNum).getElementsByClassName("onButton")[0];
        changeHtml.innerHTML = "קרא פחות..";
        textDes.style.display = "block";
        console.log("aboutDes 0 place:", textDes);
        console.log("style:", textDes.style.display);
    }
    else{
        var changeHtml =  document.getElementById(idNum).getElementsByClassName("onButton")[0];
        changeHtml.innerHTML = "קרא על היעד....";
        textDes.style.display = "none";
        removeID(idNum);    
    }
}

function removeID(num){
    var i;
    for(i = 0; i < pDes.length; i++){
        if(pDes[i] === num){
            pDes.splice(i, 1);
        }
    }
}

var timeoutID = setTimeout(function(){
    document.querySelector(".popUp").style.display = "block";
}, 5000);

function cancelPopUp(){
    clearTimeout(timeoutID);
    document.querySelector(".popUp").style.display = "none";   
}

var isEmpty = document.querySelector(".favorite");
if(isEmpty.firstElementChild !== ""){
    var emptyList = document.createElement("h3");
    var button = document.createElement("button");
    var text = document.createTextNode("הרשימה עדיין ריקה? לחץ כאן כדי להתחיל להוסיף יעדים לרשימה!");
    button.setAttribute("class", "search")
    button.innerHTML = "לחץ כאן";
    button.setAttribute("onclick", "myFunc2()");
    emptyList.appendChild(text);
    isEmpty.appendChild(emptyList);
    isEmpty.appendChild(button);
}


function draw(){
    $(".favorite li").html("");
    var i ;
    for(i=0; i<wishlist.length; i++){
        var a = document.createElement("a");
        var href =  document.createAttribute("href");
        var icon = document.createElement("i");
        var button = document.createElement("button");
        var li = document.createElement("li");
        var ul = document.querySelector(".favorite");
        var span = document.createElement("span");
        var linkText = document.createTextNode(wishlist[i].name);
        console.log(wishlist[i]);
        var address = document.getElementById(`${wishlist[i].id}`);
        
        console.log("addrees:", address[0]);
        a.appendChild(linkText);
        href.value = address;
        a.setAttributeNode(href);
        icon.setAttribute("class", "fas fa-heart");
        button.setAttribute("class", "tool");
        button.appendChild(icon);
        button.setAttribute("onclick", `removeLike("${wishlist[i].id}")`); 
        span.setAttribute("class", "toolTip");
        span.innerHTML = "הסר מרשימת המשאלות";
        button.appendChild(span);
        li.setAttribute("class", "likeLI");

        li.appendChild(a);
        li.appendChild(button);
        li.setAttribute("id", wishlist[i].id)
        ul.appendChild(li);
    }
}
function like(str, id){ 
    var i;
    var isList = false;
    for(i = 0; i < wishlist.length; i++){
        if(wishlist[i].name === str){
            isList = true;
        }
    }  
    if(!isList){ // there is no such destination on that wish list
        wishlist.push(createWhishObject(str, id));
        draw();
    }
    $(".favorite h3, .search").css({"display": "none"});
    var newId = document.getElementById(id).getElementsByClassName("toolTip")[0];
    newId.innerHTML = "נוסף לרישמת המשאלות";
    console.log("newId is::", newId);
    console.log("id is :", id);
}
  

function removeLike(id){
    for (let index = 0; index < wishlist.length; index++) {
        const element = wishlist[index];
        if(element.id === id){
            wishlist.splice(index , 1);
        }
    }
    draw();  
}




// Create a "close" button and append it to each list item
var myNodelist = document.getElementById("myUL").getElementsByTagName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


// Create a new list item when clicking on the "Add" button
function newElement(){
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var newVar = document.createTextNode(inputValue);
    li.appendChild(newVar);
    document.getElementById("myUL").appendChild(li);
    if(inputValue === ""){
        alert("you must enter input!");
        // $("#myInput").input.placeholder = "Please enter an destination"; 
    }
    else{
        document.querySelector("#myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    document.getElementById("myUL").appendChild(li);

  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
}

