import json
import boto3
import os
from datetime import datetime
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', '2048-leaderboard')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Main Lambda handler for 2048 game API
    Supports GET /scores and POST /scores
    """
    
    http_method = event.get('httpMethod', event.get('requestContext', {}).get('http', {}).get('method', ''))
    path = event.get('path', event.get('rawPath', ''))
    
    print(f"Method: {http_method}, Path: {path}")
    
    try:
        if http_method == 'GET' and '/scores' in path:
            return get_scores()
        elif http_method == 'POST' and '/scores' in path:
            body = json.loads(event.get('body', '{}'))
            return submit_score(body)
        elif http_method == 'OPTIONS':
            return cors_response(200, {'message': 'OK'})
        else:
            return cors_response(400, {'error': 'Invalid request'})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return cors_response(500, {'error': str(e)})

def get_scores():
    """
    Get top 10 scores from leaderboard
    """
    try:
        response = table.scan(
            Limit=100
        )
        
        items = response.get('Items', [])
        
        # Sort by score descending
        items.sort(key=lambda x: int(x.get('score', 0)), reverse=True)
        
        # Get top 10
        top_scores = items[:10]
        
        # Convert Decimal to int for JSON serialization
        for item in top_scores:
            if 'score' in item:
                item['score'] = int(item['score'])
        
        return cors_response(200, {
            'scores': top_scores
        })
    
    except Exception as e:
        print(f"Error getting scores: {str(e)}")
        return cors_response(500, {'error': 'Failed to retrieve scores'})

def submit_score(body):
    """
    Submit a new score to the leaderboard
    """
    try:
        username = body.get('username', '').strip()
        score = body.get('score', 0)
        timestamp = body.get('timestamp', datetime.utcnow().isoformat())
        
        # Validation
        if not username or len(username) < 3 or len(username) > 20:
            return cors_response(400, {'error': 'Username must be 3-20 characters'})
        
        if not isinstance(score, int) or score < 0:
            return cors_response(400, {'error': 'Invalid score'})
        
        # Check if user exists
        try:
            existing = table.get_item(Key={'username': username})
            existing_score = int(existing.get('Item', {}).get('score', 0))
            
            # Only update if new score is higher
            if score <= existing_score:
                return cors_response(200, {
                    'message': 'Score not updated (not a new high score)',
                    'current_best': existing_score
                })
        
        except:
            pass
        
        # Save score
        table.put_item(
            Item={
                'username': username,
                'score': Decimal(str(score)),
                'timestamp': timestamp,
                'updated_at': datetime.utcnow().isoformat()
            }
        )
        
        return cors_response(200, {
            'message': 'Score submitted successfully',
            'username': username,
            'score': score
        })
    
    except Exception as e:
        print(f"Error submitting score: {str(e)}")
        return cors_response(500, {'error': 'Failed to submit score'})

def cors_response(status_code, body):
    """
    Return response with CORS headers
    """
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        'body': json.dumps(body)
    }