pipeline {
  agent { docker { image 'mcr.microsoft.com/playwright:v1.45.1-jammy' } }

  environment {
    USER_NAME = credentials("USER_NAME")
    PASSWORD = credentials("PASSWORD")
    API_KEY = credentials("API_KEY")
    BASE_TEAM_ID = credentials("BASE_TEAM_ID")

    TZ = "Europe/Warsaw"
  }

  stages {
    stage("Check engine") {
      steps {
        echo "echo npm install"
      }
    }

    stage("Install dependencies") {
      steps {
        sh "npm install"
      }
    }

    stage("Run all Playwright tests") {
      when {
        expression {
          params.TAG == "All tests"
        }
      }
      steps {
        sh "npx playwright test"
      }
    }

    stage("Run only Playwright with given tag") {
      when {
        expression {
          params.TAG != "All tests"
        }
      }
      steps {
        echo "Running tests with tag: ${params.TAG}"
        sh "npx playwright test --grep ${params.TAG}"
      }
    }
  }

  post {
    always {
      echo "Post build action triggered ALWAYS"
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: "playwright-report",
        reportFiles: "index.html",
        reportName: "Test Results Report"
      ])

      emailext(
        subject: '$DEFAULT_SUBJECT',
        body: '$DEFAULT_CONTENT',
        to: "${params.RECIPIENT}",
        mimeType: "text/html"
      )
    }

    success {
      echo "success"
    }

    failure {
      echo "failure"
    }
  }
}