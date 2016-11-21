<?php

use Cekurte\Environment\Environment;
use Cekurte\Silex\Manager\Provider\ManagerServiceProvider;
use Cekurte\Audit\Application;
use Cekurte\Audit\ControllerProvider\ApiControllerProvider;
use Cekurte\Audit\ControllerProvider\PageControllerProvider;
use Symfony\Component\HttpFoundation\Request;

$app = new Application();

$app['debug']       = Environment::get('APP_DEBUG');
$app['projectName'] = Environment::get('APP_PROJECT_NAME');

$app['cekurte.manager.providers'] = require CONFIG_PATH . DS . 'manager.php';

$app->register(new ManagerServiceProvider());

Request::enableHttpMethodParameterOverride();

require CONFIG_PATH . DS . 'error.php';

$app->mount('/api', new ApiControllerProvider());

$app->after($app["cors"]);

return $app;
