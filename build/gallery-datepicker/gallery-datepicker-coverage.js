if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datepicker/gallery-datepicker.js",
    code: []
};
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].code=["YUI.add('gallery-datepicker', function (Y, NAME) {","","/**"," * YUI3 Date Picker - A calendar popup for date input form elements"," *"," * @module gallery-datepicker"," */","","/**"," * @param args {Object} arguments for constructing the datepicker, most important is the \"input\" argument."," * @class DatePicker"," * @constructor"," */","Y.DatePicker = function (args) {","    this.args = args;","    this.format = \"%Y-%m-%d\";","    if (this.args.showTime) {","        this.format += \" %H:%M:%S\";","    }","    this.createFormElements();","    this.createPopup();","};","","/**"," * Creates the popup calendar panel, with an invisible overlay that will"," * hide it whenever you click outside the popup. The popup will be hidden"," * by default."," *"," * @method createPopup"," * @protected"," */","Y.DatePicker.prototype.createPopup = function () {","    var zIndex = 10055, body = Y.one(\"body\");","    this.container = Y.Node.create(\"<div/>\");","    this.container.setStyle(\"display\", \"none\");","    this.container.setStyle(\"position\", \"absolute\");","    this.container.setStyle(\"zIndex\", zIndex + 1);","    this.container.setStyles({","        display: \"none\", position: \"absolute\", zIndex: zIndex + 1,","        left: \"0px\", top: \"0px\"});","    this.calendar = new Y.Calendar({","        render: this.container,","        visible: true","    });","    this.calendar.on(\"selectionChange\", function (e) {","        this.setDate(e.newSelection[0]);","        this.hideContainer();","    }, this);","    if (this.args.minimumDate) {","        this.setMinimumDate(this.args.minimumDate);","    }","    if (this.args.maximumDate) {","        this.setMaximumDate(this.args.maximumDate);","    }","    this.overlay = Y.Node.create(\"<div/>\");","    this.overlay.setStyles({","        top: \"0px\", left: \"0px\",","        width: \"100%\", height: \"100%\", display: \"none\",","        position: \"fixed\", zIndex: zIndex","    });","    body.addClass(\"yui3-skin-sam\");","    body.append(this.overlay);","    body.append(this.container);","    this.overlay.on(\"click\", this.hideContainer, this);","    this.container.on(\"click\", function (e) {e.stopPropagation();});","};","","/**"," * Creates the form elements around the input box, such as the button"," * which launches the calendar."," *"," * @method createFormElements"," * @protected"," */","Y.DatePicker.prototype.createFormElements = function () {","    this.input = Y.one(this.args.input);","    this.calendarLauncher = Y.Node.create('<input type=\"button\"/>');","    this.calendarLauncher.addClass(\"cal-launcher\");","    if (this.args.btnContent) {","        this.calendarLauncher.setHTML(this.args.btnContent);","    }","    this.input.insert(this.calendarLauncher, \"after\");","    this.calendarLauncher.on(\"click\", this.showContainer, this);","    if (this.args.date) {","        this.setDate(this.args.date, true);","    }","};","","/**"," * Parses the input box and returns the currently selected date object."," *"," * @method getDate"," * @return {Date}"," */","Y.DatePicker.prototype.getDate = function () {","    return this.parseDate(this.input.get(\"value\"));","};","","/**"," * Sets the currently selected date, if discardOldTime is false (or not"," * used) it will merge the previously selected time into the new date,"," * which is useful when a date is selected from the calendar widget."," *"," * @method setDate"," * @protected"," * @param {Date} newDate"," * @param {boolean} discardOldTime"," */","Y.DatePicker.prototype.setDate = function (newDate, discardOldTime) {","    var oldDate, str;","    if (!discardOldTime) {","        oldDate = this.parseDate(this.input.get(\"value\"));","        if (oldDate) {","            newDate.setHours(oldDate.getHours());","            newDate.setMinutes(oldDate.getMinutes());","            newDate.setSeconds(oldDate.getSeconds());","            newDate.setMilliseconds(oldDate.getMilliseconds());","        }","    }","    str = Y.DataType.Date.format(newDate, {format: this.format});","    this.input.set(\"value\", str);","};","","/**"," * Sets the minimum selectable date."," *"," * @method setMinimumDate"," * @param {Date} minimumDate"," */","Y.DatePicker.prototype.setMinimumDate = function (minimumDate) {","    this.minimumDate = minimumDate;","    this.setCustomRenderer();","};","","/**"," * Sets the maximum selectable date."," *"," * @method setMaximumDate"," * @param {Date} maximumDate"," */","Y.DatePicker.prototype.setMaximumDate = function (maximumDate) {","    this.maximumDate = maximumDate;","    this.setCustomRenderer();","};","","/**"," * Sets the custom renderer for the calendar to respect the minimum and"," * maximum dates selected if used."," *"," * @method setCustomRenderer"," * @protected"," */","Y.DatePicker.prototype.setCustomRenderer = function () {","    if (this.customRenderer) {","        return;","    }","    var self, canBeSelected, filterFunction, f;","    self = this;","    canBeSelected = function (date) {","        if (self.maximumDate && date > self.maximumDate) {","            return false;","        }","        if (self.minimumDate && date < self.minimumDate) {","            return false;","        }","        return true;","    };","    filterFunction = function (date, node) {","        if (canBeSelected(date)) {","            node.removeClass(\"yui3-calendar-selection-disabled\");","        }","        else {","            node.addClass(\"yui3-calendar-selection-disabled\");","        }","    };","    this.calendar.set(\"customRenderer\",","        {filterFunction: filterFunction, rules: {all: \"all\"}});","    f = this.calendar._canBeSelected;","    this.calendar._canBeSelected = function (date) {","        if (!canBeSelected(date)) {","            return false;","        }","        return f.call(self.calendar, date);","    };","    this.customRenderer = true;","};","","/**"," * Parses the date in the input box. It recognizes iso8601 formatted"," * dates with everything optional up to the year. So \"1999\" is valid,"," * just as \"2006-04-20\", or \"2008-01-01 15:30:55\", but \"foo\" is not. Used"," * just before the calendar is * shown so that it can be focused on the"," * correct date."," *"," * @method parseDate"," * @protected"," */","Y.DatePicker.prototype.parseDate = function (str) {","    if (!str) {","        return null;","    }","    var m = str.match(/^(\\d{4})(?:-(\\d{1,2})(?:-(\\d{1,2})(?:[ T](\\d{1,2})(?::(\\d{1,2})(?::(\\d{1,2}))?)?)?)?)?$/);","    if (!m) {","        return null;","    }","    return new Date(m[1], m[2] - 1 || 0, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0);","};","","/**"," * Shows the calendar popup."," *"," * @method showContainer"," * @protected"," */","Y.DatePicker.prototype.showContainer = function (e) {","    if (e) {","        e.preventDefault();","    }","    if (this.onshow) {","        this.onshow();","    }","    var x, y, date;","    x = this.calendarLauncher.getX();","    y = this.calendarLauncher.getY() +","            parseInt(this.calendarLauncher.getComputedStyle(\"height\"), 10);","    this.container.setStyles({left: x, top: y});","    date = this.parseDate(this.input.get(\"value\"));","    if (date) {","        this.calendar._addDateToSelection(date, true);","        this.calendar.set(\"date\", date);","    }","    else {","        this.calendar.set(\"date\", new Date());","    }","    this.overlay.setStyle(\"display\", \"block\");","    this.container.setStyle(\"display\", \"block\");","};","","/**"," * Hides the calendar popup."," *"," * @method hideContainer"," * @protected"," */","Y.DatePicker.prototype.hideContainer = function () {","    this.overlay.setStyle(\"display\", \"none\");","    this.container.setStyle(\"display\", \"none\");","};","","","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"calendar\", \"node\", \"datatype-date\"], \"skinnable\": true});"];
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].lines = {"1":0,"14":0,"15":0,"16":0,"17":0,"18":0,"20":0,"21":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0,"38":0,"41":0,"45":0,"46":0,"47":0,"49":0,"50":0,"52":0,"53":0,"55":0,"56":0,"61":0,"62":0,"63":0,"64":0,"65":0,"75":0,"76":0,"77":0,"78":0,"79":0,"80":0,"82":0,"83":0,"84":0,"85":0,"95":0,"96":0,"109":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"120":0,"121":0,"130":0,"131":0,"132":0,"141":0,"142":0,"143":0,"153":0,"154":0,"155":0,"157":0,"158":0,"159":0,"160":0,"161":0,"163":0,"164":0,"166":0,"168":0,"169":0,"170":0,"173":0,"176":0,"178":0,"179":0,"180":0,"181":0,"183":0,"185":0,"198":0,"199":0,"200":0,"202":0,"203":0,"204":0,"206":0,"215":0,"216":0,"217":0,"219":0,"220":0,"222":0,"223":0,"224":0,"226":0,"227":0,"228":0,"229":0,"230":0,"233":0,"235":0,"236":0,"245":0,"246":0,"247":0};
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].functions = {"DatePicker:14":0,"(anonymous 2):45":0,"(anonymous 3):65":0,"createPopup:32":0,"createFormElements:75":0,"getDate:95":0,"setDate:109":0,"setMinimumDate:130":0,"setMaximumDate:141":0,"canBeSelected:159":0,"filterFunction:168":0,"_canBeSelected:179":0,"setCustomRenderer:153":0,"parseDate:198":0,"showContainer:215":0,"hideContainer:245":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].coveredLines = 107;
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 1);
YUI.add('gallery-datepicker', function (Y, NAME) {

/**
 * YUI3 Date Picker - A calendar popup for date input form elements
 *
 * @module gallery-datepicker
 */

/**
 * @param args {Object} arguments for constructing the datepicker, most important is the "input" argument.
 * @class DatePicker
 * @constructor
 */
_yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 14);
Y.DatePicker = function (args) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "DatePicker", 14);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 15);
this.args = args;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 16);
this.format = "%Y-%m-%d";
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 17);
if (this.args.showTime) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 18);
this.format += " %H:%M:%S";
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 20);
this.createFormElements();
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 21);
this.createPopup();
};

/**
 * Creates the popup calendar panel, with an invisible overlay that will
 * hide it whenever you click outside the popup. The popup will be hidden
 * by default.
 *
 * @method createPopup
 * @protected
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 32);
Y.DatePicker.prototype.createPopup = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "createPopup", 32);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 33);
var zIndex = 10055, body = Y.one("body");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 34);
this.container = Y.Node.create("<div/>");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 35);
this.container.setStyle("display", "none");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 36);
this.container.setStyle("position", "absolute");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 37);
this.container.setStyle("zIndex", zIndex + 1);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 38);
this.container.setStyles({
        display: "none", position: "absolute", zIndex: zIndex + 1,
        left: "0px", top: "0px"});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 41);
this.calendar = new Y.Calendar({
        render: this.container,
        visible: true
    });
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 45);
this.calendar.on("selectionChange", function (e) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 2)", 45);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 46);
this.setDate(e.newSelection[0]);
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 47);
this.hideContainer();
    }, this);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 49);
if (this.args.minimumDate) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 50);
this.setMinimumDate(this.args.minimumDate);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 52);
if (this.args.maximumDate) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 53);
this.setMaximumDate(this.args.maximumDate);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 55);
this.overlay = Y.Node.create("<div/>");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 56);
this.overlay.setStyles({
        top: "0px", left: "0px",
        width: "100%", height: "100%", display: "none",
        position: "fixed", zIndex: zIndex
    });
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 61);
body.addClass("yui3-skin-sam");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 62);
body.append(this.overlay);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 63);
body.append(this.container);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 64);
this.overlay.on("click", this.hideContainer, this);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 65);
this.container.on("click", function (e) {_yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 3)", 65);
e.stopPropagation();});
};

/**
 * Creates the form elements around the input box, such as the button
 * which launches the calendar.
 *
 * @method createFormElements
 * @protected
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 75);
Y.DatePicker.prototype.createFormElements = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "createFormElements", 75);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 76);
this.input = Y.one(this.args.input);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 77);
this.calendarLauncher = Y.Node.create('<input type="button"/>');
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 78);
this.calendarLauncher.addClass("cal-launcher");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 79);
if (this.args.btnContent) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 80);
this.calendarLauncher.setHTML(this.args.btnContent);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 82);
this.input.insert(this.calendarLauncher, "after");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 83);
this.calendarLauncher.on("click", this.showContainer, this);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 84);
if (this.args.date) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 85);
this.setDate(this.args.date, true);
    }
};

/**
 * Parses the input box and returns the currently selected date object.
 *
 * @method getDate
 * @return {Date}
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 95);
Y.DatePicker.prototype.getDate = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "getDate", 95);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 96);
return this.parseDate(this.input.get("value"));
};

/**
 * Sets the currently selected date, if discardOldTime is false (or not
 * used) it will merge the previously selected time into the new date,
 * which is useful when a date is selected from the calendar widget.
 *
 * @method setDate
 * @protected
 * @param {Date} newDate
 * @param {boolean} discardOldTime
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 109);
Y.DatePicker.prototype.setDate = function (newDate, discardOldTime) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setDate", 109);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 110);
var oldDate, str;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 111);
if (!discardOldTime) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 112);
oldDate = this.parseDate(this.input.get("value"));
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 113);
if (oldDate) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 114);
newDate.setHours(oldDate.getHours());
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 115);
newDate.setMinutes(oldDate.getMinutes());
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 116);
newDate.setSeconds(oldDate.getSeconds());
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 117);
newDate.setMilliseconds(oldDate.getMilliseconds());
        }
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 120);
str = Y.DataType.Date.format(newDate, {format: this.format});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 121);
this.input.set("value", str);
};

/**
 * Sets the minimum selectable date.
 *
 * @method setMinimumDate
 * @param {Date} minimumDate
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 130);
Y.DatePicker.prototype.setMinimumDate = function (minimumDate) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setMinimumDate", 130);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 131);
this.minimumDate = minimumDate;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 132);
this.setCustomRenderer();
};

/**
 * Sets the maximum selectable date.
 *
 * @method setMaximumDate
 * @param {Date} maximumDate
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 141);
Y.DatePicker.prototype.setMaximumDate = function (maximumDate) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setMaximumDate", 141);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 142);
this.maximumDate = maximumDate;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 143);
this.setCustomRenderer();
};

/**
 * Sets the custom renderer for the calendar to respect the minimum and
 * maximum dates selected if used.
 *
 * @method setCustomRenderer
 * @protected
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 153);
Y.DatePicker.prototype.setCustomRenderer = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setCustomRenderer", 153);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 154);
if (this.customRenderer) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 155);
return;
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 157);
var self, canBeSelected, filterFunction, f;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 158);
self = this;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 159);
canBeSelected = function (date) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "canBeSelected", 159);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 160);
if (self.maximumDate && date > self.maximumDate) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 161);
return false;
        }
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 163);
if (self.minimumDate && date < self.minimumDate) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 164);
return false;
        }
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 166);
return true;
    };
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 168);
filterFunction = function (date, node) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "filterFunction", 168);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 169);
if (canBeSelected(date)) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 170);
node.removeClass("yui3-calendar-selection-disabled");
        }
        else {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 173);
node.addClass("yui3-calendar-selection-disabled");
        }
    };
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 176);
this.calendar.set("customRenderer",
        {filterFunction: filterFunction, rules: {all: "all"}});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 178);
f = this.calendar._canBeSelected;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 179);
this.calendar._canBeSelected = function (date) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "_canBeSelected", 179);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 180);
if (!canBeSelected(date)) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 181);
return false;
        }
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 183);
return f.call(self.calendar, date);
    };
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 185);
this.customRenderer = true;
};

/**
 * Parses the date in the input box. It recognizes iso8601 formatted
 * dates with everything optional up to the year. So "1999" is valid,
 * just as "2006-04-20", or "2008-01-01 15:30:55", but "foo" is not. Used
 * just before the calendar is * shown so that it can be focused on the
 * correct date.
 *
 * @method parseDate
 * @protected
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 198);
Y.DatePicker.prototype.parseDate = function (str) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "parseDate", 198);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 199);
if (!str) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 200);
return null;
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 202);
var m = str.match(/^(\d{4})(?:-(\d{1,2})(?:-(\d{1,2})(?:[ T](\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)?)?)?)?$/);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 203);
if (!m) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 204);
return null;
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 206);
return new Date(m[1], m[2] - 1 || 0, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0);
};

/**
 * Shows the calendar popup.
 *
 * @method showContainer
 * @protected
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 215);
Y.DatePicker.prototype.showContainer = function (e) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "showContainer", 215);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 216);
if (e) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 217);
e.preventDefault();
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 219);
if (this.onshow) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 220);
this.onshow();
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 222);
var x, y, date;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 223);
x = this.calendarLauncher.getX();
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 224);
y = this.calendarLauncher.getY() +
            parseInt(this.calendarLauncher.getComputedStyle("height"), 10);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 226);
this.container.setStyles({left: x, top: y});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 227);
date = this.parseDate(this.input.get("value"));
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 228);
if (date) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 229);
this.calendar._addDateToSelection(date, true);
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 230);
this.calendar.set("date", date);
    }
    else {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 233);
this.calendar.set("date", new Date());
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 235);
this.overlay.setStyle("display", "block");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 236);
this.container.setStyle("display", "block");
};

/**
 * Hides the calendar popup.
 *
 * @method hideContainer
 * @protected
 */
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 245);
Y.DatePicker.prototype.hideContainer = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "hideContainer", 245);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 246);
this.overlay.setStyle("display", "none");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 247);
this.container.setStyle("display", "none");
};



}, '@VERSION@', {"requires": ["yui-base", "calendar", "node", "datatype-date"], "skinnable": true});
