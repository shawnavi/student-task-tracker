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

        stage('Build Backend') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Frontend is static HTML/CSS/JS - no build step needed.'
                dir('frontend') {
                    sh 'ls -la'
                }
            }
        }

        stage('Dependency Check') {
            steps {
                echo 'Running dependency audit...'
                dir('backend') {
                    sh 'npm audit --audit-level=moderate || true'
                }
            }
        }

        stage('Security Check - SonarQube') {
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
                echo 'Building Docker images...'
                sh 'docker-compose build'
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Starting containers...'
                sh 'docker rm -f task-backend task-frontend || true'
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
