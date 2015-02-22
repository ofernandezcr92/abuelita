var helpgrandma = helpgrandma || {};

(function(){
    function SearchBar() {
        this.init = false;

        this.initSearchBar = function () {
            if(!this.init) {
                if($('#sfdiv').length > 0) {
                	$('#viewport').prepend('<div class="search-high-light"></div>');
                	$('#sfdiv').addClass("search-bar");

                	$('.tsf-p').append('<div class="search-composer-announcement"><div class="top-arrow"></div><div class="grandma-container"></div><span class="grandma-text search-text"> Write your question </span></div>');



                	$('#lst-ib').bind("input", function() {
                        $('.search-high-light').remove();
                        $('#sfdiv').removeClass("search-bar");
                        $('.search-composer-announcement').remove();

                	});

                    // $('body').prepend('<div class="high-light"></div>');
                    // $('.z0').parent().addClass("relevant-area");
                    // $('.z0').parent().append('<div class="composer-announcement"><div class="left-arrow"></div><div class="grandma-container"></div><span class="grandma-text"> Click this button </span></div>');
                    // $('.z0').children().addClass("composer-button");

                    // $('.z0').eq(0).bind("click", function() {
                    //     $('.high-light').remove();
                    //     $('.composer-announcement').remove();
                    //     $('.z0').parent().removeClass("relevant-area");
                    //     $('.z0').eq(0).removeClass("composer-button");
                    // });

                    this.init = true;
                }
            }
        };
    }

    helpgrandma.SearchBar  = new SearchBar();
})();

// // element.style {
// /* background-color: white; */
// color: rgb(90, 196, 190);
// font-size: 32px;
// height: 111px;
// left: 10px;
// position: absolute;
// /* top: 0px; */
// width: 395px;
// z-index: 1000;
// font-family: MuseoSans300, Arial, Helvetica;