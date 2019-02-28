echo "Setting environment to ---- > Staging" 
echo "###############################"
export NODE_ENV=staggingdb

now="$(date '+%Y-%m-%d %H:%M:%S')"
printf "Current date and time %s\n" "$now"

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

