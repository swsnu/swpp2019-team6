from .base import *

config_deploy = json.loads(open(CONFIG_DEPLOY_FILE).read())

DEBUG = False

ALLOWED_HOSTS = config_deploy['django']['allowed_hosts']

WSGI_APPLICATION = 'triplannet.wsgi.deploy.application'

SECRET_KEY = config_deploy['django']['secret_key']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config_deploy['django']['database']['NAME'],
        'USER': config_deploy['django']['database']['USER'],
        'PASSWORD': config_deploy['django']['database']['PASSWORD'],
        'HOST': config_deploy['django']['database']['HOST'],
        'PORT': config_deploy['django']['database']['PORT'],
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}

