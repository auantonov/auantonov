function check() {
	var check = 0;
	if ($('#regform input[name=email]').val().length > 5)
		{var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		if(pattern.test($('#regform input[name=email]').val())) {
			} else {check=1;} }
	if ($('#regform input[name=pass]').val().length < 5)
		{check=1;}
    if (check == 0) {
        reg();
    }
}

function reg() {
    $.post("https://reg.bigtime.fund/", $("#regform").serialize(), function(d) {
        if (d != 'ok') {
            alert("Пользователь с таким email уже есть в базе или произошла другая ошибка");
        } else {

            $("#regform").hide();

            $("#regresult").show();

            $("#ulogin").html($("#email").val().replace(/<\/?[^>]+>/gi, ''));
            $("#upass").html($("#pass1").val().replace(/<\/?[^>]+>/gi, ''));

            localStorage.setItem("isuser", 1);
            localStorage.setItem("login",$("#email").val());
            setTimeout(function(){
            	window.location.reload();}
            , 3000);
        }
    });
}



function login1() {

    $.post("https://reg.bigtime.fund/", $("#loginform").serialize(), function(d) {
        //alert(d);
        var obj = $.parseJSON(d);

        if (obj.fio) {
            localStorage.setItem("login",$("#loginemail").val());
            localStorage.setItem("isuser", 1);
            //$('#myModallogin').modal('toggle');
            window.location.reload();
        } else {
            alert("Пользователь не найден");
        }
    });

}


var saveCookie = document.cookie;
var basicRubPrice;

var myeth;
var cur,
    price;
function fill_table() {

    $('tr.pie').each(function(index, value) {
        cur = $(this).attr('data-ticker');

        var me = $(this);

        //$(me).find(".currentprice").html($(this).attr('data-price'));
        //$(me).find(".rost").html(Math.round($(this).attr('data-price') / $(this).attr('data-startprice') * 1000 - 1000) / 10 + "%");
        $(me).find(".start").html($(this).attr('data-start'));
        $(me).find(".tip").html($(this).attr('data-tip'));
        /*
        if (!myeth)
            myeth = "";
        var url = "https://api.etherscan.io/api?module=proxy&data=0x70a08231000000000000000000000000" + myeth.replace('0x', '') + "&to=" + $(this).attr('rel') + "&action=eth_call";
        console.log(url);

        $.getJSON(url, function(d) {
            $(me).find(".mytokenbalance").html(parseInt(d.result, 16));
        });
		*/
    });


    $("tr.pie").on("click", function() {

				var currentprice = $(this).find('.currentprice').html();
				basicRubPrice = currentprice;
				var currestRubPrice = $("#rubbtc").html();
				basicBtcPrice = $('.basicPrice').html(currentprice + ' руб');
				basicBtcPrice = currentprice / currestRubPrice;

				updateSell();

				var FixedBtcPrice = basicBtcPrice.toFixed(7);

				$('.FixedBtcPrice').html(FixedBtcPrice + ' btc');

				var self = $(this);

				var dataStartInterval = $(this).attr('data-start');
				var dataEndInterval = $(this).find('.end').html();

				var arrStart = dataStartInterval.split('.');

				tokenDayStart = arrStart[0];
				tokenMonthStart = arrStart[1] - 1;
				tokenYearStart = arrStart[2];

				var dateTwoStart = new Date(tokenYearStart, tokenMonthStart, tokenDayStart);

				var arrEnd = dataEndInterval.split('.');

				tokenDayEnd = arrEnd[0];
				tokenMonthEnd = arrEnd[1] - 1;
				tokenYearEnd = arrEnd[2];

				var dateTwoEnd = new Date(tokenYearEnd, tokenMonthEnd, tokenDayEnd);

				function CompareDateStart() {

				    var now = new Date();

				    if (now > dateTwoStart) {
				        return 1;
				    } else {
				        return 0;
				    }
				}
				//
				// function CompareDateEnd() {
				//
				// 		var now = new Date();
				//
				// 		if (now > dateTwoEnd) {
				// 				return 1;
				// 		} else {
				// 				return 0;
				// 		}
				// }

				CompareDateStart();
				// CompareDateEnd();

				function BuyCheck() {

					if (CompareDateStart() === 1) {
							self.parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(1).css('display','none');
					}

					else {
							self.parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(1).css('display','block');
					}

				}

				// function SellCheck() {
				//
				// 	if (CompareDateEnd() === 1) {
				// 			self.parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(2).css('display','none');
				// 	}
				//
				// 	else {
				// 			self.parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(2).css('display','block');
				// 	}
				//
				// }

				var dataTip = $(this).attr('data-tip');

				if(dataTip === "Приватный") {
					 $(this).parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(1).css('display','none');
				}

				else if (dataTip === "Интервальный") {
						BuyCheck();
						// SellCheck();
				}

				else if (dataTip === "Открытый") {
						$(this).parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(1).css('display','block');
				}

				else {
						$(this).parents('.dashboard-reg-cont').siblings('#centru').find('.nav-tabs li').eq(1).css('display','block');
				}


        $(this).addClass('active').siblings().removeClass('active');
        $("#centru").show();

        cur = $(this).attr('data-ticker');
        curaddr = $(this).attr('rel');
        price = $(this).find('.currentprice').html(); //сколько токенов получаем за 1 биткоин

        $("#priceinrub").html(price);
        $("#priceinbtc").html(price / $("#rubbtc").text());

        $("#x1").html($(this).attr('data-start'));
        $("#x2").html($(this).attr('data-tip'));
        $("#x3").html($(".pie.active").attr('data-prirost'));
        $("#x4").html($(".pie.active").attr('data-count-token'));
        //$("#x5").html($(this).find('.currentprice').html());
        //$("#x6").html($(this).find('.currentprice').html()) * $(this).attr('data-tokensold'));
        //$("#x7").html(Math.round($(this).attr('data-price') / $(this).attr('data-startprice') * 1000 - 1000) / 10 + "%"); //$(this).attr('data-price')/$(this).attr('data-startprice')*100-100+"%"
        // $("#x8").html($(this).attr('data-price') / $(this).attr('data-lastprice') * 100 - 100 + "%");
        $("#kupit").val(); //сколько он хочет купить

        $.get("//reg.bigtime.fund/more.php?id=" + $(this).attr('data-tid'), function(d) {
            $("#other").html(d);
        });

        $("#piechart").prop("src", "//reg.bigtime.fund/pie.php?id=" + $(this).attr('data-tid'));
        recalc_prices();
        recalc_buy();

    });

}

//var secretSeed = lightwallet.keystore.generateRandomSeed();
//$("#seed").html(secretSeed);

function bundle_loaded() {

    if (localStorage.getItem("isuser") != 1)
        $(".regb").show();
    if (localStorage.getItem("isuser") == 1)
        $(".bexit").show();
    /*
    myeth = localStorage.getItem('myethaddress');
    //alert(myeth);
    if (!myeth || myeth.length < 3 || myeth == 'undefined') {
        console.log("!myeth");

        lightwallet.keystore.deriveKeyFromPassword('123123', function(err, pwDerivedKey) {
            var ks = new lightwallet.keystore(secretSeed, pwDerivedKey);
            ks.generateNewAddress(pwDerivedKey, 1);
            var address = ks.getAddresses()[0];
            var prv_key = ks.exportPrivateKey(address, pwDerivedKey);

            localStorage.setItem("myethaddress", address);
            localStorage.setItem("myprivate", prv_key);
            localStorage.setItem("isreg", 1);
            localStorage.setItem("mainnet", "off");
            console.log('address and key: ', address, prv_key);

            //alert(reg.privateKey);
            myeth = reg.address;

        });

    } */
    //$("#myeth").html(myeth);
    //if (localStorage.getItem("isuser") != 1)
    //    $("#myeth").html("неизвестен");

    //грузим все

    $.get("//reg.bigtime.fund/exp.php", function(d) {

        jQuery.each(d, function(i, item) {
            console.log(item);
            console.log(item.title);

            //add_token(item.inteval,item.tip,item.start,item.price,item.lastprice,item.startprice,item.ticker,item.rel,item.title);
            var line;
            line += "<tr class='pie firstline' data-token='" + item.token + "' data-tid='" + item.id + "' data-tokensold='" + item.mint + "' data-interval='" + item.interv + "' data-tip='" + item.tip + "' data-start='" + item.start + "' data-price='" + item.price + "' data-lastprice='" + item.price + "' data-startprice='" + item.lastprice + "' data-ticker='" + item.ticker + "' rel='" + item.rel + "' data-masterkey='"+ item.masterkey +"' data-bitcoinadr='"+item.bitcoinadr+"' data-count-token='"+item.count_token+"'  data-prirost='"+parseFloat(item.prirost).toFixed(2)+"'>";
            line += "<td class='pai-title'>" + item.title + "</td>";
            line += "<td class='tip'>" + item.tip + "</td>";
            line += "<td class='number'><span class='currentprice'>"+parseFloat(item.now_price).toFixed(2)+"</span> р</td>";
            <!-- не менять! считается само-->
            line += "<td class='number'>"+parseFloat(item.capital).toFixed(2)+"</td>";
            line += "<td class='number rost'>"+parseFloat(item.result_all).toFixed(2)+"%</td>";
            <!-- не менять! считается само-->
            line += "<td class='number start'>??</td>";
						line += "<td class='number prirost'>"+ +parseFloat(item.prirost).toFixed(2) + '%' +"</td>";
            line += "<td class='number end'><a href='#' target='_blank'>"+  item.tokenlink + "</a></td>";
            line += "<td class=pie-link><a href=# onclick='$(\"#moreinfo\").show();return false'>Подробнее <i class='fa fa-hand-o-right' aria-hidden='true'></i></a></td>";

            line += '</tr>';
            console.log(line);
            $("#tokenstable").append(line);

            //
        });
        fill_table();
    }, "json");

    setTimeout(function() {

        var pieArray = document.querySelectorAll('.firstline');

        var element;

        pieArray.forEach(function(d) {
            if (saveCookie === d.dataset.token) {
                element = d;
            }
        });

        $(element).trigger('click');

        $(".firstline").click(function() {
            $(this).addClass('active');
            var bitadr = $(this).attr('data-bitcoinadr');
            $('#showafterrecalc .key').html(bitadr);


        })

        if (localStorage.getItem("isuser") == 1)
            $(".onlyuser").css("display", "block");
        }
    , 500);

}

function recalc_buy() {

    $("#kupit").val(); //сколько он хочет купить
    $("#sk").html($("#kupit").val());
    $("#pr").html(cur); //тикер проекта
    $("#inrub").html(Math.round($("#kupit").val() * price)); //в рублях
    $("#inbtc").html(Math.round($("#kupit").val() * price / $("#rubbtc").html() * 100) / 100); //в битках
    // var tx = new Tx(options);

}

function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}

var basicBtcPrice,
    basicRubPrice,
    pricelala,
    lala;

function recalc_prices() {
    $.getJSON("https://buygazprom.com/rateslocal.php", function(d) {


    });
}

recalc_prices();

function updateSell() {
    var inputSellVal = document.getElementById("sell-token").value;
    var SellRubresult = inputSellVal * basicRubPrice;
    var SellBtcresult = inputSellVal * basicBtcPrice;
    document.getElementById('sell-token-rub').innerHTML = SellRubresult.toFixed(2);
    document.getElementById('sell-token-btc').innerHTML = SellBtcresult.toFixed(7);
    document.getElementById('priceinbtc').innerHTML = SellBtcresult.toFixed(7);
}

// setTimeout(function() {
//
//
//     updateSell();
//
// }, 5000);

// var sumInput = $('#kupit').val();
// alert(sumInput);

function checkPercentage(arr) {

	for (var i = 0; i < arr.length; i++) {
		if(parseInt(arr[i].innerHTML) > 0){
				arr[i].classList.add('more');
		}
		else {
			 arr[i].classList.add('less');
		}

	}
}

bundle_loaded();

$( document ).ready(function(){


		$('.buy-now').click(function(){
			if(window.localStorage.getItem('metamask') == 1) {

				$('#buy2').css('opacity','1');
				$('#myModalMask').remove();

			}
			else{
					$('#buy2').css('opacity','0');
			}


		});

		$('.modal-backdrop').click(function(){
				alert('1');
		});

		$('#haveEthereum').click(function(){
			$('#buy2').css('opacity','1');
				localStorage.setItem("metamask", 1);
		});
		$('#InsMetaMask').click(function(){
				//alert('1');

				$('#InsMetaMask').css('display','none');
				$('.Installed').css('display','block');
				localStorage.setItem("metamask", 1);
				// $('#myModalMask').remove();
		});

		$('.Installed').click(function(){
			alert('1');
				$('#buy2').css('opacity','1');
		});

				// $('#buy2').css('opacity','1');


		// $('.buy-now').click(function(){
		// 		// $('#myModalMask').css('display','block');
		// });

		var otherContent = document.querySelector("other");
		console.log(otherContent)

		setTimeout(function(){

				var rostValues = document.querySelectorAll(".rost");
				var prirostValues = document.querySelectorAll(".prirost");
				checkPercentage(rostValues);
				checkPercentage(prirostValues);

		}, 500);

		//var rostVal = $('.rost').html();

		// rostVal.each(function(index, value) {
    //     cur = $(this).attr('data-ticker');
		//
    //     var me = $(this);
		// });

		if(window.localStorage.getItem('isuser') != 1) {
			$('.onlyuser').remove();
		}
		// if(!$('.nav-tabs-li').hasClass('onlyuser')) {
		// 	// alert('off');
		// 	$('#centru').addClass('tabs-off');
		// }
    $('.js-send-bitcoin').click(function(){
        var count = $('#kupit').val();
        var bitcoin = $('#bit-sel-adr').val();
        var login = localStorage.getItem("login");
        var btccount = $('#showafterrecalc #inbtc').html();
        var tok = $('.pai-pai table tr.active').attr('data-token');
        var adr = $('.pai-pai table tr.active').attr('rel');
        var eth = $('#eth-adr').val();
        var pie = $(".pai-pai table tr.active .pai-title").html();
        var ourbit = $('#showafterrecalc .key').html();
        var obj = {
            count: count,
            adress: adr,
            tok: tok,
            eth: eth,
            btccount: btccount,
            login: login,
            pie: pie,
            bitcoin: bitcoin,
            ourbit: ourbit,
        };
        $.ajax({
            type: "POST",
            url: "//reg.bigtime.fund/mail/give-token.php",
            data: obj,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function(){
            },
            success: function(html){
                console.log(html);
            },
        });
        $('#kupit').val("");
        $('#eth-adr').val("");
        $('.thank-text').html("Спасибо! Ожидайте токены в ближайшее время.");
    });

    $('#js-send-another-token').click(function(){

    	var who = $('#js-send-who').val();
    	var count = $('#js-send-count').val();
    	var tok = $('.pai-pai table tr.active').attr('data-token');
    	var adr = $('.pai-pai table tr.active').attr('rel');
    	App.sendTokVal(who,count,tok,adr);
    	$('#js-send-status').html('Токен в пути');
    });


    $('#js-sell-my-token').click(function(){

    	var who = $('.pai-pai table tr.active').attr('data-masterkey');
    	var count = $('#sell-token').val();
        var login = localStorage.getItem("login");
    	var tok = $('.pai-pai table tr.active').attr('data-token');
    	var adr = $('.pai-pai table tr.active').attr('rel');
        var bit = $('#where-go-bit').val();
        var pie = $(".pai-pai table tr.active .pai-title").html();
    	App.sendTokVal(who,count,tok,adr);
    	//Напиши тут штуку уведомление на почту
        var obj = {
            count: count,
            adress: adr,
            tok: tok,
            bit: bit,
            login: login,
            pie: pie,
        };
        $.ajax({
            type: "POST",
            url: "//reg.bigtime.fund/mail/give-bitcoin.php",
            data: obj,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function(){
            },
            success: function(html){
                console.log(html);
            },
        });
    });



    $('#js-balans-click').click(function(){
    	var adr = $('.pai-pai table tr.active').attr('rel');
    	App.hubBalance(adr);
    });
});
