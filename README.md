# Sample service for processing replies for a chat bot

### Link to Postman collection
https://www.getpostman.com/collections/b5ab19c8f92c4c94629d

## Steps:
- Fetch the intent list from the ultimate API
- Find the intent with the highest confidence
- If confidence exceeds threshold, process Reply
- else Send DEFAULT_REPLY

## process_reply
- Fetch the reply for the given name from the DB
- If not found, return a DEFAULT_REPLY
- ELSE update the training data with the new message
- return reply

## Future Scope
- Push the write updates on a queue to be consumed by a separate write service
- We need high availability & low latency since this is a chat bot.
- More tests, mock the external API, mock DB, etc.
