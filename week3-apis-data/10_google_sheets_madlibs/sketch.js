// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/


function setup() {
    noCanvas();

    // This is the URL for my google sheet
    // The sheet is generated from this form: http://goo.gl/forms/0X67GZJTZJ
    // The sheet must set to File --> Published for the Web
    var url = 'https://docs.google.com/spreadsheets/d/1PCuj_nEiwfbd_5pm9aWLWjbRs2mP6v8C45BbWl6WTn0/pubhtml';


    // Make the request

    var button = select('#generate');
    button.mousePressed(madlibber);

    function madlibber() {

        // I'm forming my own special syntax for how to substitute
        // this will help the regex and replace function
        var txt = '"$Exclamation$!" she said $Adverb$ as she jumped into her convertible $Noun$ '
            + 'and drove off with her $Adjective$ $Noun$.';

        // Tabletop expects some settings
        var settings = {
            key: url,            // The url of the published google sheet
            callback: gotData,   // A callback for when the data comes in
            simpleSheet: true    // This makes things simpler for just a single worksheet of rows
        };

        // Get the data
        Tabletop.init(settings);

        // The data comes back as an array of objects
        // Each object contains all the data for one row of the sheet
        // See comment above
        function gotData(data) {

            // Run the replace function with a callback
            var madlib = txt.replace(/\$(.*?)\$/g, replacer);


            // This function replaces words
            function replacer(match, what) {
                // Pick a random entry
                var i = floor(random(data.length));

                // Now get the
                var newtext = data[i][what];

                // Check for malicious Javascript code inserted via the spreadsheet
                // Users are only allowed to input a mix of letters, digits, spaces and standard punctuation
                if (!/^[a-zA-Z0-9,.!? ]*$/.test(newtext)) {

                    // User input doesn't match our criteria
                    // Call this function recursively to get a different replacement text
                    return replacer(match, what);
                }

                if (what === 'Exclamation') {
                    newtext = newtext.replace(/^(.)/, capitalize);
                    function capitalize(match, firstLetter) {
                        return firstLetter.toUpperCase();
                    }
                }

                return newtext;
            }

            var par = createP(madlib);
            par.parent('madlib');
            par.class('text');
        }


    }
}

