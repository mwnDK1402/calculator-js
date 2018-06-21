const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  console.log(path.resolve(rootPath))
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'calculator-js-win32-ia32/'),
    authors: 'Mathias Wagner Nielsen',
    noMsi: false,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'calculator-js.exe',
    setupExe: 'CalculatorAppInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}