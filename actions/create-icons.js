const { execSync } = require('child_process')
const fs = require('fs')

const toPascalCase = (string) =>
    string
        .match(/[a-z]+/gi)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
        )
        .join('')

console.log('Ready to generate RN icon fonts ⏰')

execSync(`npx fantasticon ../src/assets/svg -o ../src/assets/fonts -t ttf`)

const glyphMap = JSON.parse(fs.readFileSync('../src/assets/fonts/icons.json'))

const indexLines = [
    "import React from 'react';",
    "import Icon from './icon-native';",
    '',
]
indexLines.push(
    ...Object.keys(glyphMap).map(
        (iconKey) =>
            `export const ${toPascalCase(
                iconKey,
            )} = props => <Icon {...props} style={{ lineHeight: props.size }} name="${iconKey}" />;`,
    ),
)

fs.writeFileSync('../src/components/Icon/index.js', indexLines.join('\n'))

console.log('Font map created 🎉')
