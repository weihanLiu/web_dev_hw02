(function () {
	"use strict"

	var current = "0";
	var result = "0";
	var mode = "input";
	var pre_operator = ""; //store the previous operator before enter an number 

	function updateDisplay(n) {
		//if integer larger than max display width(12), show 
		//"out of Bound"
		if (n.length > 12 && !n.includes(".")) {
			n = "Out Of Bound";
		}
		//if float, chop it to fit the display width
		else if (n.length > 12) {
			n = n.substring(0, 12);
			if (n.substring(11, 12) === ".") {
				n = n.substring(0, 14);
			}
		}
		var dis_number = document.getElementsByTagName("p");
		dis_number[0].innerText = n;
	}


	function numberClick(b) {
		b.onclick = function() {
		//if current display = display width, do nothing 
		//when click the number button
		//otherwise, add the newly clicked number to the 
		//end of display
		if (current.length < 12) {
			var n = b.value; //value is string
			if (mode === "input") { //previous clicked is number
				if(current !== "0") {
					current = current + n;
				} else {
					current = n;
				}
			}
			else {//previous clicked is operator
				mode = "input";
				current = n;
				}
			updateDisplay(current);
		}
		}
	}

	function operatorClick(b) {
		b.onclick = function() {
			/*previous clicked is number, do calculation using stored previous operator*/
			if (mode === "input") {
				switch(pre_operator) {
				case "+/=": 
					result = (parseFloat(result) + parseFloat(current)).toString();
					break;
				case "-":
					result = (parseFloat(result) - parseFloat(current)).toString();
					break;
				case "*": 
					result = (parseFloat(result) * parseFloat(current)).toString();
					break;
				case "/":
					result = (parseFloat(result) / parseFloat(current)).toString();
					break;
				case "":
					result = current;
				}
				/*after calculation, show result and reset current and mode, store the
				 * newly clicked operator for later calculation process*/
				updateDisplay(result);
				current = "0";
				mode = "operate";
				pre_operator = b.value;
			}
			/*if previous clicked is operaton, update the store operator(pre_operator)
			 * to the newly clicked one and do nothing to the result number*/
			else {
				pre_operator = b.value;
			}
		}
	}

	/*reset everything to initial value*/
	function clearClick() {
		result = "0";
		current = "0";
		mode = "input";
		updateDisplay(current);
	}


	/*add corresponding eventlistener to different buttons*/
	function init() {
		var number = document.getElementsByClassName("number");
		// number = Array.from(number);
		for (var i = 0; i < number.length; i++) {
			number[i].addEventListener("click", numberClick(number[i]));
		}

		var operator = document.getElementsByClassName("operator");
		for (var i = 0; i < operator.length; i++) {
			operator[i].addEventListener("click", operatorClick(operator[i]));
		}

		var c = document.getElementsByClassName("clear");
		for (var i = 0; i < c.length; i++) {
			c[i].addEventListener("click", clearClick);
		}
	}

	/*Delay the setup code until page is fully loaded.
	 * Citied from lecture code: http://khoury.neu.edu/~ntuck/courses/
	 * 2019/09/cs5610/notes/02-browsers/page/code.js*/	
	window.addEventListener("load", init, false);

})();

