redis-stack-server &
python3 backend/run.py &
nohup celery -A backend/bts_tasks.py --loglevel=INFO &
npm install &
npm start 