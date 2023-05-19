//function to reverse string
function reverseStr(str) {
  var listOfCharacters = str.split("");
  var reverseListOfCharacters = listOfCharacters.reverse();
  var reversedStr = reverseListOfCharacters.join("");
  return reversedStr;
  // return str.split('').reverse().join('')     alternate  short method
}

//function to check if string is palindrome
function isPalindrome(str) {
  var reverse = reverseStr(str);
  return reverse === str;
}

//Converting Date to string
function converDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

//Generate All the date Formats
function getAllDateFormats(date) {
  var dateStr = converDateToString(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//function to find palindrome in any date format
function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);
  let flag = false;
  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

//function to check whether its a leap year or not
function isLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

//function to find next date
function getNextDate(date) {
  var day = date.day + 1;
  29;
  var month = date.month;
  var year = date.year;

  var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //Checking february and leap Year
  if (month == 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }

  //Check if number of adays exceed maximumn days in month
  else {
    if (day > daysInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }

  //Taking care of december month
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);
  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

// var date = {
//   day: 31,
//   month: 12,
//   year: 2020,
// };

// console.log(getNextPalindromeDate(date));

function $(selector) {
  return document.querySelector(selector);
}

var input = $("#input");
var result = $("#result");
var submit = $("#submit");

function clickHandler(e) {
  var birtDayString = input.value;

  if (birtDayString !== "") {
    var listOfDate = birtDayString.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);
    if (isPalindrome) {
      result.innerText = "😍 Yay! Your Birthday is Palindrome 😍 ";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      result.innerText = `😢 Uh Oh! The Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😢`;
    }
  }
}

submit.addEventListener("click", clickHandler);
