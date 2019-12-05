from .base import *

config_debug = json.loads(open(CONFIG_DEBUG_FILE).read())

DEBUG = True

ALLOWED_HOSTS = config_debug['django']['allowed_hosts']

WSGI_APPLICATION = 'triplannet.wsgi.debug.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': pjoin(BASE_DIR, 'db.sqlite3'),
    }
}

