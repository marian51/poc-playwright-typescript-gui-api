pipeline {
  agent any

  environment {
    USER_NAME = credentials('USER_NAME')
    PASSWORD = credentials('PASSWORD')
    API_KEY = credentials('API_KEY')
    BASE_TEAM_ID = credentials('BASE_TEAM_ID')
  }

  stages {
    stage('Check engine') {
      steps {
        echo 'echo npm install'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
        sh 'npx playwright install'
        sh 'npx playwright install-deps'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test --grep @e2e'
      }
    }
  }

  post {
    always {
      echo "Post build action triggered ALWAYS"
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: false,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Test Results Report'
      ])
    }

    success {
      echo "success"
    }

    failure {
      echo "failure"
    }
  }
}