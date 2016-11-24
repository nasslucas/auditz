<?php

namespace Cekurte\Audit\Controller\Api;

use Cekurte\Audit\Controller\AbstractController;
use Cekurte\Audit\Entity\Audit;
use Cekurte\Audit\Entity\AuditDimension;
use Cekurte\Audit\Entity\AuditQuestion;
use Cekurte\Audit\Exception\ValidationException;
use Cekurte\Audit\Response\ConstraintViolationResponse;
use Cekurte\ResourceManager\Exception\ResourceDataNotFoundException;
use Cekurte\ResourceManager\Exception\ResourceManagerRefusedWriteException;
use Cekurte\ResourceManager\ResourceManager;
use Cekurte\Resource\Query\Language\ExprQueue;
use Cekurte\Resource\Query\Language\Expr\EqExpr;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuditController extends AbstractController
{
    protected function getResourceManager()
    {
        return ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\Audit'
        ]);
    }

    protected function getAuditQuestionResourceManager()
    {
        return ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\AuditQuestion'
        ]);
    }

    protected function getAuditDimensionResourceManager()
    {
        return ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\AuditDimension'
        ]);
    }

    protected function getAuditByHash($hash)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('a.hash', $hash));

        return $this->getResourceManager()->findResource($queue);
    }

    protected function getAuditQuestionBy($auditId, $questionId)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('a.id', $auditId));
        $queue->enqueue(new EqExpr('q.id', $questionId));

        return $this->getAuditQuestionResourceManager()->findResource($queue);
    }

    protected function getAuditDimensionBy($auditId, $dimensionId)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('a.id', $auditId));
        $queue->enqueue(new EqExpr('d.id', $dimensionId));

        return $this->getAuditDimensionResourceManager()->findResource($queue);
    }

    protected function getAuditeeById($auditeeId)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('a.id', $auditeeId));

        $resourceManager = ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\Auditee'
        ]);

        return $resourceManager->findResource($queue);
    }

    protected function getQuestionById($questionId)
    {
        $queue = new ExprQueue();
        $queue->enqueue(new EqExpr('q.id', $questionId));

        $resourceManager = ResourceManager::create('doctrine', [
            'em'     => $this->getApp()['orm.em'],
            'entity' => '\Cekurte\Audit\Entity\Question'
        ]);

        return $resourceManager->findResource($queue);
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

    public function indexAction(Request $request)
    {
        $resources = $this->getResourceManager()->findResources();

        return new Response($this->getApp()['serializer']->serialize($resources, 'json'), 200, [
            'Content-Type' => $request->getMimeType('json')
        ]);
    }

    public function showAction(Request $request, $hash)
    {
        $resource = $this->getAuditByHash($hash);

        return new Response($this->getApp()['serializer']->serialize($resource, 'json'), 200, [
            'Content-Type' => $request->getMimeType('json')
        ]);
    }

    public function createAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $resource = new Audit();

        if (isset($data['auditee_id'])) {
            $resource->setAuditee($this->getAuditeeById($data['auditee_id']));
        }

        $errors = $this->getApp()['validator']->validate($resource);

        if (count($errors) > 0) {
            return new ConstraintViolationResponse($errors);
        }

        try {
            $this->getResourceManager()->writeResource($resource);

            $questionDimensions = [];

            foreach ($data['questions'] as $item) {
                $currentQuestion = $this->getQuestionById($item['id']);

                if ($currentQuestion->hasQuestion()) {
                    $parentQuestion = $currentQuestion->getQuestion();

                    try {
                        $this->getAuditQuestionBy($resource->getId(), $parentQuestion->getId());
                    } catch (ResourceDataNotFoundException $e) {
                        $auditParentQuestion = new AuditQuestion();
                        $auditParentQuestion->setAudit($resource);
                        $auditParentQuestion->setQuestion($parentQuestion);

                        $this->getAuditQuestionResourceManager()->writeResource($auditParentQuestion);
                    }
                }

                $auditQuestion = new AuditQuestion();
                $auditQuestion->setAudit($resource);
                $auditQuestion->setQuestion($currentQuestion);

                $this->getAuditQuestionResourceManager()->writeResource($auditQuestion);

                $questionDimensions[$currentQuestion->getDimension()->getId()] = $currentQuestion->getDimension();
            }

            $questionDimensions = array_values($questionDimensions);

            foreach ($questionDimensions as $dimension) {
                $auditDimension = new AuditDimension();
                $auditDimension->setAudit($resource);
                $auditDimension->setDimension($dimension);

                $this->getAuditDimensionResourceManager()->writeResource($auditDimension);
            }

            return new Response($this->getApp()['serializer']->serialize($resource, 'json'), 200, [
                'Content-Type' => $request->getMimeType('json')
            ]);
        } catch (ResourceManagerRefusedWriteException $e) {
            return new Response($e->getMessage(), 400);
        }
    }

    public function updateAction(Request $request, $hash)
    {
        $data = json_decode($request->getContent(), true);

        $resource = $this->getAuditByHash($hash);

        try {
            if (isset($data['questions'])) {
                foreach ($data['questions'] as $item) {
                    $auditQuestion = $this->getAuditQuestionBy($resource->getId(), $item['id']);
                    $auditQuestion->setAnswer($item['answer']);

                    $this->getAuditQuestionResourceManager()->writeResource($auditQuestion);
                }
            }

            if (isset($data['dimensions'])) {
                foreach ($data['dimensions'] as $item) {
                    $auditDimension = $this->getAuditDimensionBy($resource->getId(), $item['id']);
                    $auditDimension->setComment($item['comment']);

                    $this->getAuditDimensionResourceManager()->writeResource($auditDimension);
                }
            }

            return new Response($this->getApp()['serializer']->serialize($resource, 'json'), 200, [
                'Content-Type' => $request->getMimeType('json')
            ]);
        } catch (ResourceManagerRefusedWriteException $e) {
            return new Response($e->getMessage(), 400);
        }
    }

    public function finishAction(Request $request, $hash)
    {
        $data = json_decode($request->getContent(), true);

        $resource = $this->getAuditByHash($hash);

        try {
            if ($resource->isFinished()) {
                throw new ValidationException('This audit already was finished.');
            }

            $resource->setFinishedAt(new \DateTime('NOW'));

            $this->getResourceManager()->writeResource($resource);

            return new Response($this->getApp()['serializer']->serialize($resource, 'json'), 200, [
                'Content-Type' => $request->getMimeType('json')
            ]);
        } catch (ResourceManagerRefusedWriteException $e) {
            return new Response($e->getMessage(), 400);
        } catch (ValidationException $e) {
            return new Response($e->getMessage(), 400);
        }
    }
}
