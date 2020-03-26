let style = document.getElementsByTagName('style')[0]

document.getElementsByClassName('center')[0].innerHTML = style.innerText
.replace(/\;/g, ';<br>&nbsp;&nbsp;')
.replace(/\{/g, '{<br>&nbsp;&nbsp;')
.replace(/(&nbsp;)*\s*\}/g, '}<br>')