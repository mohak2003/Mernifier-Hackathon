import os
import requests
from git import Repo

def download_mern_repositories():
    api_url = "https://api.github.com/search/repositories"
    
    username = "mohak2003"
    access_token = "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"
    
    query = "topic:mern-stack"
    per_page = 5  
    page = 1
    
    headers = {
        "Authorization": f"token {access_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    while True or page < 3:
        params = {"q": query, "per_page": per_page, "page": page}
        response = requests.get(api_url, headers=headers, params=params)
        data = response.json()
        
        if not data["items"]:
            break
        
        for repo in data["items"]:
            clone_url = repo["clone_url"]
            repo_name = repo["name"]
            download_repository(clone_url, repo_name)
        
        page += 1

def download_repository(clone_url, repo_name):
    repo_path = os.path.join("mern_repositories", repo_name)
    
    if os.path.exists(repo_path):
        print(f"Repository '{repo_name}' already exists. Skipping...")
        return
    
    print(f"Cloning repository: {repo_name}")
    Repo.clone_from(clone_url, repo_path, depth=1)
    print(f"Repository '{repo_name}' cloned successfully.")

if __name__ == "__main__":
    download_mern_repositories()