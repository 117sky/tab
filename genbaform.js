

var _genbacd = "0001";
var hinshu_top = 0;
var tabheight = 0;
var kei_tops = [];

var showmulti = false;


var o_hinshus = {};
var o_hinshumarks = {};
var o_keis = {};
var o_kyodos = {};

var leftmap = {};

function initTable() {
    o_genbakyodos = {};
    o_hinshus = {};
    o_keis = {};
    o_kyodos = {};
    for (var i in t_genbakyodos) {
        var data = t_genbakyodos[i];
        var key = data["hinshucd"] + "-" + data["keicd"] + "-" + data["kyodocd"];
        o_genbakyodos[key] = data;
    }
    for (var i in m_hinshus) {
        var data = m_hinshus[i];
        var key = data["hinshucd"];
        o_hinshus[key] = data["hinshumei"];
        o_hinshumarks[key] = data["hinshumark"];
    }
    for (var i in m_keis) {
        var data = m_keis[i];
        var key = data["keicd"];
        o_keis[key] = data["keimei"];
    }
    for (var i in m_kyodos) {
        var data = m_kyodos[i];
        var key = data["kyodocd"];
        o_kyodos[key] = data["kyodomei"];
    }
    $("#genbakyodos").html("");
    var tr_content = "";
    var isodd = true;
    for (var key in o_genbakyodos) {
        isodd = !isodd;
        var data = o_genbakyodos[key];
        var keimei = CTrim(o_keis[data["keicd"]]);
        if (keimei.length > 2) {
            keimei = keimei.substring(keimei.length - 2);
        }
        tr_content = tr_content + "<tr class='" + (isodd ? "odd" : "even") + "'>"
            + "<td>" + CTrim(o_hinshus[data["hinshucd"]]) + "</td>"
            + "<td>" + CTrim(o_hinshumarks[data["hinshucd"]]) + keimei + "</td>"
            + "<td>" + CTrim(o_kyodos[data["kyodocd"]]) + "</td>"
            + "</tr>";
    }
    $("#genbakyodos").html(tr_content);
    $("#addstyle").remove();
}

var hinshulefts = [];
function initTab() {
	
    var _hinshus = $("#hinshus .hinshu");
    var _bodyhinshus = $("#bodyhinshus .bodyhinshu");
    _hinshus.each(function (index, element) {
        if (element.id != "hinshutable") {
            $(element).remove();
        }
    });
    _bodyhinshus.each(function (index, element) {
        if (element.id != "bodyhinshutable") {
            $(element).remove();
        }
    });

    tabheight = $("#dwidth").outerHeight() - 1;
    hinshu_top = 0;
    leftmap = {};
	left_activemap = {};
    kei_tops = [];
    var leftselector = "";
	var hinshu_left = 0;
	
	leftselector = "tab-left-" + hinshu_left;
	leftmap[leftselector] = "left:" + hinshu_left + "px";
    left_activemap[leftselector] = "left:" + (hinshu_left - 2) + "px !important;";
	$("#hinshutable").addClass(leftselector);
	$("#hinshutable").addClass("hinshu-top-" + hinshu_top);
		
	$("#dwidth").text($("#hinshutable").text());
    var caizgi_dwidth = $("#dwidth").outerWidth();
	$("#hinshutable").css("width", (caizgi_dwidth - 9) + "px");
		
	var divtabslip = $("<div class='tabslip'><div class='tabslip-left'>＜</div><div class='tabslip-right'>＞</div></div>");
	$("#hinshus-outer").append(divtabslip);
	
    hinshu_left = $("#hinshus #hinshutable").outerWidth() - 1;
	hinshulefts.push(hinshu_left);
    var hinshus_width = $("#hinshus").width();
    var hinshu_top_calss = "hinshu-top-" + hinshu_top;
    $("#hinshus").css("height", (hinshu_top + tabheight) + "px");
	$("#hinshus-outer").css("height", (hinshu_top + tabheight) + "px");
	
    $.each(m_hinshus, function (hinshu_index, hinshu) {
        //品種
        //kei_tops[hinshu_index]
        kei_tops.push(0);
        var mark = CTrim(hinshu.hinshumark);

        $("#dwidth").text(hinshu.hinshumei);
        var hinshu_dwidth = $("#dwidth").outerWidth();
		if(showmulti) {
			if (hinshu_dwidth + hinshu_left > hinshus_width) {
				hinshu_left = 0;
				hinshu_top = hinshu_top + tabheight;
				hinshu_top_calss = "hinshu-top-" + hinshu_top;
				$("#hinshus").css("height", (hinshu_top + tabheight) + "px");
				$("#hinshutable-outer").css("height", (hinshu_top + tabheight) + "px");
			}
		}
        

        leftselector = "tab-left-" + hinshu_left;
		leftmap[leftselector] = "left:" + hinshu_left + "px";
        left_activemap[leftselector] = "left:" + (hinshu_left - 2) + "px";
		
        $("#hinshus").append("<div class='hinshu " + hinshu_top_calss + " " + leftselector 
			+ "' style='width:" + (hinshu_dwidth - 9) + "px' >" + hinshu.hinshumei + "</div>");
        hinshu_left = hinshu_dwidth + hinshu_left;
		hinshulefts.push(hinshu_left);
		
        var div_bodyhinshu = $("<div class='bodyhinshu'></div>");
        $("#bodyhinshus").append(div_bodyhinshu);

        var div_tabcontrol = $("<div class='tabcontrol'></div>");
        var div_bodycontrol = $("<div class='bodycontrol'></div>");
		var div_tabslip = $("<div class='tabslip'><div class='tabslip-left'>＜</div><div class='tabslip-right'>＞</div></div>");
        div_bodyhinshu.append(div_tabcontrol);
        div_bodyhinshu.append(div_bodycontrol);
		div_bodyhinshu.append(div_tabslip);

        var kei_left = 0;
        var kei_top = 0;
        var kei_width = hinshus_width - 10;
        var kei_top_calss = "kei-top-" + kei_top;
        var kei_len = m_keis.length;
        div_tabcontrol.css("height", (kei_top + tabheight) + "px");
        $.each(m_keis, function (kei_index, kei) {
            //径
            var keimei = CTrim(kei.keimei);
            if (keimei.length > 2) {
                keimei = keimei.substring(keimei.length - 2);
            }

            $("#dwidth").text(mark + keimei);
            var kei_dwidth = $("#dwidth").outerWidth();
			if(showmulti) {
				if (kei_dwidth + kei_left > kei_width) {
					kei_left = 0;
					kei_tops[hinshu_index] = kei_tops[hinshu_index] + tabheight;
					kei_top_calss = "kei-top-" + kei_tops[hinshu_index];
					div_tabcontrol.css("height", (kei_tops[hinshu_index] + tabheight) + "px");
				}
			}
            

            var _active = (kei_index == kei_len - 1) ? " active" : "";
            leftselector = "tab-left-" + kei_left;
			leftmap[leftselector] = "left:" + kei_left + "px";
            left_activemap[leftselector] = "left:" + (kei_left - 2) + "px";
			
            div_tabcontrol.append("<div class='kei " + kei_top_calss + _active + " " + leftselector 
				+ "' style='width:" + (kei_dwidth - 9) + "px' >" + mark + keimei + "</div>");
            kei_left = kei_dwidth + kei_left;

            var div_bodykei = $("<div class='bodykei " + _active + "'></div>");
            $.each(m_kyodos, function (kyodo_index, kyodo) {
                //強度
                var name = hinshu.hinshucd + "-" + kei.keicd;
                var value = name + "-" + kyodo.kyodocd;
                var text = kyodo.kyodomei;
                var _checked = (value in o_genbakyodos) ? "checked" : "";
                var _input = "<div class='kyododiv'><input type='checkbox' name='" + name + "' value='" + value + "' " + _checked + "><span>" + text + "</span></div>";
                div_bodykei.append(_input);
            });
            div_bodycontrol.append(div_bodykei);
        });
    });
	
	$("#hinshus").css("width", hinshu_left + "px");
	$("#hinshus").parent().css("width", (hinshu_left + 4) + "px");
	
    var sheet = createStyleSheet();
    var t = 0;
    for (var i = 0; i <= hinshu_top; i += tabheight) {
        var selector = ".hinshu-top-" + i;
        var cssstyle = "top:" + i + "px;";
        addCssRule(sheet, selector, cssstyle, t);
        t++;
        selector = selector + ".active";
        cssstyle = "top:" + (i - 2) + "px";
        addCssRule(sheet, selector, cssstyle, t);
        t++;
    }
    var len = kei_tops.length;
    var max_kei_top = 0;
    for (var j = 0; j <= len; j++) {
        var _kei_top = kei_tops[j];
        if (_kei_top > max_kei_top) {
            max_kei_top = _kei_top;
        }
    }
    for (var i = 0; i <= max_kei_top; i += tabheight) {
        var selector = ".kei-top-" + i;
        var cssstyle = "top:" + i + "px;";
        addCssRule(sheet, selector, cssstyle, t);
        t++;
        selector = selector + ".active";
        cssstyle = "top:" + (i - 2) + "px !important;";
        addCssRule(sheet, selector, cssstyle, t);
        t++;
    }
    //leftmap
    for (var key in leftmap) {
		var data = leftmap[key];
		var data_active = left_activemap[key];
		addCssRule(sheet, "." + key, data, t);
        addCssRule(sheet, "." + key + ".active", data_active, t);
        t++;
    }
}

function initEvent() {
    var _hinshus = $("#hinshus .hinshu");
    var _bodyhinshus = $("#bodyhinshus .bodyhinshu");
    _hinshus.each(function (index, element) {
        eventListener(element, "click", function () {
            $("#hinshus .active").each(function (hindex, ele) {
                $(ele).removeClass("active");
            });
            for (var i = 0; i < hinshu_top; i += tabheight) {
                var ishasClass = $(element).hasClass("hinshu-top-" + i);
                if (ishasClass) {
                    var selectedLine = $("#hinshus .hinshu-top-" + i);
                    selectedLine.removeClass("hinshu-top-" + i);
                    for (var t = i + tabheight; t <= hinshu_top; t += tabheight) {
                        $("#hinshus .hinshu-top-" + t).removeClass("hinshu-top-" + t).addClass("hinshu-top-" + (t - tabheight));
                    }
                    selectedLine.addClass("hinshu-top-" + hinshu_top);
                    break;
                }
            }
            $(element).addClass("active");
            $("#bodyhinshus .bodyhinshu.active").each(function (bhindex, ele) {
                $(ele).removeClass("active");
            });
            $(_bodyhinshus[index]).addClass("active");

        });

        if (index > 0) {
            var J_body_hinshus = $(_bodyhinshus[index]);
            var _keis = J_body_hinshus.find(".kei");
            var _bodykeis = J_body_hinshus.find(".bodykei");
            var kei_top = kei_tops[index - 1];
            _keis.each(function (kindex, object) {
                eventListener(object, "click", function () {
                    J_body_hinshus.find(".kei.active").each(function (kindex, ele) {
                        $(ele).removeClass("active");
                    });
                    for (var i = 0; i < kei_top; i += tabheight) {
                        var ishasClass = $(object).hasClass("kei-top-" + i);
                        if (ishasClass) {
                            var selectedLine = J_body_hinshus.find(".kei-top-" + i);
                            selectedLine.removeClass("kei-top-" + i);
                            for (var t = i + tabheight; t <= kei_top; t += tabheight) {
                                J_body_hinshus.find(".kei-top-" + t).removeClass("kei-top-" + t).addClass("kei-top-" + (t - tabheight));
                            }
                            selectedLine.addClass("kei-top-" + kei_top);
                            break;
                        }
                    }
                    $(object).addClass("active");
                    J_body_hinshus.find(".bodykei.active").each(function (bkindex, ele) {
                        $(ele).removeClass("active")
                    });
                    $(_bodykeis[kindex]).addClass("active");
                });
            });

            _bodykeis.each(function (bodyindex, object) {
                var _inputs = $(object).find("input");
                _inputs.each(function (pindex, oinput) {
                    eventListener(oinput, "change", function () {
                        delwithTable(oinput.value, oinput.checked);
                        $(object).find("input:checked").each(function (chindex, chele) {
                            if (oinput.value != chele.value) {
                                chele.checked = false;
                                delwithTable(chele.value, chele.checked);
                            }
                        });
                    });
                });
            });
        }
    });
    $("#hinshutable").click();
}


function delwithTable(value, checked) {
    var arrays = value.split("-");
    if (checked) {
        if (!(value in o_genbakyodos)) {
            o_genbakyodos[value] = { "genbacd": _genbacd, "hinshucd": arrays[0], "keicd": arrays[1], "kyodocd": arrays[2] };
        }
    } else {
        if (value in o_genbakyodos) {
            delete o_genbakyodos[value]
        }
    }
    $("#genbakyodos").html("");
    var tr_content = "";
    var isodd = true;
    for (var key in o_genbakyodos) {
        isodd = !isodd;
        var data = o_genbakyodos[key];
        var keimei = CTrim(o_keis[data["keicd"]]);
        if (keimei.length > 2) {
            keimei = keimei.substring(keimei.length - 2);
        }
        tr_content = tr_content + "<tr class='" + (isodd ? "odd" : "even") + "'>"
            + "<td>" + CTrim(o_hinshus[data["hinshucd"]]) + "</td>"
            + "<td>" + CTrim(o_hinshumarks[data["hinshucd"]]) + keimei + "</td>"
            + "<td>" + CTrim(o_kyodos[data["kyodocd"]]) + "</td>"
            + "</tr>";
    }
    $("#genbakyodos").html(tr_content);
}



function eventListener(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, fn);
    } else {
        ele['on' + type] = fn;
    }
}


// 创建一个 style， 返回其 stylesheet 对象
// 注意：IE6/7/8中使用 style.stylesheet，其它浏览器 style.sheet
function createStyleSheet() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = "addstyle";
    head.appendChild(style);
    return style.sheet || style.styleSheet;
}

/*
 * 动态添加 CSS 样式
 * @param selector {string} 选择器
 * @param rules    {string} CSS样式规则
 * @param index    {number} 插入规则的位置, 靠后的规则会覆盖靠前的
 */
function addCssRule(sheet, selector, rules, index) {
    index = index || 0;
    if (sheet.insertRule) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    } else if (sheet.addRule) {
        sheet.addRule(selector, rules, index);
    }
}

