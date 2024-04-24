echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying app files to server..."
scp -r build/* angel@72.14.178.40:/var/www/72.14.178.40/

echo "Done!"