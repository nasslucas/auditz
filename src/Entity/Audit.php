<?php

namespace Cekurte\Audit\Entity;

use Cekurte\ResourceManager\Contract\ResourceInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Audit
 *
 * @ORM\Table(name="audit", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_audit_auditee1_idx", columns={"auditee_id"})})
 * @ORM\Entity(repositoryClass="\Cekurte\Audit\Entity\Repository\AuditRepository")
 */
class Audit implements ResourceInterface
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
     * @ORM\Column(name="hash", type="string", length=32, nullable=false)
     */
    private $hash;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     *
     * @Gedmo\Timestampable(on="create")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="finished_at", type="datetime", nullable=true)
     */
    private $finishedAt;

    /**
     * @var \Auditee
     *
     * @ORM\ManyToOne(targetEntity="Auditee")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="auditee_id", referencedColumnName="id")
     * })
     */
    private $auditee;

    /**
     * @var Doctrine\Common\Collections\Collection
     *
     * @ORM\OneToMany(targetEntity="Cekurte\Audit\Entity\AuditQuestion", mappedBy="audit")
     */
    private $questions;

    /**
     * @var Doctrine\Common\Collections\Collection
     *
     * @ORM\OneToMany(targetEntity="Cekurte\Audit\Entity\AuditDimension", mappedBy="audit")
     */
    private $dimensions;

    public function __construct()
    {
        $this->hash = uniqid();
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
     * Get hash
     *
     * @return string
     */
    public function getHash()
    {
        return $this->hash;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Audit
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set finishedAt
     *
     * @param \DateTime $finishedAt
     *
     * @return Audit
     */
    public function setFinishedAt($finishedAt)
    {
        $this->finishedAt = $finishedAt;

        return $this;
    }

    /**
     * Get finishedAt
     *
     * @return \DateTime
     */
    public function getFinishedAt()
    {
        return $this->finishedAt;
    }

    /**
     * Is finishedAt
     *
     * @return boolean
     */
    public function isFinished()
    {
        return !empty($this->finishedAt);
    }

    /**
     * Set auditee
     *
     * @param \Cekurte\Audit\Entity\Auditee $auditee
     *
     * @return Audit
     */
    public function setAuditee(\Cekurte\Audit\Entity\Auditee $auditee = null)
    {
        $this->auditee = $auditee;

        return $this;
    }

    /**
     * Get auditee
     *
     * @return \Cekurte\Audit\Entity\Auditee
     */
    public function getAuditee()
    {
        return $this->auditee;
    }

    /**
     * @return Doctrine\Common\Collections\Collection
     */
    public function getQuestions() {
        return $this->questions;
    }

    /**
     * @return Doctrine\Common\Collections\Collection
     */
    public function getDimensions() {
        return $this->dimensions;
    }
}
