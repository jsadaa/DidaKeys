<?php

namespace App\Entity;

use App\Repository\WordListRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WordListRepository::class)]
class WordList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'wordLists')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\Column]
    private string $title;

    #[ORM\Column]
    private array $words = [];

    public function __construct(User $user, string $title, array $words)
    {
        $this->user = $user;
        $this->title = $title;
        $this->words = $words;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function getWords(): array
    {
        return $this->words;
    }

    public function setWords(array $words): self
    {
        $this->words = $words;

        return $this;
    }

    public function addWord(string $word): self
    {
        $this->words[] = $word;

        return $this;
    }

    public function removeWord(string $word): self
    {
        $key = array_search($word, $this->words);
        if ($key !== false) {
            unset($this->words[$key]);
        }

        return $this;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
}
