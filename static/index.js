
// console.log(SVG)
// console.log(dom-to-image-more)


const snippetNode = document.getElementById('snippet')
const snippetContainerNode = document.getElementById('snippet-container')
const vscode = acquireVsCodeApi()

function stripInitialIndent(html, indent) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const initialSpans = doc.querySelectorAll('div > div span:first-child')
  for (let i = 0; i < initialSpans.length; i++) {
    initialSpans[i].textContent = initialSpans[i].textContent.slice(indent)
  }
  return doc.body.innerHTML
}

window.addEventListener('message', event => {
  const message = event.data;
  if (message.type === 'update') {
    document.execCommand('paste')
  }
  if (message.type === 'updateSvg') {
    snippetNode.innerHTML = message.data
  }
});

function getSnippetBgColor(html) {
  const match = html.match(/background-color: (#[a-fA-F0-9]+)/)
  return match ? match[1] : undefined;
}

function updateEnvironment(snippetBgColor) {
  // update snippet bg color
  document.getElementById('snippet').style.backgroundColor = snippetBgColor

  // update backdrop color
  if (isDark(snippetBgColor)) {
    snippetContainerNode.style.backgroundColor = '#f2f2f2'
  } else {
    snippetContainerNode.style.background = 'none'
  }
}

function getBrightness(hexColor) {
  const rgb = parseInt(hexColor.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
function isDark(hexColor) {
  return getBrightness(hexColor) < 128
}
function getSnippetBgColor(html) {
  const match = html.match(/background-color: (#[a-fA-F0-9]+)/)
  return match ? match[1] : undefined;
}
document.addEventListener('paste', event => {
  const innerHTML = event.clipboardData.getData('text/html')

  const snippetBgColor = getSnippetBgColor(innerHTML)
  if (snippetBgColor) {
    updateEnvironment(snippetBgColor)
  }

  // const code = e.clipboardData.getData('text/plain')
  // const minIndent = getMinIndent(code)

  // if (minIndent !== 0) {
  //   snippetNode.innerHTML = stripInitialIndent(innerHTML, minIndent)
  // } else {
  snippetNode.innerHTML = innerHTML
  snippetNode.childNodes[0].childNodes[1].classList.add('oopsy')
  snippetNode.childNodes[0].childNodes[4].classList.add('popsy')
  vscode.postMessage({ type: 'highlightedText', data: snippetNode.innerHTML })
  // }

  // console.log('paste event triggered')

  const width = snippetNode.offsetWidth * 2
  const height = snippetNode.offsetHeight * 2
  const config = {
    width,
    height,
    style: {
      transform: 'scale(2)',
      'transform-origin': 'center',
      padding: 0,
      background: 'none'
    }
  }

  domtoimage.toSvg(snippetContainerNode, config).then(svg => {
    // snippetNode.style.resize = ''
    // snippetContainerNode.style.resize = ''
    // serializeBlob(blob, serializedBlob => {
    //   shoot(serializedBlob)
    // })
    // shoot(blob)
    // vscode.postMessage({ type: 'svg', data: svg })
    snippetNode.innerHTML = ''

    svg = svg.substring(svg.indexOf(',') + 1);
    const canvas = SVG(svg).addTo(snippetNode)

    var b1 = document.getElementsByClassName('oopsy')[0].getBoundingClientRect();
    var b2 = document.getElementsByClassName('popsy')[0].getBoundingClientRect();
    canvas.line(b1.left + b1.width / 2, b1.top + b1.height / 2, b2.left + b2.width / 2, b2.top + b2.height / 2).stroke({ width: 1, color: '#f06' })

    // const rect = canvas.rect(100, 100).attr({ fill: '#f06' })
    // snippetNode.innerHTML = svg
    // newElement = document.createElement('div')
    // newElement.innerHTML = `<line stroke= "#bada55" stroke-width= "2" stroke-linecap= "round" x1= "70" y1= "80" x2= "250" y2= "150"></line>`
    // snippetNode.push(newElement)
  })

});