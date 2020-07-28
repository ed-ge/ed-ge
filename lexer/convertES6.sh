sed -i -e 1,3d $1 # Remove the first 3 lines
truncate -s -$(tail -6 $1 | wc -c) $1 # remove the last 6 lines
echo 'export default grammar' >> $1 # Append export default 
