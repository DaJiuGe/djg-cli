import program from 'commander'
import { VERSION } from './utils/constants'
import apply from './index'
import chalk from 'chalk'

let actionMap = {
  init: {
    alias: 'ini',
    description: 'generate a new project from a template',
    usages: ['djg init templateName projectName']
  },
  config: {
    alias: 'cfg',
    description: 'config .djgrc',
    usages: [
      'djg config set <k> <v>',
      'djg config get <k>',
      'djg config remove <k>'
    ]
  }
}

Object.keys(actionMap).forEach((action) => {
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'config':
          apply(action, ...process.argv.slice(3))
          break
        case 'init':
          apply(action, ...process.argv.slice(3))
          break
        default:
          break
      }
    })
})

function help() {
  console.log('\r\nUsage:')
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach((usage) => {
      console.log(` - ${usage}`)
    })
    console.log('\r')
  })
}
program.usage('<command> [options]')

program.on('-h', help)
program.on('--help', help)
program.version(VERSION, '-V --version').parse(process.argv)

function makeGreen(txt) {
  return chalk.green(txt)
}
if (!process.argv.slice(2).length) {
  program.outputHelp(makeGreen)
}
