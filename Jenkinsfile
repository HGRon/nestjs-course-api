pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        git 'https://github.com/HGRon/api-integration.git'
        bat 'npm install'
      }
    }
    stage('Build') {
      steps {
        bat 'npm run build'
        bat 'npm run test:cov'
        //bat 'docker system prune -a --volumes -f'
        bat 'docker build . --tag integration/integration-prod'
      }
    }
    stage('Deploy') {
      steps {
        timeout(time: 15, unit: "MINUTES") {
            input message: 'Aprovar o deploy?', ok: 'Sim'
        }

        echo "Iniciando deploy"
        //bat 'npm run deploy:aws'
        bat 'docker run -d integration/integration-prod'
      }
    }
  }

}