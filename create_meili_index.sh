curl \
  -X POST 'http://localhost:7700/indexes/arochem/documents' \
  -H 'Content-Type: application/json' \
  --data-binary @arochem.json
 
 curl \
  -X GET 'http://localhost:7700/tasks/0'