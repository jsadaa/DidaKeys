<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LetterCastleController extends AbstractController
{
    #[Route('/letter/castle', name: 'letter_castle')]
    public function index(): Response
    {
        return $this->render('letter_castle/index.html.twig');
    }
}
