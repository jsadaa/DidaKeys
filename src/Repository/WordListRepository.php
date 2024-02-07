<?php

namespace App\Repository;

use App\Entity\WordList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<WordList>
 *
 * @method WordList|null find($id, $lockMode = null, $lockVersion = null)
 * @method WordList|null findOneBy(array $criteria, array $orderBy = null)
 * @method WordList[]    findAll()
 * @method WordList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WordListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WordList::class);
    }

//    /**
//     * @return WordList[] Returns an array of WordList objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('w')
//            ->andWhere('w.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('w.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?WordList
//    {
//        return $this->createQueryBuilder('w')
//            ->andWhere('w.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
