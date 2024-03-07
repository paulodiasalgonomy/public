
var R3_COMMON = new r3_common();
var id_sessao = localStorage.getItem('x-session-id') || "";

// adicionado o tratamento de ambiente pela URL
var rr_env = "recs";
if (window.location.href.indexOf("r3_env=integration") > -1) {
    rr_env = "integration";
}       

R3_COMMON.setApiKey('b585440a90ab9e49');

// adicionado apiClientKey
R3_COMMON.apiClientKey = '82c59fb875e5bdcf';        

// Alterado a base da url para receber o ambiente pelo parametro
R3_COMMON.setBaseUrl('https://'+rr_env+'.richrelevance.com/rrserver/');

R3_COMMON.setSessionId(id_sessao); 
R3_COMMON.setUserId();  
R3_COMMON.addPlacementType('home_page.hero_01|home_page.hero_02|home_page.historico');
/* var R3_CATEGORY = new r3_category();         
R3_CATEGORY.setId('5fa987234acac32604690c0c'); 
R3_CATEGORY.setName('Acessórios');  */

// Atribuido categoryId
/* R3_COMMON.categoryId = R3_CATEGORY.id; */
// Atribuido placement
R3_COMMON.placements = R3_COMMON.placementType;
// Atribuido url referer
R3_COMMON.pref = document.referrer;
// Chama o clientJs

rr_flush_onload();
r3();

var script = document.createElement('script');
script.src = 'https://cdn.richrelevance.com/dashboard/applications/clientjs-dev/client.js';
document.getElementsByTagName('head')[0].appendChild(script);

RR.jsonCallback = function(){
    var arr = RR.data.JSON.placements;
    var herosHTML = '<div class="owl-carousel" data-autoplay="false" data-nav="true" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="30"  data-responsive = \'{"0":{"items":1}, "640":{"items":1}, "768":{"items":1}, "1024":{"items":1}, "1200":{"items":1}}\'>';
    var mosaicsHTML= '';
    console.log(arr);

    for (var i = 0; i < arr.length; i++){
        if(arr[i].placementType == "content"){
            // HEROS
            if((arr[i].content["AREA"] == 'HERO')){    
                herosHTML += `<a href="${arr[i].content["TARGET_URL"]}" title="Ir para ${arr[i].content["CONTENT_ALT"]}" class="item"> \n\t<img src="${arr[i].content["CONTENT_URL"]}"  alt="${arr[i].content["CONTENT_ALT"]}" />\n</a>\n`;

            // MOSAICS
            } if((arr[i].content["AREA"] == 'MOSAIC')){ 
                mosaicsHTML += `<a href="${arr[i].content.TARGET_URL}" title="Ir para ${arr[i].content.CONTENT_ALT} ">
                                    <img src="' ${arr[i].content.CONTENT_URL}'"  alt="${arr[i].content.CONTENT_ALT}" />
                                </a>`;
                                console.log(mosaicsHTML);
            }
        } else {
            // PRODUTOS NOVIDADES                    
            if((arr[i].name == 'home_page.historico')){     
                // CRIA O HTML PARA CARROSSEL DE PRODUTOS
                var productsHTML = '<div class="carrossel-produtos">\
                                        <h2>'+ arr[i].message +'</h2>\
                                        <div id="recs" class="owl-carousel"  data-autoplay="false" data-nav="true" data-dots="false" data-loop="true" data-slidespeed="800" data-margin="30"  data-responsive = \'{"0":{"items":1}, "640":{"items":2}, "768":{"items":3}, "1024":{"items":6}, "1200":{"items":6}}\'>';

                // Loop com os produtos retornados para esse placement
                $.each(arr[i].items, function(j, val){
                    
                    if(val.price != val.salePrice){
                        productsHTML += '<div class="item"> <a href="'+val.linkURL+'" title="Ir para '+ val.name +'"> <img src="'+ val.imageURL+'" alt="Ir para '+ val.name +'"> <p>'+ val.name +'</p><p style="color: #616161; font-size: 14px; line-height: 20px; letter-spacing: 0; font-weight: 300; margin: 0; margin-top: 4px;">De R$ '+ val.price +'</p><p style="color: #bf5546; font-size: 20px; line-height: 28px; letter-spacing: 0; font-weight: 400; margin: 0;">Por R$ '+ val.salePrice +'</p></a></div>';
                    } else {
                        productsHTML += '<div class="item"> <a href="'+val.linkURL+'" title="Ir para '+ val.name +'"> <img src="'+ val.imageURL+'" alt="Ir para '+ val.name +'"> <p>'+ val.name +'</p><p style="font-size: 20px; line-height: 28px; letter-spacing: 0; font-weight: 400; margin: 0;"> R$ '+ val.price +'</p></a> </div>';
                    }
                });
                productsHTML += '</div>';

            }
        } 
    }
    $("#rr-heros").html(herosHTML);

    // Insere html de duplo bottom
   // $("#mocaics").html(mosaicsHTML);
    //c
    // Insere os produtos no html
    //$("product01").html(productsHTML);
    //console.log(productsHTML); 
};
