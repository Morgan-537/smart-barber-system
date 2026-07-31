# Contributing Guidelines

Thank you for contributing to the Smart Barber System.

## Branch Workflow

The project follows the Git Flow workflow.

```
main
   ↑
develop
   ↑
feature branches
```

- Do not push directly to `main`.
- Do not push directly to `develop`.
- Work only on your assigned feature branch.
- Submit a Pull Request to `develop` after completing your task.

---

## Team Assignments

| Member | Responsibility |
|---------|----------------|
| Morgan | Authentication, Database, API Integration, Project Lead |
| Peter | Frontend UI & Shared Components |
| Alex | Booking System & Services |
| Nabil | Admin Dashboard & Inventory |

---

## Commit Message Format

Use clear commit messages.

Examples:

```
feat: add booking model
fix: resolve login validation
style: improve dashboard layout
docs: update README
```

---

## Pull Request Rules

Before creating a Pull Request:

- Ensure your code runs successfully.
- Pull the latest changes from `develop`.
- Resolve any merge conflicts.
- Provide a clear description of your changes.

---

## Coding Standards

- Write clean and readable code.
- Follow the existing folder structure.
- Avoid duplicate code (DRY principle).
- Keep functions and components focused on a single responsibility.
- Comment only where necessary.

---

## Communication

If your task affects another module, notify the team before making changes.

Examples:
- Database model changes
- API endpoint changes
- Authentication changes