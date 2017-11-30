
var solveButton = document.getElementById("solveButton");
solveButton.addEventListener("click", buttonClick, false);

var coef = new Array(3);

function buttonClick() {
    coef[0] = document.getElementById("coefA");
    coef[1] = document.getElementById("coefB");
    coef[2] = document.getElementById("coefC");

    var validationFail = false;
    if (isNaN(coef[0].value) || coef[0].value == "" || coef[0].value == 0) {
        coef[0].className = "validationFail";
        validationFail = true;
    }
    for (var i = 1; i < 3; i++) {
        if (isNaN(coef[i].value) || coef[i].value == "") {
            coef[i].className = "validationFail";
            validationFail = true;
        }
    }
    if (validationFail) resultText.innerHTML = "wrong coefficients";
    else {
        for (var i = 0; i < 3; i++) coef[i].className = "";
        requestSolution(coef[0].value, coef[1].value, coef[2].value);
    }
}

var ajaxRequest = new XMLHttpRequest();

function requestSolution(a, b, c) {
	ajaxRequest.onreadystatechange = processResponse;
	var url = "getSolution?a=" + a + "&b=" + b + "&c=" + c;
	ajaxRequest.open("GET", url, true);
	ajaxRequest.send(null);
}

function processResponse() {
    if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
        var solution = JSON.parse(ajaxRequest.responseText);
        var resultText = document.getElementById('resultText');
        resultText.innerHTML = "x1 = " + solution.x1 + "<br>x2 = " + solution.x2;
        insertInTable(coef[0].value, coef[1].value, coef[2].value, solution.x1, solution.x2);
    }
}

function insertInTable(a,b,c,x1,x2) {
    var tableBody = document.getElementById('tableBody');
    var row = document.createElement('tr');
    row.addEventListener("click", deleteRow, false);
    var tdA = document.createElement('td');
    tdA.innerHTML = a;
    row.appendChild(tdA);
    var tdB = document.createElement('td');
    tdB.innerHTML = b;
    row.appendChild(tdB);
    var tdC = document.createElement('td');
    tdC.innerHTML = c;
    row.appendChild(tdC);
    var tdX1 = document.createElement('td');
    tdX1.innerHTML = x1;
    row.appendChild(tdX1);
    var tdX2 = document.createElement('td');
    tdX2.innerHTML = x2;
    row.appendChild(tdX2);
    tableBody.appendChild(row);
    paintRows();
}

function deleteRow() {
    this.parentNode.removeChild(this);
    paintRows();
}

function paintRows() {
    var tableBody = document.getElementById('tableBody');
    for (var i = 1; i <= tableBody.childElementCount; i++) {
        if (i % 2 == 0) tableBody.childNodes[i].className = "paintedTableRow";
        else tableBody.childNodes[i].className = "";
    }
}
