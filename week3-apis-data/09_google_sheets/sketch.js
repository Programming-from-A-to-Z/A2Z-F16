// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/

// This sheet
// | ----------------|
// | label  | number |
// | ----------------|
// | apple  | 9      |
// | ----------------|
// | pear   | 4      |
// | ----------------|
// | orange | 3      |
// | ----------------|

// Turns into:

// [ { label: apple, number: 9 }, { label: pear, number: 4 }, { label: orange, number: 3 } ]

function setup() {
    // This is the URL for my google sheet
    // The sheet is generated from this form: http://goo.gl/forms/0X67GZJTZJ
    // The sheet must set to File --> Published for the Web
    var url = 'https://docs.google.com/spreadsheets/d/1YQ7js53a5Gdidi3XS5HxkDvHWgmAS1kCCi9NnmH7Uc0/pubhtml';

    // Tabletop expects some settings
    var settings = {
        key: url,            // The url of the published google sheet
        callback: gotData,   // A callback for when the data comes in
        simpleSheet: true    // This makes things simpler for just a single worksheet of rows
    };

    // Make the request
    Tabletop.init(settings);

    // The data comes back as an array of objects
    // Each object contains all the data for one row of the sheet
    // See comment above
    function gotData(data) {
        // Look at the data in the console
        console.log(data);

        // Make an HTML list
        var list = createElement('ol');
        list.parent('data');
        for (var i = 0; i < data.length; i++) {

            var label = data[i].label;
            var number = data[i].Number;
            var timestamp = data[i].Timestamp;

            // Sanitize user input with RegEx:
            // - Stop users from injecting malicious Javascript into the page via the values spreadsheet
            // - Check if values are indeed what the say to be.
            //   What prevents a user from putting letters into the Numbers column? Nothing...
            if (
                /^[a-zA-Z0-9 ]*$/.test(label)   // Check if label is indeed a label (only letters, numbers and spaces)
                && /^[0-9,.]*$/.test(number)    // Check if number consists of only digits, dots and commas
                && /^((\d{1,2}\/){2}\d{4} \d{1,2}(:\d{2}){2})?$/.test(timestamp)    // MM/DD/YYYY hh:mm:ss
            ) {
                // Input passed all tests, add it to the page
                var item = createElement('li', label + ': ' + number + ", submited at " + timestamp);
                item.parent(list);
            }
        }
    }
}

