import { Access_Token } from "./properties.example.js";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = createInterface({ input, output });

async function main() {
  const userName = (await rl.question("Enter GitHub username: ")).trim();
  rl.close();

  if (!userName) {
    console.log("Please enter a valid GitHub username.");
    process.exit(1);
  }

  fetchGithubData(userName);
}

main();

async function fetchUser(userName) {
  try {
    let userDetails = await fetch(`https://api.github.com/users/${userName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Access_Token}`,
      },
    });

    if (userDetails.status == 404) {
      console.log(`User with userName: ${userName} does not exists`);
    }
    const data = await userDetails.json();
    console.log("User data of: ", userName);
    console.log(data);
  } catch {
    console.log("Due to Network or API failure fetchUser cal failed");
  }
}

async function fetchUserRepos(userName) {
  fetch(`https://api.github.com/users/${userName}/repos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Access_Token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("error");
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (data.length == 0) {
        console.log("User has no public repositories.");
        return;
      }
      console.log("User repo data of: ", userName);
      console.log(data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

function fetchGithubData(userName) {
  fetchUser(userName);
  fetchUserRepos(userName);
  const githubFetcher = setInterval(() => {
    fetchUser(userName);
    fetchUserRepos(userName);
  }, 60000);

  setTimeout(() => {
    clearInterval(githubFetcher);
    console.log(`${githubFetcher} is stopped`);
  }, 1000000);
}
