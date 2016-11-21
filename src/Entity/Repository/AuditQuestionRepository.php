<?php

namespace Cekurte\Audit\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

/**
 * AuditQuestionRepository
 */
class AuditQuestionRepository extends EntityRepository
{
    /**
     * @return QueryBuilder
     */
    public function findResource()
    {
        $queryBuilder = $this->createQueryBuilder('aq');

        return $queryBuilder
            ->innerJoin('aq.question', 'q')
            ->innerJoin('aq.audit', 'a')
            ->addOrderBy('aq.id', 'ASC')
        ;
    }
}