// GLOBAL VARIABLES
const BASE_URL = 'https://www.sbir.gov/api/awards.json?';

// nav button .active and inative status on menu buttons
document.querySelector('.nav-button').addEventListener('click', (e) => {
    // checking to make sure a button was pressed as we are 'selecting' the entire div.
    const isButton = e.target.nodeName === 'BUTTON';
    if(isButton) {
        // remove the active class from the currently active button
        document.querySelector('.nav-btn-active').classList.remove('nav-btn-active');
        
        // add the active class to the button that was clicked
        e.target.classList.add('nav-btn-active');

        // update the query-title
        const queryTitleEL = document.getElementById('query-title');
        queryTitleEL.innerHTML = e.target.innerHTML;

        // do we need to add logic to set the default 'active' in the query menu when we change these buttons?
    }
});

// side nav button .active and inative status on query buttons
document.querySelector('.query-sub').addEventListener('click', (e) => {
    // check to make sure a buttonw as pressed as we are 'selecting' the entire div.
    const isButton = e.target.nodeName === 'BUTTON';
    if(isButton){
        // remove the active class from the currently active button
        document.querySelector('.query-btn-active').classList.remove('query-btn-active');

        // add the active class to the button that was clicked
        e.target.classList.add('query-btn-active');
    }
});

// agency awards api call and rsults population
document.getElementById('awards-query-search').addEventListener('click', (e) => {
    // getting the status of the agency radio inputs
    const agencyRBS = document.querySelectorAll('input[name="agency-option"]');
    let agency;

    // looping through all of the radio buttons to find out which is checked=true and storing that ID in a variable
    for (const rb of agencyRBS) {
        if(rb.checked){
            agency = rb.id;
            break;
        }
    }

    // getting the status of the year radio inputs
    const yearRBS = document.querySelectorAll('input[name="year-option"]');
    let year;

    // looping through all of the radio buttons to find out which is checked=true and storing that ID in a variable
    for (const rbs of yearRBS) {
        if(rbs.checked){
            year = rbs.id;
            break;
        }
    }

    // calling getAgencyAwards
    getAgencyAwards(agency, year);
});

function getAgencyAwards(agency, year){
    fetch(BASE_URL + "agency=" + agency + "&year=" + year + "&rows=25")
    .then((rest) => rest.json())
    .then((data) => {
        // getting DOM elements
        const resultsEl = document.querySelector('.results');

        // looping through the API results and posting to HTMML
        let output;
        data.forEach(function(post){
            output += `
            <a href=">
                <div class="output">
                    <div class="output-left">
                        <H4>${post.firm} - ${post.city}, ${post.state}</H4>
                        <p>${post.program}</p>
                        <p>${post.award_title}</p>
                    </div>
                <div class="output-right"> 
                        <H4>$${post.award_amount}</H4>
                        <p>${post.agency}</p>
                        <p>${post.phase}</p>
                    </div>
                </div>
            </a>
            `;
        });
        resultsEl.innerHTML = output;
    })
    .catch(error => console.log('FETCH ERROR'));

    // pagination
    // For Page 2 Example: https://www.sbir.gov/api/awards.xml?start=100
    // For Page 3 Example: https://www.sbir.gov/api/awards.xml?start=200

    // do we want to create a auto-incremented id number for the 'output' above for 'click' functions?
    // where do we want 'clicks' from this page to take us?  Can we query the API by solicitation number? 
        // or are we displaying awards by firm?
    // do we wnat to format the currency?
    // do we want to format the award_title for easier reading?
    // do we want to format the a:hover?
    // handle pagination?
}

