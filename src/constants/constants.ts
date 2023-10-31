 const colorsArr = ['white','blue','red','green','brown','yellow','bisque', 'crimson', 'cyan', 'blueviolet', 'darksalmon', 'darkred','cadetblue','navy', 'magenta', 'Crimson', 'DarkOliveGreen','DarkSlateGray', 'PaleGreen', 'PeachPuff','RoyalBlue','Teal'    ]






export const colorGenerate = () => {
    const color = Math.floor(Math.random() * colorsArr.length)

return colorsArr[color]
}