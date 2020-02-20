import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  const context = JSON.stringify(github.context, undefined, 2)
  console.log(context)

  const token = core.getInput('token')
  const repo = core.getInput('repo')
  let info = core.getInput('info')

  info = info.slice(2, info.length)
  const [appName, region, url, , deployedAt] = info.split(' ')

  const octokit = new github.GitHub(token)

  if (github.context.eventName !== 'pull_request') {
    core.setFailed('Only works with pull request events')
  }

  const body = `\`\`\`URL:      ${url}
APP:      ${appName}
REGION:   ${region}
DEPLOYED: ${deployedAt}\`\`\``

  await octokit.issues.createComment({
    number: github.context.issue.number,
    owner: github.context.actor,
    body,
    repo
  })
}

run()
