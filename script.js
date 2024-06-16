let button = document.getElementById('btn')
let overlay = document.querySelector('.overlay')
let removeIcon = document.getElementById('removeIcon')
let websiteName = document.getElementById('websiteName')
let form = document.getElementById('resourceForm')
let websiteURL = document.getElementById('websiteURL')
let websiteDescription = document.getElementById('websiteDescription')
let resourceSection = document.querySelector('.resource-container')

let resources = []

function applyContent () {
    resourceSection.innerText = ''

    resources.forEach((arrayResources) => {
        let applySiteName = arrayResources.siteName
        let applySiteLink = arrayResources.siteLink
        let applySiteDescription = arrayResources.siteDescription

        let resourceDiv = document.createElement('div')
        resourceDiv.classList.add('resource')

        let websiteNameDiv = document.createElement('div')
        websiteNameDiv.classList.add('website-name')
        
        let websitenamecontent = document.createElement('a')
        websitenamecontent.setAttribute('href', `${applySiteLink}`)
        websitenamecontent.setAttribute('target', '_blank')
        websitenamecontent.innerText = applySiteName

        let trash = document.createElement('i')
        trash.classList.add('bx', 'bxs-trash')
        trash.setAttribute(`onclick`, `deleteResource('${applySiteLink}')`)

        let websitedescription = document.createElement('div')
        websitedescription.classList.add('website-description')

        let paragraph = document.createElement('p')
        paragraph.innerText = applySiteDescription

        websitedescription.append(paragraph)
        websiteNameDiv.append(websitenamecontent, trash)

        resourceDiv.append(websiteNameDiv, websitedescription)
        resourceSection.append(resourceDiv)
    })
}

function deleteResource (applySiteLink) {
    resources.forEach(function (item, index) {
        if (item.siteLink === applySiteLink) {
            resources.splice(index, 1)
        }
    })
    localStorage.setItem('resources', JSON.stringify(resources))
    fetchResources()
}


function fetchResources () {
    if (localStorage.getItem('resources')) {
        resources = JSON.parse(localStorage.getItem('resources'))
    }
    applyContent()
}
fetchResources()

function revealOverlay () {
    overlay.classList.remove('overlay')
    overlay.classList.add('overlay-visible')
    websiteName.focus()
}

function closeOverlay () {
    if(overlay.classList.contains('overlay-visible')) {
        overlay.classList.remove('overlay-visible')
        overlay.classList.add('overlay')
    }
}


removeIcon.addEventListener('click', closeOverlay)
button.addEventListener('click', revealOverlay)


form.addEventListener('submit', validateForm)

function validateForm (event) {
    event.preventDefault()
    let website = websiteName.value
    let websitelink = websiteURL.value
    let description = websiteDescription.value

    if(websiteName.value === '') {
        websiteName.style.border = '2px solid red'
    }
    if(websiteURL.value === '') {
        websiteURL.style.border = '2px solid red'
    }
    if(websiteDescription.value === '') {
        websiteDescription.style.border = '2px solid red'
    }

    const createdResource = {
        siteName : website,
        siteLink : websitelink,
        siteDescription : description
    }

    resources.push(createdResource)
    localStorage.setItem('resources', JSON.stringify(resources))

    form.reset()
    closeOverlay()
    fetchResources()

}
