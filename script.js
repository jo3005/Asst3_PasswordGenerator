const strlcase="abcdefghijklmnopqrstuvwxyz";
const strucase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const strnums ="1234567890";
const strspecchar=" !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

// Assignment Code
var strpassword="";
var selectionarray=[];
var whatcharstr = "";
var numchars=0;

function getPasswordLength(){
    var strchars = prompt("How long do you want your password to be (between 8 and 128 chars):", "12");
    var intchars = parseInt(strchars,10);
    var txt="";
    console.log(intchars);
    if (isNaN(strchars)) {
        txt="Oops - you did not enter a valid number! Please start again.";
        intchars= 0;
    } else if (strchars == undefined) {
        txt = "Cancelling password generation.";
        intchars= 0;
    } else if (intchars < 8  || intchars > 128) {
        txt = "Number is not in range."; 
        intchars= 0;
    };
    if(txt.length!==0){ alert(txt)} ;
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

    $('#getCharsModal').on("shown.bs.modal",function(){
        var tempobj=$(".form-check-input");
        console.log((tempobj));
        for (i=0;i<tempobj.length;i++){
            tempobj[i].checked=false
        };
    });
    $('#getCharsModal').modal('show');
    
    $("#nextbtn").prop('disabled', true);
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
                fullcharstring= fullcharstring + strlcase;
                break;
            case "u": 
                fullcharstring=fullcharstring + strucase;
                break;
            case "n": 
                fullcharstring=fullcharstring +  strnums;
                break;
            case "s": 
                fullcharstring=fullcharstring +  strspecchar;
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
    var passwordText = $("#password");
    console.log("writing password to screen:" + password);
    passwordText.text(password);
};


function setDefaults(){
    console.log("Setting defaults...");
    $("#password").text(null);
    $("#lwrcase").is("checked",false);
    $("#uprcase").is("checked",false);
    $("#nums").is("checked",false);
    $("#specchar").is("checked",false);
    
}


function getSelectionArray(){
    var numselected=0;
    console.log("Getting selection array");
    selectionarray=[];

    if($("#lwrcase").is(":checked",true)) {selectionarray.push("l")};
    if($("#uprcase").is(":checked",true)) {selectionarray.push("u")};
    if($("#nums").is(":checked",true)) {selectionarray.push("n")};
    if($("#specchar").is(":checked",true)) {selectionarray.push("s")};

    numselected=selectionarray.length;
    return numselected;
};

// Add event listener to generate button

$("#generate").on("click", function(){
    var numdigits=getPasswordLength();
    setDefaults();
    numchars=numdigits;
    //go to the next step
    if (numdigits !== 0) {
        openCharsModal();
    };
});

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
        $("#nextbtn").prop("disabled",false);
    } else {
        console.log("nothing selected");
        $("#nextbtn").prop("disabled",true);
    };
});
