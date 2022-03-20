const fs = require('fs')
const { registerFont, createCanvas, loadImage } = require('canvas')

registerFont('./assets/MadHacker.ttf', { family: 'MadHacker' })

module.exports.generateImage  = async function(count) {
    
    if(!count) count='';
    const width = 1500
    const height = 500

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    // Background Setting
    context.fillStyle = '#000'
    context.fillRect(0, 0, width, height)

    // Heading Settings 
    context.font = '70pt "MadHacker"'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillStyle = '#3574d4'

    const text = 'HI I AM silentlad'

    const headingPos = {
        top: 170,
        left: 750
    }
    const textWidth = context.measureText(text).width
    context.fillRect(headingPos.left - textWidth / 2 - 10, headingPos.top - 5, textWidth + 20, 120)
    context.fillStyle = '#fff'
    context.fillText(text, headingPos.left, headingPos.top)

    // Subheading Setting 
    const subHeadingPos = {
        top: 300,
        left: 750
    }
    context.fillStyle = '#fff'
    context.font = 'bold 20pt Menlo'
    context.fillText(`${count} strong`, subHeadingPos.left, subHeadingPos.top)

    // Footer Settings
    context.fillStyle = '#fff'
    context.font = 'bold 20pt Menlo'
    context.fillText(`silentlad.com`, 750, 375)

    // Logo image loading and Image generation 
    const logo = {
        top: 100,
        left: 100
    }
    const image = await loadImage('./assets/logo.jpg').then
        // context.drawImage(image, logo.left, logo.top, 300, 300)
    const buffer = canvas.toBuffer('image/png')
    await fs.writeFileSync('./test.png', buffer)
    return 
}
