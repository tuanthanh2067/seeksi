# Contributing to Seeksi

## Welcome devs!

Please read through all the information below to learn more about how to create issues, branches, commit messages...

## Issues

Please provide descriptive issues which follow our issue templates.

## Commit messages

Use this structure `type: Verb + something`. For example: `docs: Fix Github Issue templates not working`.

## Branches

When creating a branch, make sure you our convention for branch name which is `type/issue#-issue-name`
For example: `feature/13-add-landing-page` or `bugfix/100-fix-button-on-landing-page`

## Pull request

Please provide as much information as possible, so that reviewers won't have to spend time on figuring about what the pull request is about,...

A good pull request should include information about what have you done, what you changed, what packages you added, or even a screenshot would be great.

## Code review

After creating a pull request, and you should request a code review from one of the team members **AS SOON AS POSSIBLE**.

## Get started

1. Install [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

2. Clone the project using this url: https://github.com/tuanthanh2067/seeksi.git (`git clone https://github.com/tuanthanh2067/seeksi.git`)

3. Change working directory to the project directory: `cd seeksi`

4. Run Docker Compose: `docker-compose up -d`

## Create a new PR in our project

1. Check out to the main branch to pull any new commits from other devs using `git checkout main` and then `git pull origin main`.

2. Branch off using `git checkout -b <branch-name>` with `branch-name` convention described above

3. Then you can go ahead and code.

4. After that, in order to push to github. You can use `git add` to add files, and folders you've changed, and then `git commit -m <message>` with commit `message` described above, and then `git push origin <branch-name>`.

5. Go to github, and then create a PR from there, and add description based on pull request template on Github so that other devs can understand your PR.

6. Tag whoever you think can help you review the code. At least 1 approved to merge.

## Before coding anything

Because your branch can be out of date when working, so rebasing is important.

1. Commit your recent changes in your branch. By using `git add` and `git commit`

2. Check out to main branch using `git checkout main`, and then `git pull origin main` to get new code from main branch

3. And then you can go back to your branch `git checkout <your-branch-name>`, and then `git rebase main`. So you're ready to continue working on your branch with your new code added to your current branch.

## Database

Our project takes advantage of container technology to bundle our application with a MongoDB database for local development & testing. This helps our contributors work on the same mock data on their separate database that are built the same as others.

<img src="https://i.ibb.co/bgXtPpd/Screen-Shot-2022-01-19-at-6-26-27-PM.png" alt="Screen-Shot-2022-01-19-at-6-26-27-PM" border="0">

- `seeksi-client`: the frontend container
- `seeksi-server`: the backend container
- `seeksi-db`: the database container
- `mongo-dashboard`: the admin dashboard interface container

Thanks to Docker, you can use the database out of the box and get started quickly without worrying too much about database configuration. Wanna learn more about Docker? [Docker docs](https://docs.docker.com/get-started/overview/) is an excellent guide for that.

### CRUD operations

Once all the containers are built, you can open the admin dashboard (`http://localhost:8081/`) in your web browser. You can create/view/modify/remove the databases, collections, and documents from there.

### Reset

In the even that you want to reset your local database to the default state, please follow these steps:

1. `docker ps`
2. Find the Container ID of `seeksi-db`
3. `docker exec -it <your-mongo-container-id> mongosh -f scripts/mongo-reset.js`
