<?php

namespace Cekurte\Audit;

use Silex\Application as SilexApplication;

class Application extends SilexApplication
{
    use \Silex\Application\TwigTrait;
    use \Silex\Application\UrlGeneratorTrait;
}
