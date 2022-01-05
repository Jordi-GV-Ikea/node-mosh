console.log('Before');

getUser(1, getRepositories1);

console.log('After');

function getRepositories1(user){
getRepositories(user.gitHubUsername, getCommits1);

}

function getCommits1(repos) {
getCommits(repos,displayCommits);
}

function displayCommits(commits){
console.log(commits);
}

function getUser(id, callback){
setTimeout(() =>{
console.log('Reading db…');
callback({id: id, gitHubUsername: 'mosh'});
}, 2000);
}

function getRepositories(username, callback){
setTimeout(() => {
console.log('Reading database…');
callback( ['repo1', 'repo2', 'repo3']);
}, 2000);

}

function getCommits(repo, callback){
setTimeout(() => {
console.log('Reading DB to display all commits…');
callback(['commit1','commit2','commit3']);
}, 2000);

}




