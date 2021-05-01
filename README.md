# Pomodoro [Styleguide](https://pomodoro-ch.gitlab.io/styleguide/)

## Project setup

### Install

```
git clone git@gitlab.com:pomodoro-ch/styleguide.git
cd ./styleguide
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Commit guideline

Commit message summaries must follow this basic format:

```
Tag: Message (fixes #1234)
```

`Tag` should not be confused with git tag.
`Message` should not be confused with git commit message.

The `Tag` is one of the following:

- `Fix` - for a bug fix.
- `Update` - for a backwards-compatible enhancement.
- `Breaking` - for a backwards-incompatible enhancement.
- `Docs` - changes to documentation only.
- `Build` - changes to build process only.
- `New` - implemented a new feature.
- `Upgrade` - for a dependency upgrade.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end. \* The commit message should say "(fixes #1234)" at the end of the description if it closes out an existing issue (replace 1234 with the issue number). If the commit doesn't completely fix the issue, then use `(refs #1234)` instead of `(fixes #1234)`.

Here are some good commit message summary examples:

```
Build: Update Travis to only test Node 0.10 (refs #734)
Fix: Semi rule incorrectly flagging extra semicolon (fixes #840)
Upgrade: Esprima to 1.2, switch to using Esprima comment attachment (fixes #730)
```

The commit message format is important because these messages are used to create a changelog for each release. The tag and issue number help to create more consistent and useful changelogs.

Based on https://github.com/eslint/eslint.github.io/blob/master/docs/developer-guide/contributing.md#step-2-make-your-changes

## Release

```
npm run release
```
