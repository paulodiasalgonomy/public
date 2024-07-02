document.addEventListener('DOMContentLoaded', () => {
    const productsApiUrl = 'https://staging.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=36afa20de99f09af&apiClientKey=4faa7b30e12b9365&sessionId=algtestsession078502585875&userId=algtestuser668524711287&placements=home_page.recs1&includeStrategyData=true&excludeItemAttributes=true&categoryData=false&excludeHtml=true';

    fetch(productsApiUrl)
        .then(response => response.json())
        .then(data => {
            const products = data.placements[0].recommendedProducts;
            const partnerCodes = products.map(product => product.id).join(',');
            console.log('Resposta completa da API dos Products:', products);
            const partnersApiUrl = `https://apis.pontoslivelo.com.br/partners-campaign/v1/campaigns/active?partnersCodes=${partnerCodes}`;

            fetch(partnersApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar os dados da API dos parceiros');
                    }
                    return response.json();
                })
                .then(partnerData => {
                    console.log('Resposta completa da API dos parceiros:', partnerData);

                    const productGrid = document.getElementById('product-grid');

                    products.forEach(product => {
                        const productElement = document.createElement('div');
                        productElement.className = 'product';

                        const productImage = document.createElement('img');
                        productImage.src = product.imageURL;
                        productImage.alt = product.name;

                        const productName = document.createElement('h2');
                        productName.textContent = product.name;

                        const productId = document.createElement('p');
                        productElement.appendChild(productImage);
                        productElement.appendChild(productName);
                        productElement.appendChild(productId);

                        productGrid.appendChild(productElement);
                        // Encontrando dados do parceiro correspondente ao produto
                        const partnerInfo = partnerData.find(partner => partner.partnerCode === product.id);
                        if (partnerInfo) {
                            const partnerCurrency = document.createElement('p');
                            partnerCurrency.textContent = `Moeda: ${partnerInfo.currency}`;

                            const partnerParity = document.createElement('p');
                            partnerParity.textContent = `Parity: ${partnerInfo.parity}`;

                            const partnerParityBau = document.createElement('p');
                            partnerParityBau.textContent = `ParityBau: ${partnerInfo.parityBau}`;

                            const partnerParityClub = document.createElement('p');
                            partnerParityClub.textContent = `ParityClub: ${partnerInfo.parityClub}`;

                            const partnerPartnerCode = document.createElement('p');
                            partnerPartnerCode.textContent = `PartnerCode: ${partnerInfo.partnerCode}`;

                            const partnerPromotion = document.createElement('p');
                            partnerPromotion.textContent = `Promotion: ${partnerInfo.promotion}`;

                            const partnerSeparator = document.createElement('p');
                            partnerSeparator.textContent = `Separator: ${partnerInfo.separator}`;          
                            
                            const partnerUrl = document.createElement('p');
                            partnerUrl.textContent = `url: ${partnerInfo.url}`;     

                            const partnerValue = document.createElement('p');
                            partnerValue.textContent = `Value: ${partnerInfo.value}`;  

                            const partnerEndDate = document.createElement('p');
                            partnerEndDate.textContent = `Data de término: ${partnerInfo.endDate}`;

                            const partnerLegalTerms = document.createElement('p');
                            partnerLegalTerms.textContent = `Termos legais: ${partnerInfo.legalTerms}`;

                            // Adicione aqui outros campos conforme necessário
                            
                            productElement.appendChild(partnerCurrency);
                            productElement.appendChild(partnerParity);
                            productElement.appendChild(partnerParityBau);
                            productElement.appendChild(partnerParityClub);
                            productElement.appendChild(partnerPartnerCode);
                            productElement.appendChild(partnerPromotion);
                            productElement.appendChild(partnerSeparator);
                            productElement.appendChild(partnerUrl);
                            productElement.appendChild(partnerValue);
                            productElement.appendChild(partnerEndDate);
                            productElement.appendChild(partnerLegalTerms);
                        } else {
                            const noPartnerInfo = document.createElement('p');
                            noPartnerInfo.textContent = 'Informações do parceiro não encontradas';

                            productElement.appendChild(noPartnerInfo);
                        }


                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados da API dos parceiros:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao buscar os dados da API de produtos:', error);
        });
});
