import { RC, DEFAULTS } from './constants'
import { decode, encode } from 'ini'
import fs from 'fs'
import chalk from 'chalk'
import { promisify } from 'util'

const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

export const get = async (key) => {
  const isExists = await exists(RC)
  if (isExists) {
    let opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    return opts[key]
  }

  return ''
}

export const getAll = async () => {
  const isExists = await exists(RC)
  if (isExists) {
    let opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    return opts
  }

  console.log(DEFAULTS)
  return DEFAULTS
}

export const set = async (key, value) => {
  const isExists = await exists(RC)
  let opts
  if (isExists) {
    opts = await readFile(RC, 'utf8')
    opts = decode(opts)

    if (!key) {
      console.log(
        chalk.red(chalk.bold('Error: ')),
        chalk.red('key is required')
      )
      return
    }

    if (!value) {
      console.log(
        chalk.red(chalk.bold('Error: ')),
        chalk.red('value is required')
      )
      return
    }
    opts = Object.assign(opts, { [key]: value })
  } else {
    opts = Object.assign(DEFAULTS, { [key]: value })
  }

  await writeFile(RC, encode(opts), 'utf8')
}

export const remove = async (key) => {
  const isExists = await exists(RC)
  if (isExists) {
    let opts = await readFile(RC, 'utf8')
    opts = decode(opts)
    delete opts[key]
    await writeFile(RC, encode(opts), 'utf8')
  }
}
