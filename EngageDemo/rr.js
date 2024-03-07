function profileCheck(){
var profile  = localStorage.getItem('userId');
switch(profile) {
    case "userProfileConstrucao":
        document.getElementById("profileConstrucao").selected = true;
    break;
    case "userProfileDecoracao":
        document.getElementById("profileDecoracao").selected = true;
    break;
    case "userProfileMoveis":
        document.getElementById("profileMoveis").selected = true;
    break;
    case "userProfileMoveisBanheiros":
        document.getElementById("profileMoveisBanheiro").selected = true;
    break;
    case "userProfileMoveisSala":
        document.getElementById("profileMoveisSala").selected = true;
    break;
    case "userProfileGdeSP":
        document.getElementById("profileGdeSP").selected = true;
    break;
    case "userProfileRJ":
        document.getElementById("profileRJ").selected = true;
    break;
    case "userFidelidade":
        document.getElementById("profileFidelidade").selected = true;
    break;
    default:
        document.getElementById("profileNovo").selected = true;
}
}
    function refreshProfile(){
        var profileSelected = document.getElementById("profiles").value || '';
        switch(profileSelected) {
            case "profileConstrucao":
                console.log("Selecionou Construção");
                localStorage.setItem('userId', "userProfileConstrucao");
                localStorage.setItem('sessionId', "sessionProfileConstrucao");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileDecoracao":
                console.log("Selecionou Decoração");
                localStorage.setItem('userId', "userProfileDecoracao");
                localStorage.setItem('sessionId', "sessionProfileDecoracao");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileMoveis":
                console.log("Selecionou Moveis");
                localStorage.setItem('userId', "userProfileMoveis");
                localStorage.setItem('sessionId', "sessionProfileMoveis");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileMoveisBanheiro":
                console.log("Selecionou Moveis Banheiro");
                localStorage.setItem('userId', "userProfileMoveisBanheiros");
                localStorage.setItem('sessionId', "sessionProfileMoveisBanheiros");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileMoveisSala":
                console.log("Selecionou Moveis Sala");
                localStorage.setItem('userId', "userProfileMoveisSala");
                localStorage.setItem('sessionId', "sessionProfileMoveisSala");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileGdeSP":
                console.log("Selecionou Gde SP");
                localStorage.setItem('userId', "userProfileGdeSP");
                localStorage.setItem('sessionId', "sessionProfileGdeSP");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileRJ":
                console.log("Selecionou Gde SP");
                localStorage.setItem('userId', "userProfileRJ");
                localStorage.setItem('sessionId', "sessionProfileRJ");
                localStorage.setItem('rr_rcs','');
                break;
                break;
            case "profileFidelidade":
                console.log("Usuário Fidelidade");
                localStorage.setItem('userId', "userFidelidade");
                localStorage.setItem('sessionId', "sessionUserFidelidade");
                localStorage.setItem('rr_rcs','');
                break;
            case "profileNovo":
                console.log("Selecionou Novo Usuário");
                let rand = (Math.random() + 1).toString(36).substring(7);
                localStorage.setItem('userId', "user-"+rand);
                localStorage.setItem('sessionId', "session-"+rand);
                localStorage.setItem('rr_rcs','');
                break;
            default:
                console.log("Erro");
        }
        location.reload()
    }
    var R3_COMMON = new r3_common();
    let rand = (Math.random() + 1).toString(36).substring(7);
    var id_user = localStorage.getItem('userId') || "user-"+rand;
    var id_sessao = localStorage.getItem('sessionId') || "session-"+rand;

    
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
    R3_COMMON.setUserId(id_user);  
    if( localStorage.getItem('userId') == "userProfileGdeSP"){
        R3_COMMON.setRegionId("grande_sao_paulo");  
    }else if(localStorage.getItem('userId') == "userProfileRJ"){
        R3_COMMON.setRegionId("rio_de_janeiro");  
    }
    R3_COMMON.addPlacementType('home_page.hero_01|home_page.hero_02|home_page.historico|home_page.mosaico_01|home_page.mosaico_02|home_page.mosaico_03|home_page.mosaico_04');
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
    RR.jsonCallback = function(){
        var arr = RR.data.JSON.placements;
        var herosHTML = '<div class="owl-carousel">';
        
        var mosaicsHTML= '<div>';
        console.log(arr);
    
        for (var i = 0; i < arr.length; i++){
            console.log(arr[i]);
            if(arr[i].placementType == "content"){
                // HEROS
                if((arr[i].content["AREA"] == 'HERO')){    
                    herosHTML += `<a href="${arr[i].content["TARGET_URL"]}" title="Ir para ${arr[i].content["CONTENT_ALT"]}" class="item"> \n\t<img src="${arr[i].content["CONTENT_URL"]}"  alt="${arr[i].content["CONTENT_ALT"]}" />\n</a>\n`;
                    
                // MOSAICS
                } else if((arr[i].content["AREA"] == 'MOSAICO')){ 
                    mosaicsHTML += `<a href="${arr[i].content["TARGET_URL"]}" title="Ir para ${arr[i].content["CONTENT_ALT"]}">
                                        <img src="${arr[i].content["CONTENT_URL"]}"  alt="${arr[i].content["CONTENT_ALT"]}" />
                                    </a>`;
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
                        if(val.salePrice != ''){
                            productsHTML += `<a class="sale-item" href="${val.linkURL}" title="Ir para ${val.name}"> <img src="${val.imageURL}" alt="Ir para ${val.name}"> <p class="productName">${val.name}</p><p class="oldPrice">De R$ ${val.price}</p><p class="newPrice">Por R$ ${val.salePrice}</p></a>`;
                    } else {
                            productsHTML += `<a class="regular-item" href="${val.linkURL}" title="Ir para ${val.name}"> <img src="${val.imageURL}" alt="Ir para ${val.name}"> <p class="productName">${val.name}</p><p class="newPrice"> R$ ${val.price}</p></a>`;
                        }
                    });
                    productsHTML += '</div>';
    
                }
            } 
        }
        herosHTML += '</div>';
        mosaicsHTML += '</div>';
        
        $("#heros").html(herosHTML);
        $("#products").html(productsHTML);
        $("#mosaic01").html(mosaicsHTML);
        function initializeCarousel(){
            $('#heros .owl-carousel').owlCarousel({
                margin: 0,
                nav: false,
                loop: true,
                autoplay: true,
                items: 1
            });
            $('#products .owl-carousel').owlCarousel({
                margin: 0,
                nav: false,
                loop: true,
                autoplay: true,
                items: 2
            });
        }
        initializeCarousel();
    };