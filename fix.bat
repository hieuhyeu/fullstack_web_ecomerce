@echo off
git mv be\Dockerfile be\DockerfileTemp
git mv be\DockerfileTemp be\Dockerfile
git mv fe\Dockerfile fe\DockerfileTemp
git mv fe\DockerfileTemp fe\Dockerfile
git add be\Dockerfile fe\Dockerfile
git commit -m "fix: enforce uppercase Dockerfile case in git"
git push origin main
echo Done > fix_output.txt
