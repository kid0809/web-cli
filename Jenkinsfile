pipeline {
  agent {
    docker {
      image 'http://harbor.caih.local/caihcloud/node:12.22.7'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

  }
}