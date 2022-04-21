import { version } from '../../package.json'

export const VERSION = version

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
export const RC = `${HOME}/.djgrc`

export const DEFAULTS = {
  registry: 'DaJiuGe',
  type: 'users'
}
