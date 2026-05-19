pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Cloning repository...'
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
                echo 'Frontend is static — no build step needed.'
                dir('frontend') {
                    sh 'ls -la'
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
                sh 'docker-compose up -d'
            }
        }

        stage('Done') {
            steps {
                echo 'App is running!'
                echo 'Frontend: http://localhost:8081'
                echo 'Backend API: http://localhost:5000/tasks'
            }
        }
    }

    post {
        failure {
            echo 'Build failed. Check the logs above.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}
