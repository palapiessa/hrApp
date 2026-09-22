# Project Description

This repository contains two agents: a Developer Agent and a Test Automation Agent. The purpose is to assist a human developer or product owner by automating implementation and testing activities while keeping decision-making and approvals under human control.

Changes follow the workflow:

Task/Issue → Development → Pull Request → Test Creation & Execution → Human Review → Merge

## Roles

### Human
- Creates and prioritises issues, user stories, and tasks
- Defines requirements and acceptance criteria
- Reviews pull requests
- Makes final approval and merge decisions
- Can override agent recommendations when necessary

### Developer Agent
- Analyses assigned issues and requirements
- Implements new features, bug fixes, and refactorings
- Creates commits and pull requests
- Responds to test findings and review feedback
- Updates implementation until acceptance criteria are met

### Test Automation Agent
- Analyses issues and pull requests
- Designs and generates automated test cases for completed implementations
- Maintains the automated test suite
- Executes tests in the CI environment
- Produces test reports in a consistent format
- Reports test results and identified defects back to the pull request

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
