<?php

namespace Cekurte\Audit\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

/**
 * AuditDimensionRepository
 */
class AuditDimensionRepository extends EntityRepository
{
    /**
     * @return QueryBuilder
     */
    public function findResource()
    {
        $queryBuilder = $this->createQueryBuilder('ad');

        return $queryBuilder
            ->innerJoin('ad.dimension', 'd')
            ->innerJoin('ad.audit', 'a')
            ->addOrderBy('ad.id', 'ASC')
        ;
    }
}