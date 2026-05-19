pipeline {
    agent any

    stages {
        stage("Clone Repo") {
            steps {
                echo "Cloning from GitHub..."
                checkout scm
            }
        }

        stage("Docker Build") {
            steps {
                echo "Building Docker images..."
                sh "docker-compose build"
            }
        }

        stage("Docker Run") {
            steps {
                echo "Stopping old containers and starting fresh..."
                sh "docker-compose down || true"
                sh "docker-compose up -d"
            }
        }

        stage("Done") {
            steps {
                echo "============================="
                echo "App is live!"
                echo "Frontend : http://localhost:8081"
                echo "Backend  : http://localhost:5001/tasks"
                echo "============================="
            }
        }
    }

    post {
        failure { echo "Build failed. Check logs above." }
        success { echo "Pipeline completed successfully!" }
    }
}
