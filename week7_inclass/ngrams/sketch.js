//var txt = "the quick brown fox jumped over the lazy dog.";
var txt = "Google’s Pixel, the first smartphone to carry the search giant’s brand name, arrives in stores on Thursday in a lucky stroke of timing. For Google, at least."+
"This holiday season, all Google’s new phone has to do to compete with those from Samsung, the world’s largest handset maker, is not burst into flames. That’s what recently happened to a bunch of Samsung Galaxy Note 7s, the higher-end smartphones that use Google’s Android software. The Note 7s have since been recalled and Samsung has shut down the product entirely."+
"The absence of a major competing Android device works out especially well for Google because the Pixel is, relatively speaking, mediocre. It is slower than Apple’s iPhone 7 and the Galaxy S7, Samsung’s smaller flagship phone. Photos shot with Pixel’s camera don’t look as good as the iPhone’s. And Google’s built-in artificially intelligent virtual assistant, called Assistant, is still fairly dumb."+
"But hey, the Pixel probably won’t burn down your garage or injure a child. So if you prefer Android and are already hooked on Google’s suite of internet-powered software, including its maps, photos, email and document-editing apps, then you probably won’t regret buying the Pixel.";

var order = 2;
var ngrams = {};
var button;

function setup() {
    noCanvas();
    console.log(txt);
    for (var i = 0; i <= txt.length - order; i++) {
        var gram = txt.substring(i, i + order);

        if (!ngrams[gram]) {
            ngrams[gram] = [];
            ngrams[gram].push(txt.charAt(i + order));
        } else {
            ngrams[gram].push(txt.charAt(i + order));
        }

    }

    button = createButton('generate');
    button.mousePressed(markovGo);
    console.log(ngrams);
}

function markovGo() {
    // generation algorithm goes here

    var currentgram = txt.substring(0, order);
    var result = currentgram;
    var count = 0;
    while (count < 100) {
        var possibilities = ngrams[currentgram];
        console.log(possibilities);
        var next = random(possibilities);
        result += next;
        count++;
        currentgram = result.substring(result.length-order, result.length);
    }

    createP(result);


}
