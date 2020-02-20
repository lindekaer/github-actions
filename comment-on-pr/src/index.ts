import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  const context = JSON.stringify(github.context, undefined, 2)
  console.log(context)

  const token = core.getInput('token')
  const repo = core.getInput('repo')
  const info = core.getInput('info')

  const octokit = new github.GitHub(token)

  if (github.context.eventName !== 'pull_request') {
    core.setFailed('Only works with pull request events')
  }

  const body = `hello ${info}`

  await octokit.issues.createComment({
    number: github.context.issue.number,
    owner: github.context.actor,
    body,
    repo
  })
}

run()
