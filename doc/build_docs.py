import os
import subprocess
import yaml
from pathlib import Path
from shutil import rmtree, move

# a single build step, which keeps conf.py and versions.yaml at the master branch
# in generall we use environment variables to pass values to conf.py, see below
# and runs the build as we did locally
def build_doc(version, language, tag=None, ):
	if version != 'latest':
		assert tag is not None
	os.environ["current_version"] = version
	os.environ["current_language"] = language
	subprocess.run("git reset --hard", shell=True)
	subprocess.run("git clean -fd", shell=True)  # Remove untracked files
	subprocess.run("git fetch --all --tags", shell=True)  # Remove untracked files
	if version == 'latest':
		subprocess.run("git checkout master", shell=True)
	else:
		subprocess.run("git checkout " + tag, shell=True)
		for filename in ['conf.py', 'versions.yaml', '../.gitignore', 'build_docs.py']:
			subprocess.run(f"git checkout master -- {filename}", shell=True)
	os.environ['SPHINXOPTS'] = "-D language='{}'".format(language)
	subprocess.run("make html", shell=True)
	move('_build/html', f'pages/{version}/{language}')


# a move dir method because we run multiple builds and bring the html folders to a 
# location which we then push to github pages

# to separate a single local build from all builds we have a flag, see conf.py
os.environ["build_all_docs"] = str(True)
os.environ["pages_root"] = "https://ryota-nakajima-toei.github.io/fcs-doc-advanced" 

# manually the master branch build in the current supported languages
if Path("./pages").exists():
    rmtree(Path("./pages"))
if Path("./_build").exists():
    rmtree(Path("./_build"))

# build_doc("latest", "jp", "master")
# build_doc("latest", "en", "master")

# reading the yaml file
with open("versions.yaml", "r") as yaml_file:
	docs = yaml.safe_load(yaml_file)

# and looping over all values to call our build with version, language and its tag
for version, details in docs.items():
	tag = details.get('tag', '')
	for language in details.get('languages', []): 
		subprocess.run("rm -rf locale/en/LC_MESSAGES/*.mo", shell=True)
		subprocess.run("rm -rf locale/jp/LC_MESSAGES/*.mo", shell=True)
		build_doc(version, language, version)
		

build_dir = Path("./_build")
rmtree(build_dir)
build_dir.mkdir(exist_ok=True, parents=True)
subprocess.run("mv ./pages _build/html", shell=True)
subprocess.run("cp ../src/index.html _build/html/index.html", shell=True)
subprocess.run("git checkout master", shell=True)
legacy_paths = [Path('_build/html/latest/jp'), Path('_build/html/latest/en')]
for path in legacy_paths:
	path.mkdir(exist_ok=True, parents=True)
	subprocess.run(f"cp ../src/legacy_index.html {path}/index.html", shell=True)