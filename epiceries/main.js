
const content = document.querySelector('#content')
const produits = [

       { id:1 ,nom:"paquet de chips", prix : 4, image:"chips.png" },
        { id:2 ,nom:"jambonneau", prix : 30, image:"jambonneau.png" },
        { id:3 ,nom:"pack de bieres", prix : 15, image:"bieres.png" },
        { id:4 ,nom:"paquet de bonbons", prix : 7, image:"bonbons.png" },
        { id:5 ,nom:"cacahuettes", prix : 2, image:"cacahuettes.png" }


]




function makeCard(produit){

    let card = `
                <div class="card border-warning mb-3 col-3" style="max-width: 20rem;">
                        <div class="card-header">${produit.nom}</div>
                        <div class="card-body maCard">
                            <img src="images/${produit.image}" alt="" class="card-img">
                        <h4 class="card-title">${produit.prix} €</h4>
                            <div class="ajout">
                                <button class="btn btn-secondary moins"><strong>-</strong></button>
                                <input type="text" value="0" class="compteur">
                                <button class="btn btn-secondary plus"><strong>+</strong></button>
                                <button class="btn btn-success ajouter disabled" id="${produit.id}">Ajouter au panier</button>
                            </div>
                        </div>
                    </div>
                
                `


    return card


}

function getProducts(articles){

    let cards = ""
    
    articles.forEach(article => {
          cards+=      makeCard(article)        
    });

    return cards

}

function showProducts(){
//1 on créer les cards et leurs boutons
        content.innerHTML = getProducts(produits)


       

        const mesDivsAjout = document.querySelectorAll('.ajout')

        mesDivsAjout.forEach(div=>{
            const boutonMoins = div.querySelector('.moins')
            const boutonPlus = div.querySelector('.plus')
            const boutonAjouter = div.querySelector('.ajouter')
            const compteur = div.querySelector('.compteur')

            boutonPlus.addEventListener('click', ()=>{
                plusUn(compteur, boutonAjouter)
            }) 
            boutonMoins.addEventListener('click', ()=>{
                moinsUn(compteur, boutonAjouter)
            }) 
            boutonAjouter.addEventListener('click', ()=>{
               ajouterAuPanier(boutonAjouter.id,compteur.value)
            })



        })

}

//deux paquets de chips et 1 jambonneau    Keep It Simple

function plusUn(inputCompteur, boutonAjoutPanier){
    inputCompteur.value++
    if(inputCompteur.value > 0) boutonAjoutPanier.classList.remove("disabled")
}  

function moinsUn(inputCompteur, boutonAjouter){
    if(inputCompteur.value > 0) inputCompteur.value--
    if(inputCompteur.value == 0) boutonAjouter.classList.add("disabled")
}

function ajouterAuPanier(idProduit, quantiteAAjouter){
    //betement ajouter un nouvel element au panier avec le bon id et une quantity : 1
    quantiteAAjouter = parseInt(quantiteAAjouter)
    //console log le panier
   
     let produitSuppose = panier.find(e=> e.id == idProduit)

     if(produitSuppose){
            produitSuppose.quantity+=quantiteAAjouter
     }else{
            panier.push({id:parseInt(idProduit), quantity:quantiteAAjouter}) 
     }
   showCount()
}

const panier  = []
 showProducts()

function afficheLePanier()
{

    let grandTotal=0;
    let bodyTable = ""

        panier.forEach(article=>{

            let produit = produits.find(e=>e.id == article.id)

            let tr =`  <tr>
                        <td>${produit.nom}</td>
                        <td>${produit.prix}€</td>
                        <td class="quantite" data-article="${article.id}">
                            <button class="btn btn-secondary moins"><strong>-</strong></button>
                            ${article.quantity}
                            <button class="btn btn-secondary plus"><strong>+</strong></button>
                        </td>
                        <td>${article.quantity*produit.prix}€</td>
                        <td><button class="btn btn-danger delete" id="${article.id}"><strong>X</strong></button></td>
                    </tr>`

            grandTotal+=(article.quantity*produit.prix)
            bodyTable+=tr 
        })



    let table = `
                    <table class="table table-striped">

                                <thead>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Prix</th>
                                        <th>Quantité</th>
                                        <th>Sous-total</th>
                                        <th>case vide</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    
                                    ${bodyTable}
                                    

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total :</strong></td>
                                        <td>${grandTotal}€</td>
                                        <td><button class="btn btn-success">Payer</button></td>
                                    </tr>
                                </tfoot>

                            </table>

                    `

    content.innerHTML = table

    const BoutonsDelete = document.querySelectorAll('.delete')
    BoutonsDelete.forEach(bouton=>{
        bouton.addEventListener('click', ()=>{
            enleverDuPanier(bouton.id)
        })
    })
    const tdsQuantite = document.querySelectorAll('.quantite')

    tdsQuantite.forEach(td => {
        // la valeur data-article et donc l'id de produit
        //le bouton moins
        //le bouton plus
        const idArticle = td.getAttribute('data-article')
       const boutonMoins = td.querySelector('.moins')
       const boutonPlus = td.querySelector('.plus')
    

        boutonMoins.addEventListener('click', ()=>{
            enleverUnArticle(idArticle)
        })
        boutonPlus.addEventListener('click', ()=>{
            ajouterUnArticle(idArticle)
    })
    

    })

}


function ajouterUnArticle(idArticle)
{
    let index = panier.findIndex(article => article.id == idArticle)

    panier[index].quantity++
    afficheLePanier()
    showCount()


}

function enleverUnArticle(idArticle){
    let index = panier.findIndex(article => article.id == idArticle)

        if(panier[index].quantity == 1){
            enleverDuPanier(idArticle)

        }else{
            panier[index].quantity--
            afficheLePanier()
        }
        showCount()

}

function enleverDuPanier(idProduit)
{
    let index = panier.findIndex(truc=>truc.id === parseInt(idProduit))
    panier.splice(index, 1)
    afficheLePanier()
    showCount()

}

function showCount(){

    //base sur le panier
    let count = 0

    panier.forEach(article=>{
        count+=article.quantity
    })

   // Remplace le contenu de #count par le total des quantités (count)

    document.querySelector('#count').innerHTML = count

}

const btnPanier = document.querySelector('#btnPanier')
const btnShop = document.querySelector('#btnShop')

btnPanier.addEventListener('click', afficheLePanier)
btnShop.addEventListener('click', showProducts)



// acceder aux elements afin de pouvoir les observer et les manipuler

// deux functions :  

//          function plus(){
//          incrémente le compteur

// }

// function moins(){
//  décrémente le compteur sauf si compteur est a zéro   
// }

// si un compteur a une value=0, on ajoutera la classe "disabled" au bouton ajouter au panier

// on veut, sur le clic d'un bouton ajouter au panier récupérer la valeur du compteur
//la logger dans la console ou dans un alert()