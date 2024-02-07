<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
class NumberGameController extends AbstractController
{
    #[Route('/number/game', name: 'number_game')]
    public function index(): Response
    {
        return $this->render('number_game/index.html.twig');
    }
}