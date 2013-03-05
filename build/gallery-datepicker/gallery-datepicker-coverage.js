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
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].code=["YUI.add('gallery-datepicker', function (Y, NAME) {","","YUI.add(\"datepicker\", function (Y) {","","Y.DatePicker = function (args) {","    this.args = args;","    this.format = \"%Y-%m-%d\";","    if (this.args.showTime) {","        this.format += \" %H:%M:%S\";","    }","    this.createFormElements();","    this.createPopup();","};","","Y.DatePicker.prototype.createPopup = function () {","    var zIndex = 10055, body = Y.one(\"body\");","    this.container = Y.Node.create(\"<div/>\");","    this.container.setStyle(\"display\", \"none\");","    this.container.setStyle(\"position\", \"absolute\");","    this.container.setStyle(\"zIndex\", zIndex + 1);","    this.container.setStyles({","        display: \"none\", position: \"absolute\", zIndex: zIndex + 1,","        left: \"0px\", top: \"0px\"});","    this.calendar = new Y.Calendar({","        render: this.container,","        visible: true","    });","    this.calendar.on(\"selectionChange\", function (e) {","        this.setDate(e.newSelection[0]);","        this.hideContainer();","    }, this);","    if (this.args.minimumDate) {","        this.setMinimumDate(this.args.minimumDate);","    }","    if (this.args.maximumDate) {","        this.setMaximumDate(this.args.maximumDate);","    }","    this.overlay = Y.Node.create(\"<div/>\");","    this.overlay.setStyles({","        top: \"0px\", left: \"0px\",","        width: \"100%\", height: \"100%\", display: \"none\",","        position: \"fixed\", zIndex: zIndex","    });","    body.addClass(\"yui3-skin-sam\");","    body.append(this.overlay);","    body.append(this.container);","    this.overlay.on(\"click\", this.hideContainer, this);","    this.container.on(\"click\", function (e) {e.stopPropagation();});","};","","Y.DatePicker.prototype.createFormElements = function () {","    this.input = Y.one(this.args.input);","    this.calendarLauncher = Y.Node.create('<input type=\"button\"/>');","    if (this.args.btnClass) {","        this.calendarLauncher.addClass(this.args.btnClass);","    }","    if (this.args.btnContent) {","        this.calendarLauncher.setHTML(this.args.btnContent);","    }","    this.input.insert(this.calendarLauncher, \"after\");","    this.calendarLauncher.on(\"click\", this.showContainer, this);","    if (this.args.date) {","        this.setDate(this.args.date, true);","    }","};","","Y.DatePicker.prototype.getDate = function () {","    return this.parseDate(this.input.get(\"value\"));","};","","Y.DatePicker.prototype.setDate = function (newDate, discardOldTime) {","    var oldDate, str;","    if (!discardOldTime) {","        oldDate = this.parseDate(this.input.get(\"value\"));","        if (oldDate) {","            newDate.setHours(oldDate.getHours());","            newDate.setMinutes(oldDate.getMinutes());","            newDate.setSeconds(oldDate.getSeconds());","            newDate.setMilliseconds(oldDate.getMilliseconds());","        }","    }","    str = Y.DataType.Date.format(newDate, {format: this.format});","    this.input.set(\"value\", str);","};","","Y.DatePicker.prototype.setMinimumDate = function (minimumDate) {","    this.minimumDate = minimumDate;","    this.setCustomRenderer();","};","","Y.DatePicker.prototype.setMaximumDate = function (maximumDate) {","    this.maximumDate = maximumDate;","    this.setCustomRenderer();","};","","Y.DatePicker.prototype.setCustomRenderer = function () {","    if (this.customRenderer) {","        return;","    }","    var self, canBeSelected, filterFunction, f;","    self = this;","    canBeSelected = function (date) {","        if (self.maximumDate && date > self.maximumDate) {","            return false;","        }","        if (self.minimumDate && date < self.minimumDate) {","            return false;","        }","        return true;","    };","    filterFunction = function (date, node) {","        if (canBeSelected(date)) {","            node.removeClass(\"yui3-calendar-selection-disabled\");","        }","        else {","            node.addClass(\"yui3-calendar-selection-disabled\");","        }","    };","    this.calendar.set(\"customRenderer\",","        {filterFunction: filterFunction, rules: {all: \"all\"}});","    f = this.calendar._canBeSelected;","    this.calendar._canBeSelected = function (date) {","        if (!canBeSelected(date)) {","            return false;","        }","        return f.call(self.calendar, date);","    };","    this.customRenderer = true;","};","","Y.DatePicker.prototype.parseDate = function (str) {","    if (!str) {","        return null;","    }","    var m = str.match(/^(\\d{4})(?:-(\\d{1,2})(?:-(\\d{1,2})(?:[ T](\\d{1,2})(?::(\\d{1,2})(?::(\\d{1,2}))?)?)?)?)?$/);","    if (!m) {","        return null;","    }","    return new Date(m[1], m[2] - 1 || 0, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0);","};","","Y.DatePicker.prototype.showContainer = function (e) {","    if (e) {","        e.preventDefault();","    }","    if (this.onshow) {","        this.onshow();","    }","    var x, y, date;","    x = this.calendarLauncher.getX();","    y = this.calendarLauncher.getY() +","            parseInt(this.calendarLauncher.getComputedStyle(\"height\"), 10);","    this.container.setStyles({left: x, top: y});","    date = this.parseDate(this.input.get(\"value\"));","    if (date) {","        this.calendar._addDateToSelection(date, true);","        this.calendar.set(\"date\", date);","    }","    else {","        this.calendar.set(\"date\", new Date());","    }","    this.overlay.setStyle(\"display\", \"block\");","    this.container.setStyle(\"display\", \"block\");","};","","Y.DatePicker.prototype.hideContainer = function () {","    this.overlay.setStyle(\"display\", \"none\");","    this.container.setStyle(\"display\", \"none\");","};","","}, \"1.0\", {requires: [\"calendar\", \"node\", \"datatype-date\"]});","","","","}, '@VERSION@', {\"requires\": [\"yui-base\", \"calendar\", \"node\", \"datatype-date\"]});"];
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].lines = {"1":0,"3":0,"5":0,"6":0,"7":0,"8":0,"9":0,"11":0,"12":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"24":0,"28":0,"29":0,"30":0,"32":0,"33":0,"35":0,"36":0,"38":0,"39":0,"44":0,"45":0,"46":0,"47":0,"48":0,"51":0,"52":0,"53":0,"54":0,"55":0,"57":0,"58":0,"60":0,"61":0,"62":0,"63":0,"67":0,"68":0,"71":0,"72":0,"73":0,"74":0,"75":0,"76":0,"77":0,"78":0,"79":0,"82":0,"83":0,"86":0,"87":0,"88":0,"91":0,"92":0,"93":0,"96":0,"97":0,"98":0,"100":0,"101":0,"102":0,"103":0,"104":0,"106":0,"107":0,"109":0,"111":0,"112":0,"113":0,"116":0,"119":0,"121":0,"122":0,"123":0,"124":0,"126":0,"128":0,"131":0,"132":0,"133":0,"135":0,"136":0,"137":0,"139":0,"142":0,"143":0,"144":0,"146":0,"147":0,"149":0,"150":0,"151":0,"153":0,"154":0,"155":0,"156":0,"157":0,"160":0,"162":0,"163":0,"166":0,"167":0,"168":0};
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].functions = {"DatePicker:5":0,"(anonymous 3):28":0,"(anonymous 4):48":0,"createPopup:15":0,"createFormElements:51":0,"getDate:67":0,"setDate:71":0,"setMinimumDate:86":0,"setMaximumDate:91":0,"canBeSelected:102":0,"filterFunction:111":0,"_canBeSelected:122":0,"setCustomRenderer:96":0,"parseDate:131":0,"showContainer:142":0,"hideContainer:166":0,"(anonymous 2):3":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].coveredLines = 109;
_yuitest_coverage["build/gallery-datepicker/gallery-datepicker.js"].coveredFunctions = 18;
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 1);
YUI.add('gallery-datepicker', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 3);
YUI.add("datepicker", function (Y) {

_yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 2)", 3);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 5);
Y.DatePicker = function (args) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "DatePicker", 5);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 6);
this.args = args;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 7);
this.format = "%Y-%m-%d";
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 8);
if (this.args.showTime) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 9);
this.format += " %H:%M:%S";
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 11);
this.createFormElements();
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 12);
this.createPopup();
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 15);
Y.DatePicker.prototype.createPopup = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "createPopup", 15);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 16);
var zIndex = 10055, body = Y.one("body");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 17);
this.container = Y.Node.create("<div/>");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 18);
this.container.setStyle("display", "none");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 19);
this.container.setStyle("position", "absolute");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 20);
this.container.setStyle("zIndex", zIndex + 1);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 21);
this.container.setStyles({
        display: "none", position: "absolute", zIndex: zIndex + 1,
        left: "0px", top: "0px"});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 24);
this.calendar = new Y.Calendar({
        render: this.container,
        visible: true
    });
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 28);
this.calendar.on("selectionChange", function (e) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 3)", 28);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 29);
this.setDate(e.newSelection[0]);
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 30);
this.hideContainer();
    }, this);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 32);
if (this.args.minimumDate) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 33);
this.setMinimumDate(this.args.minimumDate);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 35);
if (this.args.maximumDate) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 36);
this.setMaximumDate(this.args.maximumDate);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 38);
this.overlay = Y.Node.create("<div/>");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 39);
this.overlay.setStyles({
        top: "0px", left: "0px",
        width: "100%", height: "100%", display: "none",
        position: "fixed", zIndex: zIndex
    });
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 44);
body.addClass("yui3-skin-sam");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 45);
body.append(this.overlay);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 46);
body.append(this.container);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 47);
this.overlay.on("click", this.hideContainer, this);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 48);
this.container.on("click", function (e) {_yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "(anonymous 4)", 48);
e.stopPropagation();});
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 51);
Y.DatePicker.prototype.createFormElements = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "createFormElements", 51);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 52);
this.input = Y.one(this.args.input);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 53);
this.calendarLauncher = Y.Node.create('<input type="button"/>');
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 54);
if (this.args.btnClass) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 55);
this.calendarLauncher.addClass(this.args.btnClass);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 57);
if (this.args.btnContent) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 58);
this.calendarLauncher.setHTML(this.args.btnContent);
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 60);
this.input.insert(this.calendarLauncher, "after");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 61);
this.calendarLauncher.on("click", this.showContainer, this);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 62);
if (this.args.date) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 63);
this.setDate(this.args.date, true);
    }
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 67);
Y.DatePicker.prototype.getDate = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "getDate", 67);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 68);
return this.parseDate(this.input.get("value"));
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 71);
Y.DatePicker.prototype.setDate = function (newDate, discardOldTime) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setDate", 71);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 72);
var oldDate, str;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 73);
if (!discardOldTime) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 74);
oldDate = this.parseDate(this.input.get("value"));
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 75);
if (oldDate) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 76);
newDate.setHours(oldDate.getHours());
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 77);
newDate.setMinutes(oldDate.getMinutes());
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 78);
newDate.setSeconds(oldDate.getSeconds());
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 79);
newDate.setMilliseconds(oldDate.getMilliseconds());
        }
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 82);
str = Y.DataType.Date.format(newDate, {format: this.format});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 83);
this.input.set("value", str);
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 86);
Y.DatePicker.prototype.setMinimumDate = function (minimumDate) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setMinimumDate", 86);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 87);
this.minimumDate = minimumDate;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 88);
this.setCustomRenderer();
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 91);
Y.DatePicker.prototype.setMaximumDate = function (maximumDate) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setMaximumDate", 91);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 92);
this.maximumDate = maximumDate;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 93);
this.setCustomRenderer();
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 96);
Y.DatePicker.prototype.setCustomRenderer = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "setCustomRenderer", 96);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 97);
if (this.customRenderer) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 98);
return;
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 100);
var self, canBeSelected, filterFunction, f;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 101);
self = this;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 102);
canBeSelected = function (date) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "canBeSelected", 102);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 103);
if (self.maximumDate && date > self.maximumDate) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 104);
return false;
        }
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 106);
if (self.minimumDate && date < self.minimumDate) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 107);
return false;
        }
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 109);
return true;
    };
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 111);
filterFunction = function (date, node) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "filterFunction", 111);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 112);
if (canBeSelected(date)) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 113);
node.removeClass("yui3-calendar-selection-disabled");
        }
        else {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 116);
node.addClass("yui3-calendar-selection-disabled");
        }
    };
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 119);
this.calendar.set("customRenderer",
        {filterFunction: filterFunction, rules: {all: "all"}});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 121);
f = this.calendar._canBeSelected;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 122);
this.calendar._canBeSelected = function (date) {
        _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "_canBeSelected", 122);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 123);
if (!canBeSelected(date)) {
            _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 124);
return false;
        }
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 126);
return f.call(self.calendar, date);
    };
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 128);
this.customRenderer = true;
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 131);
Y.DatePicker.prototype.parseDate = function (str) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "parseDate", 131);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 132);
if (!str) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 133);
return null;
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 135);
var m = str.match(/^(\d{4})(?:-(\d{1,2})(?:-(\d{1,2})(?:[ T](\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)?)?)?)?$/);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 136);
if (!m) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 137);
return null;
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 139);
return new Date(m[1], m[2] - 1 || 0, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0);
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 142);
Y.DatePicker.prototype.showContainer = function (e) {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "showContainer", 142);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 143);
if (e) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 144);
e.preventDefault();
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 146);
if (this.onshow) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 147);
this.onshow();
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 149);
var x, y, date;
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 150);
x = this.calendarLauncher.getX();
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 151);
y = this.calendarLauncher.getY() +
            parseInt(this.calendarLauncher.getComputedStyle("height"), 10);
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 153);
this.container.setStyles({left: x, top: y});
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 154);
date = this.parseDate(this.input.get("value"));
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 155);
if (date) {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 156);
this.calendar._addDateToSelection(date, true);
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 157);
this.calendar.set("date", date);
    }
    else {
        _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 160);
this.calendar.set("date", new Date());
    }
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 162);
this.overlay.setStyle("display", "block");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 163);
this.container.setStyle("display", "block");
};

_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 166);
Y.DatePicker.prototype.hideContainer = function () {
    _yuitest_coverfunc("build/gallery-datepicker/gallery-datepicker.js", "hideContainer", 166);
_yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 167);
this.overlay.setStyle("display", "none");
    _yuitest_coverline("build/gallery-datepicker/gallery-datepicker.js", 168);
this.container.setStyle("display", "none");
};

}, "1.0", {requires: ["calendar", "node", "datatype-date"]});



}, '@VERSION@', {"requires": ["yui-base", "calendar", "node", "datatype-date"]});
