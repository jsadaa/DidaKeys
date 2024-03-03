<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\WordList;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
class FlashWordsController extends AbstractController
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    #[Route('/flash-words', name: 'flash_words')]
    public function index(): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $wordLists = $user->getWordLists();

        return $this->render('flash_words/index.html.twig', [
            'wordLists' => $wordLists,
        ]);
    }

    #[Route('/flash-words/add', name: 'flash_words_add', methods: ['POST'])]
    public function addWordList(Request $request): Response
    {
        /** @var User $user */
        $user = $this->getUser() ?: throw new \LogicException('This can not happen');

        $data = $request->request->all();
        $title = $data['title'];
        $words = $data['words'];

        $wordList = new WordList($user, $title, $words);
        $user->addWordList($wordList);

        $this->userRepository->save($user);

        return $this->redirectToRoute('flash_words');
    }

    #[Route('/flash-words/remove/{id}', name: 'flash_words_remove')]
    public function removeWordList(int $id): Response
    {
        /** @var User $user */
        $user = $this->getUser() ?: throw new \LogicException('This can not happen');
        $wordList = $user->findWordListById($id);

        if ($wordList === null) {
            throw $this->createNotFoundException('Word list not found');
        }

        $user->removeWordList($wordList);
        $this->userRepository->save($user);

        return $this->redirectToRoute('flash_words');
    }

    #[Route('/flash-words/play/{id}', name: 'flash_words_play')]
    public function playWordList(int $id): Response
    {
        /** @var User $user */
        $user = $this->getUser() ?: throw new \LogicException('This can not happen');
        $wordList = $user->findWordListById($id);

        if ($wordList === null) {
            throw $this->createNotFoundException('Word list not found');
        }

        return $this->render('flash_words/play.html.twig', [
            'wordList' => $wordList,
        ]);
    }

    // edit
    #[Route('/flash-words/edit/{id}', name: 'flash_words_edit')]
    public function editWordList(int $id): Response
    {
        /** @var User $user */
        $user = $this->getUser() ?: throw new \LogicException('This can not happen');
        $wordLists = $user->getWordLists();
        $wordList = $user->findWordListById($id);

        if ($wordList === null) {
            throw $this->createNotFoundException('Word list not found');
        }

        return $this->render('flash_words/index.html.twig', [
            'wordList' => $wordList,
            'wordLists' => $wordLists,
            'update' => true,
        ]);
    }

    //update
    #[Route('/flash-words/update/{id}', name: 'flash_words_update', methods: ['POST'])]
    public function updateWordList(Request $request, int $id): Response
    {
        /** @var User $user */
        $user = $this->getUser() ?: throw new \LogicException('This can not happen');
        $wordList = $user->findWordListById($id);

        if ($wordList === null) {
            throw $this->createNotFoundException('Word list not found');
        }

        $data = $request->request->all();
        $title = $data['title'];
        $words = $data['words'];

        $wordList->setTitle($title);
        $wordList->setWords($words);

        $this->userRepository->save($user);

        return $this->redirectToRoute('flash_words');
    }
}
