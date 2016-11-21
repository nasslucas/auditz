<?php

namespace Cekurte\Audit\ControllerProvider;

use Cekurte\Audit\Controller\Api\AuditController;
use Cekurte\Audit\Controller\Api\AuditeeController;
use Cekurte\Audit\Controller\Api\CategoryController;
use Cekurte\Audit\Controller\Api\DimensionController;
use Cekurte\Audit\Controller\Api\QuestionController;
use Silex\Application;
use Silex\ControllerProviderInterface;

class ApiControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $app['api.audit.controller'] = $app->share(function () use ($app) {
            return new AuditController($app);
        });

        $app['api.auditee.controller'] = $app->share(function () use ($app) {
            return new AuditeeController($app);
        });

        $app['api.category.controller'] = $app->share(function () use ($app) {
            return new CategoryController($app);
        });

        $app['api.dimension.controller'] = $app->share(function () use ($app) {
            return new DimensionController($app);
        });

        $app['api.question.controller'] = $app->share(function () use ($app) {
            return new QuestionController($app);
        });

        $controllers = $app['controllers_factory'];

        $controllers->get('/auditee', 'api.auditee.controller:indexAction')->bind('api.auditee');

        $controllers->post('/auditee', 'api.auditee.controller:saveAction')->bind('api.auditee.create');

        $controllers->get('/category', 'api.category.controller:indexAction')->bind('api.category');

        $controllers->post('/category', 'api.category.controller:saveAction')->bind('api.category.create');

        $controllers->get('/dimension', 'api.dimension.controller:indexAction')->bind('api.dimension');

        $controllers->post('/dimension', 'api.dimension.controller:saveAction')->bind('api.dimension.create');

        $controllers->get('/question', 'api.question.controller:indexAction')->bind('api.question');

        $controllers->get('/question/{id}', 'api.question.controller:showAction')->bind('api.question.show');

        $controllers->post('/question', 'api.question.controller:saveAction')->bind('api.question.create');

        $controllers->put('/question/{id}', 'api.question.controller:saveAction')->bind('api.question.update');

        $controllers->get('/audit', 'api.audit.controller:indexAction')->bind('api.audit');

        $controllers->get('/audit/{hash}', 'api.audit.controller:showAction')->bind('api.audit.show');

        $controllers->post('/audit', 'api.audit.controller:createAction')->bind('api.audit.create');

        $controllers->put('/audit/{hash}', 'api.audit.controller:updateAction')->bind('api.audit.update');

        $controllers->put('/audit/{hash}/finish', 'api.audit.controller:finishAction')->bind('api.audit.finish');

        return $controllers;
    }
}
