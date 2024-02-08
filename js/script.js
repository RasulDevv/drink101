const wrapper = document.querySelector('.wrapper'),
      hundredOne = document.querySelector('.header_left > h1'),
      titleOfDrink = document.getElementById('title_of_drink'),
      zakazBtn = document.getElementById('zakazBtn'),
      box = document.querySelector('.links'),
      product = document.querySelector('.product'),
      check = document.querySelector('.check'),
      divOfZakazBtn = document.querySelector('.zakaz_btn')

data.forEach((product, index) => {
    box.insertAdjacentHTML('beforeend', `
        <a href="#" id="product${product.id}" data-index="${index}" class="link">
            <img src="./images/${product.name}.jpg" alt="picture">
        </a>
    `)
})



let hundredOneVar = 0
function hundredOneFunc() {
    hundredOneVar++
    hundredOne.innerHTML = hundredOneVar
    if(hundredOneVar != 101) setTimeout(hundredOneFunc, 10)
}
hundredOneFunc()



// ASOSIY*******************************************************************************************
document.querySelectorAll('.link').forEach((link, productIndex) => {
    link.onclick = function() {

        const arrOfBulks = Object.keys(data[this.getAttribute('data-index')].pr).sort(),
              arrOfPrices = Object.values(data[this.getAttribute('data-index')].pr)

        
        // SETTINGS*********************************************************************************
        titleOfDrink.innerHTML = data[this.getAttribute('data-index')].name
        box.classList.remove('active')
        product.classList.add('active')
        product.style.background = `url("./images/${data[this.getAttribute('data-index')].name}.jpg") no-repeat center / cover`
        zakazBtn.style.display = 'none'

        // PRODUCT**********************************************************************************
        product.insertAdjacentHTML('beforeend', `
            <div class="product_item ${this.getAttribute('id')}">

                <div class="product_item_PM">
                    <div class="plus_and_minus">
                        <button disabled>-</button>
                        <span>0</span>
                        <button disabled>+</button>
                    </div>
                    <h4>Price: <span>.....</span> sum</h4>
                </div>

                <div class="bulks"></div>

                <h3>VAT(15%) price: <span>.....</span> sum </h3>

                <div class="button">
                    <a href="#" class="yellowBtn">OK</a>
                </div>
            </div>
        `)

        // BULKS**********************************************************************************
        arrOfBulks.forEach(bulk => {
            product.querySelector(`.${link.getAttribute('id')} > .bulks`).insertAdjacentHTML('beforeend', `
                <label class="bulk">
                    <input type="radio" name="${data[link.getAttribute('data-index')].name}">
                    <p>${bulk}</p>
                </label>
            `)
        })
        

        let amountsSpan = document.querySelector(`.${this.getAttribute('id')} > .product_item_PM > .plus_and_minus > span`),
            priceSpan = document.querySelector(`.${this.getAttribute('id')} > .product_item_PM > h4 > span`),
            highPriceSpan = document.querySelector(`.${this.getAttribute('id')} > h3 > span`),
            plusAndMinusBtns = document.querySelectorAll(`.${link.getAttribute('id')} > .product_item_PM > .plus_and_minus > button`),
            inputsOfBulk = document.querySelectorAll(`.${this.getAttribute('id')} > .bulks > .bulk > input`)


        // **********************************************************************************
        highPriceSpan.innerHTML = products[productIndex].HighSumm.toLocaleString()


        inputsOfBulk.forEach((input, radioIndex) => {

            // RADIO Button ONCHANGE**********************************************************************************************
            input.onchange = function() {
                if(this.checked) {
                    products[productIndex].check = radioIndex
                    amountsSpan.innerHTML = products[productIndex].Amounts[radioIndex]
                    priceSpan.innerHTML = products[productIndex].Summ.toLocaleString()
                    highPriceSpan.innerHTML = products[productIndex].HighSumm.toLocaleString()
                    plusAndMinusBtns[0].disabled = !products[productIndex].Amounts[radioIndex] ? true : false
                    plusAndMinusBtns.forEach((btn, btnIndex) => {
                        // btn.disabled = btnIndex ? false : products[productIndex].Amounts[radioIndex] == 0 ? true : false
                        highPriceSpan.innerHTML = products[productIndex].HighSumm.toLocaleString()
                        plusAndMinusBtns[1].disabled = false
                        plusAndMinusBtns[0].disabled = !products[productIndex].Amounts[radioIndex] ? true : false
                        
                        // PLUS AND MINUS BUTTON ONCLICK****************************************************************************
                        btn.onclick = function() {
                            if(this.innerHTML == '+') {
                                console.log('plus button')
                                if(products[productIndex].Amounts[radioIndex] < 10) products[productIndex].Amounts[radioIndex]++
                            }
                            else if(this.innerHTML == '-') {
                                console.log('minus button')
                                products[productIndex].Amounts[radioIndex]--
                            }
                            amountsSpan.innerHTML = products[productIndex].Amounts[radioIndex]
                            priceSpan.innerHTML = products[productIndex].Summ.toLocaleString()
                            highPriceSpan.innerHTML = products[productIndex].HighSumm.toLocaleString()
                            plusAndMinusBtns[0].disabled = !products[productIndex].Amounts[radioIndex] ? true : false
                        }
                    })
                }
            }
        })


        // OK Button******************************************************************************
        product.querySelector(`.${this.getAttribute('id')} > .button > a`).onclick = function() {
            console.log(this)
            box.classList.add('active')
            product.classList.remove('active')
            product.querySelector(`.${link.getAttribute('id')}`).remove()
            titleOfDrink.innerHTML = 'Choice your drink'
            zakazBtn.style.display = 'inline-block'
        }

    }
})






// CHECK********************************************************************************************************
let tableOfCheck = check.querySelector('table'),
    priceOfCheck = check.querySelector('h4 > span'),
    backBtnOfCheck = check.querySelector('.check_backBtn'),
    okBtnOfCheck = check.querySelector('.check_okBtn')

zakazBtn.onclick = function() {
    check.classList.add('active')
    box.classList.remove('active')
    divOfZakazBtn.classList.remove('active')
    titleOfDrink.innerHTML = 'check'
    tableOfCheck.insertAdjacentHTML('beforeend', '<tbody></tbody>')
    
    let highPriceOfCheck = 0,
        tbodyOfCheck = tableOfCheck.querySelector('tbody')

    for(let i = 0; i < products.length; i++) {
        let p = products[i]
        for(let j = 0; j < p.Amounts.length; j++) {
            let amount = p.Amounts[j],
                bulks = Object.keys(p.pr).sort()
            p.check = j
            if(amount) {
                tbodyOfCheck.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>${p.name} ${bulks[j]}</td>
                        <td>${amount}</td>
                        <td>${p.Summ.toLocaleString()}</td>
                    </tr>
                `)
            }
        }
        highPriceOfCheck += p.HighSumm
    }
    priceOfCheck.innerHTML = highPriceOfCheck.toLocaleString()

    // BACK BUTTON onclick*****************************************************************************
    backBtnOfCheck.onclick = function() {
        tbodyOfCheck.remove()
        check.classList.remove('active')
        box.classList.add('active')
        divOfZakazBtn.classList.add('active')
        titleOfDrink.innerHTML = 'Choice your drink'
    }

    // OK BUTTON onclick*******************************************************************************
    okBtnOfCheck.onclick = function() {
        location.href = ''
    }
}