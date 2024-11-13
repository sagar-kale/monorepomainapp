const { execSync } = require('child_process');
const inquirer = require('inquirer');
const path = require('path');

const packages = ['app', 'app1']; // Replace with your actual package names

const prompt = inquirer.createPromptModule();

  prompt([
    {
      type: 'list',
      name: 'package',
      message: 'Which package would you like to start?',
      choices: packages,
    },
  ])
  .then(answer => {
    const selectedPackage = answer.package;
    const packagePath = path.resolve(__dirname, `./packages/${selectedPackage}`);

    // Run Modular start command or Webpack serve as needed
    try {
      console.log(`Starting ${selectedPackage} using Webpack from this path ${packagePath}...`);
      execSync(`cd ${packagePath} && webpack serve --config ../../webpack.config.js --mode development`, {
        stdio: 'inherit',
      });
    } catch (error) {
      console.error('Failed to start the package:', error);
    }
  });
