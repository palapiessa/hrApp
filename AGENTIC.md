# Project Description

This repository brings together three main parts: a web application, GitHub Actions scripts with an agentic team, and automated tests. It is designed to help a human developer or product owner by coordinating implementation and validation activities while keeping decision-making and approvals under human control.

## Agent-a-Thon Project

Agent-a-Thon is a multi-agent GitHub workflow project designed to demonstrate how human-directed agents can help turn issues into implemented code and verified changes. The repository uses GitHub Issues, GitHub Actions, and agent service accounts to coordinate work while keeping the human in control of requirements, review, and merge decisions.

The project focuses on:
- Converting GitHub issues into implementation tasks
- Using a Developer Agent to make code changes
- Using a Test Automation Agent to validate changes
- Keeping all significant decisions with the human reviewer

Changes follow the workflow:

Human
 │
 │ Create Issue
 ▼

GitHub
 │
 │ issue opened
 ▼

GitHub Action
 │
 │ invoke agent
 ▼

Developer Agent
 │
 │ analyse issue
 │ create branch
 │ change code
 │ commit
 ▼

GitHub
 │
 │ create PR
 ▼

Human notified

## Roles

### Human
- Creates and prioritises issues, user stories, and tasks
- Defines requirements and acceptance criteria
- Reviews pull requests
- Makes final approval and merge decisions
- Can override agent recommendations when necessary

### Developer Agent Trigger
GitHub Action triggers when:
- Issue labeled agent-dev
- Issue assigned to Developer Agent service account
- Issue comment contains /implement
Developer Agent performs:
- Read issue
- Clone repository into temporary workspace
- Create feature branch
- Implement change
- Commit
- Push
- Create PR

### Test Agent Trigger
GitHub Action triggers when:
- PR created
- PR updated
- Label ready-for-test applied
Test Agent performs:
- Analyse PR diff
- Review acceptance criteria
- Generate missing tests
- Commit tests to same branch or create separate test branch
- Trigger CI
- Publish report to PR

## Issue Format

All work items should be documented in a structured issue format:

- Title: Short summary
- Description: Business or technical requirement
- Acceptance Criteria: Conditions that must be satisfied
- Priority: Impact and urgency
- Notes: Additional context or constraints

## Workflow

1. A human creates an issue or task.
2. The Developer Agent analyses the issue and implements the required changes.
3. The Developer Agent opens a pull request and links it to the issue.
4. The Test Automation Agent reviews the completed implementation.
5. The Test Automation Agent creates or updates automated tests covering the implemented functionality.
6. CI (GitHub Actions) executes the automated tests.
7. The Test Automation Agent publishes a test report and comments on the pull request.
8. The Developer Agent resolves any discovered issues.
9. A human reviews the code changes and test results.
10. The human approves and merges the pull request.

## CI

Use GitHub Actions workflows to:

- Build the application automatically
- Execute automated tests for pull requests
- Publish test reports and artefacts
- Re-run validation after updates
- Verify changes before merging to the main branch

## Workspaces for code changes
GitHub Action Runner
         ↓
Temporary Clone
         ↓
Agent Modifies Code
         ↓
Git Commit
         ↓
Git Push

## Agents

Developer: GPT-4.1-mini
Test Automation: GPT-4o-mini

### Dev
Purpose: Convert GitHub issues into code changes.
Instuctions:
You are a senior software engineer.

Read assigned GitHub issue.

Implement only requested changes.

Follow repository coding standards.

Update documentation if necessary.

Commit work to a feature branch.

Create a pull request summary.

Never merge.
Tools:
GitHub MCP
Code Interpreter
File Search

### Test Automation Agent

Purpose: Create automated tests for Pull Requests.

Instructions:
You are a senior test automation engineer.

Review Pull Request changes.

Identify missing test coverage.

Create Playwright tests.

Update existing test suites.

Execute tests.

Publish results.

Never modify production code.
Tools:
GitHub MCP
File Search
Code Interpreter

## GitHub MCP

Most important MCP.

Provides:
Read Issues
Create Branches
Read PRs
Create PR Comments
Update Files

## Filesystem MCP

Provides:
Read Repository Files
Write Repository Files

## Event-Driven Workflow

Flow 1: Issue created
Human
    ↓
Create GitHub Issue
    ↓
Label: agent-dev
    ↓
GitHub Action
    ↓
Developer Agent

Flow 2: PR opened
PR Opened
    ↓
GitHub Action
    ↓
Test Agent

## GitHub Actions Design

### Workflow 1
developer-agent.yml
Trigger:
on:
  issues:
    types: [opened, labeled]

Actions:
Read issue

Call Azure AI Foundry

Clone repo

Create branch

Modify code

Commit

Push

Create PR

### Workflow 2

on:
  pull_request:
    types: [opened, synchronize]

Actions:
Analyse PR

Generate tests

Commit tests

Execute tests

Publish results
