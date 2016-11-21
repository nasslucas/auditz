<?php

namespace Cekurte\Audit\Controller\Api;

use Cekurte\ResourceManager\Exception\ResourceManagerRefusedWriteException;
use Cekurte\ResourceManager\ResourceManager;
use Cekurte\Audit\Controller\AbstractController;
use Cekurte\Audit\Entity\Category;
use Cekurte\Audit\Response\ConstraintViolationResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends AbstractController
{
    protected function getResourceManager()
    {
        return ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\Category'
        ]);
    }

    public function indexAction(Request $request)
    {
        $resources = $this->getResourceManager()->findResources();

        return new Response($this->getApp()['serializer']->serialize($resources, 'json'), 200, [
            'Content-Type' => $request->getMimeType('json')
        ]);
    }

    public function saveAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'])) {
            return new JsonResponse([
                'The name field is required.'
            ], 400);
        }

        $resource = new Category();
        $resource->setName($data['name']);

        $errors = $this->getApp()['validator']->validate($resource);

        if (count($errors) > 0) {
            return new ConstraintViolationResponse($errors);
        }

        try {
            $this->getResourceManager()->writeResource($resource);

            return new Response($this->getApp()['serializer']->serialize($resource, 'json'), 200, [
                'Content-Type' => $request->getMimeType('json')
            ]);
        } catch (ResourceManagerRefusedWriteException $e) {
            return new Response($e->getMessage(), 400);
        }
    }
}
