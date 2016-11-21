<?php

namespace Cekurte\Audit\Entity;

use Cekurte\ResourceManager\Contract\ResourceInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * AuditDimension
 *
 * @ORM\Table(name="audit_dimension", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_audit_dimension_audit1_idx", columns={"audit_id"}), @ORM\Index(name="fk_audit_dimension_dimension1_idx", columns={"dimension_id"})})
 * @ORM\Entity(repositoryClass="\Cekurte\Audit\Entity\Repository\AuditDimensionRepository")
 */
class AuditDimension implements ResourceInterface
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
     * @ORM\Column(name="comment", type="text", length=65535, nullable=true)
     */
    private $comment;

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
     * @var \Dimension
     *
     * @ORM\ManyToOne(targetEntity="Dimension")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="dimension_id", referencedColumnName="id")
     * })
     */
    private $dimension;



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
     * Set comment
     *
     * @param string $comment
     *
     * @return AuditDimension
     */
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get comment
     *
     * @return string
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set audit
     *
     * @param \Cekurte\Audit\Entity\Audit $audit
     *
     * @return AuditDimension
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
     * Set dimension
     *
     * @param \Cekurte\Audit\Entity\Dimension $dimension
     *
     * @return AuditDimension
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
}
