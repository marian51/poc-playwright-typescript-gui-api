pipeline {
  agent { docker { image 'mcr.microsoft.com/playwright:v1.45.0-jammy' } }

  environment {
    USER_NAME = credentials('USER_NAME')
    PASSWORD = credentials('PASSWORD')
    API_KEY = credentials('API_KEY')
    BASE_TEAM_ID = credentials('BASE_TEAM_ID')
  }

  stages {
    stage('Check engine') {
      steps {
        echo 'npm install'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
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