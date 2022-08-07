
(function ($) {
    $.fn.SmartDate = function (options) {
        var config = {}
        var t = this;        
        var defaults = {
            'ID': 'SmartDate'
        }
        config = $.extend({}, defaults, options);
        config.ID = $(t).attr('id');

        $(t).on('DrawComplete', function (e, results) {
            var md = new Date(results.Value);
            var dayIndex = md.getDay();
            var dy = results.daysComplete[dayIndex];

            var dd = md.getDate();
            var mm = md.getMonth() + 1; //January is 0!

            var yyyy = md.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = mm + '/' + dd + '/' + yyyy;
            //CaseTransDetails(window.UserID, today);
            $(t).trigger('ValueChange', today);
            //alert('Sales Info as of ' + today);


            //alert(dy);

        });
        $(t).delegate("tr.rows", "click", function () {
            $('#SmartDateContent').find('active').removeClass('active');
            //alert($(this).parent().parent().attr('class'));

            $(SD.PrevIndex).removeClass('active');
            SD.PrevIndex = this;
            $(this).addClass('active');
            SD.GetNewDate($(this).find("td").next().text());

            var md = new Date(SD.Value);
            var dd = md.getDate();
            var mm = md.getMonth() + 1; //January is 0!
            var yyyy = md.getFullYear();
            if (dd < 10) { dd = '0' + dd; }
            var today = mm + '/' + dd + '/' + yyyy;

            //$("#v_TransDate").val(today);
            //var StoreID = $("#v_StoreID").val();

            //CaseTransDetails(window.UserID, today);
            $(t).trigger('ValueChange', today);
            //alert($(this).find("td").next().text());
            //alert(SD.GetNewDate($(this).find("td").next().text()));
        });
        $(t).delegate("ul.dropdown-menu li a", "click", function () {
            //jQuery("#SmartDate ul.dropdown-menu li a").click(function () {
            $(this).parent().parent().find("li").removeClass("active");
            $(this).parent().addClass("active");
            var pa = jQuery(this).parent().parent().parent().find("a").first();
            var t = jQuery(this).parent().text();

            var ph = jQuery(this).parent().parent().parent().attr("data");
            var h = jQuery(this).attr("data");
            if (ph == 'Year') {

                SD.Year = parseInt(h);
                SD.Create();

            }
            if (ph == 'Month') {

                SD.Month = parseInt(h);
                SD.Create();
            }
            var s = t + "<b class=\"" + "caret" + "\"></b>";
            pa.html(s);
        });

        function SD(t) {
            var d = new Date();
            this.PrevIndex;
            this.Month = d.getMonth() + 1;
            this.Year = d.getFullYear();
            this.Day = d.getDate();
            this.Value = d;
            this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
            this.daysComplete = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this.months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            this.daysInMonth = function daysInMonth(month, year) {
                return new Date(year, month, 0).getDate();
            }
            this.GetNewDate = function GetNewDate(arg) {
                var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                this.Day = parseInt(arg);
                var d = new Date(months[this.Month] + this.Day + ", " + this.Year);
                this.Value = d;
                return this.Value;
            };


            this.Create = function Create() {
                //$('#SmartDate').html('');
                var ht = $('#SDnavbar').html();
                var LoadNav = false;
                if (typeof ht == 'undefined' || ht === null) LoadNav = true;

                var content = "<div id = 'SmartDateContent'> <table  class = 'SDTBody' style='width:100'>"
                if (LoadNav == false) {
                    $('#SmartDateContent').html('');
                    content = "<table class = 'SDTBody' style='width:100'>"
                }


                var month = this.Month;
                var day = this.Day;

                //Content
                this.GetNewDate(day);
                var x = this.daysInMonth(this.Month, this.Year);

                if (this.Day > x) { this.Day = x; this.GetNewDate(x); }
                for (i = 1; i <= x; i++) {

                    var output = this.Year + '/' +
                   (month < 10 ? '0' : '') + month + '/' +
                   (day < 10 ? '0' : '') + i;
                    var md = new Date(output);
                    var dayIndex = md.getDay();
                    var dy = this.days[dayIndex];
                    var style = '';
                    if (dayIndex == 0) style = 'style="color:red"';
                    if (dayIndex > 0) style = 'style="color:#FFF212"';

                    if (i == this.Day) {
                        content += '<tr id="SDTRID' + i + '" class ="rows active" ><td ' + style + '>' + dy + '</td> <td style="color:white">' + i + '</td> </tr>';
                    } else {
                        content += '<tr id="SDTRID' + i + '"class ="rows" ><td ' + style + '>' + dy + '</td> <td style="color:white">' + i + '</td> </tr>';
                    }
                }
                content += "</table>";
                if (LoadNav == true) content += "</div>";


                //Navigation Bar
                var nav = '';
                if (LoadNav == true) {
                    nav += '<div class="nav" id="SDnavbar"> ';
                    nav += '<ul class= "nav" >';

                    nav += '<li class="dropdown" data="Year"> ';
                    nav += '<a id ="sdYear" aria-expanded="false" role="button" data-toggle="dropdown" class="dropdown-toggle" ';
                    nav += 'href="#">' + this.Year + '<span class="caret"></span></a>';
                    nav += '<ul role="menu" class="dropdown-menu"> ';
                    nav += '<li><a data = "2014" href="#">2014</a></li> ';
                    nav += '<li><a data = "2015" href="#">2015</a></li> ';
                    nav += '</ul></li>';

                    nav += '<li class="dropdown" data="Month"> ';
                    nav += '<a aria-expanded="false" role="button" data-toggle="dropdown" class="dropdown-toggle" ';
                    nav += 'href="#">' + this.months[month] + '<span class="caret"></span></a>';
                    nav += '<ul role="menu" class="dropdown-menu"> ';

                    //Add the Month Selection
                    for (i = 1; i <= 12; i++) { nav += '<li><a data = "' + i + '" href="#">' + this.months[i] + '</a></li> '; }
                    nav += '</ul></li>';
                    nav += '</ul></div> <hr width="100%"> ';
                }

                if (LoadNav == true) {
                    $(t).append('<div style="width:100px;"><div class ="panel panel-info">' +
                        nav + content + '</div></div>');
                }
                if (LoadNav == false) {
                    $('#SmartDateContent').append(content);
                }

                this.PrevIndex = $('#SDTRID' + this.Day);

                $(t).trigger('DrawComplete', this);
                // Define a new event.



            }
        }

        var SD = new SD(t);
        SD.Create();



    }
})(jQuery);