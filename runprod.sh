echo "Setting environment to ---- > production" 
echo "###############################"
export NODE_ENV=productiondb

now="$(date '+%Y-%m-%d %H:%M:%S')"


echo "creating folder testreports"
mkdir -p ./TestReports

echo "creating folder logs"
mkdir -p ./Logs

echo "running test"
npm test >  ./TestReports/Report_"$now".txt

screen

echo "Starting server" 
node app.js

#read  -n 1 -p "Press any key to exit:" mainmenuinput

