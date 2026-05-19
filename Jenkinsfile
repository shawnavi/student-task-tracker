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
                    withEnv(["PATH+=SONAR=/Users/shawn/.jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarScanner/bin"]) {
                        sh """
                            sonar-scanner \
                            -Dsonar.projectKey=student-task-tracker \
                            -Dsonar.projectName=student-task-tracker \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=**/node_modules/**
                        """
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
