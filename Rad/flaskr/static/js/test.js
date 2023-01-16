const DARK_COLOR = "#6c757d"
const LIGHT_COLOR = "#fff"
let SEARCH_TYPE = 1
let ADVANCED_SEARCH = false
let ADVANCED_SET = false
let ACTIVE_BUTTONS = {}
let DYX_ACTIVE = false

const NONCOMPLEX_ATTRS = ["autor", "sudionik","autor_upisa", "prostor", "datum", "vrijeme", "zamjena_sudionika", "sudionik1", "sudionik2", "situacijski_kontekst"]
const BASIC_ATTR_SEARCH_BUTTONS = ["sudionik", "opis", "emocija", "autor", "kontekst"]
const DICTIONARY_BASIC_ATTRS = {
    "sudionik" : ["sudionik1", "sudionik2"],
    "opis": ["opis_ipn", "opis_eon", "opis_ipv", "opis_ion", "opis_epv", "opis_iov", "opis_epn"],
    "emocija": ["emocija_iov", "emocija_eov", "emocija_epv", "emocija_eon", "emocija_epn", "emocija_ipn", "emocija_ipv", "emocija_ion"],
    "autor" : ["autor_upisa"],
    "kontekst": ["situacijski_kontekst"]
}

const EXVOCATION_GREETING = "exv_poz"
const INVOCATION_GREETING = "inv_poz"
const EXVOCATION_RESPONSE = "exv_odz"
const INVOCAITON_RESPONSE = "inv_odz"

const GREETING = "pozdrav"
const RESPONSE = "odgovor"
const UNDEFINED = 'undefined'
const REST = "ostalo"

const FIRST_PARTICIPANT = "sudionik1"
const SECOND_PARTICIPANT = "sudionik2"

const EMOTION_IPN = "emocija_ipn"
const EMOTION_ION = "emocija_ion"
const EMOTION_IPV = "emocija_ipv"
const EMOTION_IOV = "emocija_iov"

const EMOTION_EPN = "emocija_epn"
const EMOTION_EON = "emocija_eon"
const EMOTION_EPV = "emocija_epv"
const EMOTION_EOV = "emocija_eov"

const DESCRIPTION_IPN = "opis_ipn"
const DESCRIPTION_ION = "opis_ion"
const DESCRIPTION_IPV = "opis_ipv"
const DESCRIPTION_IOV = "opis_iov"

const DESCRIPTION_EPN = "opis_epn"
const DESCRIPTION_EON = "opis_eon"
const DESCRIPTION_EPV = "opis_epv"
const DESCRIPTION_EOV = "opis_eov"

const REST_ATTR = "ostalo"
const REST_ATTRS = {
    inv_poz : ["opis_ipv_ostalo", "opis_ipn_ostalo"],
    exv_odz : ["opis_eon_ostalo", "opis_eov_ostalo"], 
    inv_odz : ["opis_iov_ostalo", "opis_ion_ostalo"], 
    exv_poz : ["opis_epn_ostalo", "opis_epv_ostalo"]
}

const HTML_CARD_HEADER = '<div class="card-body" id="$$">'
const HTML_CARD_FOOTER = '<div class="card-footer"><small>Autor: $$</small></div></div>'
const HTML_REST = '<p class="card-text"><span>ostalo</span>'

const KEY_BASIC_BUTTON_DESC = {
    "opis": "Atribut kojim se opisuje pozdrav/odzdrav, npr. grljenje",
    "emocija": "Emocija sudionika u pozdravu/odzdravu, npr. srdačno",
    "sudionik": "Ime sudionika unutar pozdrava/odzdrava, npr. sestra",
    "prostor": "Lokacija pozdrava/odzdrava, npr. whatsapp, Zagreb",
    "datum": "Datum pozdrava/odzdrava, npr. 27.travnja 2022.",
    "zamjena_sudionika": "Ukoliko odzdrav započinje 2. sudionik pozdrava, (da ili ne ili prazno)",
    "autor": "Autor upisa pozdrava/odzdrava, npr. Klementina",
    "vrijeme": "Vrijeme pozdrava/odzdrava, npr. 10:53 ili popodne",
    "kontekst": "Situacija odvijanja pozdrava/odzdrava, npr. dogovor za kavu"
}

const KEY_ADVANCED_BUTTON_DESC = {
    "opis_ipv": "Atribut za opisivanje verbalnoga invokacijskog pozdrava, npr. pozdravna formula",
    "opis_ipn": "Atribut za opisivanje neverbalnoga invokacijskog pozdrava, npr. grljenje",
    "opis_iov": "Atribut za opisivanje verbalnoga invokacijskog odzdrava, npr. odzdravna formula",
    "opis_ion": "Atribut za opisivanje neverbalnoga invokacijskog odzdrava, npr. uzbuđeno",
    "opis_epv": "Atribut za opisivanje verbalnoga eksvokacijskog pozdrava, npr. planiranje",
    "opis_epn": "Atribut za opisivanje neverbalnoga eksvokacijskog pozdrava, npr. osmjeh",
    "opis_eov": "Atribut za opisivanje verbalnoga eksvokacijskog odzdrava, npr. zaključivanje razgovora",
    "opis_eon": "Atribut za opisivanje neverbalnoga eksvokacijskog odzdrava, npr. osmjeh",

    "emocija_ipv": "Emocija sudionika tijekom pozdrava (verbalna), npr. srdačno",
    "emocija_ipn": "Emocija sudionika tijekom pozdrava (neverbalna), npr. srdačno",
    "emocija_iov": "Emocija sudionika tijekom odzdrava (verbalna), npr. srdačno",
    "emocija_ion": "Emocija sudionika tijekom odzdrava (neverbalna), npr. srdačno",
    "emocija_epv": "Emocija sudionika tijekom pozdrava (verbalna), npr. srdačno",
    "emocija_epn": "Emocija sudionika tijekom pozdrava (neverbalna), npr. srdačno",
    "emocija_eov": "Emocija sudionika tijekom odzdrava (verbalna), npr. srdačno",
    "emocija_eon": "Emocija sudionika tijekom odzdrava (neverbalna), npr. srdačno",

    "sudionik1": "Sudionik koji pokreće komunikaciju, npr. sestra",
    "sudionik2": "Drugi sudionik, npr. sestra",
    "situacijski_kontekst": "Situacija odvijanja pozdrava/odzdrava, npr. dogovor za kavu",

    "prostor": "Lokacija pozdrava/odzdrava, npr. whatsapp, Zagreb",
    "datum": "Datum pozdrava/odzdrava, npr. 27.travnja 2022.",
    "zamjena_sudionika": "Ukoliko odzdrav započinje 2. sudionik pozdrava, (da ili ne ili prazno)",
    "autor_upisa": "Autor upisa pozdrava/odzdrava, npr. Klementina",
    "vrijeme": "Vrijeme pozdrava/odzdrava, npr. 10:53 ili popodne",
    "ostalo": "Odabir pretraživanja po invokaciji i/ili eksvokaciji"
}

$('#pdf-download').bind('click', function(e){
    e.preventDefault();
})

$.ajax({
    url: "/dict"
}).done((data) => {
    localStorage.setItem("attr", JSON.stringify(data))
})

$("#inv-exv").on("click", () => {
    if($("#inv-exv").text() === "Invokacija"){
        $("#inv-exv").text("Eksvokacija")
        $("#inv-exv").css("background-color", DARK_COLOR)
        $("#inv-exv").css("color", LIGHT_COLOR)
        SEARCH_TYPE = 1
    }
    else{
        $("#inv-exv").text("Invokacija")
        $("#inv-exv").css("background-color", LIGHT_COLOR)
        $("#inv-exv").css("color", DARK_COLOR)
        SEARCH_TYPE = 2
    }
})

function addBasicAttributeSearch(){
    index=0
    for(i in BASIC_SEARCH_KEYS){
        key = BASIC_SEARCH_KEYS[i]
        let htmlString = ""
        if(index%5 === 0){
            if(index !== 0){
                htmlString += "</div></div>"
            }
            htmlString += `<div class="container">
            <div class="row" id="${index}-row">
            <div class="input-group mb-3" id="${key}-div">
            <button class="btn btn-outline-secondary" type="button" id="${key}-button-basic">${key}</button>
            <input id="${key}-input" type="text" class="form-control" placeholder="" aria-label="${key}" aria-describedby="${key}">
            <span class="tooltiptext">${KEY_BASIC_BUTTON_DESC[key]}</span>
        </div>`
        $("#basic-advanced").append(htmlString)
        index += 1
        }
        else{
        htmlString += `
        <div class="input-group mb-3" id="${key}-div">
            <button class="btn btn-outline-secondary" type="button" id="${key}-button-basic">${key}</button>
            <input id="${key}-input" type="text" class="form-control" placeholder="" aria-label="${key}" aria-describedby="${key}">
            <span class="tooltiptext">${KEY_BASIC_BUTTON_DESC[key]}</span>
        </div>`
        $(`#${index-1}-row`).append(htmlString)

        }
        addButtonListener(`${key}-button-basic`)
    }
}

addBasicAttributeSearch()

function searchNonComplexAttr(event, keys){
    for(key in keys){
        if(typeof event[key] !== 'undefined'){
            const inputValue = $(`${attrName}-input`).val()
            if(event[key].includes(inputValue))
                return true
        }
    }
    return false
}

function returnActiveKeys(){
    let activeKeys = []
    for (button in ACTIVE_BUTTONS){
        if(ACTIVE_BUTTONS[button]){
            key = button.split("-button")[0]
            if(BASIC_ATTR_SEARCH_BUTTONS.includes(key))
                activeKeys = activeKeys.concat(DICTIONARY_BASIC_ATTRS[key])
            else
                activeKeys.push(key)
        }
    }
    return activeKeys
}

function returnInvocationCard(j, key){
    const invocationGreeting = j[key]["inv_poz"]
    const invocationResponse = j[key]["inv_odz"]

    attrString = ""
    restString = ""
    rest = '<p class="card-text"><span>ostalo</span>'

    ipnEmotion = ""
    ipvEmotion = ""
    ipnDescription = ""
    ipvDescription = ""

    for(attrKey in invocationGreeting){
        if(attrKey !== "pozdrav"){
            if(attrKey.includes("ostalo")){
                if(invocationGreeting[attrKey].length >2 )
                    restString += ` | ${invocationGreeting[attrKey]}`
            }
            else{
                if(attrKey === "emocija_ipn")
                    ipnEmotion = invocationGreeting[attrKey]
                else if(attrKey === "emocija_ipv")
                    ipvEmotion = invocationGreeting[attrKey]
                else if(attrKey === "opis_ipv")
                    ipvDescription = invocationGreeting[attrKey]
                else if(attrKey === "opis_ipn")
                    ipnDescription = invocationGreeting[attrKey]
            }
        }
    }
    if (restString !== ""){
        restString = rest + restString + "</p>"
    }
    if(ipnDescription === "0" || ipnDescription === "")
        ipnDescription = "Nepoznato"
    if(ipvDescription === "0" || ipvDescription === "")
        ipvDescription = "Nepoznato"
    if(ipnEmotion === "" || ipnEmotion === "0")
        ipnEmotion = "Nepoznato"
    if(ipvEmotion === "" || ipvEmotion === "0")
        ipvEmotion = "Nepoznato"

    attrString = `<p class="card-text">${ipnDescription} [${ipnEmotion}]<br>${ipvDescription} [${ipvEmotion}]</p>`
    greetingElement = `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik1"]}:</span> ${j[key]["inv_poz"]["pozdrav"]}</h5><hr>
    ${attrString}       
    ${restString}`
    
    restString = ""
    ionEmotion = ""
    iovEmotion = ""
    ionDescription = ""
    iovDescritpion = ""
    responseElement = ""
    
    if(typeof invocationResponse !== "undefined" && typeof invocationResponse["odgovor"] !== "undefined"){
        for(attrKey in invocationResponse){
            if(attrKey !== "odgovor"){
                if(attrKey.includes("ostalo")){
                    if(invocationResponse[attrKey].length >2 )
                        restString += ` | ${invocationResponse[attrKey]}`
                }
                else{
                    if(attrKey === "emocija_ion")
                        ionEmotion = invocationResponse[attrKey]
                    else if(attrKey === "emocija_iov")
                        iovEmotion = invocationResponse[attrKey]
                    else if(attrKey === "opis_ion")
                        ionDescription = invocationResponse[attrKey]
                    else if(attrKey === "opis_iov")
                        iovDescritpion = invocationResponse[attrKey]
                }
            }
        }
        if (restString !== ""){
            restString = rest + restString + "</p>"
        }
        if(iovDescritpion === "0" || iovDescritpion === "")
            iovDescritpion = "Nepoznato"
        if(ionDescription === "0" || ionDescription === "")
            ionDescription = "Nepoznato"
        if(ionEmotion === "" || ionEmotion === "0")
            ionEmotion = "Nepoznato"
        if(iovEmotion === "" ||iovEmotion === "0")
            iovEmotion = "Nepoznato"
        
        attrString = `<p class="card-text">${ionDescription} [${ionEmotion}]<br>${iovDescritpion} [${iovEmotion}]</p>`
        responseElement =  `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik2"]}:</span> ${j[key]["inv_odz"]["odgovor"]}</h5><hr>
        ${attrString}
        ${restString}`
    }
    
    if(typeof j[key]["autor_upisa"] === 'undefined')
        autor_upisa = "Nepoznato"
    else 
        autor_upisa = j[key]["autor_upisa"]
    htmlString = `
            <div class="card-body" id="invocation">
                ${greetingElement}
                ${responseElement}
                <small >INVOKACIJA | ${j[key]["prostor"]} | ${j[key]["datum"]} | ${j[key]["vrijeme"]}</small>
                <div class="card-footer">
                    <small >Autor: ${autor_upisa}</small>
                </div>
            </div>`
    return htmlString
}

function changeUnknownValues(value){
    if (value === '0' || value === '' ||value === 'Ø' || typeof value === UNDEFINED)
        return "Nepoznato"
    return value
}

function returnRestAttributes(restString){
    s = restString
    for(attr in INVOCATION_KOMB_DICTIONARY){
        if(restString.includes(attr)){
            s = s.replace(attr, INVOCATION_KOMB_DICTIONARY[attr])
        }
    }
    return s
}

function returnCardAttrs(attributesDictionary){
    attrString = ""
    let gRestString = ""
    let rRestString = ""
    let rest = '<p class="card-text"><span>ostalo</span>'

    nonverbalDescritpion = ""
    nonverbalEmotion = ""
    verbalDescription = ""
    verbalEmotion = ""

    let greetingNonverbalEmotion =  ""
    let responseNonverbalEmotion =  ""
    let responseVerbalEmotion =  ""
    let greetingVerbalEmotion =  ""
    let greetingNonverbalDescription = ""
    let responseNonverbalDescription = ""
    let responseVerbalDescription =  ""
    let greetingVerbalDescription =  ""

    for(attrKey in attributesDictionary){
        if(attrKey !== GREETING){
            if(attrKey.includes(REST)){
                if(attrKey.split("_")[1].includes("p") && attributesDictionary[attrKey].length > 2 )
                    gRestString += ` | ${returnRestAttributes(attributesDictionary[attrKey])}`
                if(attributesDictionary[attrKey].length >2 )
                    rRestString += ` | ${returnRestAttributes(attributesDictionary[attrKey])}`

            }
            else{
                // console.log(attrKey)
                if(attrKey === EMOTION_IPN || attrKey === EMOTION_EPN)
                    greetingNonverbalEmotion = attributesDictionary[attrKey]
                else if(attrKey === EMOTION_EON || attrKey === EMOTION_ION)
                    responseNonverbalEmotion = attributesDictionary[attrKey]
                else if(attrKey === EMOTION_EOV || attrKey === EMOTION_IOV)
                    responseVerbalEmotion = attributesDictionary[attrKey]
                else if(attrKey === EMOTION_IPV || attrKey === EMOTION_EPV)
                    greetingVerbalEmotion = attributesDictionary[attrKey]
                else if(attrKey === DESCRIPTION_IPN || attrKey === DESCRIPTION_EPN)
                    greetingNonverbalDescription = attributesDictionary[attrKey]
                else if(attrKey === DESCRIPTION_EON || attrKey === DESCRIPTION_ION)
                    responseNonverbalDescription = attributesDictionary[attrKey]
                else if(attrKey === DESCRIPTION_EOV || attrKey === DESCRIPTION_IOV)
                    responseVerbalDescription = attributesDictionary[attrKey]
                else if(attrKey === DESCRIPTION_IPV || attrKey === DESCRIPTION_EPV)
                    greetingVerbalDescription = attributesDictionary[attrKey]
            }
        }
                gNonverbalDescritpion = changeUnknownValues(greetingNonverbalDescription)
                gNonverbalEmotion = changeUnknownValues(greetingNonverbalEmotion)
                gVerbalDescription = changeUnknownValues(greetingVerbalDescription)
                gVerbalEmotion = changeUnknownValues(greetingVerbalEmotion)

                rNonverbalDescritpion = changeUnknownValues(responseNonverbalDescription)
                rNonverbalEmotion = changeUnknownValues(responseNonverbalEmotion)
                rVerbalDescription = changeUnknownValues(responseVerbalDescription)
                rVerbalEmotion = changeUnknownValues(responseVerbalEmotion)
            
        }
    if (rRestString !== "")
        rRestString = rest + rRestString + "</p>"
    if (gRestString !== "")
        gRestString = rest + gRestString + "</p>"
    
    return [
        gVerbalDescription, 
        gVerbalEmotion, 
        gNonverbalDescritpion, 
        gNonverbalEmotion, 
        rVerbalDescription, 
        rVerbalEmotion, 
        rNonverbalDescritpion, 
        rNonverbalEmotion, 
        rRestString,
        gRestString
    ]
}

function returnCardGreeting(entryParameter, invocation){
    try{
        firstParticipant = changeUnknownValues(entryParameter[FIRST_PARTICIPANT])
        secondParticipant = changeUnknownValues(entryParameter[SECOND_PARTICIPANT])
        if(invocation){
            if(typeof entryParameter[INVOCATION_GREETING] !== UNDEFINED)
                greeting = changeUnknownValues(entryParameter[INVOCATION_GREETING][GREETING])
            else 
                response = "Nepoznato"
            if(typeof entryParameter[INVOCAITON_RESPONSE] !== UNDEFINED)
                response = changeUnknownValues(entryParameter[INVOCAITON_RESPONSE][RESPONSE])
            else 
                response = "Nepoznato"
        }
        else{
            if(typeof entryParameter[EXVOCATION_GREETING] !== UNDEFINED)
                greeting = changeUnknownValues(entryParameter[EXVOCATION_GREETING][GREETING])
            else 
                response = "Nepoznato"
            if(typeof entryParameter[EXVOCATION_RESPONSE] !== UNDEFINED)
                response = changeUnknownValues(entryParameter[EXVOCATION_RESPONSE][RESPONSE])
        }
        greetingElement = `<h5 class="card-title"><span class='notbold'>${firstParticipant}:</span> ${greeting}</h5><hr>`
        responseElement = `<h5 class="card-title"><span class='notbold'>${secondParticipant}:</span> ${response}</h5><hr>`
        
        return [greetingElement, responseElement]
    }
    catch(error){
        console.log(error)
        console.log(entryParameter)
    }
    
}

function returnCardHtml(entryParameter, invocation, flags){
    [greetingHtml, responseHtml] = returnCardGreeting(entryParameter, invocation);
    [vDescription, vEmotion, nvDescritpion, nvEmotion, rest] = returnCardAttrs(entryParameter[flags[0]], true)
    attrString = returnCardAttribute(nvDescritpion, nvEmotion, vDescription, vEmotion)
    greetingHtml = greetingHtml + attrString + rest;
    [vDescription, vEmotion, nvDescritpion, nvEmotion, rest] = returnCardAttrs(entryParameter[flags[1]], false)
    attrString = returnCardAttribute(nvDescritpion, nvEmotion, vDescription, vEmotion)
    responseHtml = responseHtml + attrString + rest;
    return [greetingHtml, responseHtml]
}

function addInvocations(entry, searchData){
    const invocationGreeting = entry[INVOCATION_GREETING]
    const invocationResponse = entry[INVOCAITON_RESPONSE]

    htmlString =""
    if(typeof invocationGreeting!== 'undefined' && typeof invocationGreeting["pozdrav"] !== 'undefined'){
        
        attrString = ""
        restString = ""
        rest = '<p class="card-text"><span>ostalo</span>'
        ipnEmotion = ""
        ipvEmotion = ""
        ipnDescription = ""
        ipvDescription = ""

        if(invocationGreeting["pozdrav"].includes(searchData) || searchData === ""){
            attrString = ""
            restString = ""
            rest = '<p class="card-text"><span>ostalo</span>'

            ipnEmotion = ""
            ipvEmotion = ""
            ipnDescription = ""
            ipvDescription = ""

            for(attrKey in invocationGreeting){
                if(attrKey !== "pozdrav"){
                    if(attrKey.includes("ostalo")){
                        if(invocationGreeting[attrKey].length >2 )
                            restString += ` | ${invocationGreeting[attrKey]}`
                    }
                    else{
                        if(attrKey === "emocija_ipn")
                            ipnEmotion = invocationGreeting[attrKey]
                        else if(attrKey === "emocija_ipv")
                            ipvEmotion = invocationGreeting[attrKey]
                        else if(attrKey === "opis_ipv")
                            ipvDescription = invocationGreeting[attrKey]
                        else if(attrKey === "opis_ipn")
                            ipnDescription = invocationGreeting[attrKey]
                    }
                }
            }
            if (restString !== ""){
                restString = rest + restString + "</p>"
            }
            if(ipnDescription === "0" || ipnDescription === "")
                ipnDescription = "Nepoznato"
            if(ipvDescription === "0" || ipvDescription === "")
                ipvDescription = "Nepoznato"
            if(ipnEmotion === "" || ipnEmotion === "0")
                ipnEmotion = "Nepoznato"
            if(ipvEmotion === "" || ipvEmotion === "0")
                ipvEmotion = "Nepoznato"

            attrString = `<p class="card-text">${ipnDescription} [${ipnEmotion}]<br>${ipvDescription} [${ipvEmotion}]</p>`
            greetingElement = `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik1"]}:</span> ${j[key]["inv_poz"]["pozdrav"]}</h5><hr>
            ${attrString}       
            ${restString}`
            
            restString = ""
            ionEmotion = ""
            iovEmotion = ""
            ionDescription = ""
            iovDescritpion = ""
            responseElement = ""
            
            if(typeof invocationResponse !== "undefined" && typeof invocationResponse["odgovor"] !== "undefined"){
                for(attrKey in invocationResponse){
                    if(attrKey !== "odgovor"){
                        if(attrKey.includes("ostalo")){
                            if(invocationResponse[attrKey].length >2 )
                                restString += ` | ${invocationResponse[attrKey]}`
                        }
                        else{
                            if(attrKey === "emocija_ion")
                                ionEmotion = invocationResponse[attrKey]
                            else if(attrKey === "emocija_iov")
                                iovEmotion = invocationResponse[attrKey]
                            else if(attrKey === "opis_ion")
                                ionDescription = invocationResponse[attrKey]
                            else if(attrKey === "opis_iov")
                                iovDescritpion = invocationResponse[attrKey]
                        }
                    }
                }
                if (restString !== ""){
                    restString = rest + restString + "</p>"
                }
                if(iovDescritpion === "0" || iovDescritpion === "")
                    iovDescritpion = "Nepoznato"
                if(ionDescription === "0" || ionDescription === "")
                    ionDescription = "Nepoznato"
                if(ionEmotion === "" || ionEmotion === "0")
                    ionEmotion = "Nepoznato"
                if(iovEmotion === "" ||iovEmotion === "0")
                    iovEmotion = "Nepoznato"
                
                attrString = `<p class="card-text">${ionDescription} [${ionEmotion}]<br>${iovDescritpion} [${iovEmotion}]</p>`
                responseElement =  `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik2"]}:</span> ${j[key]["inv_odz"]["odgovor"]}</h5><hr>
                ${attrString}
                ${restString}`
            }
            
            if(typeof j[key]["autor_upisa"] === 'undefined')
                autor_upisa = "Nepoznato"
            else 
                autor_upisa = j[key]["autor_upisa"]
            
            htmlString += `
                    <div class="card-body" id="invocation">
                        ${greetingElement}
                        ${responseElement}
                        <small >INVOKACIJA | ${j[key]["prostor"]} | ${j[key]["datum"]} | ${j[key]["vrijeme"]}</small>
                        <div class="card-footer">
                            <small >Autor: ${autor_upisa}</small>
                        </div>
                    </div>`
        }
    }
    else{
        console.log("1")
    }
    return htmlString
}

function addExvocations(j, key){
    
    const exvocationGreeting = j[key]["exv_poz"]
    const exvocationResponse = j[key]["exv_odz"]
    htmlString = ""
    if(typeof exvocationGreeting !== 'undefined' && typeof exvocationGreeting["pozdrav"] !== 'undefined'){
        attrString = ""
        restString = ""
        rest = '<p class="card-text"><span>ostalo</span>'
        ipnEmotion = ""
        ipvEmotion = ""
        ipnDescription = ""
        ipvDescription = ""

            attrString = ""
            restString = ""
            rest = '<p class="card-text"><span>ostalo</span>'

            ipnEmotion = ""
            ipvEmotion = ""
            ipnDescription = ""
            ipvDescription = ""

            for(attrKey in exvocationGreeting){
                if(attrKey !== "pozdrav"){
                    if(attrKey.includes("ostalo")){
                        if(exvocationGreeting[attrKey].length >2 )
                            restString += ` | ${exvocationGreeting[attrKey]}`
                    }
                    else{
                        if(attrKey === "emocija_epn")
                            ipnEmotion = exvocationGreeting[attrKey]
                        else if(attrKey === "emocija_epv")
                            ipvEmotion = exvocationGreeting[attrKey]
                        else if(attrKey === "opis_epv")
                            ipvDescription = exvocationGreeting[attrKey]
                        else if(attrKey === "opis_epn")
                            ipnDescription = exvocationGreeting[attrKey]
                    }
                }
            }
            if (restString !== ""){
                restString = rest + restString + "</p>"
            }
            if(ipnDescription === "0" || ipnDescription === "")
                ipnDescription = "Nepoznato"
            if(ipvDescription === "0" || ipvDescription === "" )
                ipvDescription = "Nepoznato"
            if(ipnEmotion === "" || ipnEmotion === "0")
                ipnEmotion = "Nepoznato"
            if(ipvEmotion === "" || ipvEmotion === "0")
                ipvEmotion = "Nepoznato"

            attrString = `<p class="card-text">${ipnDescription} [${ipnEmotion}]<br>${ipvDescription} [${ipvEmotion}]</p>`
            if(typeof j[key]["zamjena_sudionika"] !== 'undefined' && j[key]["zamjena_sudionika"] === "da")
                greetingElement = `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik2"]}:</span> ${j[key]["exv_poz"]["pozdrav"]}</h5><hr>
                ${attrString}       
                ${restString}`
            
            else               
                greetingElement = `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik1"]}:</span> ${j[key]["exv_poz"]["pozdrav"]}</h5><hr>
                ${attrString}       
                ${restString}`
            
            restString = ""
            ionEmotion = ""
            iovEmotion = ""
            ionDescription = ""
            iovDescritpion = ""
            responseElement = ""
            
            if(typeof exvocationResponse !== "undefined" && typeof exvocationResponse["odgovor"] !== "undefined"){
                for(attrKey in exvocationResponse){
                    if(attrKey !== "odgovor"){
                        if(attrKey.includes("ostalo")){
                            if(exvocationResponse[attrKey].length >2 )
                                restString += ` | ${exvocationResponse[attrKey]}`
                        }
                        else{
                            if(attrKey === "emocija_eon")
                                ionEmotion = exvocationResponse[attrKey]
                            else if(attrKey === "emocija_eov")
                                iovEmotion = exvocationResponse[attrKey]
                            else if(attrKey === "opis_eon")
                                ionDescription = exvocationResponse[attrKey]
                            else if(attrKey === "opis_eov")
                                iovDescritpion = exvocationResponse[attrKey]
                        }
                    }
                }
                if (restString !== ""){
                    restString = rest + restString + "</p>"
                }
                if(iovDescritpion === "0" || iovDescritpion === "")
                    iovDescritpion = "Nepoznato"
                if(ionDescription === "0" || ionDescription === "")
                    ionDescription = "Nepoznato"
                if(ionEmotion === "" || ionEmotion === "0")
                    ionEmotion = "Nepoznato"
                if(iovEmotion === "" ||iovEmotion === "0")
                    iovEmotion = "Nepoznato"
                
                attrString = `<p class="card-text">${ionDescription} [${ionEmotion}]<br>${iovDescritpion} [${iovEmotion}]</p>`

                if(typeof j[key]["zamjena_sudionika"] !== 'undefined' && j[key]["zamjena_sudionika"] === "da")
                    responseElement =  `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik1"]}:</span> ${j[key]["exv_odz"]["odgovor"]}</h5><hr>
                    ${attrString}
                    ${restString}`
                else 
                    responseElement =  `<h5 class="card-title"><span class='notbold'>${j[key]["sudionik2"]}:</span> ${j[key]["exv_odz"]["odgovor"]}</h5><hr>
                    ${attrString}
                    ${restString}`
            }
            if(typeof j[key]["autor_upisa"] === 'undefined')
                autor_upisa = "Nepoznato"
            else 
                autor_upisa = j[key]["autor_upisa"]
        
            
            htmlString += `
                    <div class="card-body" id="exvocation">
                        ${greetingElement}
                        ${responseElement}
                        <small >EKSVOKACIJA | ${j[key]["prostor"]} | ${j[key]["datum"]} | ${j[key]["vrijeme"]}</small>
                        <div class="card-footer">
                            <small >Autor: ${autor_upisa}</small>
                        </div>
                    </div>`
    }
    return htmlString
}

let usedKeys = []

function addListeners(key){
    $(`#${key}`).on('click', function(){

        if($(`#${key}-small`).css("display") === "none"){
            $(`#${key}-small`).css("display", "block")
            $(`#${key}-large`).css("display", "none")
        }
        
        else{
            $(`#${key}-large`).css("display", "block")
            $(`#${key}-small`).css("display", "none")
        }
    })
}

const ATTRS = ["opis_iov_ostalo", 
"emocija_ion", 
"prostor", 
"emocija_eon", 
"opis_eon_ostalo", 
"emocija_ipv", 
"emocija_epn", 
"opis_ion_ostalo", 
"vrijeme", 
"datum", 
"opis_eov_ostalo", 
"opis_ion", 
"situacijski_kontekst", 
"emocija_eov", 
"opis_iov", 
"opis_ipn", 
"entryID", 
"autor_upisa", 
"sudionik2", 
"zamjena_sudionika", 
"sudionik1", 
"opis_epv_ostalo", 
"opis_ipv", 
"emocija_ipn",
"opis_ipv_ostalo", 
"emocija_epv", 
"opis_eon", 
"opis_epv", 
"opis_epn", 
"opis_ipn_ostalo", 
"emocija_iov", 
"opis_epn_ostalo", 
"opis_eov"]

function search(data){
    let index = 0

    let gVerbalDescription = ""
    let gVerbalEmotion = ""
    let gNonverbalDescritpion = ""
    let gNonverbalEmotion = ""
    let rVerbalDescription = ""
    let rVerbalEmotion = ""
    let rNonverbalDescritpion = ""
    let rNonverbalEmotion =""
    let rRestString = ""
    let gRestString = ""
    for(key in data){
        const element = data[key]
        const attr = JSON.parse(element['attrs'])
        let attrs = {}
        for(key in attr){
            attrKey = attr[key][0]
            attrs[attrKey] = attr[key][1]
        }

        let author = attrs['autor_upisa']
        let type = ""
        if(typeof author === UNDEFINED)
            author = "Nepoznato"

        const isInvocation = element['invocation_match']
        const isExvocation = element['exvocation_match']

        // ovdje nadodati exv inv pozdrave u html
        if(isInvocation && isExvocation)
            type = "INVOKACIJA | EKSVOKACIJA"
        else if(isExvocation)
            type = "EKSVOKACIJA"
        else 
            type = "INVOKACIJA"

        entityId = attrs["entryID"]
        firstMatch = element["first_match"]
        let html = HTML_CARD_HEADER.replace("$$", `${entityId}-small`)
        html += `<h5 class="card-title" id="header-match">${returnBoldAttr(firstMatch).replace(":", "")}</h5><hr>`

        datum = changeUnknownValues(attrs['datum'])
        vrijeme = changeUnknownValues(attrs['vrijeme'])
        prostor = changeUnknownValues(attrs['prostor'])
        kontekst = changeUnknownValues(attrs['situacijski_kontekst'])

        const footer = `
            <small >${type} | ${prostor} | ${datum} | ${vrijeme}</small><br>
            <small >SITUACIJSKI KONTEKST: ${kontekst}</small>
            <div class="card-footer">
                <small >Autor: ${author}</small>
            </div>`
        html += footer
            
        let firstParticipant = attrs['sudionik1']
        let secondParticipant = attrs['sudionik2']

        greeting = element['inv_greeting']
        response = element['inv_response']
        invGreetingElement = `<h5 class="card-title"><span class='notbold'>${firstParticipant}:</span> ${greeting}</h5><hr>`
        invResponseElement = `<h5 class="card-title"><span class='notbold'>${secondParticipant}:</span> ${response}</h5><hr>`

        const changeParticipants = (typeof attrs['zamjena_sudionika'] !== UNDEFINED && attrs['zamjena_sudionika'].toLowerCase() === "da") ? true : false
        
        greeting = element['exv_greeting']
        response = element['exv_response']
        
        if(changeParticipants){
            tmp = firstParticipant
            firstParticipant = secondParticipant
            secondParticipant = tmp
        }

        exvGreetingElement = `<h5 class="card-title"><span class='notbold'>${firstParticipant}:</span> ${greeting}</h5><hr>`
        exvResponseElement = `<h5 class="card-title"><span class='notbold'>${secondParticipant}:</span> ${response}</h5><hr>`

        const invAttrs = {}
        const exvAttrs = {}
        for(attrKey in attrs){
            if(typeof attrKey.split("_")[1] !== UNDEFINED){
                if(attrKey.split("_")[1].includes("e"))
                    exvAttrs[attrKey] = attrs[attrKey]
                else
                    invAttrs[attrKey] = attrs[attrKey]
            }
        }

        [gVerbalDescription, 
            gVerbalEmotion, 
            gNonverbalDescritpion, 
            gNonverbalEmotion, 
            rVerbalDescription, 
            rVerbalEmotion, 
            rNonverbalDescritpion, 
            rNonverbalEmotion,      
            rRestString,
            gRestString] = returnCardAttrs(invAttrs)

        greetingHtml = returnCardAttribute(gNonverbalDescritpion, gNonverbalEmotion, gVerbalDescription, gVerbalEmotion)
        responseHtml = returnCardAttribute(rNonverbalDescritpion, rNonverbalEmotion, rVerbalDescription, rVerbalEmotion)
        greeting = invGreetingElement + greetingHtml + gRestString
        response = invResponseElement + responseHtml + rRestString
        const invocationData = `<h4>Invokacija:</h4>${greeting+response}`;
        
        [gVerbalDescription, 
            gVerbalEmotion, 
            gNonverbalDescritpion, 
            gNonverbalEmotion, 
            rVerbalDescription, 
            rVerbalEmotion, 
            rNonverbalDescritpion, 
            rNonverbalEmotion,      
            rRestString,
            gRestString] = returnCardAttrs(exvAttrs)

        greetingHtml = returnCardAttribute(gNonverbalDescritpion, gNonverbalEmotion, gVerbalDescription, gVerbalEmotion)
        responseHtml = returnCardAttribute(rNonverbalDescritpion, rNonverbalEmotion, rVerbalDescription, rVerbalEmotion)
        greeting = exvGreetingElement + greetingHtml + gRestString
        response = exvResponseElement + responseHtml + rRestString
        const exvocationData = `<h4>Eksvokacija:</h4>${greeting+response}`;

        if (index%2 === 0){
            $("#dictionary-content").append(`<div class="row" id="row_${index}"><div class="col-sm-6"><div class="card mb-3" id="${entityId}">${html}</div><div class="card-body large" id="${entityId}-large">${invocationData}${exvocationData}${footer}</div></div></div></div>`.replaceAll("Nepoznato", "[<em>Nepoznato</em>]").replaceAll("komb:", "").replaceAll("komb", ""))
            addListeners(entityId)
        }
        else{
            $(`#row_${index-1}`).append(`<div class="col-sm-6"><div class="card mb-3" id="${entityId}">${html}</div><div class="card-body large" id="${entityId}-large">${invocationData}${exvocationData}${footer}</div></div></div>`.replaceAll("Nepoznato", "[<em>Nepoznato</em>]").replaceAll("komb:", "").replaceAll("komb", ""))
            addListeners(entityId)
        }
        index += 1
    } 
    let notify = new Notification()
    if(index === 0){
          notify.addNotification({
            type: "error",
            title: "Greška",
            message: "Navedeni parametri ne postoje u riječniku!"
          });
    }
    else{
        notify.addNotification({
            type: "success",
            title: "Uspjeh",
            message: `Pronađeno je ${index} zapisa!`
        });
    }
}

function callSearchFunction(searchData, searchAttrs, searchType){
    $.ajax({
        url: "/search",
        type: 'POST',
        dataType: 'json',
        data: {search_string: searchData, search_params: JSON.stringify(searchAttrs), search_type: searchType}
    }).done((data) => {
        search(data)
    })
}
var waitForEl = function(selector, callback) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function() {
        waitForEl(selector, callback);
      }, 100);
    }
  };
  
function createNewSearch(){
    $("#dictionary-content").empty()
    $("#divider").css("display", "inline")
    const searchData = $("#main-search-input").val()
    let searchAttrs = {}
    let searchType = 1 // 1 = advanced, 0 = basic
    let activeButtons = 0
    for(button in ACTIVE_BUTTONS){
        if(ACTIVE_BUTTONS[button]){
            activeButtons += 1
            const buttonId = button.split("-button")[0]
            const inputValue = $(`#${buttonId}-input`).val()
            let attr = [buttonId]
            
            if(BASIC_ATTR_SEARCH_BUTTONS.includes(buttonId)){
                attr = DICTIONARY_BASIC_ATTRS[buttonId]
                searchType = 0
            }
                
            for(a in attr)
                searchAttrs[attr[a]] = inputValue
        }
    }
    if(activeButtons === 0 && $("#dropdownType").val() === ''){
        searchType = 0
        console.log("Kuraaac")
    }
    if(ADVANCED_SEARCH){
        searchAttrs["search_scene"] = $("#dropdownType").val()
    }
    callSearchFunction(searchData, searchAttrs, searchType)
    // koristiti ce se za iskljucivanje animacije
    waitForElm('.row').then((elm) => {
        console.log(DYX_ACTIVE)
    });
    waitForEl(".card", () =>{
        if(DYX_ACTIVE){
            $(".card").css("background-color", "var(--dyx-back-color)");
            $("h4").css("color", "var(--dyx-dim-color)");
            $("small").css("color", "var(--dyx-dim-color)");
        }
    })
}

function addButtonListener(id){
    ACTIVE_BUTTONS[id] = false
    $(`#${id}`).on('click', () =>{
        if(ACTIVE_BUTTONS[id]){
            $(`#${id}`).css("background-color", LIGHT_COLOR)
            $(`#${id}`).css("color", DARK_COLOR)
            ACTIVE_BUTTONS[id] = false
        }
        else{
            $(`#${id}`).css("background-color", DARK_COLOR)
            $(`#${id}`).css("color", LIGHT_COLOR)
            ACTIVE_BUTTONS[id] = true
        }
    })

    inputId = `${id.split("button")[0]}input`
    $(`#${inputId}`).on('keypress',function(e) {
        if(e.which === 13) {
            createNewSearch()
        }
    });
}

// Enlarges the font style of letters
$("#plus-btn").on('click', () =>{
    var current_size = $("div").css("font-size");
    $("div").css("font-size", parseInt(current_size.split("px")[0]) + 1 + "px");
    current_size = $("p").css("font-size");
    if(typeof current_size !== UNDEFINED)
        $("p").css("font-size", parseInt(current_size.split("px")[0]) + 1 + "px");
    current_size = $("button").css("font-size");
    $("button").css("font-size", parseInt(current_size.split("px")[0]) + 1 + "px");
    current_size = $("h4").css("font-size");
    if(typeof current_size !== UNDEFINED)
    $("h4").css("font-size", parseInt(current_size.split("px")[0]) + 1 + "px");
        current_size = $("h5").css("font-size");
    
    if(typeof current_size !== UNDEFINED)
        $("h5").css("font-size", parseInt(current_size.split("px")[0]) + 1 + "px");
    current_size = $("input").css("font-size");
    $("input").css("font-size", parseInt(current_size.split("px")[0]) + 1 + "px");
})
$("#minus-btn").on('click', () =>{
    var current_size = $("div").css("font-size");
    $("div").css("font-size", parseInt(current_size.split("px")[0]) - 1 + "px");
    current_size = $("p").css("font-size");
    
    if(typeof current_size !== UNDEFINED)
        $("p").css("font-size", parseInt(current_size.split("px")[0]) - 1 + "px");
    current_size = $("button").css("font-size");
    $("button").css("font-size", parseInt(current_size.split("px")[0]) - 1 + "px");
    current_size = $("h4").css("font-size");
    if(typeof current_size !== UNDEFINED)
        $("h4").css("font-size", parseInt(current_size.split("px")[0]) - 1 + "px");
    current_size = $("h5").css("font-size");
    if(typeof current_size !== UNDEFINED)
        $("h5").css("font-size", parseInt(current_size.split("px")[0]) - 1 + "px");
    current_size = $("input").css("font-size");
    $("input").css("font-size", parseInt(current_size.split("px")[0]) - 1 + "px");
})

function dyxTransform(){
    $("body").css("font-family", "dislexia");
    $("body").css("color", "var(--dyx-color)");
    $(".card").css("background-color", "var(--dyx-back-color)");
    $("button").css("background-color", "var(--dyx-back-color)");
    $("button").css("color", "var(--dyx-color)");
    $("h4").css("color", "var(--dyx-dim-color)");
    $("small").css("color", "var(--dyx-dim-color)");
    $("body").css("background-color", "var(--dyx-body-color)")
    $("input").css("background-color", "var(--dyx-body-color)")
    $("input").css("border-color", "var(--dyx-color)")

    $(".tooltip").css("background-color", "var(--dyx-body-color)")
    $(".tooltiptext").css("background-color", "var(--dyx-body-color)")
    $(".tooltip").css("color", "var(--dyx-color)")
    $(".tooltiptext").css("color", "var(--dyx-color)")
}

function revertDyx(){
    $("body").css("font-family", "Raleway");
    $("body").css("color", "var(--normal-dim-color)");
    $(".card").css("background-color", "var(--normal-back-color)");
    $("button").css("background-color", "var(--normal-back-color)");
    $("button").css("color", "var(--normal-dim-color)");
    $("h4").css("color", "var(--normal-dim-color)");
    $("small").css("color", "var(--normal-dim-color)");
    $("body").css("background-color", "var(--normal-body-color)")
    $("input").css("background-color", "var(--normal-body-color)")
    $("input").css("border-color", "var(--normal-dim-color)");

    $(".tooltip").css("background-color", "var(--normal-dim-color)");
    $(".tooltiptext").css("background-color", "var(--normal-dim-color)");
    $(".tooltip").css("color", "white");
    $(".tooltiptext").css("color", "white");
}

$("#dyx-btn").on('click', () =>{
    if(DYX_ACTIVE){
        revertDyx()
        $("#dyx-btn").text("DYX")
        DYX_ACTIVE = false
    }
    else{
        dyxTransform()
        $("#dyx-btn").text("Izvorni prikaz")
        DYX_ACTIVE = true
    }
})

$("#advanced-button").on('click', ()=>{
    for (button in ACTIVE_BUTTONS)
        ACTIVE_BUTTONS[button] = false
    
    if(ADVANCED_SEARCH){
        $("#advanced-button").css("background-color", LIGHT_COLOR)
        $("#advanced-button").css("color", DARK_COLOR)
        $("#advanced").css("display", "none")
        $("#inv-exv").css("display", "none")
        $("#basic-advanced").css("display", "inline")
        $("#advanced-button").text("Koristi napredno pretraživanje")
        ADVANCED_SEARCH = false
    }
    else{
        $("#advanced-button").text("Koristi jednostavno pretraživanje")
        $("#inv-exv").css("display", "")
        $("#advanced-button").css("background-color", DARK_COLOR)
        $("#advanced-button").css("color", LIGHT_COLOR)
        $("#inv-exv").css("display", "inline-block")
        $("#basic-advanced").css("display", "none")
        if(ADVANCED_SET){
            $("#advanced").css("display", "inline")
            ADVANCED_SEARCH = true
        }
    
        else{
            j = JSON.parse(JSON.parse(localStorage.getItem("attr")))
            index = 0
            for(key in j){
                let htmlString = ""
                if(!j[key].includes("ostalo") && !j[key].includes("entryID") ){
                    if(index%5 === 0){
                        if(index !== 0){
                            htmlString += "</div></div>"
                        }
                        htmlString += `<div class="container">
                        <div class="row" id="${index}-row">
                        <div class="input-group mb-3" id="${j[key]}-div">
                        <button class="btn btn-outline-secondary" type="button" id="${j[key]}-button-advanced">${j[key]}</button>
                        <input id="${j[key]}-input" type="text" class="form-control" placeholder="" aria-label="${j[key]}" aria-describedby="${j[key]}">
                        <span class="tooltiptext">${KEY_ADVANCED_BUTTON_DESC[j[key]]}</span>
                    </div>`
                    $("#advanced").append(htmlString)
                    index += 1
                    }
                    else{
                    htmlString += `<div class="input-group mb-3" id="${j[key]}-div">
                    <button class="btn btn-outline-secondary" type="button" id="${j[key]}-button-advanced">${j[key]}</button>
                    <input id="${j[key]}-input" type="text" class="form-control" placeholder="" aria-label="${j[key]}" aria-describedby="${j[key]}">
                    <span class="tooltiptext">${KEY_ADVANCED_BUTTON_DESC[j[key]]}</span>
                </div>`
                    $(`#${index-1}-row`).append(htmlString)
        
                    }
                    addButtonListener(`${j[key]}-button-advanced`)
                }  

            }
            htmlString = ""
            key = "ostalo"
            htmlString += `<div class="input-group mb-3" id="${key}-div">
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Odaberi tip</button>
                            <div class="dropdown-menu" aria-labelledby="dropdownType">
                                <a class="dropdown-item" id="inv-drop" href="#">Invokacija</a>
                                <a class="dropdown-item" id="exv-drop" href="#">Eksvokacija</a>
                                <a class="dropdown-item" id="inv-exv-drop" href="#">Invokacija i Eksvokacija</a>
                            </div>
                        </div>
                        <span class="tooltiptext">${KEY_ADVANCED_BUTTON_DESC["ostalo"]}</span>
                    </div>`
            $(`#${index-1}-row`).append(htmlString)
            addButtonListener("ostalo-button-advanced")
            $("#advanced").css("display", "inline")
            setDropdownListeners()
            ADVANCED_SET = true
            ADVANCED_SEARCH = true
        }
        
    }
    if(DYX_ACTIVE){
        dyxTransform()
    }

})

function setDropdownListeners(){
    $("#inv-drop").on('click', () =>{
        $('#dropdownType').text("Invokacija")
        $('#dropdownType').attr('value', 'inv')
    })
    $("#exv-drop").on('click', () =>{
        $('#dropdownType').text("Eksvokacija")
        $('#dropdownType').attr('value', 'exv')
    })
    $("#inv-exv-drop").on('click', () =>{
        $('#dropdownType').text("Invokacija i Eksvokacija")
        $('#dropdownType').attr('value', 'inv-exv')
    })
}


$("#main-search-input").on('keypress',function(e) {
    if(e.which === 13) {
        createNewSearch()
        $("#pdf-download").unbind('click')
    }
});

$("#search-button").on('click', function (){
    createNewSearch()    
    $("#pdf-download").unbind('click')
})

// $("button, a").hover(function() {
//     $(this).css("background-color", 'var(--normal-back-color)')
//     $(this).css("color", 'var(--normal-dim-color)')
//     }, function(){
//         $(this).css("background-color", 'var(--normal-back-color)')
//         $(this).css("color", 'var(--normal-dim-color)')
// });

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}