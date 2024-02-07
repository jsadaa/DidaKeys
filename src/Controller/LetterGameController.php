<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
class LetterGameController extends AbstractController
{
    #[Route('/letter/game', name: 'letter_game')]
    public function index(): Response
    {
        return $this->render('letter_game/index.html.twig');
    }
}
