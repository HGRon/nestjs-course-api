const { execSync } = require('child_process');
const env = require('./utils/env');

if (!env.AWS_PROFILE || !env.AWS_LAMBDA_NAME)
  throw new Error(
    'É necessário setar as variáveis de ambiente AWS_PROFILE e AWS_LAMBDA_NAME para realizar o deploy para a AWS.',
  );

const awsProfile = env.AWS_PROFILE;
const awsLambdaName = env.AWS_LAMBDA_NAME;
const awsRegion = env.AWS_REGION;

async function runDeploy() {
  console.log('Instalando dependências...');
  execSync('npm ci');

  console.log('Zipando arquivos...');
  execSync('serverless package');

  console.log('Enviando para a AWS...');
  execSync(`aws --profile ${ awsProfile } --region ${ awsRegion } lambda update-function-code --function-name ${ awsLambdaName } --zip-file fileb://.serverless/serveless-example.zip --publish`);
}

runDeploy();
