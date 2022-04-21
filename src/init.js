import { downloadLocal } from './utils/get'
import inquirer from 'inquirer'
import fs from 'fs'
import ora from 'ora'

const init = async (templateName, projectName) => {
  const isProjectExists = fs.existsSync(projectName)
  if (isProjectExists) {
    console.log(symbol.error, chalk.red('The project already exists'))
    return
  }

  inquirer
    .prompt([
      {
        name: 'description',
        message: 'Please enter the project description: '
      },
      {
        name: 'author',
        message: 'Please enter the author name: '
      }
    ])
    .then((answer) => {
      let loading = ora('downloading template ...')
      loading.start()
      downloadLocal(templateName, projectName)
        .then(() => {
          loading.succeed()
          const fileName = `${projectName}/package.json`
          const isPackageFileExists = fs.existsSync(fileName)
          if (isPackageFileExists) {
            const data = fs.readFileSync(fileName).toString()
            let json = JSON.parse(data)
            json.name = projectName
            json.author = answer.author
            json.description = answer.description
            fs.writeFileSync(
              fileName,
              JSON.stringify(json, null, '\t'),
              'utf-8'
            )
            console.log(
              symbol.success,
              chalk.green('Project initialization finished!')
            )
          }
        })
        .catch(() => {
          loading.fail()
        })
    })
}

module.exports = init
