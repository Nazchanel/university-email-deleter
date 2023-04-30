import os
import json

env_vars = {
    "API_KEY": os.environ.get("API_KEY"),
    "CLIENT_ID": os.environ.get("CLIENT_ID")
}

with open("env_vars.json", "w") as f:
    json.dump(env_vars, f)
