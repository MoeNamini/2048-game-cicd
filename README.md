---
type: Page
title: 2048-Game-CIDI README.md
aliases: null
description: null
icon: null
createdAt: '2026-02-14T13:59:55.065Z'
creationDate: 2026-02-14 14:59
modificationDate: 2026-02-15 10:07
tags: []
coverImage: null
---

# Complete README.md for V4.5

## 2048 Game - Full-Stack CI/CD Pipeline with Blue/Green Deployment

[AWS](https://img.shields.io/badge/AWS-ECS_Fargate-orange) [Docker](https://img.shields.io/badge/Docker-Containerized-blue) [CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-green) [Testing](https://img.shields.io/badge/Testing-Automated-yellow) [Status](https://img.shields.io/badge/Status-Production_Ready-success)

---

## Project Overview

This project demonstrates a **complete enterprise-grade DevOps CI/CD pipeline** for deploying a full-stack containerized web application on AWS serverless infrastructure. The implementation showcases modern software delivery practices including automated testing, Blue/Green deployments, backend API integration, and comprehensive monitoring—all practices used by leading tech organizations.

#### **Business Value**

Reduces deployment time from hours to minutes, eliminates human error through automation, enables rapid iteration cycles, provides zero-downtime deployments, and implements production-grade observability—all critical for competitive software delivery in enterprise environments.

---

## Key Skills Demonstrated

This project showcases comprehensive technical proficiency essential for **IT Project Management** and **DevOps collaboration**:

| Skill Area                  | Technologies & Practices                                                               |
| :-------------------------- | :------------------------------------------------------------------------------------- |
| **Cloud Infrastructure**    | AWS ECS (Fargate), ECR, VPC, Security Groups, IAM, Lambda, API Gateway, DynamoDB, ALB  |
| **CI/CD Pipeline Design**   | AWS CodePipeline, CodeBuild, GitHub Actions, Automated Testing, Blue/Green Deployments |
| **Containerization**        | Docker, Container Registries, Image Management, Multi-stage Builds                     |
| **Infrastructure as Code**  | YAML configuration, Build specifications, Task definitions, CloudFormation concepts    |
| **Backend Development**     | RESTful API, Lambda Functions, Database Design, API Gateway Integration                |
| **Security & Compliance**   | IAM roles, Least-privilege access, Secure credential management, Input validation      |
| **Version Control**         | Git, GitHub, Branching strategies, Pull requests, Code reviews                         |
| **Monitoring & Operations** | CloudWatch Logs, CloudWatch Alarms, Metrics, Dashboards, Performance monitoring        |
| **DevOps Methodology**      | Automated testing, Continuous deployment, Rollback strategies, Blue/Green deployments  |
| **Quality Assurance**       | Automated testing, Pre-commit validation, Build-time verification, Health checks       |
| **Frontend Development**    | Responsive design, Theme system, localStorage API, Web Share API                       |
| **Cost Management**         | Cost analysis, Resource optimization, Budget-conscious architecture decisions          |

### **PM-Specific Value**: Demonstrates ability to:

- Understand and communicate complex technical architecture

- Make informed infrastructure and deployment decisions

- Manage cloud resources with cost optimization in mind

- Understand full Software Development Life Cycle (SDLC)

- Bridge communication between technical and non-technical stakeholders

- Evaluate trade-offs between features, costs, and business requirements

- Implement risk mitigation through automated rollback strategies

- Document technical decisions for stakeholder review

---

## What This Project Demonstrates

### For IT Project Managers

1. **Technical Literacy**: Deep understanding of cloud infrastructure, CI/CD pipelines, and modern DevOps tooling

2. **Process Automation**: Identification and implementation of automated workflows to eliminate manual errors

3. **Cost Management**: Architecture design with budget constraints and optimization strategies

4. **Risk Mitigation**: Implementation of rollback strategies, automated testing, and Blue/Green deployments for zero-downtime releases

5. **Stakeholder Communication**: Ability to explain technical architecture through documentation and diagrams

6. **Quality Assurance**: Integration of automated testing at multiple pipeline stages

7. **Monitoring & Observability**: Proactive alerting and performance monitoring implementation

8. **Trade-off Analysis**: Decision-making between feature complexity, infrastructure costs, and business value

9. **Documentation**: Comprehensive technical documentation for team collaboration and knowledge transfer

10. **Agile Practices**: Iterative development, continuous improvement, and rapid feature delivery

### For DevOps Collaboration

1. **Pipeline Design**: Understanding of CI/CD workflows, stage dependencies, and deployment strategies

2. **Containerization**: Practical knowledge of Docker, container orchestration, and microservices concepts

3. **Cloud Services**: Hands-on experience with AWS ecosystem and serverless architecture

4. **Infrastructure as Code**: Configuration management through declarative code

5. **Monitoring**: Implementation of logging, metrics, alarms, and observability practices

6. **Backend Integration**: API development, database design, and service integration

7. **Testing Strategy**: Multi-layer testing approach from pre-commit to production validation

8. **Security Best Practices**: IAM configuration, least-privilege access, and secure credential management

9. **Performance Optimization**: Load balancing, auto-scaling concepts, and response time optimization

10. **Deployment Strategies**: Blue/Green deployments, rolling updates, and instant rollback capabilities

---

## Architecture

### Current Architecture (V4.5)

```text
Internet
                   ↓
┌──────────────────────────────────────┐
│         GitHub Repository             │
│    (Source Code + Configurations)     │
└──────────────────┬───────────────────┘
                   ↓
          GitHub Actions (Pre-validation)
                   ↓
┌──────────────────────────────────────┐
│         AWS CodePipeline              │
│       (Orchestration Layer)           │
└──────────────────┬───────────────────┘
                   ↓
          AWS CodeBuild
          (Automated Testing + Build)
                   ↓
┌──────────────────────────────────────┐
│        Amazon ECR                     │
│   (Container Image Registry)          │
└──────────────────┬───────────────────┘
                   ↓
     Amazon ECS (Fargate)
     (Serverless Container)
                   ↓
          ECS Task (Public IP)
                   ↓
     Docker Container (2048 Game)
                   ↓
          User Browser
                   ↓
     API Gateway → Lambda → DynamoDB
     (Backend API + Leaderboard)
```

### Blue/Green Deployment Architecture (Documented)

This project **implemented and documented** Blue/Green deployment with Application Load Balancer, then removed it for cost optimization after comprehensive documentation. The implementation demonstrated:

Initial State:
Users → ALB → Blue Target Group → Blue ECS Tasks (v1.0)
Green Target Group → Empty

During Deployment:
Users → ALB → Blue Target Group → Blue ECS Tasks (v1.0)
Green Target Group → Green ECS Tasks (v2.0) [testing]

After Traffic Switch:
Users → ALB → Green Target Group → Green ECS Tasks (v2.0) [100% traffic]
Blue Target Group → Draining/Empty

Next Deployment:
Roles swap - new version deploys to Blue while Green serves traffic

See diagrams in Document.

**Business Justification**: For a portfolio project with minimal traffic, the ~$16-20/month ALB cost wasn't justified. However, the implementation demonstrates production-ready deployment strategy knowledge. See `Documentation/Blue_Green/` for complete architecture details and screenshots.

---

## Component Breakdown

### Source Control & Validation

1. **GitHub Repository**: Stores application source code, Dockerfile, build specifications, and infrastructure configurations

2. **GitHub Actions**: Pre-commit validation running HTML/CSS/JavaScript linting, security checks, and file validation

### Build & Test Pipeline

1. **AWS CodePipeline**: Orchestrates entire CI/CD workflow automatically on code commits

2. **AWS CodeBuild**: Executes automated tests (7 validation checks), builds Docker container, and pushes to registry

### Container Management

1. **Amazon ECR**: Secure container registry storing versioned Docker images with vulnerability scanning

2. **Docker**: Application containerization ensuring consistent environments across development and production

### Compute & Deployment

1. **Amazon ECS (Fargate)**: Serverless container orchestration running containers without managing servers

2. **ECS Task Definition**: Declarative configuration specifying container requirements, resources, and networking

### Backend Services

1. **AWS Lambda**: Serverless compute for API logic (score submission and leaderboard retrieval)

2. **Amazon API Gateway**: RESTful API endpoints with CORS support and request/response transformation

3. **Amazon DynamoDB**: NoSQL database for persistent leaderboard storage with on-demand capacity

### Security & Access

1. **IAM Roles**: Fine-grained permissions for service-to-service authentication with least-privilege access

2. **Security Groups**: Network-level firewall rules controlling inbound/outbound traffic

### Monitoring & Alerting

1. **CloudWatch Logs**: Centralized logging for ECS tasks, Lambda functions, and build processes

2. **CloudWatch Alarms**: Proactive alerting for CPU usage, memory usage, task health, Lambda errors, and DynamoDB throttling

3. **CloudWatch Dashboard**: Real-time metrics visualization for performance monitoring

See screenshots of the resources in Document 

---

## Key Features

### Application Features (Frontend)

- **Multiple Themes**: Three color schemes (Classic, Dark, Ocean) with persistent user preference

- **Username System**: Local username storage with validation (3-20 characters)

- **Global Leaderboard**: Real-time score submission and retrieval from DynamoDB

- **High Score Tracking**: Personal best score persistence using localStorage

- **Social Sharing**: Native Web Share API with Twitter fallback for score sharing

- **Multi-Input Support**: Keyboard controls, touch buttons, and swipe gestures

- **Responsive Design**: Mobile-first approach with perfect tile alignment on all devices

- **Progressive Enhancement**: Works offline for gameplay, syncs scores when online

### Infrastructure Features (Backend)

- **Fully Automated Deployment**: Zero manual steps from code commit to production

- **Automated Testing**: 7 validation checks in CI/CD pipeline + GitHub Actions pre-commit validation

- **Containerized Application**: Consistent environments across development and production

- **Serverless Backend API**: Lambda + API Gateway + DynamoDB for scalable score management

- **Blue/Green Deployment**: Zero-downtime deployment strategy (documented, then optimized out)

- **Comprehensive Monitoring**: CloudWatch alarms for CPU, memory, Lambda errors, DynamoDB throttling

- **Version Control Integration**: Every deployment tied to specific Git commit with rollback capability

- **Cost Optimized**: Serverless architecture minimizes costs (~$5-10 for testing, $0 after cleanup)

- **Production Ready**: Implements industry-standard DevOps and security practices

- **Infrastructure as Code**: Configurations version-controlled and reproducible

Some resources and steps were created through aws console to demonstrate familiarity with aws console.

See screenshots of resources in Document 

---

## Project Structure

2048-game-cicd/
├── index.html                    # Game UI with themes, username, leaderboard
├── style.css                     # Responsive styling with CSS variables for theming
├── game.js                       # Game logic + API integration + localStorage
├── Dockerfile                    # Container build instructions (nginx base)
├── buildspec.yml                 # CodeBuild automation with 7 automated tests
├── .jshintrc                     # JavaScript linting configuration
├── .github/
│   └── workflows/
│       └── code-quality.yml      # GitHub Actions pre-commit validation
├── lambda/
│   └── lambda_function.py        # Backend API for score management

│   └── lambda_function.zip        # Packaged to upload to aws 
​├── Documentation
​└── README.md                     # This file


---

## Technologies Used

### AWS Services

- **Amazon ECS (Fargate)**: Serverless container orchestration

- **Amazon ECR**: Container image registry with vulnerability scanning

- **AWS CodePipeline**: CI/CD orchestration and workflow automation

- **AWS CodeBuild**: Automated build service with Docker support

- **AWS Lambda**: Serverless compute for backend API

- **Amazon API Gateway**: RESTful API management with CORS

- **Amazon DynamoDB**: NoSQL database for leaderboard storage

- **IAM**: Identity and access management with role-based access

- **CloudWatch**: Logging, monitoring, metrics, alarms, and dashboards

- **VPC & Security Groups**: Network isolation and security

- **Application Load Balancer**: Documented implementation for Blue/Green (removed post-documentation)

### Development Tools & Languages

- **Docker**: Application containerization and image management

- **Git/GitHub**: Version control and source code management

- **GitHub Actions**: Pre-commit CI/CD validation

- **Python 3.11**: Lambda function backend logic

- **JavaScript (ES5)**: Frontend game logic and API integration

- **HTML5**: Semantic markup and Web APIs

- **CSS3**: Responsive design with custom properties (CSS variables)

- **YAML**: Infrastructure and pipeline configuration

- **nginx**: Web server (container base image) - Later used aws public library for better integration.

### Testing & Quality Tools

- **HTMLHint**: HTML validation and linting

- **CSSLint**: CSS validation and best practices

- **JSHint**: JavaScript syntax and code quality validation

- **AWS CodeBuild**: Build-time automated testing

---

## CI/CD Pipeline Stages

### Stage 1: Source (GitHub)

**Trigger**: Git push to main branch-**Action**: CodePipeline retrieves latest code from GitHub via webhook**Output**: Source code artifact with commit metadata.

### Stage 2: GitHub Actions Pre-Validation

**Trigger**: Every push and pull request-**Actions**:

- Install linting tools (HTMLHint, CSSLint, JSHint)

- Validate HTML structure and syntax

- Validate CSS for errors and best practices

- Validate JavaScript syntax and code quality

- Check for sensitive data (API keys, credentials)

- Verify file sizes within acceptable limits
**Output**: Pass/fail status visible in GitHub.

### Stage 3: Build & Test (AWS CodeBuild)

**Tool**: AWS CodeBuild with Docker support-**Automated Tests**:

1. Required files existence check (Dockerfile, HTML, CSS, JS)

2. HTML structure validation (DOCTYPE, title, script tags)

3. CSS theme variables verification

4. JavaScript structure validation (init function, event listeners)

5. Dockerfile validation (FROM, COPY, EXPOSE directives)

6. File size checks (warning if over 1MB)

7. Docker image creation verification

**Build Actions**:

- Authenticate with Amazon ECR

- Build Docker image from Dockerfile

- Tag image with Git commit hash for traceability

- Push image to ECR repository with versioning

**Output**: Docker image in ECR + imagedefinitions.json

### Stage 4: Deploy (Amazon ECS)

**Tool**: Amazon ECS with Fargate launch type-**Actions**:

- Pull latest Docker image from ECR

- Update ECS task definition with new image

- Deploy new container with blue/green update strategy

- Perform health checks on new container

- Drain connections from old container

- Terminate old container after successful deployment

**Output**: Live application accessible via public IP.

**Total Pipeline Duration**: 3-5 minutes from commit to production

---

## Workflow Automation

### Development to Production Flow

Developer Push
↓
GitHub Webhook Trigger
↓
GitHub Actions (Pre-validation)
├─ HTML Validation
├─ CSS Validation
├─ JavaScript Validation
└─ Security Checks
↓
CodePipeline Triggered
↓
CodeBuild Execution
├─ Test 1: Required files check
├─ Test 2: HTML structure validation
├─ Test 3: CSS theme variables
├─ Test 4: JavaScript structure
├─ Test 5: Dockerfile validation
├─ Test 6: File size checks
└─ Test 7: Docker image verification
↓
Build Docker Image
├─ Authenticate with ECR
├─ Build from Dockerfile
├─ Tag with commit hash
└─ Push to ECR
↓
Deploy to ECS
├─ Pull image from ECR
├─ Update task definition
├─ Start new container
├─ Health check validation
├─ Drain old container
└─ Terminate old container
↓
Application Live
↓
CloudWatch Monitoring Active
├─ CPU/Memory metrics
├─ Request/Response logs
├─ Error tracking
└─ Alarm notifications

**Time to Production**: 3-5 minutes
**Manual Intervention Required**: Zero
**Rollback Time**: <1 minute (via ECS task revision rollback)

---

## Version History

### Version 4.5 (Current) - Enterprise-Grade Full-Stack Implementation

**Released**: [Date]

**Major Features**:

- **Backend API**: Lambda + API Gateway + DynamoDB for persistent leaderboard

    - RESTful API endpoints (GET /scores, POST /scores)

    - Score validation and duplicate detection

    - Top 10 leaderboard with real-time updates

    - CORS configuration for cross-origin requests

    - Error handling and input sanitization

- **Multiple Themes**: Three professionally designed color schemes

    - Classic theme (original beige/brown palette)

    - Dark theme (modern dark mode with blue accents)

    - Ocean theme (cyan/teal color scheme)

    - Theme persistence using localStorage

    - Smooth theme transitions with CSS variables

- **Username System**: Persistent user identification

    - 3-20 character username validation

    - localStorage persistence across sessions

    - Username change capability

    - Associated with score submissions

- **Social Sharing**: Score sharing on social media

    - Native Web Share API for mobile devices

    - Twitter fallback for desktop browsers

    - Shareable links with score and URL

- **Automated Testing Infrastructure**:

    - 7 automated tests in CodeBuild pipeline

    - GitHub Actions pre-commit validation

    - HTML/CSS/JavaScript linting

    - Security checks for sensitive data

    - File size validation

- **Comprehensive Monitoring**:

    - 5 CloudWatch alarms (CPU, Memory, Lambda errors, DynamoDB throttling, Task health)

    - CloudWatch dashboard with real-time metrics

    - SNS email notifications for alarm triggers

    - Centralized logging for all services

- **Blue/Green Deployment** (Documented):

    - Application Load Balancer implementation

    - Two target groups (Blue and Green)

    - CodeDeploy integration for traffic shifting

    - Gradual traffic migration (10% → 50% → 100%)

    - Automatic rollback on error detection

    - Zero-downtime deployment testing

    - **Status**: Fully implemented, tested, documented with screenshots, then removed for cost optimization (~$16/month savings)

    - **Documentation**: Complete architecture diagrams, deployment flow, and resources screenshots in Document.

**Technical Improvements**:

- RESTful API design and implementation

- NoSQL database schema design for leaderboard

- Serverless architecture with Lambda and API Gateway

- Infrastructure as Code practices

- Automated testing at multiple stages

- Proactive monitoring and alerting

- Cost-optimization decision making

**PM Skills Demonstrated**:

- Backend service integration planning

- Database design and data modeling

- API specification and documentation

- Quality assurance strategy implementation

- Monitoring and observability setup

- Cost-benefit analysis and trade-off decisions

- Risk mitigation through testing and monitoring

- Stakeholder communication through documentation

### Version 3.0 - Complete Rewrite with Perfect Alignment

**Released**: [Date]

**Features**:

- Complete CSS rewrite for perfect responsive tile alignment

- High score tracking with localStorage persistence

- Swipe gesture support (touch and mouse drag)

- New Game button for instant restart

- Multiple control methods (keyboard, buttons, swipe)

- Beat record animation (yellow pulse effect)

- Improved UI and UX across all devices

**Technical Improvements**:

- Fixed mobile portrait/landscape alignment issues

- Responsive grid system (21vw cells, 3vw gaps on mobile)

- Proper tile positioning calculations

- Clean, maintainable code architecture

- Better event handling for touch devices

### Version 2.1 - Bug Fix Attempt

**Released**: [Date]

**Changes**:

- Attempted responsive fixes for mobile devices

- Had alignment issues with tile positioning

**Status**: Superseded by V3.0 complete rewrite

### Version 2.0 - Mobile Touch Controls

**Released**: [Date]

**Features**:

- Added directional button controls (Up, Down, Left, Right)

- Touch-responsive design for mobile gameplay

- Visual button feedback (hover and active states)

- Basic mobile support

**Technical Implementation**:

- HTML button elements with event listeners

- CSS styling with gradients and shadows

- JavaScript touch event handling

- Mobile-first responsive design

### Version 1.0 - Initial Release

**Released**: [Date]

**Features**:

- Core 2048 gameplay mechanics

- Keyboard arrow key controls

- Desktop-focused design

- Basic scoring system

**Infrastructure**:

- Docker containerization

- AWS ECS Fargate deployment

- CodePipeline automation

- CodeBuild integration

- ECR image storage

- Basic CI/CD pipeline

---

## Security Implementation

### IAM Roles & Least Privilege Access

**Principle**: Each service has only the minimum permissions required for its function.

#### CodeBuild Service Role

**Permissions**:

- ECR: Push images only (no delete or pull from other repos)

- CloudWatch Logs: Create log streams and put log events

- S3: Read-only access to artifacts bucket

**Why**: CodeBuild needs to push built images to ECR and log its activities.

#### CodePipeline Service Role

**Permissions**:

- CodeBuild: Start build projects

- ECS: Update services and task definitions

- S3: Read/write artifacts

- ECR: Describe images

**Why**: CodePipeline orchestrates the entire workflow across multiple services.

#### ECS Task Execution Role

**Permissions**:

- ECR: Pull images from repository

- CloudWatch Logs: Create log groups and streams

- Secrets Manager: Retrieve secrets (if needed)

**Why**: ECS needs to pull Docker images and send container logs to CloudWatch.

#### Lambda Execution Role

**Permissions**:

- DynamoDB: PutItem, GetItem, Scan, Query on 2048-leaderboard table only

- CloudWatch Logs: Create log groups and put log events

**Why**: Lambda needs to read/write leaderboard data and log API requests.

### Network Security

**ECS Security Group**:

- **Inbound**: Port 80 from 0.0.0.0/0 (HTTP from internet)

- **Outbound**: All traffic (for ECR pulls and API calls)

**VPC Isolation**:

- Application runs in VPC with public subnets

- Tasks get public IPs for direct internet access

- Security group provides network-level firewall

**API Gateway**:

- CORS enabled for cross-origin requests

- Request throttling to prevent abuse

- API key authentication (optional, not implemented for demo)

### Application Security

**Input Validation**:

- Username: 3-20 characters, alphanumeric validation

- Score: Integer validation, range checking

- Timestamp: ISO 8601 format validation

**XSS Prevention**:

- HTML escaping for user-generated content (usernames)

- Content Security Policy headers

- Input sanitization before display

**Credential Management**:

- No hardcoded credentials in source code

- AWS IAM role-based authentication throughout

- GitHub connection uses OAuth tokens (not stored in repository)

- Environment variables for configuration

**DynamoDB Security**:

- IAM-based access control

- Encryption at rest (AWS managed keys)

- No public endpoints

- Accessed only via Lambda with proper IAM role

---

## Cost Breakdown

This project was architected with AWS Free Tier in mind and cost-optimization throughout:

| Service                       | Configuration                     | Monthly Cost | Notes                                                                        |
| :---------------------------- | :-------------------------------- | :----------- | :--------------------------------------------------------------------------- |
| **ECS Fargate**               | 0.25 vCPU, 0.5GB Memory, 1 task   | ~$15.00      | $0.04048/hour × 730 hours. Reduces to ~$0.50/day when testing intermittently |
| **ECR Storage**               | <500MB Docker images              | $0.00        | Free tier covers 500MB                                                       |
| **CodeBuild**                 | <100 build minutes/month          | $0.00        | Free tier: 100 build minutes                                                 |
| **CodePipeline**              | 1 active pipeline                 | $0.00        | Free tier: 1 pipeline                                                        |
| **Lambda**                    | <1M requests, <400,000 GB-seconds | $0.00        | Free tier covers demo usage                                                  |
| **API Gateway**               | <1M requests                      | $0.00        | Free tier covers demo usage                                                  |
| **DynamoDB**                  | On-demand, <25GB storage          | $0.00-$1.00  | Free tier: 25GB storage, minimal read/write for demo                         |
| **CloudWatch**                | <5GB logs, 10 alarms              | $0.00-$0.50  | Free tier: 5GB logs, 10 alarms                                               |
| **Data Transfer**             | Minimal outbound data             | $0.00        | Under free tier limits                                                       |
| **Application Load Balancer** | Documented, then removed          | $0.00        | Was ~$16-20/month, removed post-documentation                                |
| **GitHub Actions**            | Public repository                 | $0.00        | Unlimited minutes for public repos                                           |

**Total Project Cost During Testing**: $1-5 for limited duration testing**Production Monthly Cost** (if running 24/7): ~$15-20/month**Cost After Documentation**: $0 (all resources cleaned up)

### Cost Optimization Strategies Implemented

1. **Intermittent Running**: Stop ECS service when not actively testing

2. **On-Demand Pricing**: DynamoDB on-demand mode for variable traffic

3. **Serverless Backend**: Lambda only charges for actual invocations

4. **Free Tier Maximization**: Designed to stay within free tier limits

5. **Resource Right-Sizing**: Minimal task size (0.25 vCPU, 0.5GB) for demo workload

6. **ALB Removal**: Documented Blue/Green deployment, then removed $16/month ALB for portfolio demo

7. **Log Retention**: 7-day retention instead of indefinite

8. **Image Cleanup**: Regular ECR image pruning to stay under 500MB

**Cost-Benefit Decision Making**: Demonstrates PM ability to balance feature richness with budget constraints. ALB implementation showed production-grade deployment knowledge, then removal demonstrated cost-conscious decision-making for project scope.

---

## Lessons Learned

### Technical Challenges Solved

**1. Docker Privilege Mode**

- **Challenge**: CodeBuild failed with "Cannot connect to Docker daemon" error

- **Root Cause**: Docker commands require privileged mode in build environment

- **Solution**: Enabled privileged flag in CodeBuild project configuration

- **Lesson**: Container-in-container operations require special permissions

**2. ECS Public IP Assignment**

- **Challenge**: Deployed tasks were not accessible from internet

- **Root Cause**: assignPublicIp was set to DISABLED in network configuration

- **Solution**: Updated ECS service with assignPublicIp: ENABLED

- **Lesson**: Fargate tasks need explicit public IP assignment for internet access

**3. Security Group Configuration**

- **Challenge**: Could access via ALB but not directly after ALB removal

- **Root Cause**: Security group only allowed traffic from ALB security group

- **Solution**: Updated inbound rules to allow HTTP from 0.0.0.0/0

- **Lesson**: Network security must align with architecture changes

**4. Mobile Tile Alignment**

- **Challenge**: Tiles overlapped and misaligned on mobile portrait mode

- **Root Cause**: Fixed pixel sizing (106.25px) didn't match responsive vw units

- **Solution**: Complete rewrite using consistent vw units (21vw cells, 3vw gaps)

- **Lesson**: Responsive design requires consistent unit systems across all elements

**5. Game Logic Bug (Up/Down Movement)**

- **Challenge**: Up and down arrow keys didn't move tiles, only left/right worked

- **Root Cause**: Incorrect traversal order in buildTraversals function

- **Solution**: Fixed row/column reversal logic based on movement direction

- **Lesson**: Algorithm correctness critical; systematic testing reveals edge cases

**6. IAM Permission Errors**

- **Challenge**: Services couldn't communicate (ECR pull failures, DynamoDB access denied)

- **Root Cause**: Insufficient or incorrect IAM role permissions

- **Solution**: Applied principle of least privilege with specific action permissions

- **Lesson**: IAM configuration requires precise permission scoping per service

**7. CORS Issues with API Gateway**

- **Challenge**: Browser blocked API requests due to CORS policy

- **Root Cause**: Missing Access-Control-Allow-Origin headers

- **Solution**: Configured CORS in API Gateway and Lambda response headers

- **Lesson**: Cross-origin requests require explicit CORS configuration

**8. Cost Management**

- **Challenge**: ALB costs mounted quickly for portfolio project

- **Root Cause**: Didn't account for ongoing infrastructure costs

- **Solution**: Documented ALB implementation thoroughly, then removed for cost savings

- **Lesson**: Always consider total cost of ownership; document before optimization

**9. CloudWatch Metrics**

- **Challenge**: The usual metrics(ex. throtling) don't show, insufficient data 

- **Root Cause**: The DynamoDB is set to pay per use

- **Solution**: Use other metrics like "User Error" or "System Errors"

- **Lesson**: The metrics for a resource can vary based on the payment you choose

### Best Practices Implemented

**1. Immutable Infrastructure**

- Every deployment creates new containers

- No in-place updates or patches

- Complete replacement ensures consistency

- Easy rollback to previous versions

**2. Version Control Everything**

- All code, configuration, and infrastructure definitions in Git

- Every change has commit hash and message

- Branching strategy for feature development

- Pull request reviews before merge

**3. Automated Testing**

- Tests run automatically on every commit

- Build fails fast if tests don't pass

- Multiple validation layers catch different issues

- Consistent testing environment in CI/CD

**4. Comprehensive Documentation**

- Architecture diagrams for visual understanding

- Step-by-step setup guides for reproducibility

- Troubleshooting guides for common issues

- Cost analysis for budget planning

- Screenshots as proof of implementation

**5. Monitoring and Alerting**

- Proactive monitoring of system health

- Automatic alerts for anomalies

- Dashboard for real-time visibility

- Log aggregation for debugging

**6. Security by Design**

- Least-privilege IAM roles

- Network isolation with security groups

- No hardcoded credentials

- Input validation and sanitization

- Regular security scanning

**7. Cost Optimization**

- Right-sizing resources for workload

- Leveraging free tiers where possible

- On-demand pricing for variable usage

- Regular resource cleanup

- Documented cost-benefit decisions

**8. Iterative Development**

- Small, incremental changes

- Version history shows evolution

- Each iteration adds value

- Learn from previous versions

- Continuous improvement mindset

---

## How to Deploy This Project

### Prerequisites

- AWS Account (Free Tier)

- AWS CLI configured with credentials

- Git installed

- GitHub account

- Basic familiarity with AWS Console

### Deployment Steps

#### 1. Fork/Clone Repository

#### 2. Create IAM Roles

- **CodeBuild Role**:

- **CodePipeline Role**:

- **ECS Task Execution Role**:

**Lambda Execution Role**:

#### 3. Create DynamoDB Table

#### 4. Create Lambda Function

#### 5. Create API Gateway

#### 6. Update game.js with API URL

#### 7. Create ECR Repository

#### 8. Create ECS Cluster

#### 9. Create ECS Task Definition

#### 10. Create ECS Service

#### 11. Create CodeBuild Project

#### 12. Create CodePipeline

#### 13. Set Up GitHub Actions

#### 14. Set Up CloudWatch Alarms

#### 15. Deploy Application

#### 16. Get Application URL

---

## Live Demo

Once deployed, the application is accessible via:

`Please ask for IP `

---

## Cleanup Instructions

**IMPORTANT**: Complete all documentation and take screenshots BEFORE cleanup. Deleted resources cannot be recovered.

### Quick Cleanup (AWS Console)

1. **Stop ECS Service**: Set desired tasks to 0, wait, then delete

2. **Delete ECS Cluster**: After service is deleted

3. **Delete CodePipeline**: Remove pipeline

4. **Delete CodeBuild Project**: Remove build project

5. **Delete ECR Repository**: Force delete with images

6. **Delete Lambda Function**: Remove function

7. **Delete API Gateway**: Delete REST API

8. **Delete DynamoDB Table**: Delete table

9. **Delete CloudWatch Alarms**: Remove all custom alarms

10. **Delete CloudWatch Log Groups**: Remove log groups

11. **Delete SNS Topic**: Remove alert topic

12. **Delete IAM Roles**: Detach policies, then delete roles

13. **Delete Security Groups**: Remove custom security groups

14. **Verify Billing**: Check AWS Cost Explorer after 24-48 hours

### Automated Cleanup Script

```bash
#!/bin/bash
# Save as cleanup-all.sh

# Stop and delete ECS service
aws ecs update-service --cluster 2048-game-cluster --service 2048-game-service --desired-count 0
sleep 60
aws ecs delete-service --cluster 2048-game-cluster --service 2048-game-service --force

# Delete ECS cluster
aws ecs delete-cluster --cluster 2048-game-cluster

# Delete pipeline
aws codepipeline delete-pipeline --name 2048-game-pipeline

# Delete build project
aws codebuild delete-project --name 2048-game-build

# Delete ECR repository
aws ecr delete-repository --repository-name 2048-game-repo --force

# Delete Lambda
aws lambda delete-function --function-name 2048-game-api

# Delete API Gateway
API_ID=$(aws apigateway get-rest-apis --query "items[?name=='2048-game-api'].id" --output text)
aws apigateway delete-rest-api --rest-api-id $API_ID

# Delete DynamoDB table
aws dynamodb delete-table --table-name 2048-leaderboard

# Delete CloudWatch alarms
aws cloudwatch delete-alarms --alarm-names 2048-High-CPU 2048-High-Memory 2048-Service-Unhealthy 2048-Lambda-Errors 2048-DynamoDB-Throttle

# Delete IAM roles (after detaching policies)
aws iam delete-role --role-name CodeBuildServiceRole
aws iam delete-role --role-name CodePipelineServiceRole
aws iam delete-role --role-name ecsTaskExecutionRole
aws iam delete-role --role-name 2048-lambda-execution-role

echo "Cleanup complete! Verify in AWS Console."
```

