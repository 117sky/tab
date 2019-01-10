var Message = {

    CM000001: "登録しました。",
    CM000002: "保存に成功しました。",
    CM000004: "削除してもよろしいですか?",
    CM000005: "正常に削除されました。",
    CM000006: "エラーが発生しました、システム管理者ご連絡ください。",
    CM016001: "ユーザーIDまたはパスワードを入力してください。",
    CM016003: "3回以上の入力ミスで30分間ロックがかかります。 30分お待ちいただき、再度ログインをお試しください。",
    CM016004: "ユーザーIDまたはパスワードが違います。",
    CM999999: "エラーが発生しました、システム管理者ご連絡ください。",
    CM010001: "現場名と現場略名を入力してください。",
    CM000007: "利用中は削除できない。",

    IM00008: "正常にロック解除されました。",

    EM00001: "ユーザーIDまたはパスワードを入力してください。",
    EM00002: "3回以上の入力ミスで30分間ロックがかかります。 30分お待ちいただき、再度ログインをお試しください。",
    EM00003: "ユーザーIDまたはパスワードが違います。",
    EM00004: "エラーが発生しました、システム管理者ご連絡ください。",
    EM00005: "{0}を入力してください。",
    EM00006: "{0}が存在しません。",


    EM00007: "そのIDは使用できません。",
    EM00008: "{0}は3文字以上な半角英数字。",
    EM00009: "有効なメールアドレス。",
    EM00010: "8文字以上な半角英数字（大文字、小文字、数字、記号2種類以上混在）。",
    EM00011: "10桁半角英数字。",
    EM00012: "{0}は7桁数字。",
    EM00013: "{0}は6桁半角英数字。",
    EM00014: "パスワードが一致していません。",
    


    GM010001: "現場コードを入力してください。",
    GM010002: "現場コードは10桁半角英数字。",
    GM010003: "現場コードはご利用いただけます。",
    GM010004: "現場コードはもう使っています，再入力してください。",
    GM010005: "現場名を入力してください。",
    GM010006: "現場略名を入力してください。",
    GM010007: "電話を入力してください。",
    GM010008: "郵便番号を入力してください。",
    GM010009: "郵便番号は7桁数字。",
    GM010010: "住所１を入力してください。",
    GM010011: "ゼネコンを入力してください。",
    GM010012: "得意先を入力してください。",
    GM010013: "現場担当者を入力してください。",
    GM010014: "担当者連絡先を入力してください。",
    GM010015: "担当者所属会社を入力してください。"
}

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题  
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

function AlertInfo(txt) {
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
}

function AlertInfo(txt, val) {
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info, {
        onOk: function (v) {
        },
        onClose: function (v) {
            if (val == 1) {
                parent.$.fancybox.close();
            }
            else if (val == 2) {
                window.location.reload();
            }
            //else if (val == 3) {
            //    LoadEditInfo();
            //} else if (val == 4) {
            //    $("#btnHideClose").click();
            //} else if (val == 5) {
            //    window.location.href = "/App/Main";
            //}
        }
    });
}

function AlertError(txt) {
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.error);
}

function AlertSuccess(txt, val) {
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success, {
        onOk: function (v) {
        },
        onClose: function (v) {
            if (val == 1) {
                parent.$.fancybox.close();
            }
            else if (val == 2) {
                //$("#btnSearch").click();
                window.location.reload();
            }
            else if (val == 3) {
                top.location.href = '/MBook/Index';
            }
            else if (val == 4) {
                $("#search").click();
            }
            else if (val == 5) {
                top.location.href = '/Home/Main';
            }
            //else if (val == 6) {
            //    window.location.href = "/App/Main";
            //}

        }
    });
}

function AlertSuccessByID(txt, val, id) {
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success, {
        onOk: function (v) {
        },
        onClose: function (v) {
            if (val == 1) {
                location.href = '/MBook/Index/' + id;
            }
        }
    });
}

function AlertSuccessForPage(txt, val) {
    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success, {
        onOk: function (v) {
        },
        onClose: function (v) {

            ShowDataToPageIndex(val);

        }
    });
}

function CTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

function CheckEmail(id) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    var obj = document.getElementById(id);
    if (CTrim(obj.value) === "") {
        AlertInfo(Message["EM00005"].format("メール"));
        return false;
    } else if (!reg.test(CTrim(obj.value))) {
        AlertInfo(Message["EM00009"]);
        return false;
    } else {

        return true;
    }
}

function CheckPassWord(id,val) {
    var p1 = /[0-9]/; 
    var p2 = /[a-z]/i; 
    var p3 = /[A-Z]/i; 
    //var p4 = /[0-9a-z]/i; var b = p.test(string);//true, 
    var p5 = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");

    var obj = document.getElementById(id);
    if (CTrim(obj.value) === "") {
        AlertInfo(Message["EM00005"].format(val));
        return false;
    }
    else if (CTrim(obj.value).length <= 8) {
        AlertInfo(Message["EM00010"]);
        return false;
    }
    else {
        var r1 = p1.test(CTrim(obj.value)) ? 1 : 0;
        var r2 = p2.test(CTrim(obj.value)) ? 1 : 0;
        var r3 = p3.test(CTrim(obj.value)) ? 1 : 0;
        var r5 = p5.test(CTrim(obj.value)) ? 1 : 0;

        if ((parseInt(r1) + parseInt(r2) + parseInt(r3) + parseInt(r5)) < 2) {
            AlertInfo(Message["EM00010"]);
            return false;
        }
        else {

            return true;
        }
    }
}