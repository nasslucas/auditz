<?php

namespace Cekurte\Audit\Controller\Api;

use Cekurte\Audit\Controller\AbstractController;
use Cekurte\Audit\Entity\Question;
use Cekurte\Audit\Response\ConstraintViolationResponse;
use Cekurte\ResourceManager\Exception\ResourceManagerRefusedWriteException;
use Cekurte\ResourceManager\ResourceManager;
use Cekurte\Resource\Query\Language\ExprQueue;
use Cekurte\Resource\Query\Language\Expr\EqExpr;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class QuestionController extends AbstractController
{
    protected function getResourceManager()
    {
        return ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\Question'
        ]);
    }

    protected function getDimensionById($dimensionId)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('d.id', $dimensionId));

        $resourceManager = ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\Dimension'
        ]);

        return $resourceManager->findResource($queue);
    }

    protected function getQuestionById($questionId)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('q.id', $questionId));

        return $this->getResourceManager()->findResource($queue);
    }

    public function indexAction(Request $request)
    {
        $resources = $this->getResourceManager()->findResources();

        return new Response($this->getApp()['serializer']->serialize($resources, 'json'), 200, [
            'Content-Type' => $request->getMimeType('json')
        ]);
    }

    public function showAction(Request $request, $id)
    {
        $resource = $this->getQuestionById($id);

        return new Response($this->getApp()['serializer']->serialize($resource, 'json'), 200, [
            'Content-Type' => $request->getMimeType('json')
        ]);
    }

    public function saveAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['id']) && $request->isMethod(Request::METHOD_PUT)) {
            return new JsonResponse([
                'The id field is required.'
            ], 400);
        }

        $resource = $request->isMethod(Request::METHOD_POST)
            ? new Question()
            : $this->getQuestionById($data['id'])
        ;

        if (isset($data['name'])) {
            $resource->setName($data['name']);
        }

        if (isset($data['description'])) {
            $resource->setDescription($data['description']);
        }

        if (isset($data['dimension_id'])) {
            $resource->setDimension($this->getDimensionById($data['dimension_id']));
        }

        if (isset($data['question_id'])) {
            $resource->setQuestion($this->getQuestionById($data['question_id']));
        }

        if (isset($data['archived'])) {
            $resource->setArchived($data['archived']);
        }

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
