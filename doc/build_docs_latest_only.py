import os
import subprocess
from pathlib import Path
from shutil import rmtree, move

# a single build step, which keeps conf.py and versions.yaml at the main branch
# in generall we use environment variables to pass values to conf.py, see below
# and runs the build as we did locally
def build_doc(version, language, tag=None, ):
	if version != 'latest':
		assert tag is not None
	os.environ["current_version"] = version
	os.environ["current_language"] = language
	os.environ['SPHINXOPTS'] = "-D language='{}'".format(language)
	subprocess.run("make html", shell=True)
	move('_build/html', f'pages/{version}/{language}')


# a move dir method because we run multiple builds and bring the html folders to a 
# location which we then push to github pages

# to separate a single local build from all builds we have a flag, see conf.py
os.environ["build_all_docs"] = str(True)
os.environ["pages_root"] = "https://zukunfcs.github.io/fcs-doc-advanced" 

# manually the main branch build in the current supported languages
if Path("./pages").exists():
    rmtree(Path("./pages"))
if Path("./_build").exists():
    rmtree(Path("./_build"))

build_doc("latest", "jp", "main")
build_doc("latest", "en", "main")

build_dir = Path("./_build")
rmtree(build_dir)
build_dir.mkdir(exist_ok=True, parents=True)
subprocess.run("mv ./pages _build/html", shell=True)
subprocess.run("cp ../src/index.html _build/html/index.html", shell=True)
subprocess.run("git checkout master", shell=True)