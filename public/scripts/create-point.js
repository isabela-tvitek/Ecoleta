
function populateUFs(){
    const ufSelect= document.querySelector("select[name=uf]")
        
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

        for(const state of states) {
           ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
     })
}


populateUFs()


function getCities(event){
    const citySelect= document.querySelector("select[name=city]")
    const stateInput= document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url =` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    
    citySelect.innerHTML = "<option value> Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res =>  res.json())
    .then(cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
     })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add ou remover a classe com js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID:', itemId)

    //verificar se existem items selecionados, se sim
    //pegar os items selecionads

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })


    //console.log(alreadySelected)
    // se ja estiver selecionado, tirar da seleção

    if ( alreadySelected >= 0 ) {
        const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId//false
            return itemIsDifferent
        })

        selectedItens = filteredItens

    } else {
        selectedItens.push(itemId)
    }

    //console.log('')
    collectedItens.value = selectedItens
}