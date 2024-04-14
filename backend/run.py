from bts_tasks import app as celery_app

r = celery_app.send_task('bts_tasks.queueing', args=[], queue='tasks_photos', compression='brotli', priority=3)
    
