let responseLimit;

$('.dropdownButton').on("click", function () {
    responseLimit = $(this).html();
    console.log(responseLimit);

    $('.dropbtn').html(responseLimit);
});

$('#submit').on('click', function () {
    let term = $('#searchTerm')[0].value;
    let startYear = $('#startYear')[0].value
    let endYear = $('#endYear')[0].value

    if (parseInt(startYear)) {
        startYear = "&begin_date=" + startYear + "0101";
    }

    if (parseInt(endYear)) {
        endYear = "&end_date=" + endYear + "1231";
    }

    $.ajax({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + term + startYear + endYear + "&api-key=iUcIo2Jtk7gGtSA19GxAKA6MpKidMzD7",
        method: "GET"
    }).then(function (data) {
        for (let i = 0; i < responseLimit; i++) {
            $('#updates').append(`<div id='segment'></div>`);
            $('#segment').append(`<h3>${i + 1} ${data.response.docs[i].headline.main}</h3>`);
            $('#segment').append(`<h5>${data.response.docs[i].byline.original}</h5>`);
        }
    })
});

$('#clear').on('click', function () {
    $('#updates').empty();
    $('#searchTerm').text('');
});