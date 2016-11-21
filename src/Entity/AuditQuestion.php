<?php

namespace Cekurte\Audit\Entity;

use Cekurte\ResourceManager\Contract\ResourceInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * AuditQuestion
 *
 * @ORM\Table(name="audit_question", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_audit_question_audit1_idx", columns={"audit_id"}), @ORM\Index(name="fk_audit_question_question1_idx", columns={"question_id"})})
 * @ORM\Entity(repositoryClass="\Cekurte\Audit\Entity\Repository\AuditQuestionRepository")
 */
class AuditQuestion implements ResourceInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var float
     *
     * @ORM\Column(name="weight", type="decimal", precision=10, scale=0, nullable=false)
     */
    private $weight;

    /**
     * @var integer
     *
     * @ORM\Column(name="answer", type="integer", nullable=true)
     */
    private $answer;

    /**
     * @var \Audit
     *
     * @ORM\ManyToOne(targetEntity="Audit")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="audit_id", referencedColumnName="id")
     * })
     */
    private $audit;

    /**
     * @var \Question
     *
     * @ORM\ManyToOne(targetEntity="Question", cascade={"persist"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="question_id", referencedColumnName="id")
     * })
     */
    private $question;

    public function __construct()
    {
        $this->setWeight(100);
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set weight
     *
     * @param float $weight
     *
     * @return AuditQuestion
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * Get weight
     *
     * @return float
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set answer
     *
     * @param integer $answer
     *
     * @return AuditQuestion
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;

        return $this;
    }

    /**
     * Get answer
     *
     * @return integer
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * Has answer
     *
     * @return boolean
     */
    public function hasAnswer()
    {
        return !empty($this->answer);
    }

    /**
     * Set audit
     *
     * @param \Cekurte\Audit\Entity\Audit $audit
     *
     * @return AuditQuestion
     */
    public function setAudit(\Cekurte\Audit\Entity\Audit $audit = null)
    {
        $this->audit = $audit;

        return $this;
    }

    /**
     * Get audit
     *
     * @return \Cekurte\Audit\Entity\Audit
     */
    public function getAudit()
    {
        return $this->audit;
    }

    /**
     * Set question
     *
     * @param \Cekurte\Audit\Entity\Question $question
     *
     * @return AuditQuestion
     */
    public function setQuestion(\Cekurte\Audit\Entity\Question $question = null)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return \Cekurte\Audit\Entity\Question
     */
    public function getQuestion()
    {
        return $this->question;
    }
}
