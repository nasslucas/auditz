<?php

namespace Cekurte\Audit\Entity;

use Cekurte\ResourceManager\Contract\ResourceInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * Question
 *
 * @ORM\Table(name="question", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_question_question_idx", columns={"question_id"}), @ORM\Index(name="fk_question_dimension1_idx", columns={"dimension_id"})})
 * @ORM\Entity
 */
class Question implements ResourceInterface
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var boolean
     *
     * @ORM\Column(name="archived", type="boolean", nullable=false)
     */
    private $archived = false;

    /**
     * @var \Dimension
     *
     * @ORM\ManyToOne(targetEntity="Dimension")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="dimension_id", referencedColumnName="id")
     * })
     */
    private $dimension;

    /**
     * @var \Question
     *
     * @ORM\ManyToOne(targetEntity="Question")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="question_id", referencedColumnName="id", nullable=true)
     * })
     *
     * @JMS\SerializedName("child")
     */
    private $question;



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
     * Set name
     *
     * @param string $name
     *
     * @return Question
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Question
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set archived
     *
     * @param boolean $archived
     *
     * @return Question
     */
    public function setArchived($archived)
    {
        $this->archived = $archived;

        return $this;
    }

    /**
     * Get archived
     *
     * @return boolean
     */
    public function getArchived()
    {
        return $this->archived;
    }

    /**
     * Set dimension
     *
     * @param \Cekurte\Audit\Entity\Dimension $dimension
     *
     * @return Question
     */
    public function setDimension(\Cekurte\Audit\Entity\Dimension $dimension = null)
    {
        $this->dimension = $dimension;

        return $this;
    }

    /**
     * Get dimension
     *
     * @return \Cekurte\Audit\Entity\Dimension
     */
    public function getDimension()
    {
        return $this->dimension;
    }

    /**
     * Set question
     *
     * @param \Cekurte\Audit\Entity\Question $question
     *
     * @return Question
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
