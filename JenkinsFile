pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/saminaik/SPE-Major-Front-End.git', branch: 'main',
                credentialsId: 'githubID'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t saminaik/spe_front-end:latest .'
            }
        }

        stage('Image Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub_id', usernameVariable: 'docker_username', passwordVariable: 'docker_password')]) {
                    sh "echo $docker_password | docker login --username $docker_username --password-stdin"
                    sh "docker push saminaik/spe_front-end:latest"
                }
            }
        }

        stage('Ansible Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub_id', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    ansiblePlaybook(
                        installation: 'Ansible',
                        inventory: 'inventory',
                        playbook: 'ansible-playbook.yml',
                        colorized: true,
                        disableHostKeyChecking: true,
                        extraVars: [
                            'jenkins_credentials_username': "${DOCKERHUB_USERNAME}",
                            'jenkins_credentials_password': "${DOCKERHUB_PASSWORD}"
                        ]
                    )
                }
            }
        }
    }
}

