import { Command } from 'commander';

const program = new Command();

program
  .name('page-loader')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0', 'V', '--version', 'output the version number')
  

program.parse();