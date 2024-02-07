<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NumberCastleController extends AbstractController
{
    #[Route('/number/castle', name: 'number_castle')]
    public function index(): Response
    {
        return $this->render('number_castle/index.html.twig');
    }
}