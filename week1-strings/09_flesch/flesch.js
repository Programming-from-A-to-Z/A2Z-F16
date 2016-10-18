// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/


// Since there is a lot of code to process and analyze
// the text, I've moved it to a separate file.
// The algorithm for calculating the Flesch Index
// runs here.

function process(data) {

  // Check to see if they entered something
  var len = data.length;
  if (data.length === 0) {
    alert("Enter something!");
  } else {
    var totalSyllables = 0;
    var totalSentences = 0;
    var totalWords     = 0;

    var delimiters = '.:;?! !@#$%^&*()+';
    var words = splitTokens(data, delimiters);
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      totalSyllables += countSyllables(word);
      totalWords++;
    }

    // Look for sentence delimiters
    var sentenceDelim = '.:;?!';
    var sentences = splitTokens(data, sentenceDelim);
    totalSentences = sentences.length;

    // Calculate flesch index
    var f1 = 206.835;
    var f2 = 84.6;
    var f3 = 1.015;
    var r1 = totalSyllables / totalWords;
    var r2 = totalWords / totalSentences;
    var flesch = f1 - (f2 * r1) - (f3 * r2);

    // Write Report
    var report = "";
    
    report += "Total Syllables: " + totalSyllables + "<br/>";
    report += "Total Words    : " + totalWords + "<br/>";
    report += "Total Sentences: " + totalSentences + "<br/>";
    report += "Flesch Index   : " + flesch + "\n";   

    var flesch = createP(report);
    flesch.class('text');
    paragraphs.push(flesch);
  }
}

// A method to count the number of syllables in a word
// Pretty basic, just based off of the number of vowels
// This could be improved
function countSyllables(word) {
  var syl    = 0;
  var vowel  = false;
  var length = word.length;

  // Check each word for vowels (don't count more than one vowel in a row)
  for (var i = 0; i < length; i++) {
    if (isVowel(word.charAt(i)) && (vowel == false)) {
      vowel = true;
      syl++;
    } else if (isVowel(word.charAt(i)) && (vowel == true)) {
      vowel = true;
    } else {
      vowel = false;
    }
  }

  var tempChar = word.charAt(word.length-1);
  // Check for 'e' at the end, as long as not a word w/ one syllable
  if (((tempChar == 'e') || (tempChar == 'E')) && (syl != 1)) {
    syl--;
  }
  return syl;
}

// Check if a char is a vowel
function isVowel(c) {
  if      ((c == 'a') || (c == 'A')) { return true;  }
  else if ((c == 'e') || (c == 'E')) { return true;  }
  else if ((c == 'i') || (c == 'I')) { return true;  }
  else if ((c == 'o') || (c == 'O')) { return true;  }
  else if ((c == 'u') || (c == 'U')) { return true;  }
  else if ((c == 'y') || (c == 'Y')) { return true;  }
  else                               { return false; }
}
