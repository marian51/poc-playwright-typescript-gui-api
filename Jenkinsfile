pipeline {
  agent { docker { image 'mcr.microsoft.com/playwright:v1.45.0-jammy' } }

  environment {
    USERNAME = credentials('USERNAME')
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