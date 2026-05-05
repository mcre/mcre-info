import json
import os
from pathlib import Path


def get_env_config():
    cdk_dir = Path(__file__).parent
    env = os.getenv("CDK_ENV")
    if not env:
        raise ValueError("Environment variable 'CDK_ENV' is not set.")

    config_path = cdk_dir / "config" / f"{env}.json"
    if not config_path.exists():
        raise ValueError(f"Configuration file for environment '{env}' not found.")

    with config_path.open("r") as config_file:
        config = json.load(config_file)

    config["env"] = env
    return config
