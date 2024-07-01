pipeline {
  agent { docker { image 'mcr.microsoft.com/playwright:v1.45.0-jammy' } }

  stages {
    stage('Check engine') {
      steps {
        echo 'npm install'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test --grep @space'
      }
    }
  }

  post {
    always {
      echo "always"
    }

    success {
      echo "success"
    }

    failure {
      echo "failure"
    }
  }
}