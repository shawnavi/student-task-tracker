pipeline {
    agent any

    tools {
        maven 'Maven-3'
    }

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Cloning from GitHub...'
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Docker Run') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }

        stage('Done') {
            steps {
                echo 'App live at http://localhost:8081'
                echo 'SonarQube at http://localhost:9000'
            }
        }
    }

    post {
        failure { echo 'Build failed. Check logs above.' }
        success { echo 'Pipeline completed successfully!' }
    }
}
