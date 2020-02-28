const strlcase="abcdefghijklmnopqrstuvwxyz";
const strucase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const strnums ="1234567890";
const strspecchar=" !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

var user_quits=false;

// Assignment Code
var strpassword="";
var selectionarray=[];
var whatcharstr = "";
var numchars=0;

function getLength(){
    
    var strchars = prompt("How long do you want your password to be (between 8 and 128 chars):", "8");
    var intchars = parseInt(strchars);
    
    if ( intchars < 8  || intchars > 128 || intchars === undefined) {
        txt = "User cancelled the prompt, or number is not in range.";
        alert(txt);
        intchars= 0;
    };
    return intchars;
};


function createPassword(intchars=8,whatcharstr=""){
    console.log("Entering createPassword");
    var strpassword="";
    for (i=0; i<intchars;i++){
        strpassword=strpassword + getRandomChar(whatcharstr);
    };
    return strpassword;
};

// open a modal form that allows the user to determine what characters are to be included in the password
function openCharsModal(){
    console.log("popup form time!");
    $('#getCharsModal').modal('show');
    $('#getCharsModal').on("shown.bs.modal",function(){
        var tempobj=document.getElementsByClassName("form-check-input");
        console.log((tempobj));
        for (i=0;i<tempobj.length;i++){
            tempobj[i].checked=false;
        }
        
    });
    document.getElementById("nextbtn").disabled=true;
};

// Takes the output of funWhatChars and builds the array/string that will be used for the random password generator
//Temp assignment of selectionarray
function fnGetCharString(selectionarray=["l","u","n","s"]) {
    console.log("Entering fnGetCharString");
    var fullcharstring="";
    if (selectionarray.length > 4){alert("too many selections");} ;
    //repeat for how ever many types of characters in the inputchararray
    for (j=1;j<=4; j++){
        console.log ("j: " + j) ;
        switch (selectionarray[j-1]){
            case "l": 
                console.log("case 1");
                if(fullcharstring==="") {
                    console.log("empty string");
                    fullcharstring=strlcase;
                    console.log(fullcharstring);
                } else {
                    fullcharstring=fullcharstring + strlcase;
                    console.log(fullcharstring);
                };
            break;
            case "u": 
                console.log("case 2");
                if(fullcharstring==="") {
                    console.log("empty string");
                    fullcharstring=strucase;
                    console.log(fullcharstring);
                } else {
                    fullcharstring=fullcharstring + strucase;
                    console.log(fullcharstring);
                };
            break;
            case "n": 
                console.log("case 3");
                if(fullcharstring==="") {
                    console.log("empty string");
                    fullcharstring=strnums;
                    console.log(fullcharstring);
                } else {
                    fullcharstring=fullcharstring +  strnums;
                    console.log(fullcharstring);
                };
            break;
            case "s": 
                console.log("case 4");
                if(fullcharstring==="") {
                    console.log("empty string");
                    fullcharstring=strspecchar;
                    console.log(fullcharstring);
                } else {
                    fullcharstring=fullcharstring +  strspecchar;
                    console.log(fullcharstring);
                };
            break;
            default: fullcharstring; 
            break;
        };
    
    };
    console.log("Full character string to consider: " + fullcharstring)
    return fullcharstring;
};


// Get a single random element from the input string
function getRandomChar(fullcharstring) {
    var randomnum=Math.floor((Math.random()*fullcharstring.length)+1);
    var randomchar=fullcharstring.substr(randomnum,1);
    console.log("Random character: " + randomchar);
    return randomchar;
};


// Write password to the #password input
function writePassword(password) {
  //var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};


function setDefaults(){
    console.log("Setting defaults.");
    document.getElementById("password").value="Your secure password";
    document.getElementById("lwrcase").checked==false;
    document.getElementById('uprcase').checked==false;
    document.getElementById('nums').checked==false;
    document.getElementById('specchar').checked==false; 
}


// Add event listener to generate button

document.querySelector("#generate").addEventListener("click", function(){
    var numdigits=getLength();
    setDefaults();
    numchars=numdigits;
    //go to the next step
    if (numdigits !== 0) {
        openCharsModal();
    } else user_quits=true;
});

function getSelectionArray(){
    var numselected=0;
    console.log("Getting selection array");
    selectionarray=[];
    if(document.getElementById("lwrcase").checked==true){selectionarray.push("l")};
    if(document.getElementById('uprcase').checked==true){selectionarray.push("u")};
    if(document.getElementById('nums').checked==true){selectionarray.push("n")};
    if(document.getElementById('specchar').checked){selectionarray.push("s")};
    numselected=selectionarray.length;
    return numselected;
};



$('#getCharsModal').on("hide.bs.modal",function(){
    console.log("hiding modal");
    var numselected=getSelectionArray();
    console.log("number of options selected: " + numselected);
});


$('#getCharsModal').on("hidden.bs.modal",function(){
    var curr_selection_array = selectionarray;
    if(curr_selection_array.length<1){
        alert("You did not select any sets of characters.  A password can not be created.");
    };
    
    var tempstring=fnGetCharString(curr_selection_array);

    console.log(tempstring);
    if (tempstring !== ""){
        var password=createPassword(numchars,tempstring);
        writePassword(password);
    };
});


$('.form-check').on("click",function(){
    getSelectionArray();
    if (selectionarray.length>0){
        console.log("something selected");
        document.getElementById("nextbtn").disabled=false;
    } else {
        console.log("nothing selected");
        document.getElementById("nextbtn").disabled=true;
    };
});
