<?php

namespace Cekurte\Audit\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

/**
 * AuditRepository
 */
class AuditRepository extends EntityRepository
{
    /**
     * @return QueryBuilder
     */
    public function findResource()
    {
        $queryBuilder = $this->createQueryBuilder('a');

        return $queryBuilder
            ->innerJoin('a.questions', 'audityQuestion')
            ->innerJoin('audityQuestion.question', 'question')
            ->addOrderBy('a.id', 'ASC')
        ;
    }
}