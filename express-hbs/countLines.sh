# Prints the number of lines for each file, and total.
find . -name "*.*" -not -path "./node_modules*" -not -path "./public/js/client.js" | xargs wc -l