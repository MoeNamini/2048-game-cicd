# 2048 Game CI/CD Pipeline


> **Live Demo**: Fully automated deployment pipeline that builds, tests, and deploys a containerized web application to AWS serverless infrastructure with zero manual intervention.

![AWS](https://img.shields.io/badge/AWS-ECS_Fargate-orange) ![Docker](https://img.shields.io/badge/Docker-Containerized-blue) ![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-green) ![Status](https://img.shields.io/badge/Status-Production_Ready-success)

---

## Project Overview

This project demonstrates a complete **DevOps CI/CD pipeline** for deploying a containerized web application (2048 game) on AWS serverless infrastructure. Every code commit automatically triggers a build, containerization, and deployment process—showcasing modern software delivery practices used by leading tech organizations.

**Business Value**: Reduces deployment time from hours to minutes, eliminates human error, and enables rapid iteration cycles critical for competitive software delivery.

---

## Key Skills Demonstrated

This project showcases technical proficiency essential for **IT Project Management** and **DevOps collaboration**:

| Skill Area | Technologies & Practices |
|-----------|-------------------------|
| **Cloud Infrastructure** | AWS ECS (Fargate), ECR, VPC, Security Groups, IAM |
| **CI/CD Pipeline Design** | AWS CodePipeline, CodeBuild, Automated Deployments |
| **Containerization** | Docker, Container Registries, Image Management |
| **Infrastructure as Code** | YAML configuration, Build specifications, Task definitions |
| **Security & Compliance** | IAM roles, Least-privilege access, Secure credential management |
| **Version Control** | Git, GitHub, Branching strategies |
| **Monitoring & Operations** | CloudWatch Logs, Health checks, Cost optimization |
| **DevOps Methodology** | Automated testing, Continuous deployment, Rollback strategies |

**PM-Specific Value**: Demonstrates ability to understand technical architecture, communicate with engineering teams, manage cloud resources, and make informed decisions about infrastructure and deployment strategies.

---

## Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐
│   GitHub    │────▶ │  CodePipeline    │────▶ │  CodeBuild  │
│ (Source)    │      │ (Orchestration)   │      │  (Build)    │
└─────────────┘      └──────────────────┘      └─────────────┘
                              │                        │
                              │                        ▼
                              │                 ┌─────────────┐
                              │                 │     ECR     │
                              │                 │(Image Store)│
                              │                 └─────────────┘
                              │                        │
                              ▼                        │
                     ┌──────────────────┐              │
                     │   ECS Fargate    │◀────────────┘
                     │  (Deployment)    │
                     └──────────────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  Public Internet │
                     │   (End Users)    │
                     └──────────────────┘
```

### Component Breakdown

1. **GitHub Repository**: Stores application source code, Dockerfile, and build specifications
2. **AWS CodePipeline**: Orchestrates the entire CI/CD workflow automatically on code commits
3. **AWS CodeBuild**: Builds Docker container image from source code and buildspec.yml instructions
4. **Amazon ECR**: Secure container registry storing versioned Docker images
5. **Amazon ECS (Fargate)**: Serverless container orchestration - runs containers without managing servers
6. **IAM Roles**: Fine-grained security permissions enabling service-to-service authentication

### Workflow Automation

```
Developer Push → GitHub Webhook → Pipeline Triggered → Build Docker Image → 
Push to ECR → Deploy to ECS → Update Running Containers → Application Live
```

**Time to Production**: ~3-5 minutes from code commit to live deployment.

---

## Key Features

-  **Fully Automated Deployment**: Zero manual steps from code to production
-  **Containerized Application**: Consistent environments across development and production
-  **Serverless Infrastructure**: No server management, automatic scaling with Fargate
-  **Version Control Integration**: Every deployment tied to specific Git commit
-  **Rollback Capability**: Quick rollback to previous versions if needed
-  **Cost Optimized**: Serverless architecture minimizes costs (~$1-3 for entire project)
-  **Production Ready**: Implements industry-standard DevOps practices

---

## Project Structure

```
2048-game-cicd/
├── Dockerfile              # Container build instructions
├── buildspec.yml           # CodeBuild automation script
├── index.html             # Game application (HTML)
├── style.css              # Styling
├── game.js                # Game logic (JavaScript)
└── README.md              # This file
```

---

## Technologies Used

### AWS Services
- **Amazon ECS (Fargate)**: Serverless container orchestration
- **Amazon ECR**: Container image registry
- **AWS CodePipeline**: CI/CD orchestration
- **AWS CodeBuild**: Automated build service
- **IAM**: Identity and access management
- **VPC & Security Groups**: Network security

### Development Tools
- **Docker**: Application containerization
- **Git/GitHub**: Version control and source code management
- **YAML**: Configuration as code
- **nginx**: Web server (container base image)

---

## Cost Breakdown

This project was designed with AWS Free Tier in mind:

 Service | Monthly Cost | Notes 

 **ECS Fargate** | ~$15/month | $0.04048/hour × 1 task × 730 hours (reduces to ~$0.50/day when testing) 
 **ECR Storage** | $0 | Under 500MB (Free Tier) 
 **CodeBuild** | $0 | 100 build minutes/month free 
 **CodePipeline** | $0 | 1 pipeline/month free 
 **Data Transfer** | $0 | Minimal usage under Free Tier limits 
 **CloudWatch Logs** | $0 | Under 5GB (Free Tier) 

**Total Project Cost**: ~$1-3 (for limited testing duration)  
**Production Monthly Cost**: ~$15/month (if running 24/7)

**Cost Optimization Strategy**: Stop ECS service when not in use to minimize charges.

---

##  Pipeline Stages

### Source Stage
- **Trigger**: Git push to main branch
- **Action**: CodePipeline retrieves latest code from GitHub
- **Output**: Source code artifact

### Build Stage
- **Tool**: AWS CodeBuild
- **Actions**:
  - Authenticate with ECR
  - Build Docker image from Dockerfile
  - Tag image with commit hash
  - Push image to ECR repository
- **Output**: Docker image in ECR + imagedefinitions.json

### Deploy Stage
- **Tool**: Amazon ECS
- **Actions**:
  - Pull latest image from ECR
  - Update task definition
  - Deploy new containers
  - Perform rolling update (zero downtime)
- **Output**: Live application on public IP

---

## Security Implementation

### IAM Roles & Least Privilege Access
- **CodeBuild Role**: ECR push permissions only
- **CodePipeline Role**: Service orchestration permissions only  
- **ECS Task Execution Role**: ECR pull and CloudWatch logs permissions only

### Network Security
- **Security Group**: Restricted to HTTP (port 80) only
- **VPC Isolation**: Application runs in isolated network environment
- **No SSH Access**: Serverless architecture eliminates SSH attack surface

### Credentials Management
- No hardcoded credentials in source code
- AWS IAM role-based authentication
- GitHub connection uses tokens (not stored in repository)

---

## What This Demonstrates

### For IT Project Managers
1. **Technical Literacy**: Understanding of cloud infrastructure and DevOps tooling
2. **Process Automation**: Identifying manual processes that can be automated
3. **Cost Management**: Architecting solutions with budget constraints
4. **Risk Mitigation**: Implementing rollback strategies and zero-downtime deployments
5. **Stakeholder Communication**: Ability to explain technical architecture to non-technical stakeholders

### For DevOps Collaboration
1. **Pipeline Design**: Understanding CI/CD workflows and stage dependencies
2. **Containerization**: Knowledge of Docker and container orchestration
3. **Cloud Services**: Practical experience with AWS ecosystem
4. **Infrastructure as Code**: Configuration management through code
5. **Monitoring**: Implementation of logging and observability

---

##  Lessons Learned

### Technical Challenges Solved
- **Docker Privilege Mode**: Required for CodeBuild to execute Docker commands
- **ECS Public IP Assignment**: Essential for accessing containerized application
- **Security Group Configuration**: Proper inbound rules for HTTP traffic
- **IAM Role Permissions**: Precise permissions needed for each service

### Best Practices Implemented
- **Immutable Infrastructure**: Every deployment creates new containers
- **Version Control**: Every change tracked via Git commits
- **Automated Testing**: Build process validates code before deployment
- **Documentation**: Comprehensive architecture and process documentation

---

##  How to Deploy This Project

### Prerequisites
- AWS Free Tier account
- GitHub account

### Deployment Steps
1. Fork/Clone this repository
2. Create required IAM roles (CodeBuild, CodePipeline, ECS Task Execution)
3. Set up ECR repository
4. Create ECS Cluster and Task Definition
5. Configure CodeBuild project with environment variables
6. Create CodePipeline connecting GitHub → Build → Deploy
7. Push code to trigger automatic deployment

**Detailed Instructions**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) (if you create one)

---

##  Live Demo

Once deployed, the application is accessible via:
```
http://<ECS-Task-Public-IP>
```

**Game Instructions**: Use arrow keys to move tiles. Combine matching numbers to reach 2048!

---

##  Cleanup Instructions

To avoid ongoing AWS charges:

```bash
# Stop ECS service
aws ecs update-service --cluster 2048-game-cluster --service 2048-game-service --desired-count 0

# Delete resources (or use AWS Console)
# - CodePipeline
# - CodeBuild Project
# - ECS Service & Cluster
# - ECR Repository
# - IAM Roles
# - Security Groups
```