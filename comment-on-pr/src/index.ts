import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)

  const token = core.getInput('token')
  const repo = core.getInput('repo')
  const applicationInfo = core.getInput('application-info')

  const octokit = new github.GitHub(token)

  if (github.context.eventName !== 'pull_request') {
    core.setFailed('Only works with pull request events')
  }

  const body = `hello ${applicationInfo}`

  await octokit.issues.createComment({
    number: github.context.issue.number,
    owner: github.context.actor,
    body,
    repo
  })
}

run()
