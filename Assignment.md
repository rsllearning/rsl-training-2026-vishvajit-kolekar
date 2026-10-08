Asynchronous JavaScript

Assignment
GitHub repository tracker application.
Problem Statement:
Build a GitHub repository tracker application that fetches repositories from the GitHub API using fetch.
Use Promises and async/await to handle asynchronous operations. Implement a feature to refresh the
data periodically using setInterval. Additionally, asynchronously fetch data for the owner of each
repository.

Requirements
Part 1 – Fetch Public Repositories
● Accept a GitHub username as input.
● Fetch all public repositories for the specified user using the GitHub REST API.
● Display the repository information in the console or on a web page.

Part 2 – Fetch Owner Details
● Fetch the owner's profile information using the GitHub Users API.
● Display the owner's details along with the repository information.

Part 3 – Refresh Data Automatically
● Refresh the repository data every 60 seconds using setInterval().
● Ensure the latest repository information is displayed after each refresh.

Part 4 – Error Handling
Handle the following scenarios gracefully:
● Invalid GitHub username.
● Network or API failures.
● User with no public repositories.

Part 5 – Async/Await
Implement the application using async/await.
Use try...catch blocks to handle errors.

GitHub API Endpoints
Fetch Public Repositories
GET https://api.github.com/users/{username}/repos
Example
GET https://api.github.com/users/octocat/repos

Fetch User Details
GET https://api.github.com/users/{username}
Example
GET https://api.github.com/users/octocat

Deliverables:
● Submit the github PR link of the assignment along with a video demonstrating the working.
● Share the assignment details over status mail.