pipeline {
    agent any

    stages {
        stage("Clone Repo") {
            steps {
                echo "Cloning from GitHub..."
                checkout scm
            }
        }

        stage("SonarQube Analysis") {
            steps {
                withSonarQubeEnv("SonarQube") {
                    script {
                        def scannerHome = tool "SonarScanner"
                        sh ""${scannerHome}/bin/sonar-scanner" -Dsonar.projectKey=student-task-tracker -Dsonar.projectName="Student Task Tracker" -Dsonar.sources=. -Dsonar.exclusions=**/node_modules/**"
                    }
                }
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
                sh "docker-compose down || true"
                sh "docker-compose up -d"
            }
        }

        stage("Done") {
            steps {
                echo "============================="
                echo "App live at http://localhost:8081"
                echo "SonarQube at http://localhost:9000"
                echo "============================="
            }
        }
    }

    post {
        failure { echo "Build failed. Check logs above." }
        success { echo "Pipeline completed successfully!" }
    }
}
