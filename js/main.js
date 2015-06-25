CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
    }
}




$(document).ready(function () {

    new WOW().init();

    var divTable = $("#solutions");
    var computedFontSize = window.getComputedStyle(document.getElementsByTagName("p")[0]).fontSize;
    var computedFontType = window.getComputedStyle(document.getElementsByTagName("p")[0]).fontFamily;
    const max_width = 4;
    const max_height = 6;
    for (var i = 0; i < max_height; i++) {
        var row = $('<div class="row solution"></div>');
        divTable.append(row);
        for (var j = 0; j < max_width; j++) {
            var id = i * max_width + j;
            var div = $('<div class="col-sm-3"></div>');
            var canvas = document.createElement('canvas');
            $(canvas).attr('id', "solution-" + (id).toString()).attr("class", "solution-box").appendTo(div);
            var overlay = document.createElement('span');
            $(overlay).attr('class', "solution-overlay").appendTo(div);
            var preview = document.createElement('i');
            $(preview).attr('class', 'fa fa-search-plus fa-2x preview').attr('id', 'preview-' + id.toString()).appendTo(overlay);
            var download = document.createElement('i');
            $(download).attr('class', 'fa fa-download fa-2x download').attr('id', 'download-' + id.toString()).appendTo(overlay);
            var ctx = canvas.getContext("2d");
            ctx.font = "25px " + computedFontType;
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            ctx.textAlign = 'center';
            ctx.wrapText("Chapter " + (id + 1).toString() + "\nSolution", x, y, 150, 30);
            //div.append(canvas);
            row.append(div);
        }


    }

    

    $('.solution-overlay').mouseenter(function () {
        $(this).parent().children(".solution-box").css("opacity", 0.2);
        $(this).css("opacity", 1.0);
    });

    $('.solution-overlay').mouseleave(function () {
        $(this).parent().children(".solution-box").css("opacity", 1.0);
        $(this).css("opacity", 0.0);
    });

    $('.solution-box').mouseenter(function () {
        $(this).parent().children(".solution-overlay").css("opacity", 1.0);
        $(this).css("opacity", 0.2);
    });

    $('.solution-box').mouseleave(function () {
        $(this).parent().children(".solution-overlay").css("opacity", 0.0);
        $(this).css("opacity", 1.0);
    });

    $('.preview').click(function (event) {
        var id = parseInt(event.target.id.split("-")[1]);
        var url = window.location.href;
        url = url.replace("/index.html", "");
        var pdfSrc = url + "/pdf/Chapter" + (id + 1).toString() + "SolutionsRWP2.pdf";
        pdfSrc = "https://docs.google.com/viewer?srcid=" + pdfSrc + "&embedded=true";
        $('#pdf-container').attr('src', pdfSrc);
        $('#pdf-modall-label').text("Chapter " + (id + 1).toString() + " Solutions");
        $('#pdf-modal').modal('show');
    });

    for (var i = 0; i < max_height * max_width; i++) {
        var icon = $("#download-" + i.toString());
        var pdfSrc = "pdf/Chapter" + (i + 1).toString() + "SolutionsRWP2.pdf";
        $(icon).click(function () {
            var link = document.createElement('a');
            link.href = pdfSrc;
            link.download = pdfSrc.split("/")[1];
            document.body.appendChild(link);
            link.click();
            setTimeout(function () { link.parentNode.removeChild(link); }, 10);
        });
    };


});